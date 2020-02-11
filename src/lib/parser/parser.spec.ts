import * as P from "./parser";

describe("LogEntryDateParser", () => {
  it("parses the date format present in combat logs", () => {
    const dateString = "12/31"; // month/day
    const result = P.LogEntryDateParser.parse(dateString);

    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toStrictEqual([12, 31]);
    }
  });
});

describe("LogEntryTimeParser", () => {
  it("parses the time format present in combat logs", () => {
    const timeString = "01:45:30.150";
    const result = P.LogEntryTimeParser.parse(timeString);

    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toStrictEqual([1, 45, 30, 150]);
    }
  });
});

/**
 * Logs do not expose an ISO8601 compatible format, so we're
 * unable to accurately determine the moment of time. For now
 * the assumption is that it's the current machine's timezone.
 *
 * In future it may be prudent to allow the specification of a
 * timezone.
 */
describe("LogDateTimeParser", () => {
  it("parses into a Date object", () => {
    const dateTimeString = "12/31 01:45:30.150";
    const result = P.LogDateTimeParser.parse(dateTimeString);

    expect(result.status).toBe(true);
    if (result.status) {
      const dateTime = result.value;
      expect(dateTime).toBeInstanceOf(Date);
      const day = dateTime.getDate();
      const month = dateTime.getMonth();
      const hour = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      const seconds = dateTime.getSeconds();
      const milliseconds = dateTime.getMilliseconds();

      expect(day).toBe(31);
      expect(month).toBe(11); // Month is 0 indexed...
      expect(hour).toBe(1);
      expect(minutes).toBe(45);
      expect(seconds).toBe(30);
      expect(milliseconds).toBe(150);
    }
  });
});

describe("EmoteParser", () => {
  it("parses emote strings", () => {
    const string = `|TInterface\ICONS\SPELL_HOLY_PRAYEROFHEALING.BLP:20|t Queen Azshara enacts her decree |cFFFF0404|Hspell:298050|h[Form Ranks]|h|r!`;
    const result = P.EmoteParser.parse(string);

    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toBe(
        `Interface\ICONS\SPELL_HOLY_PRAYEROFHEALING.BLP:20|t Queen Azshara enacts her decree |cFFFF0404|Hspell:298050|h[Form Ranks]|h|r!`
      );
    }
  });
});

describe("Cell", () => {
  it("parses cells with square brackets in the middle", () => {
    const string = `|TInterface\ICONS\SPELL_HOLY_PRAYEROFHEALING.BLP:20|t Queen Azshara enacts her decree |cFFFF0404|Hspell:298050|h[Form Ranks]|h|r!`;
    const result = P.Cell.parse(string);

    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toBe(
        `Interface\ICONS\SPELL_HOLY_PRAYEROFHEALING.BLP:20|t Queen Azshara enacts her decree |cFFFF0404|Hspell:298050|h[Form Ranks]|h|r!`
      );
    }
  });

  it("does not parse cells that start with a square bracket", () => {
    const string = "[videogame";
    const result = P.Cell.parse(string);

    expect(result.status).toBe(false);
  });
  it("does not parse cells that end with a square bracket", () => {
    const string = "videogame]";
    const result = P.Cell.parse(string);

    expect(result.status).toBe(false);
  });

  it("parses russian characters", () => {
    const string = "видеоигра";
    const result = P.Cell.parse(string);

    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toBe(string);
    }
  });

  it("parses asian characters", () => {
    const string = "비디오 게임";
    const result = P.Cell.parse(string);

    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toBe(string);
    }
  });

  it("parses english characters", () => {
    const string = "video game";
    const result = P.Cell.parse(string);

    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toBe(string);
    }
  });
});

