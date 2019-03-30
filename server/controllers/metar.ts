
import chalk from 'chalk';
import { promisify } from 'util';
import request, { Request, Response } from 'request';


import { IMetarModel, } from 'Models';

import * as utils from '../utils/utils';
import * as redis_utils from '../utils/redis-utils';
import { CustomError } from 'Interfaces';

const request_get = promisify(request.get);



export const getMetar = (station_code: string, no_cache: string): Promise<IMetarModel> => {
    if (no_cache === '1') {
        return getMetarFromApi(station_code)
        .then(redis_utils.saveMetar);
    }

    return redis_utils.getMetar(station_code)
    .catch((err: CustomError) => {
        return getMetarFromApi(station_code)
        .then(redis_utils.saveMetar);
    });
};


const getMetarFromApi = (station_code: string): Promise<IMetarModel> => {
    return request_get({
        url: `https://tgftp.nws.noaa.gov/data/observations/metar/stations/${station_code}.TXT`,
        json: true,
    }, undefined)
    // @ts-ignore
    .then((res: Response) => {
        const { body, statusCode, } = res;

        if (statusCode !== 200)
            return Promise.reject({
                message: `metar info not found for station code: ${station_code}`
            });

        const info = body.split(' ');
        const metar_info: IMetarModel = {
            last_observation_date: info[0],
            last_observation_time: info[1].split('\n')[0],
            station_code: info[1].split('\n')[1],
            date_time_zulu: info[2],
            report_status: info[3],
            wind_direction_velocity: info[4],
            visibility: info[5],
            sky_visibility: info[6],
            temperature: info[7],
            pressure: info[8],
            timestamp: utils.getUnixTimeStamp(),
        };

        return metar_info;
    });
};