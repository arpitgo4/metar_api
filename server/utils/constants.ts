
const { API_GATEWAY, REDIS_METAR_EXPIRY, } = process.env;

const METAR_REDIS_HASH = `metar_info`;
const METAR_REDIS_EXPIRY_TIME = parseInt(REDIS_METAR_EXPIRY) * 60;  // minutes


export {
    METAR_REDIS_HASH,
    METAR_REDIS_EXPIRY_TIME,
};
