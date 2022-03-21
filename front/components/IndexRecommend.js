import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Typography, Card, Row, Col, Divider } from 'antd';
import Router from 'next/router';
import Slider from "react-slick";
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';

const { Title } = Typography; // Typograpy.Title
const { Meta } = Card;

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <MdArrowForwardIos />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <MdArrowBackIos />
      </div>
    );
  };

const IndexRecommend = () => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [movies, setMovies] = useState([]);

  useEffect(() => {
<<<<<<< Updated upstream
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/recommend1/`).then(res => {
      setMovies(res.data);
    });
=======
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/recommend1/`)
      .then(res => {
        setMovies(res.data.slice(0, 6));
      });
>>>>>>> Stashed changes
  }, []);

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        <Title level={2}>랜덤 추천 영화</Title>
      </Divider>
      <Slider {...settings}>
        {movies.map(movie => {
          return (
            <Card
              key={movie.id}
              hoverable
              cover={
                <img
                  alt={`${movie.title} 포스터 이미지`}
                  src={movie.backdrop_path}
                />
              }
              onClick={() => Router.push(`/movie/${movie.id}`)}
            >
              <Meta
                title={movie.title}
                description={`${movie.overview.slice(0, 100)}...`}
              />
            </Card>
          );
        })}
      </Slider>
    </>
  );
};

export default IndexRecommend;
