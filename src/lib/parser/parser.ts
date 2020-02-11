import * as readline from "readline";
import * as fs from "fs";
import P from "parsimmon";
import { fromEvent } from "rxjs";
import { map, distinct, filter, groupBy } from "rxjs/operators";
import { matchEvent } from "./combatLogEvents";

/**
 * Parses the day and month from a log line
 */
export const LogEntryDateParser: P.Parser<number[]> = P.regexp(/\d{2}\/\d{2}/).map(x => {
  const [month, day] = x.split("/");
  return [+month, +day];
});

/**
 * Parses the moment in time from a log line
 */
export const LogEntryTimeParser: P.Parser<number[]> = P.regexp(/(\d{2}(:|.)){3}\d{3}/).map(x => {
  const [h, m, se] = x.split(":");
  const [s, ms] = se.split(".");

  return [+h, +m, +s, +ms];
});

/**
 * Parses a Date object from a log line
 */
export const LogDateTimeParser: P.Parser<Date> = P.seq(
  LogEntryDateParser,
  P.whitespace,
  LogEntryTimeParser
).map(x => {
  const [date, , time] = x;
  const [month, day] = date;
  const [h, m, s, ms] = time;

  const entryTime = new Date();
  entryTime.setMonth(month - 1);
  entryTime.setDate(day);
  entryTime.setUTCHours(h, m, s, ms);

  return entryTime;
});

/**
 * Parses the peculiar Emote strings present in WoWCombatLog.txt
 */
export const EmoteParser: P.Parser<string> = P.string("|T")
  .then(P.any.many())
  .tie();

/**
 * The definition of a log line cell
 */
export const Cell: P.Parser<string | null | number> = P.alt(
  EmoteParser,
  P.noneOf("[](),")
    .many()
    .tie(),
  P.of(null)
).map(item => {
  if (item === null || item === "") return null;

  const num = Number(item);
  if (!Number.isNaN(num)) return num;

  return item;
});

export const SquareBracketParser: P.Parser<(string | null)[]> = P.lazy(() => {
  return P.regex(/\[/)
    .then(P.alt(SquareBracketParser, BracketCellParser, Cell).sepBy(P.string(",")))
    .skip(P.regex(/\]/));
});

/**
 * A recursive parser for log line cells wrapped in parenthesis
 */
export const BracketCellParser: P.Parser<(string | null)[]> = P.lazy(() => {
  return P.regex(/\(/)
    .then(P.alt(BracketCellParser, SquareBracketParser, Cell).sepBy(P.string(",")))
    .skip(P.regex(/\)/));
});

/**
 * Parses a log line and returns the relevant information
 */
export const LogLineParser: P.Parser<[Date, ...string[]]> = P.seqMap(
  LogDateTimeParser,
  P.whitespace,
  P.alt(BracketCellParser, SquareBracketParser, Cell).sepBy1(P.string(",")),
  function handleLogLineResult(...args) {
    return [args[0], ...args[2]];
  }
);

/**
 * Parses a log into a log object
 * @param path Path to a WoWCombatLog.txt file
 * @returns nothing yet
 */
export function parseLog(path: string) {
  const rd = readline.createInterface({
    input: fs.createReadStream(path)
  });

  rd.on("close", () => console.timeEnd("Parsing"));

  console.time("Parsing");
  return fromEvent<string>(rd, "line").pipe(
    map((i: string) => {
      if (i === "") return;
      const parsedLine = LogLineParser.parse(i);

      if (!parsedLine.status) {
        console.log(parsedLine.index);
        throw new Error("Could not parse combat log.");
      }

      return parsedLine.value;
    }),
    filter<any>(Boolean),
    // distinct(line => line[1]),
    map(matchEvent),
    groupBy(i => i.type)
    // distinct(p => p.type)
  );
}
