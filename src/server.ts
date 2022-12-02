const express = require("express");
const app = express();
import { connection } from "mongoose";
import { Request, Response, NextFunction } from "express";
const { CONFIG } = require("./config/config");
const PORT = CONFIG.port;
// ROUTES
const teams = require("./routes/teams");
const players = require("./routes/players");
// UTILITIES AND HELPER FUNCTIONS
import { connectToDB, getAllDBItems } from "./utilities/db";
import { pushTeamsToDb, pushPlayersToDb } from "./utilities/helpers";
import LOGGER from "./utilities/logger";

// EXPRESS ROUTE MAPPING
app.use("/teams", teams);
app.use("/players", players);

//
// HOME ROUTE. 'LANDING PAGE'
app.get("/", (req: Request, res: Response) => {
	let allRoutes = {
		//
		// TEAM ROUTES
		"teams/": "LIST ALL TEAMS IN THE LEAGUE",
		"teams/?name=<teamName>": "GET TEAM WITH NAME=teamName e.g 'Atlanta Hawks'",
		"teams/?name=<teamName>/schedule":
			"GET GAMES CALENDAR FOR TEAM WITH NAME=teamName e.g 'Boston Celtics'",
		"teams/?wins=<numberOfWins>":
			"GET TEAM OR TEAMS WITH WINS=numberOfWins e.g '4'",
		"teams/?losses=<numberOfLosses>":
			"GET TEAM OR TEAMS WITH WINS=numberOfLosses e.g '1'",
		"teams/?name=<teamName>/roster":
			"GET ALL PLAYERS FOR A TEAM WITH NAME=teamName e.g 'Brooklyn Nets'",
		"teams/?short=<teamShort>/roster":
			"GET ALL PLAYERS FOR A TEAM WITH SHORT_NAME=teamShort e.g 'BKN'",
		"teams/topten": "LIST THE TOP TEN TEAMS IN THE LEAGUE",
		"teams/topten/?filter=<teamStats>":
			"LIST THE TOP TEN TEAMS IN THE LEAGUE ORDERED BY teamStats. e.g 'wins, losses'",
		//
		// PLAYER ROUTES
		"players/": "GET ALL PLAYERS IN THE LEAGUE",
		"players/?name=<playerName>": "GET A PLAYER WITH NAME=playerName",
		"players/?age=<playerAge>": "GET A PLAYER (OR PLAYERS) WITH AGE=playerAge",
		"players/?team=<playerTeam>":
			"GET A PLAYER (OR PLAYERS) WITH TEAM=playerTeam",
		"players/topten": "LIST THE TOP TEN PLAYERS IN THE LEAGUE",
		"players/topten/?filter=<playerStats>":
			"LIST THE TOP TEN PLAYERS IN THE LEAGUE ORDERED BY playerStats. e.g 'wins, losses'",
		"players/topfifty": "LIST THE TOP FIFTY PLAYERS IN THE LEAGUE",
		"schedule/": "GET LEAGUE MATCHUPS FOR THE FOLLOWING WEEK (INCLUDING TODAY)",
	};
	res.json(allRoutes);
});

// THESE ROUTES MANUALLY UPDATE THE DATABASE WITH THE DATA FROM THE players AND teams SCRAPED DATA JSON FILES
// #TODO MAKE THE ROUTES POST AND PARRY THE DATA SENT TO THEM (OR IT) TO THE APPROPRIATE COLLECTION IN THE DATABASE
//
// UPDATE PLAYERS

app.post(
	"/update-players",

	(req: Request, res: Response) => {
		pushPlayersToDb();
		res.json({
			status: "SUCCESS",
			message: "Pushed new players content to db",
		});
	}
);

//
// UPDATE TEAMS

app.post(
	"/update-teams",
	//
	// MIDDLEWARE FOR DB HOUSEKEEPING
	// async (req: Request, res: Response, next: NextFunction) => {
	// 	//
	// 	// CHECK IF COLLECTIONS EXIST AND DROP THEM
	// 	const collections = await connection.db.listCollections().toArray();
	// 	if (teams !== undefined) {
	// 		collections.forEach(async (collection) => {
	// 			if (collection.name == "teams") {
	// 				await connection.db.dropCollection("teams");
	// 			}
	// 		});
	// 		LOGGER.SUCCESS("SERVER", "DROPPED COLLECTIONS. MOVING ON...");
	// 		next();
	// 	} else {
	// 		LOGGER.INFO("SERVER", "NO COLLECTIONS FOUND. MOVING ON...");
	// 		next();
	// 	}
	// },
	(req: Request, res: Response) => {
		pushTeamsToDb();
		res.json({
			status: "SUCCESS",
			message: "Pushed new teams info to db",
		});
	}
);

app.listen(PORT, async () => {
	connectToDB();
	LOGGER.SUCCESS("SERVER", `NOT LISTENING ON PORT ${PORT}...`);
});
