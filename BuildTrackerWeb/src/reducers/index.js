import { combineReducers } from 'redux';
import BuildReducer from './reducer_builds';
import CompareReducer from './reducer_serverCompare';

const rootReducer = combineReducers(
    {
        builds: BuildReducer,
        serverCompare: CompareReducer
    }
);

export default rootReducer;