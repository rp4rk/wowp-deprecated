import fs from "fs";
import { parseLog } from "./lib/parser";
import {} from "rxjs";

const results = fs.createWriteStream("./results.json");

parseLog("./WoWCombatLog.txt");
