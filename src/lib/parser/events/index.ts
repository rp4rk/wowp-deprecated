import * as CombatLogMetaEvents from "./meta";
import * as CombatLogActionEvents from "./action";

export default {
  ...CombatLogMetaEvents,
  ...CombatLogActionEvents
};
