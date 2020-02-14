import fs from "fs";
import { parseLog } from "./lib/parser";

const results = fs.createWriteStream("./results.json");

parseLog("./WoWCombatLog.txt").subscribe(e => {
  results.write(JSON.stringify(e) + "\n");
});
