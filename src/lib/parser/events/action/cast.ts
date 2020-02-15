import { MatcherConfig, matcher } from "lib/parser/matcher";
import { CombatLogEventBase, CombatLogEventTypes, BASE_MATCHERS } from "lib/parser/events/base";

export interface SpellCastSuccessEvent extends CombatLogEventBase {
  type: CombatLogEventTypes.SPELL_CAST_SUCCESS;
  sourceGUID: string;
  sourceName: string;
  targetGUID: string;
  targetName: string;
  spellId: number;
  spellName: string;
}

const CombatLogSpellCastSuccessMatcher: MatcherConfig<SpellCastSuccessEvent>[] = [
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

export default matcher(CombatLogSpellCastSuccessMatcher);
