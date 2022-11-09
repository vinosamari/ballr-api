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
		path.resolve(__dirname, "../completePlayerStats09_11_2022.json"),
		"utf8",
		async (error, data) => {
			let players: [IPlayer] = JSON.parse(data);
			for (const player of players) {
				await createDBItem(player, "player");
			}
		}
	);
}

//
// DATABASE SORT FUNCTIONS

export function nameSortFunction(a: IPlayer, b: IPlayer): number {
	if (a.name < b.name) {
		return -1;
	} else {
		return 1;
	}
}

export function teamSortFunction(a: IPlayer, b: IPlayer): number {
	// ASCENDING ORDER
	if (a.team < b.team) {
		return -1;
	} else {
		return 1;
	}
}

export function winSortFunction(a: IPlayer, b: IPlayer): number {
	return +b.wins - +a.wins;
}

export function lossSortFunction(a: IPlayer, b: IPlayer): number {
	if (+a.losses < +b.losses) {
		return 1;
	} else {
		return -1;
	}
}

export function assistSortFunction(a: IPlayer, b: IPlayer): number {
	if (+b.assists < +a.assists) {
		return -1;
	} else {
		return 1;
	}
}

export function blockSortFunction(a: IPlayer, b: IPlayer): number {
	if (+a.blocks < +b.blocks) {
		return 1;
	} else {
		return -1;
	}
}

export function reboundSortFunction(a: IPlayer, b: IPlayer): number {
	if (+a.rebounds < +b.rebounds) {
		return 1;
	} else {
		return -1;
	}
}

export function threePointsMadeSortFunction(a: IPlayer, b: IPlayer): number {
	return +b.threePointsMade - +a.threePointsMade;
}

export function pointSortFunction(a: IPlayer, b: IPlayer): number {
	return +b.points - +a.points;
}
