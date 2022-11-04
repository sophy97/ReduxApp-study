import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change, decreaseAsync, decreaseSagaAsync, increase, increaseAsync, increaseSagaAsync } from "../modules/counter";


const CounterBox = () => {
    // useSelector를 통해 state의 원하는 값을 가져올 수 있다
    const number = useSelector((state)=>(state.counter.number));
    const changeNum = useSelector((state)=>(state.counter.changeNum));

    // useDispatch를 통해 사용할 함수를 가져온다 >> 사용:아래처럼 타입이름을 들고온다
    const dispatch = useDispatch();

    // Callback함수를 이용해 함수 매번 새로 만듦을 방지
    const onChange = useCallback((e)=> dispatch(change(e.target.value)), [dispatch]);


    return ( 
        <div>
            <h1>카운터박스</h1>
            <h2>{number}</h2>


            <button onClick={()=>{
            // dispatch를 통해 {type:"액션"}을 전달해 사용
            // >> 이 dispatch는 counter의 리듀서함수로 가서 같은 타입을 찾아 실행됨
                // 객체값 직접 입력할 경우, 오타나 실수발생가능
                // 값 변경 없이 사용하기위해 counter에서 가져옴
                dispatch( increase() );
                }}>증가
            </button>
            {/* counter의 리듀서함수를 수정해 1씩 증.감 버튼 만들기 */}
            <button onClick={()=>{ dispatch({type:"init"}) }}> 0 </button>
            <button onClick={()=>{ dispatch({type:"decrease"}) }}>감소</button>
                <br />
                
            {/* +
                 thunk를 이용해 비동기 작성 */}
                {/* 1초뒤 증가 & 2초뒤 감소 */}
            <button onClick={()=>{dispatch(increaseAsync())}}>1초 뒤 증가</button>
            <button onClick={()=>{dispatch(decreaseAsync())}}>2초 뒤 감소</button>
            <br />
            {/* ++
                Saga를 이용한, 1초뒤 증가버튼 & 감소버튼 */}
            <button onClick={()=>{dispatch(increaseSagaAsync())}}>saga, 1초뒤 +</button>
            <button onClick={()=>{dispatch(decreaseSagaAsync())}}>saga, 2초뒤 -</button>


            {/* changeNum값을 바꿀 input */}
            <h5>입력한 숫자: {changeNum}</h5>
            <input type="text" onChange={(e)=>{ dispatch({type:"change", 
            payload: e.target.value}) }} placeholder="입력한 숫자만큼 업다운" />
            <br />
            <input type="text" onChange={(e)=>{dispatch(change(e.target.value)) }} placeholder="같은 기능, 함수 확인용" />
            <br />
            {/* 익명함수, 화살표함수로 작성시  */}
            <input type="text" onChange={ onChange } />

        </div>
    );
}

export default CounterBox;