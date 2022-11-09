import { Router, Request, Response } from "express";
import {
	lossSortFunction,
	pointSortFunction,
	winSortFunction,
	threePointsMadeSortFunction,
	blockSortFunction,
	reboundSortFunction,
	assistSortFunction,
	nameSortFunction,
	teamSortFunction,
} from "../utilities/helpers";
import { IPlayer } from "../utilities/interfaces";
import { getAllDBItems } from "../utilities/db";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
	const ERROR_MESSAGE = {
		// #TODO ADD AN ENUM FOR STATUS MESSAGES
		status: "ERROR",
		message: "No matching records were found in the database.",
	};
	let dbItems = await getAllDBItems();
	let dbPlayers = dbItems?.allPlayers;

	//
	// QUERY BY NAME
	if (req.query.name) {
		let param = req.query.name as string;
		let result = dbPlayers?.find((player: IPlayer) => {
			return player.name.toLowerCase() == param.toLowerCase();
		});
		if (result == undefined) {
			res.status(404).json(ERROR_MESSAGE);
		}
		res.status(200).json(result);

		//
		// QUERY BY TEAM
	} else if (req.query.team) {
		let param = req.query.team as string;
		let result = dbPlayers?.filter((player: IPlayer) => {
			return player.team.toLowerCase() == param.toLowerCase();
		});
		if (result == undefined) {
			res.status(404).json(ERROR_MESSAGE);
		}
		res.status(200).json(result);

		//
		// QUERY BY AGE
	} else if (req.query.age) {
		let param = req.query.age as string;
		let result = dbPlayers?.filter((player: IPlayer) => {
			return player.age.toLowerCase() == param.toLowerCase();
		});
		if (result == undefined) {
			res.status(404).json(ERROR_MESSAGE);
		}
		res.status(200).json(result);

		//
		// RETURN ALL PLAYERS
	} else {
		let result = await getAllDBItems();
		res.status(200).json(
			result?.allPlayers.sort((a, b) => {
				if (a.name > b.name) {
					return 1;
				} else {
					return -1;
				}
			})
		);
	}
});

router.get("/topfifty", async (req: Request, res: Response) => {
	// GET ALL ITEMS FROM THE DB
	let dbItems = await getAllDBItems();
	let dbPlayers = dbItems?.allPlayers;
	// SORT BY POINTS AND SLICE TO GET TOP 50. THIS IS THE DEFAULT RESPONSE FOR THIS ROUTE.
	let result = dbPlayers?.sort(pointSortFunction).slice(0, 50)!;
	//
	// CHECK QUERY PARAMS AND FILTER RESULTS ACCORDINGLY
	if (req.query.filter) {
		let query = req.query.filter;
		let filteredResult: IPlayer[] = [];
		switch (query) {
			case "win":
			case "wins":
				filteredResult = result?.sort(winSortFunction).slice(0, 50);
				break;
			case "loss":
			case "losses":
				filteredResult = result?.sort(lossSortFunction).slice(0, 50);
				break;
			case "threePointsMade":
			case "three points":
			case "3 points":
			case "3pts":
				filteredResult = result?.sort(threePointsMadeSortFunction).slice(0, 50);
				break;
			case "assists":
				filteredResult = result?.sort(assistSortFunction).slice(0, 50);
				break;
			case "rebounds":
				filteredResult = result?.sort(reboundSortFunction).slice(0, 50);
				break;
			case "blocks":
				filteredResult = result?.sort(blockSortFunction).slice(0, 50);
				break;
			default:
				break;
		}
		res.json(filteredResult);
	} else {
		res.json(result);
	}
});

router.get("/topten", async (req: Request, res: Response) => {
	// GET ALL ITEMS FROM THE DB
	let dbItems = await getAllDBItems();
	let dbPlayers = dbItems?.allPlayers;
	// SORT BY POINTS AND SLICE TO GET TOP 50. THIS IS THE DEFAULT RESPONSE FOR THIS ROUTE.
	let result = dbPlayers?.sort(pointSortFunction).slice(0, 10)!;
	//
	// CHECK QUERY PARAMS AND FILTER RESULTS ACCORDINGLY
	if (req.query.filter) {
		let query = req.query.filter;
		let filteredResult: IPlayer[] = [];
		switch (query) {
			case "win":
			case "wins":
				filteredResult = result?.sort(winSortFunction);
				break;
			case "loss":
			case "losses":
				filteredResult = result?.sort(lossSortFunction);
				break;
			case "threePointsMade":
			case "three points":
			case "3 points":
			case "3pts":
				filteredResult = result?.sort(threePointsMadeSortFunction);
				break;
			case "assists":
				filteredResult = result?.sort(assistSortFunction);
				break;
			case "rebounds":
				filteredResult = result?.sort(reboundSortFunction);
				break;
			case "blocks":
				filteredResult = result?.sort(blockSortFunction);
				break;
			default:
				break;
		}
		res.json(filteredResult);
	} else {
		res.json(result);
	}
});

module.exports = router;
