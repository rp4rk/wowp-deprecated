import { CombatLogEventTypes } from "lib/parser/events/base";
import { CombatLogEvent } from "lib/parser/events/index.types";
import CombatLogEventMatchers from "lib/parser/events";

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
      return CombatLogEventMatchers.CombatLogVersionMatcher(event);
    case (CombatLogEventTypes.ENCOUNTER_START, CombatLogEventTypes.ENCOUNTER_END):
      return CombatLogEventMatchers.CombatLogEncounterMatcher(event);
    case CombatLogEventTypes.COMBATANT_INFO:
      return CombatLogEventMatchers.CombatLogCombatantInfoMatcher(event);
    case CombatLogEventTypes.SPELL_CAST_SUCCESS:
      return CombatLogEventMatchers.CombatLogCastEventMatcher(event);
    default:
      return CombatLogEventMatchers.CombatLogBaseEvent(event);
  }
}
