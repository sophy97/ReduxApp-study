// 모듈폴더 속 index 의 역할
// : counter, memo의 값(작성한 리덕스 모듈들)을 묶어주는 역할\
// 방식: combineReducer
// 작성한 리덕스 모듈을 하나로 묶어서 사용
import { combineReducers } from "redux";

// 1 작성한 리덕스 모듈을 가져옴
import counter, { counterSaga } from "./counter";
import memo from "./memo";
import news from "./news";

// ++ Redux-saga의 내용을 연결해서 사용함
import {all} from 'redux-saga/effects';

// 2 작성한 리덕스를 객체로 묶어서 내보냄
const rootReducer = combineReducers({counter, memo, news});

// ++ 모든 saga들을 묶어 내보낼 수 있도록 rootSaga를 만듦 >> src의 index로 연결
export function* rootSaga () {
    yield all([counterSaga()]);
}


export default rootReducer;





