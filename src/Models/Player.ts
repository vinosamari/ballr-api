import { ObjectId } from "mongodb";
// 1. Create an interface representing a document in MongoDB.
export class PlayerModel {
	constructor(
		name: string,
		playerURL: string,
		team: string,
		teamURL: string,
		age: string,
		gamesPlayed: string,
		wins: string,
		losses: string,
		minutes: string,
		points: string,
		fieldGoalsMade: string,
		fieldGoalsAttempted: string,
		fieldGoalPercentage: string,
		threePointsMade: string,
		threePointsAttempted: string,
		threePointPercentage: string,
		freethrowsMade: string,
		freeThrowsAttempted: string,
		freeThrowPercentage: string,
		offRebounds: string,
		defRebounds: string,
		rebounds: string,
		assists: string,
		turnovers: string,
		steals: string,
		blocks: string,
		personalFouls: string,
		fantasyPoints: string,
		doubleDoubles: string,
		tripleDoubles: string,
		plusMinus: string,
		id?: ObjectId
	) {}
}
