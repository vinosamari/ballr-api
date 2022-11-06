import { Router, Request, Response } from "express";
import { getAllDBItems } from "../utilities/db";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
	console.log(req.query);

	let result = await getAllDBItems();
	res.json(result?.allPlayers);
});

module.exports = router;
