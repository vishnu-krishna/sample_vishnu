import chalk from 'chalk';
import { Console } from 'console';

const globalConsole = new Console(process.stderr, process.stdout);

/**
 * Import this file on application startup
 * This will replace the global console by a coloured console
 * so that console.error will be displayed in red for example
 */
class StyledConsole {
    constructor() {
        global.console.log = StyledConsole.log;
        global.console.warn = StyledConsole.warn;
        global.console.error = StyledConsole.error;
    }

    static log(...optionalParams: any[]): void {
        globalConsole.log(chalk.white(...optionalParams));
    }

    static warn(...optionalParams: any[]): void {
        globalConsole.warn(chalk.yellow(...optionalParams));
    }

    static error(...optionalParams: any[]): void {
        globalConsole.error(chalk.red.bold(...optionalParams));
    }
}

const logger = new StyledConsole();
