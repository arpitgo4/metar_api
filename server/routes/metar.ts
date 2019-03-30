

import { Router, NextFunction, Response, Request, } from 'express';
import { JWTRequest, CustomError } from 'Interfaces';

import { metarCtrl, } from '../controllers';
import { IMetarModel, } from 'Models';


const router = Router();


router.get('/ping', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        data: 'pong'
    });
});

router.get('/info', (req: Request, res: Response, next: NextFunction) => {
    const { scode, nocache, } = req.query;

    metarCtrl.getMetar(scode, nocache)
    .then((metar: IMetarModel) => {
        res.status(200).json({
            data: {
                type: 'metar',
                id: metar.station_code,
                attributes: metar,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});

export default router;
