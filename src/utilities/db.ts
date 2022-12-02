import { TeamModel } from "../Models/Team";
import { PlayerModel } from "../Models/Player";
import { SortOperatorType, TeamOrPlayerType } from "./types";
import LOGGER from "./logger";
import { MongoClient, Collection, Document, WithId } from "mongodb";
import { IPlayer, ITeam } from "./interfaces";
require("dotenv").config();

// FOR LOGGING
let namespace = "DB";

//
// CONNECT TO DATABASE
export const dbCollections: { teams?: Collection; players?: Collection } = {};
export async function connectToDB() {
	// CONNECTION URIs
	const productionURI = `mongodb+srv://${process.env.MONGODB_DB_USERNAME}:${process.env.MONGODB_DB_PASS}@${process.env.MONGODB_DB_PROD_DB_NAME}.q6zs1bc.mongodb.net/ballrDb?retryWrites=true&w=majority`;
	//
	const devURI = `mongodb://${process.env.MONGO_DB_DEV_HOST}:${process.env.MONGODB_DB_PORT}/${process.env.MONGODB_DB_DEV_DB_NAME}`;

	//
	// Create a new MongoClient
	const client: MongoClient =
		process.env.ENV == "development"
			? new MongoClient(devURI)
			: new MongoClient(productionURI);
	//
	try {
		// Establish and verify connection
		await client.connect();
		let dbName =
			process.env.ENV == "development"
				? process.env.MONGODB_DB_DEV_DB_NAME
				: process.env.MONGODB_DB_PROD_DB_NAME;
		const db = await client.db(dbName);
		dbCollections.teams = db.collection("teams");
		dbCollections.players = db.collection("players");
		LOGGER.SUCCESS(namespace, `Connected successfully to ${dbName}!`);
	} catch (e) {
		LOGGER.ERROR(namespace, e as Error);
	}
}

// GET ALL DATABASE ITEMS
export async function getAllDBItems() {
	LOGGER.INFO(namespace, "Fetching database documents..");
	try {
		let allTeams = await dbCollections.teams?.find({}).toArray();
		let allPlayers = await dbCollections.players?.find({}).toArray();
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
			let result = await dbCollections.teams?.findOne({ name: query });
			return { result };
		} else {
			let result = await dbCollections.players?.findOne({ name: query });
			return { result };
		}
	} catch (error) {
		LOGGER.ERROR(namespace, error);
	}
}

// CREATE SINGLE DATABASE ITEM
export async function createOneDBItem(
	item: WithId<Document> | ITeam | IPlayer,
	addOperator: SortOperatorType
) {
	LOGGER.INFO(namespace, "Creating new document..");
	try {
		if (addOperator == "team") {
			dbCollections.teams?.insertOne(item);
			LOGGER.INFO(namespace, `Added ${item.name} to db..`);
		} else {
			dbCollections.players?.insertOne(item);
			LOGGER.INFO(namespace, `Added ${item.name} to db..`);
		}
		return;
	} catch (error) {
		LOGGER.ERROR(namespace, error);
	}
}

// CREATE MULTIPLE DATABASE ITEMS
export async function createMultipleDBItems(
	item: [WithId<Document>] | ITeam[] | IPlayer[],
	addOperator: SortOperatorType
) {
	LOGGER.INFO(namespace, "Creating new document..");
	try {
		if (addOperator == "team") {
			dbCollections.teams?.insertMany(item);
			LOGGER.INFO(namespace, `Added new batch of teams to db..`);
		} else {
			dbCollections.players?.insertMany(item);
			LOGGER.INFO(namespace, `Added new batch of players to db..`);
		}
		return;
	} catch (error) {
		LOGGER.ERROR(namespace, error);
	}
}

// // UPDATE DATABASE ITEM
// export async function updateDBItem() {}

// // DELETE DATABASE ITEM
// export async function deleteDBItem() {}
