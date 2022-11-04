

// store : 리덕스에서 가져옴 (state와 dispatch 가진 store)
// next : 수정하여 dispatch로 넘겨주는 역할
// action : dispatch에서의 action임
const loggerMiddleware = (store) =>(next) =>(action) =>{
    // 액션의 상태를 남겨주는 역할
    console.group(action && action.type);
    console.log("이전 상태", store.getState())
    console.log("액션", action);
    // next()를 통해 액션을 실행해야만 dispatch 된다
    next(action);
    console.log("다음 상태", store.getState())
    console.groupEnd();
}

export default loggerMiddleware;


// 위 화살표함수를 리턴 형식으로 풀어쓴 코드
const loggerMiddlewareFunc = function(store){
    return function(next){
        return function(action){

        }
    }
}