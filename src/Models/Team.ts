import { Schema, model } from "mongoose";
import { ITeam } from "src/utilities/interfaces";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const teamSchema = new Schema<ITeam>({
	name: { type: String, required: true },
	url: { type: String, required: true },
	wins: { type: String, required: true },
	losses: { type: String, required: true },
	home: { type: String, required: true },
	away: { type: String, required: true },
	pointsPerGame: { type: String, required: true },
	opponentsPointsPerGame: { type: String, required: true },
	streak: { type: String, required: true },
	lastTenGames: { type: String, required: true },
	winPercentage: { type: String, required: true },
});

// 3. Create a Model.
export const TeamModel = model<ITeam>("Team", teamSchema);