describe("SquareBracketParser", () => {
  it("can parse empty brackets", () => {
    const items = "[]";
    const result = P.SquareBracketParser.parse(items);

    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toStrictEqual([null]);
    }
  });

  it("parses values in square brackets", () => {
    const items = "[192,168,0,1]";
    const result = P.SquareBracketParser.parse(items);

    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toStrictEqual([192, 168, 0, 1]);
    }
  });

  it("recursively parses values in square brackets", () => {
    const items = "[items,[weapon,shield]]";
    const result = P.SquareBracketParser.parse(items);
    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toStrictEqual(["items", ["weapon", "shield"]]);
    }
  });

  it("can parse regular parenthesis inside square brackets", () => {
    const items = "[items,(weapon,shield)]";
    const result = P.SquareBracketParser.parse(items);

    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toStrictEqual(["items", ["weapon", "shield"]]);
    }
  });

  it("can parse a very silly string", () => {
    const items = "[[1,2,3],(1,2,3,[1,24],([]))]";
    const result = P.SquareBracketParser.parse(items);

    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toStrictEqual([
        [1, 2, 3],
        [1, 2, 3, [1, 24], [[null]]]
      ]);
    }
  });
});

describe("BracketCellParser", () => {
  it("can parse empty brackets", () => {
    const items = "(())";
    const result = P.BracketCellParser.parse(items);

    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toStrictEqual([[null]]);
    }
  });

  it("parses values in parenthesis", () => {
    const items = "(192,168,0,1)";
    const result = P.BracketCellParser.parse(items);

    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toStrictEqual([192, 168, 0, 1]);
    }
  });

  it("recursively parses values in parenthesis", () => {
    const items = "(items,(weapon,shield))";
    const result = P.BracketCellParser.parse(items);
    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toStrictEqual(["items", ["weapon", "shield"]]);
    }
  });

  it("can parse square brackets inside parenthesis", () => {
    const items = "(items,[weapon,shield])";
    const result = P.BracketCellParser.parse(items);

    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toStrictEqual(["items", ["weapon", "shield"]]);
    }
  });

  it("can parse a very silly string", () => {
    const items = "((1,2,3),[1,2,3,(1,24),[()]])";
    const result = P.BracketCellParser.parse(items);

    expect(result.status).toBe(true);
    if (result.status) {
      expect(result.value).toStrictEqual([
        [1, 2, 3],
        [1, 2, 3, [1, 24], [[null]]]
      ]);
    }
  });
});

describe("LogLineParser", () => {
  const logLineString = `10/17 00:47:53.606  COMBATANT_INFO,Player-3661-081F6BE1,0,1464,514,19760,12638,0,0,0,707,707,707,0,392,1898,1898,1898,87,1715,725,725,725,9365,65,(196926,214202,198054,183425,105809,53376,197646),(196029,199454,216327,199452),[139,450,0,576,450,0,102,450,0,15,450,0,13,450,0,139,450,2,396,450,2,21,450,2,206,450,2,13,450,2,139,450,4,576,450,4,30,450,4,15,450,4,13,450,4],[22,4,0,17,3,1,19,4,2],[(168360,450,(),(4824,1517,4786,6270),()),(158075,471,(),(6316,4932,4933),()),(159407,450,(),(5448,1617,4786,6271),()),(0,0,(),(),()),(168363,450,(),(4824,1517,4786,6269),()),(168388,445,(),(4800,41,1517,4786),()),(158313,440,(),(5010,4802,1602,5855,4783),(168641,120)),(159679,450,(),(5010,1612,5855,4784),()),(159425,445,(),(5010,1602,5860,4784),()),(168386,445,(5937,0,0),(4800,1517,4786),()),(168889,455,(6109,0,0),(4800,41,1517,5855,4783),()),(162548,430,(6109,0,0),(5010,4802,40,1602,4786),(168641,120)),(167555,420,(),(),(167556,404,168747,435,168435,404)),(169316,450,(),(4800,1517,5850,4783),()),(159287,430,(),(5010,41,1602,4786),()),(168904,445,(5963,0,0),(4800,41,1517,4786),()),(159663,440,(),(5010,41,1612,4783),()),(0,0,(),(),())],[Player-3661-07DAB733,21562,Player-3661-081F6BE1,297034,Player-3661-081F6BE1,296136,Player-3661-07E0DAE4,1459,Player-3661-081F6BE1,296320,Player-3661-07DA95E6,20707,Player-3661-081F6BE1,296050,Player-3661-07DA7E9F,6673,Player-3661-081F6BE1,298837,Player-3661-081F6BE1,210320]`;

  it("parses a line successfully", () => {
    const result = P.LogLineParser.parse(logLineString);

    expect(result.status).toBe(true);
  });
});
