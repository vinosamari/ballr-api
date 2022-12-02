const path = require("path");
import * as fs from "fs";
import { createMultipleDBItems, createOneDBItem } from "./db";
import { WithId, Document } from "mongodb";
import { IPlayer, ITeam } from "./interfaces";

export function pushTeamsToDb() {
	fs.readFile(
		path.resolve(__dirname, "../team_run_results_09_11_2022.json"),
		"utf8",
		async (error, data) => {
			let teams: [WithId<Document>] | ITeam[] = JSON.parse(data)["teams"];
			await createMultipleDBItems(teams, "team");
			for (const team of teams) {
				console.log(team.name);
			}
		}
	);
}

export function pushPlayersToDb() {
	fs.readFile(
		path.resolve(__dirname, "../completePlayerStats09_11_2022.json"),
		"utf8",
		async (error, data) => {
			let players: [WithId<Document>] | IPlayer[] = JSON.parse(data);
			// #TODO THROTTLE THE ADDITION OF THE PLAYERS TO DATABASE SO MONGO DOESN'T KEEP CLOSING THE CONNECTION
			await createMultipleDBItems(players, "player");
			for (const player of players) {
				console.log(player.name);
			}
		}
	);
}

//
// MIDDLEWARE FOR DB HOUSEKEEPING
// async (req: Request, res: Response, next: NextFunction) => {
// 	//
// 	// CHECK IF COLLECTION EXIST AND DROP THEM
// 	const collections = await connection.db.listCollections().toArray();
// 	if (players !== undefined) {
// 		collections.forEach(async (collection) => {
// 			if (collection.name == "players") {
// 				await connection.db.dropCollection("players");
// 			}
// 		});
// 		LOGGER.SUCCESS("SERVER", "DROPPED COLLECTIONS. MOVING ON...");
// 		next();
// 	} else {
// 		LOGGER.INFO("SERVER", "NO COLLECTIONS FOUND. MOVING ON...");
// 		next();
// 	}
// },

//
// DATABASE SORT HELPER FUNCTIONS

export function nameSortFunction(
	a: WithId<Document> | IPlayer | ITeam,
	b: WithId<Document> | IPlayer | ITeam
): number {
	if (a.name < b.name) {
		return -1;
	} else {
		return 1;
	}
}

export function teamSortFunction(
	a: WithId<Document> | IPlayer,
	b: WithId<Document> | IPlayer
): number {
	// ASCENDING ORDER
	if (a.team < b.team) {
		return -1;
	} else {
		return 1;
	}
}

export function winSortFunction(
	a: WithId<Document> | IPlayer | ITeam,
	b: WithId<Document> | IPlayer | ITeam
): number {
	return +b.wins - +a.wins;
}

export function teamWinSortFunction(
	a: WithId<Document> | IPlayer | ITeam,
	b: WithId<Document> | IPlayer | ITeam
): number {
	return +b.wins - +a.wins;
}

export function lossSortFunction(
	a: WithId<Document> | IPlayer | ITeam,
	b: WithId<Document> | IPlayer | ITeam
): number {
	if (+a.losses < +b.losses) {
		return 1;
	} else {
		return -1;
	}
}

export function teamLossSortFunction(
	a: WithId<Document> | IPlayer | ITeam,
	b: WithId<Document> | IPlayer | ITeam
): number {
	if (+a.losses < +b.losses) {
		return 1;
	} else {
		return -1;
	}
}

export function assistsSortFunction(
	a: WithId<Document> | IPlayer,
	b: WithId<Document> | IPlayer
): number {
	if (+b.assists < +a.assists) {
		return -1;
	} else {
		return 1;
	}
}

export function ageSortFunction(
	a: WithId<Document> | IPlayer,
	b: WithId<Document> | IPlayer
): number {
	if (+b.age < +a.age) {
		return -1;
	} else {
		return 1;
	}
}

export function blockSortFunction(
	a: WithId<Document> | IPlayer,
	b: WithId<Document> | IPlayer
): number {
	if (+a.blocks < +b.blocks) {
		return 1;
	} else {
		return -1;
	}
}

export function reboundSortFunction(
	a: WithId<Document> | IPlayer,
	b: WithId<Document> | IPlayer
): number {
	if (+a.rebounds < +b.rebounds) {
		return 1;
	} else {
		return -1;
	}
}

export function threePointsMadeSortFunction(
	a: WithId<Document> | IPlayer,
	b: WithId<Document> | IPlayer
): number {
	return +b.threePointsMade - +a.threePointsMade;
}

export function pointSortFunction(
	a: WithId<Document> | IPlayer,
	b: WithId<Document> | IPlayer
): number {
	return +b.points - +a.points;
}

export function homeSortFunction(
	a: WithId<Document> | ITeam,
	b: WithId<Document> | ITeam
): number {
	if (b.home > a.home) {
		return -1;
	} else {
		return 1;
	}
}

export function awaySortFunction(
	a: WithId<Document> | ITeam,
	b: WithId<Document> | ITeam
): number {
	if (b.away > a.away) {
		return -1;
	} else {
		return 1;
	}
}

export function streakSortFunction(
	a: WithId<Document> | ITeam,
	b: WithId<Document> | ITeam
): number {
	if (b.streak > a.streak) {
		return -1;
	} else {
		return 1;
	}
}
