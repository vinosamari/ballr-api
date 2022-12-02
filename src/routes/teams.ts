import { Router, Request, Response } from "express";
import { ITeam } from "../utilities/interfaces";
import { getAllDBItems } from "../utilities/db";
import {
	awaySortFunction,
	homeSortFunction,
	streakSortFunction,
	teamLossSortFunction,
	teamWinSortFunction,
} from "../utilities/helpers";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
	// GET ALL ITEMS FROM DDB
	let result = await getAllDBItems();
	let teams = result?.allTeams;
	if (req.query.filter) {
		let filter = req.query.filter;
		let filteredResult;
		switch (filter) {
			case "win":
			case "wins":
				filteredResult = teams?.sort(teamWinSortFunction);
				break;
			case "loss":
			case "losses":
				filteredResult = teams?.sort(teamLossSortFunction);
				break;
			case "home":
				filteredResult = teams?.sort(homeSortFunction);
				break;
			case "away":
				filteredResult = teams?.sort(awaySortFunction);
				break;
			case "streak":
				filteredResult = teams?.sort(streakSortFunction);
				break;
			default:
				console.log("Here again!");
				break;
		}
		res.json(filteredResult);
	} else {
		res.json(result?.allTeams);
	}
});

module.exports = router;
