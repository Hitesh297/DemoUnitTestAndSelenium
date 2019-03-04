import axios from 'axios';

const ROOT_URL = 'http://localhost/BuildTrackerAPI/api/Deployment';

export const FETCH_BUILDS = 'FETCH_BUILDS';

export function fetchBuilds() {
    const url = `${ROOT_URL}`;
    const request = axios.get(url);
    return {
        type: FETCH_BUILDS,
        payload: request
    };

}