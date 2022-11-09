import { TeamModel } from "../Models/Team";
import { PlayerModel } from "../Models/Player";
import { connect } from "mongoose";
import { TeamOrPlayerArray, SortOperatorType, TeamOrPlayerType } from "./types";
import LOGGER from "./logger";
import { IPlayer, ITeam } from "./interfaces";
require("dotenv").config();

let namespace = "DB";
// CONNECT TO DATABASE
export async function connectToDB() {
	LOGGER.INFO(namespace, "Connecting to db..");
	try {
		if (process.env.ENV == "development") {
			await connect(
				`mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGODB_DB_PORT}/${process.env.MONGODB_DB_NAME}`
			);
		} else {
			await connect(
				`mongodb+srv://sapwavino:blackbeat@ballr-api.q6zs1bc.mongodb.net/ballrDb?retryWrites=true&w=majority`
			);
		}
		LOGGER.INFO(
			namespace,
			`Connected to ${
				process.env.ENV == "development"
					? "testDb"
					: process.env.MONGODB_DB_NAME
			}!`
		);
	} catch (error) {
		LOGGER.ERROR(namespace, error);
	}
}

// GET ALL DATABASE ITEMS
export async function getAllDBItems() {
	LOGGER.INFO(namespace, "Fetching database documents..");
	try {
		let allTeams = await TeamModel.find();
		let allPlayers = await PlayerModel.find();
		return { allTeams, allPlayers };
	} catch (error) {
		LOGGER.ERROR(namespace, error);
	}
}
export async function getOneDBItem(
	query: string,
	SortOperator: SortOperatorType
) {
	LOGGER.INFO(namespace, "Fetching database documents..");
	try {
		if (SortOperator == "team") {
			let result = await TeamModel.find({ name: query });
			return { result };
		} else {
			let result = await PlayerModel.find({ name: query });
			return { result };
		}
	} catch (error) {
		LOGGER.ERROR(namespace, error);
	}
}

// CREATE DATABASE ITEM
export async function createDBItem(
	item: TeamOrPlayerType,
	addOperator: SortOperatorType
) {
	LOGGER.INFO(namespace, "Creating new document..");
	try {
		if (addOperator == "team") {
			TeamModel.create(item);
			LOGGER.INFO(namespace, `Added ${item.name} to db..`);
		} else {
			PlayerModel.create(item);
			LOGGER.INFO(namespace, `Added ${item.name} to db..`);
		}
		return;
	} catch (error) {
		LOGGER.ERROR(namespace, error);
	}
}

// UPDATE DATABASE ITEM
export async function updateDBItem() {}

// DELETE DATABASE ITEM
export async function deleteDBItem() {}
