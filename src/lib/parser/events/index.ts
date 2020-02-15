import * as CombatLogActionEvents from "./action";
import { default as CombatLogBaseEvent } from "./base";
import * as CombatLogMetaEvents from "./meta";

export default {
  CombatLogBaseEvent,
  ...CombatLogMetaEvents,
  ...CombatLogActionEvents
};
