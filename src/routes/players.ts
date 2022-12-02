import { Router, Request, Response } from "express";
import {
	lossSortFunction,
	pointSortFunction,
	winSortFunction,
	threePointsMadeSortFunction,
	blockSortFunction,
	reboundSortFunction,
	assistsSortFunction,
	nameSortFunction,
	teamSortFunction,
	ageSortFunction,
} from "../utilities/helpers";
import { IPlayer } from "../utilities/interfaces";
import { getAllDBItems } from "../utilities/db";
import { WithId, Document } from "mongodb";
const router = Router();

//
// GET ALL PLAYERS
router.get("/", async (req: Request, res: Response) => {
	const ERROR_MESSAGE = {
		// #TODO ADD AN ENUM FOR STATUS MESSAGES AND TEAM NAMES
		status: "ERROR",
		message: "No matching records were found in the database.",
	};
	let dbItems = await getAllDBItems();
	let dbPlayers = dbItems?.allPlayers;

	//
	// QUERY FILTERS
	//
	// FILTER AND SORT
	// QUERY BY NAME AND SORT BY GIVEN SORT PARAM
	if (req.query.sort && req.query.name) {
		let sortParam = req.query.sort as string;
		let nameParam = req.query.name as string;
		// FILTER BY NAME
		let result = dbPlayers?.filter((player: IPlayer | WithId<Document>) => {
			return player.name.toLowerCase().includes(nameParam.toLowerCase());
		});
		//
		// SORT FILTERED RESULT
		switch (sortParam) {
			case "age":
			case "AGE":
				result?.sort(ageSortFunction);
				break;
			case "wins":
			case "WINS":
			case "Wins":
				result?.sort(winSortFunction);
				break;
			case "TEAM":
			case "team":
				result?.sort(teamSortFunction);
				break;
			case "ASSISTS":
			case "assists":
				result?.sort(assistsSortFunction);
				break;
			case "REBOUNDS":
			case "rebounds":
				result?.sort(reboundSortFunction);
				break;
			case "blocks":
			case "BLOCKS":
				result?.sort(blockSortFunction);
				break;
			case "LOSS":
			case "loss":
			case "losses":
			case "Losses":
			case "Loss":
				result?.sort(lossSortFunction);
				break;
			case "3pts":
			case "3 points":
			case "3points":
			case "Three Points":
			case "threePoints":
				result?.sort(threePointsMadeSortFunction);
				break;

			default:
				break;
		}
		// ERROR CHECK
		if (result == undefined) {
			res.status(404).json(ERROR_MESSAGE);
		}
		// RETURN SORTED RESULTS
		res.status(200).json(result);
	} else if (req.query.sort && req.query.age) {
		let sortParam = req.query.sort as string;
		let ageParam = req.query.age as string;
		// FILTER BY NAME
		let result = dbPlayers?.filter((player: WithId<Document>) => {
			return parseInt(player.age) === parseInt(ageParam);
		});
		//
		// SORT FILTERED RESULT
		switch (sortParam) {
			case "wins":
			case "WINS":
			case "Wins":
				result?.sort(winSortFunction);
				break;
			case "TEAM":
			case "team":
				result?.sort(teamSortFunction);
				break;
			case "ASSISTS":
			case "assists":
				result?.sort(assistsSortFunction);
				break;
			case "REBOUNDS":
			case "rebounds":
				result?.sort(reboundSortFunction);
				break;
			case "blocks":
			case "BLOCKS":
				result?.sort(blockSortFunction);
				break;
			case "LOSS":
			case "loss":
			case "losses":
			case "Losses":
			case "Loss":
				result?.sort(lossSortFunction);
				break;
			case "3pts":
			case "3 points":
			case "3points":
			case "Three Points":
			case "threePoints":
				result?.sort(threePointsMadeSortFunction);
				break;

			default:
				break;
		}
		// ERROR CHECK
		if (result == undefined) {
			res.status(404).json(ERROR_MESSAGE);
		}
		// RETURN SORTED RESULTS
		res.status(200).json(result);
	} else if (req.query.sort && req.query.team) {
		let sortParam = req.query.sort as string;
		let teamParam = req.query.team as string;
		// FILTER BY NAME
		let result = dbPlayers?.filter((player: WithId<Document> | IPlayer) => {
			return player.team?.toLowerCase() == teamParam.toLowerCase();
		});
		//
		// SORT FILTERED RESULT
		switch (sortParam) {
			case "age":
			case "AGE":
				result?.sort(ageSortFunction);
				break;
			case "wins":
			case "WINS":
			case "Wins":
				result?.sort(winSortFunction);
				break;
			case "TEAM":
			case "team":
				result?.sort(teamSortFunction);
				break;
			case "ASSISTS":
			case "assists":
				result?.sort(assistsSortFunction);
				break;
			case "REBOUNDS":
			case "rebounds":
				result?.sort(reboundSortFunction);
				break;
			case "blocks":
			case "BLOCKS":
				result?.sort(blockSortFunction);
				break;
			case "LOSS":
			case "loss":
			case "losses":
			case "Losses":
			case "Loss":
				result?.sort(lossSortFunction);
				break;
			case "3pts":
			case "3 points":
			case "3points":
			case "Three Points":
			case "threePoints":
				result?.sort(threePointsMadeSortFunction);
				break;

			default:
				break;
		}
		// ERROR CHECK
		if (result == undefined) {
			res.status(404).json(ERROR_MESSAGE);
		}
		// RETURN SORTED RESULTS
		res.status(200).json(result);
	}
	// else if(){}
	//
	// FILTER OR SORT
	// FILTER BY NAME
	else if (req.query.name) {
		let param = req.query.name as string;
		let result = dbPlayers?.filter((player: IPlayer | WithId<Document>) => {
			return player.name.toLowerCase().includes(param.toLowerCase());
		});
		if (result == undefined) {
			res.status(404).json(ERROR_MESSAGE);
		}
		res.status(200).json(result);

		//
		// FILTER BY TEAM
	} else if (req.query.team) {
		let param = req.query.team as string;
		let result = dbPlayers?.filter((player: WithId<Document> | IPlayer) => {
			return player.team?.toLowerCase() == param.toLowerCase();
		});
		if (result == undefined) {
			res.status(404).json(ERROR_MESSAGE);
		}
		res.status(200).json(result);

		//
		// FILTER BY AGE
	} else if (req.query.age) {
		let param = req.query.age as string;
		let result = dbPlayers?.filter((player: WithId<Document>) => {
			return player.age?.toLowerCase() == param.toLowerCase();
		});
		if (result == undefined) {
			res.status(404).json(ERROR_MESSAGE);
		}
		res.status(200).json(result);

		//
		// SORT PLAYERS BY THE GIVEN SORT QUERY
	} else if (req.query.sort) {
		let param = req.query.sort as string;
		let result;
		switch (param) {
			case "age":
			case "Age":
			case "AGE":
				result = dbPlayers?.sort(ageSortFunction);
				break;
			case "wins":
			case "Wins":
			case "WINS":
				result = dbPlayers?.sort(winSortFunction);
				break;

			default:
				break;
		}
		if (result == undefined) {
			res.status(404).json(ERROR_MESSAGE);
		}
		res.status(200).json(result);

		//
		// RETURN ALL PLAYERS SORTED BY NAME
	} else {
		let result = await getAllDBItems();
		res.status(200).json(result?.allPlayers?.sort(nameSortFunction));
	}
});

//
// GET TOP FIFTY
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
		let filteredResult: WithId<Document>[] | IPlayer[] = [];
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
				filteredResult = result?.sort(assistsSortFunction).slice(0, 50);
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
		let filteredResult: WithId<Document>[] = [];
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
				filteredResult = result?.sort(assistsSortFunction);
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
