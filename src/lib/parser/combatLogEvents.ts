import {
  CombatLogVersionEvent,
  CombatLogEvent,
  CombatLogEventTypes,
  CombatLogEncounterEvent,
  CombatLogEventBase,
  CombatLogCombatantInfoEvent,
  SpellCastSuccessEvent
} from "../combatlogevents.types";

type matcher<T> = { label: keyof T; index: number };

/**
 * Picks labels from an array index
 * @param matchers
 */
function linePicker<CombatLogEvent>(...matchers: { label: keyof CombatLogEvent; index: number }[]) {
  return function pick(line: Array<any>) {
    return matchers.reduce<Partial<CombatLogEvent>>((acc, { label, index }) => {
      acc[label] = line[index];

      return acc;
    }, {});
  };
}

/**
 * Base matchers, these are present in every combat log entry
 */
const BASE_MATCHERS: matcher<CombatLogEventBase>[] = [
  { label: "date", index: 0 },
  { label: "type", index: 1 }
];

const CombatLogVersionMatcher: matcher<CombatLogVersionEvent>[] = [
  ...BASE_MATCHERS,
  { label: "version", index: 2 },
  { label: "buildVersion", index: 7 }
];

const CombatLogEncounterMatcher: matcher<CombatLogEncounterEvent>[] = [
  ...BASE_MATCHERS,
  { label: "encounterId", index: 2 },
  { label: "encounterName", index: 3 },
  { label: "encounterDifficulty", index: 4 }
];

const CombatLogCombatantInfoMatcher: matcher<CombatLogCombatantInfoEvent>[] = [
  ...BASE_MATCHERS,
  { label: "playerGUID", index: 2 },
  // { label: "unknown", index: 3 },
  { label: "strength", index: 4 },
  { label: "agility", index: 5 },
  { label: "stamina", index: 6 },
  { label: "intelligence", index: 7 },
  { label: "dodge", index: 8 },
  { label: "parry", index: 9 },
  { label: "block", index: 10 },
  { label: "critMelee", index: 11 },
  { label: "critRanged", index: 12 },
  { label: "critSpell", index: 13 },
  { label: "speed", index: 14 },
  { label: "lifesteal", index: 15 },
  { label: "hasteMelee", index: 16 },
  { label: "hasteRanged", index: 17 },
  { label: "hasteSpell", index: 18 },
  { label: "avoidance", index: 19 },
  { label: "mastery", index: 20 },
  { label: "versatilityDamageDone", index: 21 },
  { label: "versatilityHealingDone", index: 22 },
  { label: "versatilityDamageTaken", index: 23 },
  { label: "armor", index: 24 },
  { label: "currentSpecID", index: 25 },
  { label: "talents", index: 26 },
  { label: "pvpTalents", index: 27 },
  { label: "misc", index: 28 }
];

const CombatLogSpellCastSuccessMatcher: matcher<SpellCastSuccessEvent>[] = [
  ...BASE_MATCHERS,
  {
    label: "sourceGUID",
    index: 2
  },
  {
    label: "sourceName",
    index: 3
  },
  {
    label: "targetGUID",
    index: 6
  },
  {
    label: "targetName",
    index: 7
  },
  {
    label: "spellId",
    index: 10
  },
  {
    label: "spellName",
    index: 11
  }
];

/**
 * Matches raw event arrays to a CombatLogEvent
 * @param event An event array
 */
export function matchEvent(event: [Date, ...string[]]): Partial<CombatLogEvent> {
  const type = event[1];

  if (!(type in CombatLogEventTypes)) {
    throw new Error(`${type} not in CombatLogEventTypes, unable to parse.`);
  }

  switch (type) {
    case CombatLogEventTypes.COMBAT_LOG_VERSION:
      return linePicker<CombatLogVersionEvent>(...CombatLogVersionMatcher)(event);
    case CombatLogEventTypes.ENCOUNTER_START:
      return linePicker<CombatLogEncounterEvent>(...CombatLogEncounterMatcher)(event);
    case CombatLogEventTypes.ENCOUNTER_END:
      return linePicker<CombatLogEncounterEvent>(...CombatLogEncounterMatcher)(event);
    case CombatLogEventTypes.COMBATANT_INFO:
      return linePicker<CombatLogCombatantInfoEvent>(...CombatLogCombatantInfoMatcher)(event);
    case CombatLogEventTypes.SPELL_CAST_SUCCESS:
      return linePicker<SpellCastSuccessEvent>(...CombatLogSpellCastSuccessMatcher)(event);
    default:
      return linePicker<CombatLogEvent>(...BASE_MATCHERS)(event);
  }
}
