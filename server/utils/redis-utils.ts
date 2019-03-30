
import chalk from 'chalk';

import { redisClient } from '../config';
import { IMetarModel } from 'Models';

import { METAR_REDIS_HASH, METAR_REDIS_EXPIRY_TIME, } from './constants';
import { CustomError } from 'Interfaces';
import * as utils from './utils';



export const saveMetar = (metar: IMetarModel): Promise<IMetarModel> => {
    const { station_code, } = metar;
    return redisClient.hset(METAR_REDIS_HASH, station_code, JSON.stringify(metar))
    .then(() => metar)
    .catch((err: CustomError) => {
        console.log(chalk.red(`[redis] Error saving metar info: ${err.message}`));

        return Promise.reject(err);
    });
};

export const getMetar = (station_code: string): Promise<IMetarModel> => {
    return redisClient.hget(METAR_REDIS_HASH, station_code)
    .then((metar_string: string) => {
        if (!metar_string)
            return Promise.reject({ message: `metar info for ${station_code} not found!` });

        const metar: IMetarModel = JSON.parse(metar_string);
        const { timestamp, } = metar;

        if (timestamp + METAR_REDIS_EXPIRY_TIME < utils.getUnixTimeStamp())
            return Promise.reject({ message: `metar info in redis expired!` });

        return metar;
    })
    .catch((err: CustomError) => {
        console.log(chalk.red(`[redis] Error getting metar info: ${err.message}`));

        return Promise.reject(err);
    });
};

export const flushAll = (): void => {
    return redisClient.flushall()
    .then(() => {
        console.log(chalk.red(`[redis] All data flushed!`));
    });
};
