import { ObjectId } from "mongodb";
// 1. Create an interface representing a document in MongoDB.
export class TeamModel {
	constructor(
		name: string,
		url: string,
		wins: string,
		losses: string,
		home: string,
		away: string,
		pointsPerGame: string,
		opponentsPointsPerGame: string,
		streak: string,
		lastTenGames: string,
		winPercentage: string,
		id?: ObjectId
	) {}
}
