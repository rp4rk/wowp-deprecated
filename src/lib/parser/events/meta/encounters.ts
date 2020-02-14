import { MatcherConfig } from "lib/parser/matcher";
import { CombatLogEventBase, CombatLogEventTypes, BASE_MATCHERS } from "lib/parser/events/base";

export interface CombatLogEncounterEvent extends CombatLogEventBase {
  type: CombatLogEventTypes.ENCOUNTER_START | CombatLogEventTypes.ENCOUNTER_END;
  encounterId: number;
  encounterName: string;
  encounterDifficulty: number;
}

export const CombatLogEncounterMatcher: MatcherConfig<CombatLogEncounterEvent>[] = [
  ...BASE_MATCHERS,
  { label: "encounterId", index: 2 },
  { label: "encounterName", index: 3 },
  { label: "encounterDifficulty", index: 4 }
];

export default CombatLogEncounterMatcher;
