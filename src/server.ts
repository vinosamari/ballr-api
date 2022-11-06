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
		"teams/": "LIST ALL TEAMS IN THE LEAGUE",
		"teams/:id": "GET INFO FOR TEAM WITH ID=id",
		"teams/:id/schedule": "GET MATCHUP INFO FOR TEAM WITH ID=id",
		"teams/:id/roster": "GET ALL PLAYERS FOR A TEAM WITH ID=id",
		"players/": "GET ALL PLAYERS IN THE LEAGUE",
		"players/topfifty": "GET THE TOP 50 PLAYERS IN THE LEAGUE",
		"players/:id": "GET A PLAYER WITH ID=id",
		"schedule/": "GET MATCHUPS FOR THE FOLLOWING WEEK (INCLUDING TODAY)",
		"topten/players": "LIST TOP TEN PLAYERS",
		"topten/teams": "LIST TOP TEN TEAMS",
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
