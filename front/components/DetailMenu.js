import React, { useEffect,useState } from 'react'
import {Radio} from 'antd'
import DetailRecommend from './DetailRecommend';
import DetailDetail from './DetailDetail';
import DetailReviews from './DetailReviews';

export default function DetailMenu({detail, id, isLogined}) {
  const [select,setSelect] = useState(0);
  return (
    <>
      <Radio.Group
        defaultValue="0"
        buttonStyle="solid"
      >
        <Radio.Button value="0" onClick={()=>setSelect(0)}>관련 추천 영화</Radio.Button>
        <Radio.Button value="1" onClick={()=>setSelect(1)}>영화 상세 정보</Radio.Button>
        <Radio.Button value="2" onClick={()=>setSelect(2)}>한줄평</Radio.Button>
      </Radio.Group>

      {select==0 && <div className='movie_recommend'><DetailRecommend/></div>}
      {select==1 && <div className='movie_detail'><DetailDetail detail={detail}/></div>}
      {select==2 && <div className='movie_reviews'><DetailReviews id={id} isLogined={isLogined}/></div>}

    </>
  )
}
