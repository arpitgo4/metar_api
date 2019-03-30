
import chalk from 'chalk';
import { promisify } from 'util';
import request, { Request, Response } from 'request';


import { IMetarModel, } from 'Models';

import * as utils from '../utils/utils';
import * as redis_utils from '../utils/redis-utils';

const request_get = promisify(request.get);

export const getMetar = (station_code: string, no_cache: number): Promise<IMetarModel> => {
    // nocahce => 1 // fetch new data and refresh cache

    return request_get({
        url: `https://tgftp.nws.noaa.gov/data/observations/metar/stations/${station_code}.TXT`,
        json: true,
    }, undefined)
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
        };

        return metar_info;
    });
};