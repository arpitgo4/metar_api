
import chalk from 'chalk';
import { promisify } from 'util';
import request, { Request, Response } from 'request';


import { IMetarModel, } from 'Models';

import * as utils from '../utils/utils';
import * as redis_utils from '../utils/redis-utils';


export const getMetar = (station_code: string, no_cache: number): Promise<IMetarModel> => {
    // nocahce => 1 // fetch new data and refresh cache

    // scode => station_code
    // api => https://tgftp.nws.noaa.gov/data/observations/metar/stations/${scode}.TXT

    return Promise.reject();
};