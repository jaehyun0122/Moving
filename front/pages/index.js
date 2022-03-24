import React, { useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import MainCarousel from '../components/MainCarousel';
import MoviePoster from '../components/MoviePoster';
import IndexRecommend from '../components/IndexRecommend';
import IndexRecommend2 from '../components/IndexRecommend2';
import { useDispatch, useSelector } from 'react-redux';
import IndexRecommend3 from '../components/IndexRecommend3';
import IndexRecommend4 from '../components/IndexRecommend4';

const Home = () => {
  const dispatch = useDispatch();
  const poster = [1, 2, 3, 4, 5, 6, 7];
  const { me } = useSelector(state => state.user);
  useEffect(() => {
    console.log('memememe', me);
  }, []);
  return (
    <>
      <AppLayout>
        <MainCarousel />
        {/* 나와 비슷한 취향을 가진 사용자들이 시청한 영화 */}
        {me !== null && <IndexRecommend2 />}
        {/* 장르별 추천 영화 */}
        {me !== null && <IndexRecommend3 />}
        {/* 평점순 */}
        <IndexRecommend4 />
        {/* 랜덤 추천 영화 */}
        <IndexRecommend />
      </AppLayout>
    </>
  );
};

export default Home;
