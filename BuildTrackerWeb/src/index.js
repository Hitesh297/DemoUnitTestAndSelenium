import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import BuildDisplay from './Containers/BuildDisplay';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


class App extends Component {
    render() {
        return (
            
            <BuildDisplay />
            );
    }
}
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>
    , document.getElementById("index"));