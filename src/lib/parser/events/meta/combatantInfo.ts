import { MatcherConfig, matcher } from "lib/parser/matcher";
import { CombatLogEventBase, CombatLogEventTypes, BASE_MATCHERS } from "lib/parser/events/base";

export interface CombatLogCombatantInfoEvent extends CombatLogEventBase {
  type: CombatLogEventTypes.COMBATANT_INFO;
  sourceId: string;
  playerGUID: string;
  strength: string;
  agility: string;
  stamina: string;
  intelligence: string;
  dodge: string;
  parry: string;
  block: string;
  critMelee: string;
  critRanged: string;
  critSpell: string;
  speed: string;
  lifesteal: string;
  hasteMelee: string;
  hasteRanged: string;
  hasteSpell: string;
  avoidance: string;
  mastery: string;
  versatilityDamageDone: string;
  versatilityHealingDone: string;
  versatilityDamageTaken: string;
  armor: string;
  currentSpecID: string;
  talents: string[];
  pvpTalents: string[];
  misc: string[];
}

const CombatLogCombatantInfoMatcher: MatcherConfig<CombatLogCombatantInfoEvent>[] = [
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

export default matcher(CombatLogCombatantInfoMatcher);
