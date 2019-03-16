import { FETCH_COMPARE } from '../actions/index';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_COMPARE:
            console.log("reducer", action.payload.data)
            return action.payload.data;
    }
    return state;
}