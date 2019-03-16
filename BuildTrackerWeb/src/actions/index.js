import axios from 'axios';

const ROOT_URL = 'http://localhost/BuildTrackerAPI/api/Deployment';

export const FETCH_BUILDS = 'FETCH_BUILDS';
export const FETCH_COMPARE = 'FETCH_COMPARE';

export function fetchBuilds() {
    const url = `${ROOT_URL}`;
    const request = axios.get(url);
    return {
        type: FETCH_BUILDS,
        payload: request
    };

}

export function fetchServerCompare(server1,server2) {
    const url = `${ROOT_URL}/GetCompare/${server1}/${server2}`;
    const request = axios.get(url);
    return {
        type: FETCH_COMPARE,
        payload: request
    };

}