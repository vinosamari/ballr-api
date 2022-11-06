import { Router, Request, Response } from "express";
import { getAllDBItems } from "../utilities/db";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
	let result = await getAllDBItems();
	res.json(result?.allPlayers);
});

module.exports = router;
