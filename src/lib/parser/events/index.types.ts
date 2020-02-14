import { CombatLogEventBase } from "./base";
import { CombatLogEncounterEvent } from "./meta/encounters";
import { CombatLogVersionEvent } from "./meta/combatLogVersion";
import { CombatLogCombatantInfoEvent } from "./meta/combatantInfo";

export type CombatLogEvent =
  | CombatLogEventBase
  | CombatLogVersionEvent
  | CombatLogEncounterEvent
  | CombatLogCombatantInfoEvent;
