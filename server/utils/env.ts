
import chalk from 'chalk';
import { IEnv } from 'Interfaces';

const environment_dependencies = [
    'SERVER_PORT',
    'REDIS_HOST',
    'API_GATEWAY',
];

let all_env_vars_passed = true;
console.log(chalk.red.bold(`\n########################### Environment Variables ###########################`));
// @ts-ignore
const env: IEnv = environment_dependencies.reduce((acc, key) => {
    let value = process.env[key];

    if (!value) {
        all_env_vars_passed = false;
        value = '<not specified>';
    }

    console.log(chalk.red.bold(`${key}: ${value}`));

    acc[key] = value;

    return acc;
}, {});
console.log(chalk.red.bold(`#############################################################################\n`));

if (!all_env_vars_passed) {
    console.log(chalk.red.bold(`[env] Error in Environment Variables`));
    process.exit(1);
}


export default env;
