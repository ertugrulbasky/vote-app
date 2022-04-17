import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import { Routes, Route } from "react-router-dom";
import Questions from "./containers/questions";
import CreateQuestion from "./containers/createQuestion";
import DetailQuestion from './containers/detailQuestion';
import rootReducer from './reducers';
import rootSaga from '../src/sagas/question';
import createSagaMiddleware from 'redux-saga'
import './index.css';
import { BrowserRouter } from "react-router-dom";


const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <Provider store={ store }>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Questions />}></Route>
        <Route path="/create-question" element={<CreateQuestion />}></Route>
        <Route path="/detail-question/:questionId" element={<DetailQuestion />}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);