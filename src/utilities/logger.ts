const chalk = require("chalk");

const getCurrentTimestamp = () => new Date().toLocaleString();

export default class LOGGER {
	static SUCCESS = (namespace: string, args: any) => {
		console.log(
			chalk.green(`[📑:SUCCESS:] [${namespace}] [${getCurrentTimestamp()}] >>`),
			typeof args == "string" ? chalk.bgGreen(args) : args
		);
	};
	static INFO = (namespace: string, args: any) => {
		console.log(
			chalk.blue(`[📑:INFO:] [${namespace}] [${getCurrentTimestamp()}] >>`),
			typeof args == "string" ? chalk.bgBlue(args) : args
		);
	};
	static ERROR = (namespace: string, args: any) => {
		console.debug(
			chalk.red(`[❌:ERROR:] [${namespace}] [${getCurrentTimestamp()}] >>`),
			typeof args == "string" ? chalk.bgRed(args) : args
		);
	};
	static WARN = (namespace: string, args: any) => {
		console.debug(
			chalk.yellow(
				`[🟠:WARNING:] [${namespace}] [${getCurrentTimestamp()}] >>`
			),
			typeof args == "string" ? chalk.bgYellow(args) : args
		);
	};
}
