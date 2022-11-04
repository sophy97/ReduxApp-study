// news.js를 출력할 컴포넌트(공간)임

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../modules/news";

const News = () => {
    //가져올 값
    const loading = useSelector((state)=>state.news.loading);
    // 뉴스값 이제 가져오셈
    const news = useSelector((state)=>state.news.news);
    const dispatch = useDispatch();

    // 마운트되자마자 값을 들고오려면
    useEffect(()=>{
        dispatch(getNews());
    }, []);

    return ( 
        <div>
            <h2>뉴스 출력공간</h2>
            
            {
            // 값을 불러오는 동안 로딩중임을 알림
            loading && <p>로딩중입니다 🕑</p>
            }
            {
            // loading이 false && news가 null아닐 때 div에 출력되도록
            !loading && news && (
                    news.map((article)=>(
                        <div>{article.title}</div>
                    ))
                )
            }
            <button onClick={()=>{dispatch(getNews())}}>
            뉴스가져오기
            </button>
        </div>
    );
}

export default News;