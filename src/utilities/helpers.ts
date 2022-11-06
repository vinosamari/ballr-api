// PARSE THE JSON FILES
const path = require("path");
import * as fs from "fs";
import { createDBItem } from "./db";
import { IPlayer, ITeam } from "./interfaces";

export function pushTeamsToDb() {
	fs.readFile(
		path.resolve(__dirname, "../Teams_run_results.json"),
		"utf8",
		async (error, data) => {
			let teams: [ITeam] = JSON.parse(data)["teams"];
			for (const team of teams) {
				await createDBItem(team, "team");
			}
		}
	);
}

export function pushPlayersToDb() {
	fs.readFile(
		path.resolve(__dirname, "../completePlayerStats1.json"),
		"utf8",
		async (error, data) => {
			let players: [IPlayer] = JSON.parse(data);
			for (const player of players) {
				await createDBItem(player, "player");
			}
		}
	);
}
