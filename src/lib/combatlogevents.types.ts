export enum CombatLogEventTypes {
  COMBAT_LOG_VERSION = "COMBAT_LOG_VERSION",
  COMBATANT_INFO = "COMBATANT_INFO",
  EMOTE = "EMOTE",
  ENCOUNTER_END = "ENCOUNTER_END",
  ENCOUNTER_START = "ENCOUNTER_START",
  ENVIRONMENTAL_DAMAGE = "ENVIRONMENTAL_DAMAGE",
  PARTY_KILL = "PARTY_KILL",
  RANGE_DAMAGE = "RANGE_DAMAGE",
  RANGE_MISSED = "RANGE_MISSED",
  DAMAGE_SPLIT = "DAMAGE_SPLIT",
  SPELL_ABSORBED = "SPELL_ABSORBED",
  SPELL_AURA_APPLIED = "SPELL_AURA_APPLIED",
  SPELL_AURA_APPLIED_DOSE = "SPELL_AURA_APPLIED_DOSE",
  SPELL_AURA_BROKEN = "SPELL_AURA_BROKEN",
  SPELL_AURA_BROKEN_SPELL = "SPELL_AURA_BROKEN_SPELL",
  SPELL_AURA_REFRESH = "SPELL_AURA_REFRESH",
  SPELL_AURA_REMOVED = "SPELL_AURA_REMOVED",
  SPELL_AURA_REMOVED_DOSE = "SPELL_AURA_REMOVED_DOSE",
  SPELL_CAST_FAILED = "SPELL_CAST_FAILED",
  SPELL_CAST_START = "SPELL_CAST_START",
  SPELL_CAST_SUCCESS = "SPELL_CAST_SUCCESS",
  SPELL_CREATE = "SPELL_CREATE",
  SPELL_DAMAGE = "SPELL_DAMAGE",
  SPELL_DISPEL = "SPELL_DISPEL",
  SPELL_ENERGIZE = "SPELL_ENERGIZE",
  SPELL_EXTRA_ATTACKS = "SPELL_EXTRA_ATTACKS",
  SPELL_HEAL = "SPELL_HEAL",
  SPELL_HEAL_ABSORBED = "SPELL_HEAL_ABSORBED",
  SPELL_INSTAKILL = "SPELL_INSTAKILL",
  SPELL_INTERRUPT = "SPELL_INTERRUPT",
  SPELL_MISSED = "SPELL_MISSED",
  SPELL_PERIODIC_ENERGIZE = "SPELL_PERIODIC_ENERGIZE",
  SPELL_PERIODIC_DAMAGE = "SPELL_PERIODIC_DAMAGE",
  SPELL_PERIODIC_HEAL = "SPELL_PERIODIC_HEAL",
  SPELL_PERIODIC_MISSED = "SPELL_PERIODIC_MISSED",
  SPELL_RESURRECT = "SPELL_RESURRECT",
  SPELL_STOLEN = "SPELL_STOLEN",
  SPELL_SUMMON = "SPELL_SUMMON",
  SWING_DAMAGE = "SWING_DAMAGE",
  SWING_DAMAGE_LANDED = "SWING_DAMAGE_LANDED",
  SWING_MISSED = "SWING_MISSED",
  UNIT_DIED = "UNIT_DIED",
  WORLD_MARKER_PLACED = "WORLD_MARKER_PLACED",
  WORLD_MARKER_REMOVED = "WORLD_MARKER_REMOVED"
}

export interface CombatLogEventBase {
  date: string;
  time: string;
  type: CombatLogEventTypes;
}

export interface CombatLogVersionEvent extends CombatLogEventBase {
  type: CombatLogEventTypes.COMBAT_LOG_VERSION;
  version: number;
  advanced: boolean;
  buildVersion: string;
}

export interface CombatLogEncounterEvent extends CombatLogEventBase {
  type: CombatLogEventTypes.ENCOUNTER_START | CombatLogEventTypes.ENCOUNTER_END;
  encounterId: number;
  encounterName: string;
  encounterDifficulty: number;
}

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

export interface SpellCastSuccessEvent extends CombatLogEventBase {
  type: CombatLogEventTypes.SPELL_CAST_SUCCESS;
  sourceGUID: string;
  sourceName: string;
  targetGUID: string;
  targetName: string;
  spellId: number;
  spellName: string;
}

export type CombatLogEvent = CombatLogEventBase | CombatLogVersionEvent | CombatLogEncounterEvent;
