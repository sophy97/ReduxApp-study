import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// 리덕스 Provider 추가
import { Provider } from 'react-redux';
// store로 연결해야 함, 
//store만들기 위한 createStore(리덕스기본내용) 추가
// 권장되지는 않음. 툴킷 쓰라함 (툴킷 작업폴더 따로 나중에 생성함)

// +미들웨어추가1
import { createStore, applyMiddleware } from 'redux';

// store에 추가할 counter state와 action
// import counter from './modules/counter';
// >> rootReducer를 통해 한번에 묶어서 사용가능
import rootReducer, { rootSaga } from './modules';

// 미들웨어를 작성 및 설치 후 추가
// (작성) import loggerMiddleware from './lib/loggerMiddleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// ++ Redux-Saga는 미들웨어를 직접 생성해서(아래 create어쩌구) 연결해야 한다!
import createSagaMiddleware from 'redux-saga';
// ++ saga 미들웨어 생성 > 이후 apply안에 역시 추가
const sagaMiddleware = createSagaMiddleware();


// createStore를 이용해 store 생성
// + 미들웨어추가2 (생성해둔loggerMiddleware)
const store = createStore(rootReducer, applyMiddleware(logger, thunk, sagaMiddleware));
// ++ saga만... 미들웨어 추가 후 실행코드
sagaMiddleware.run(rootSaga); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
