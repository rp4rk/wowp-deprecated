import fs from "fs";
import { parseLog } from "./lib/parser";

const results = fs.createWriteStream("./results.json");

results.on("open", () => results.write("[\n"));
results.on("close", () => results.write("]\n"));

parseLog("./WoWCombatLogBig.txt").subscribe(event => {
  results.write("  " + JSON.stringify(event) + ",\n");
});
