import axios from "axios";
const { LOGGER } = require("./logger");

let namespace = "API CALLS";

type RandomContentData = {
	id: number;
	email: string;
	first_name: string;
};

type ContentResponse = {
	data: RandomContentData[];
};
// GET RANDOM CONTENT
const url: string = "https://reqres.in/api/users";

export async function getContent() {
	LOGGER.INFO(namespace, "Getting random content...");
	let { data } = await axios.get<ContentResponse>(url);
	LOGGER.INFO(namespace, "Getting random content...");
	return data;
}
