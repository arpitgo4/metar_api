

import { Router, NextFunction, Response, Request, } from 'express';
import { JWTRequest, CustomError } from 'Interfaces';

import { productCtrl, } from '../controllers';
import { IProductModel, } from 'Models';


const router = Router();


router.get('/ping', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        data: 'pong'
    });
});

router.get('/info', (req: Request, res: Response, next: NextFunction) => {
    const { scode, nocache, } = req.query;

    // nocahce => 1 // fetch new data and refresh cache

    // scode => station_code
    // api => https://tgftp.nws.noaa.gov/data/observations/metar/stations/${scode}.TXT
});

export default router;
