import { CombatLogEventTypes } from "lib/parser/events/base";
import { CombatLogEvent } from "lib/parser/events/index.types";
import { MatcherConfig, matcher } from "./matcher";

import CombatLogEventMatchers from "./events/index";

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
      return matcher<CombatLogVersionEvent>(CombatLogVersionMatcher)(event);
    case CombatLogEventTypes.ENCOUNTER_START:
      return matcher<CombatLogEncounterEvent>(CombatLogEncounterMatcher)(event);
    case CombatLogEventTypes.ENCOUNTER_END:
      return matcher<CombatLogEncounterEvent>(CombatLogEncounterMatcher)(event);
    case CombatLogEventTypes.COMBATANT_INFO:
      return matcher<CombatLogCombatantInfoEvent>(CombatLogCombatantInfoMatcher)(event);
    case CombatLogEventTypes.SPELL_CAST_SUCCESS:
      return matcher<SpellCastSuccessEvent>(CombatLogSpellCastSuccessMatcher)(event);
    default:
      return matcher<CombatLogEvent>(BASE_MATCHERS)(event);
  }
}
