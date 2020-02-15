import { MatcherConfig, matcher } from "lib/parser/matcher";
import { CombatLogEventBase, CombatLogEventTypes, BASE_MATCHERS } from "lib/parser/events/base";

export interface CombatLogVersionEvent extends CombatLogEventBase {
  type: CombatLogEventTypes.COMBAT_LOG_VERSION;
  version: number;
  advanced: boolean;
  buildVersion: string;
}

const CombatLogVersionMatcher: MatcherConfig<CombatLogVersionEvent>[] = [
  ...BASE_MATCHERS,
  { label: "version", index: 2 },
  { label: "buildVersion", index: 7 }
];

export default matcher(CombatLogVersionMatcher);
