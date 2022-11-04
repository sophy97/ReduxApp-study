// 원래 import는 상단에 몰아두지만, (saga관련 확인) 위해 현위치 작성 >> 오류난다 위로 올리셈
// 현재 파일에 2개 미들웨어 존재함(thunk/saga)
// saga를 사용할 때는, action/dispatch에 관한 내용을 import해서 사용해야..
import {put, delay, takeEvery} from 'redux-saga/effects';


// Counter
// useReducer(state, action) 의 형식과 유사함
// 1 초기값 생성 > 2 reducer함수 생성 순서

// 1 초기값 (초기상태)
const initialState = {
    number: 0,
    changeNum: 1
}

// dispatch에 들어갈 {type:"액션"} 객체를 '함수'로 만들어 내보냄
// 이게 보편적인 형태
export const increase =()=>({type:"increase"}); //리턴값 객체 
export const decrease =()=>({type:"decrease"});
                //화살표함수도 동일하게 매개변수 값 받아올 수 있다
export const change =(value)=>( {type:"change", payload: value} )

/**
 * thunk를 사용하여 비동기로 실행하는 액션함수를 만들 수 있다
 * thunk의 형식을 사용했으므로,
 * 바로 dispatch를 사용하는 것이 아니라, 나중에 추가해서 사용할 수 있다!
 * thunk의 사용 형태 : export const 함수명 = () => (dispatch) => {}
 */
export const increaseAsync = () => (dispatch)=> {
    // dispatch를 실행하기 전에 진행할 내용을 작성 후
    // dispatch를 통해서 action을 실행 
    // > action은 매개변수로 들고오지 않았으므로, 객체이름 직접 입력하거나
    //   이미 만들어 둔 action함수를 사용하여 실행한다

    // 누르고 1초 후에 실행되는 액션함수를 만듦 (setTimeout사용)
    // 위에 미리 작성한 액션함수 들고오는 방식으로 사용했음
    setTimeout(()=>{ dispatch(increase()) }, 1000);
}

    // 누르고 2초 후 실행되는 액션함수 (setTimeout)
    //이번엔 타입액션 그대로 들고옴
export const decreaseAsync =() => (dispatch)=> {
    setTimeout(()=>{ dispatch({type:"decrease"}) }, 2000);
}


/**
 *  Redux-saga 를 이용한 비동기 액션함수 사용하기
 *  리덕스 사가는 "자바스크립트의 제너레이터함수"를 사용한다
 *  function* (){}, next()와 yield를 이용해서 함수를 각 부분만 실행가능
 */

//함수생성
function* increaseSaga (action) {
    console.log(action);
    yield delay(1000);  // 1초 기다림
    yield put({type:"increase"});    //action을 실행(dispatch시킴)
}
function* decreaseSaga () {
    yield delay(2000);  // 2초 기다림
    yield put(decrease());    //action을 실행(dispatch시킴)
}

// 만들어진 saga 내보내는 함수 >> 내보냈으므로 모듈 내 index에 연결
export function* counterSaga() {
    // takeEvery : 모든 "increase"를,increaseSaga()로 처리해달라
    yield takeEvery("increaseAsync", increaseSaga);
    yield takeEvery("decreaseAsync", decreaseSaga);
}

// Redux-saga를 실행하기위한 액션함수 만들어 내보내기 > action, payload 값 받기 가능
export const increaseSagaAsync =()=>({type:"increaseAsync", payload:100});
export const decreaseSagaAsync =()=>({type:"decreaseAsync"});



// 2 reducer 함수 (변경상태)
function counter (state = initialState, action) {
    switch (action.type) {
        case "increase" :
            const num = parseInt(state.changeNum)            
            return {...state, number: state.number+num};
        case "decrease" :
            return {...state, number: state.number-state.changeNum};
        case "init" :
            return {...state, number: 0};
        case "change" :
            return {...state, changeNum: action.payload};
        default :
        return state;
    }
}

export default counter;