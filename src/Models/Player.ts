import { Schema, model } from "mongoose";
import { IPlayer } from "src/utilities/interfaces";

// 1. Create an interface representing a document in MongoDB.
// 2. Create a Schema corresponding to the document interface.
const playerSchema = new Schema<IPlayer>({
	name: { type: String, required: true },
	playerURL: { type: String, required: true },
	team: { type: String, required: true },
	teamURL: { type: String, required: true },
	age: { type: String, required: true },
	gamesPlayed: { type: String, required: true },
	wins: { type: String, required: true },
	losses: { type: String, required: true },
	minutes: { type: String, required: true },
	points: { type: String, required: true },
	fieldGoalsMade: { type: String },
	fieldGoalsAttempted: { type: String },
	fieldGoalPercentage: { type: String },
	threePointsMade: { type: String },
	threePointsAttempted: { type: String },
	threePointPercentage: { type: String },
	freethrowsMade: { type: String, required: true },
	freeThrowsAttempted: { type: String, required: true },
	freeThrowPercentage: { type: String, required: true },
	offRebounds: { type: String },
	defRebounds: { type: String },
	rebounds: { type: String },
	assists: { type: String },
	turnovers: { type: String },
	steals: { type: String },
	blocks: { type: String },
	personalFouls: { type: String },
	fantasyPoints: { type: String, required: true },
	doubleDoubles: { type: String, required: true },
	tripleDoubles: { type: String, required: true },
	plusMinus: { type: String, required: true },
});

// 3. Create a Model.
export const PlayerModel = model<IPlayer>("Player", playerSchema);
