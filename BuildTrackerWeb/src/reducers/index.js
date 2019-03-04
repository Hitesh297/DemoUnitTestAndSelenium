import { combineReducers } from 'redux';
import BuildReducer from './reducer_builds';

const rootReducer = combineReducers(
    {
        builds: BuildReducer
    }
);

export default rootReducer;