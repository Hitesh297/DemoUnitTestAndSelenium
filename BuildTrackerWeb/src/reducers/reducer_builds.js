import { FETCH_BUILDS } from '../actions/index';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_BUILDS:
            return action.payload.data;
    }
    return state;
}