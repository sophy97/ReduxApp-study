// 1 초기 state 선언
// API로 값을 가져올 경우 데이터 가져오는 속도가 느릴 수 있음
// 따라서 loading을 작성
const initialState = {
    loading : false,
    news : null
}

/** Thunk 를 통해 값을 받아오는 액션함수 작성 
 *  (thunk기본 형태) > export const getNews =()=>(dispatch)=>{}
 * + fetchAPI 사용, thunk의 내용이 비동기함수임을 알림 > async(dispatch)
*/
export const getNews =()=> async(dispatch)=> {
    dispatch({type:"startLoad"});
    
    const response = await fetch("https://newsapi.org/v2/top-headlines?country=kr&apiKey=c4c09dd0ba45435cb60e93cd10259c2a");
    const body = await response.json();
    // if (){} 혹은 trycatch로 에러 막아줄 수 있다
    if (body.status == 'ok') {
        dispatch({type:"getNews", payload: body.articles});
    }    
    dispatch({type:"endLoad"});
}

// 2 Reducer함수 작성 > const news = (state=initialState, action) => { 액션타입 } 구조
const news =( state=initialState, action )=>{
    switch (action.type) {
        case "getNews" :
            // 값이 다 들어왔음을 전제로 작성
            return {
                    ...state,
                    news : action.payload
                };
        case "startLoad" :
            return { ...state, loading:true };
        case "endLoad" :
            return { ...state, loading:false };
        default:
            return state;

    }
}

// 내보낸 news는 컴포넌트로 만들어
// '모듈'폴더의 index에 최종 연결(combineReducer)
export default news;
