const app = require("express")();
import { Request, Response } from "express";
const { CONFIG } = require("./config/config");
const PORT = CONFIG.port;
const teams = require("./routes/teams");

app.use("/teams", teams);

app.get("/", (req: Request, res: Response) => {
	res.send("Here");
});

app.listen(PORT, () => {
	console.log(`Not listening on port ${PORT}`);
});
