

export interface IMetarModel {
    last_observation_date: string;
    last_observation_time: string;
    station_code: string;
    date_time_zulu: string;
    report_status: string;
    wind_direction_velocity: string;
    visibility: string;
    sky_visibility: string;
    temperature: string;
    pressure: string;
}