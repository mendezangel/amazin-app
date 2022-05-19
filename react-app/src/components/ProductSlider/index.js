import React from 'react'
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css';
import './ProductSlider.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ProductSlider() {

  const products = useSelector(state => state.product.products)

  return (
    <div className='whole-swiper-container'>
      <h1>Text</h1>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={true}
        modules={[Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <div className='slider-img-container'><img src={products[4].image_url} /></div>
          <div className='slider-img-container'><img src={products[2].image_url} /></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slider-img-container'><img src={products[0].image_url} /></div>
          <div className='slider-img-container'><img src={products[3].image_url} /></div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
