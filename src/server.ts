const express = require("express");
const app = express();
import { Request, Response } from "express";
const { CONFIG } = require("./config/config");
const PORT = CONFIG.port;
const teams = require("./routes/teams");
const players = require("./routes/players");
import { connectToDB } from "./utilities/db";
import { pushPlayersToDb, pushTeamsToDb } from "./utilities/helpers";
import LOGGER from "./utilities/logger";

app.use("/teams", teams);
app.use("/players", players);

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

app.get("/updatedb", (req: Request, res: Response) => {
	pushTeamsToDb();
	pushPlayersToDb();
	res.json({
		status: "SUCCESS",
		message: "Pushed fresh content to db",
	});
});

app.listen(PORT, async () => {
	connectToDB();
	LOGGER.SUCCESS("SERVER", `NOT LISTENING ON PORT ${PORT}...`);
});
