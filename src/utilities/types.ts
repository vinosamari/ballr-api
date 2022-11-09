import { ITeam, IPlayer } from "./interfaces";

export type TeamResponseDataType = {
	data: ITeam[];
};

export type PlayerResponseDataType = {
	data: IPlayer[];
};

export type TeamOrPlayerArray = [ITeam | IPlayer];
export type TeamOrPlayerType = ITeam | IPlayer;
export type SortOperatorType = "team" | "player";
