import React, { useState, useEffect } from 'react'
import { Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import './ProductSlider.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { multipleItemText } from '../../data/product_card_text';

export default function ProductSlider() {

  const products = useSelector(state => state.product.products)

  const [randProducts, setRandProducts] = useState([])
  const [loaded, setLoaded] = useState(false);

  const num = (function () {
    return Math.floor(Math.random() * (multipleItemText.length - 1) + 1);
  })()

  useEffect(() => {
    function shuffle(array) {
      let currentIndex = array.length, randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return setRandProducts(array);
    }
    shuffle(products)
    setLoaded(true)
  }, [])

  if (!loaded) return null;

  return (
    <div className='whole-swiper-container'>
      <h1>{multipleItemText[num]}</h1>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          720: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          920: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          1100: {
            slidesPerView: 5,
            spaceBetween: 50
          },
          1500: {
            slidesPerView: 6,
            spaceBetween: 60
          }
        }}
        // navigation={true}
        pagination={{ clickable: true }}
        scrollbar={true}
        modules={[Pagination, Scrollbar]}
        className='mySwiper'
      >
        <SwiperSlide>
          <div className='slider-img-container'><Link to={`/products/${randProducts[4].id}`}><img src={randProducts[4].image_url} /></Link></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slider-img-container'><Link to={`/products/${randProducts[2].id}`}><img src={randProducts[2].image_url} /></Link></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slider-img-container'><Link to={`/products/${randProducts[0].id}`}><img src={randProducts[0].image_url} /></Link></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slider-img-container'><Link to={`/products/${randProducts[3].id}`}><img src={randProducts[3].image_url} /></Link></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slider-img-container'><Link to={`/products/${randProducts[34].id}`}><img src={randProducts[34].image_url} /></Link></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slider-img-container'><Link to={`/products/${randProducts[89].id}`}><img src={randProducts[89].image_url} /></Link></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slider-img-container'><Link to={`/products/${randProducts[52].id}`}><img src={randProducts[52].image_url} /></Link></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slider-img-container'><Link to={`/products/${randProducts[94].id}`}><img src={randProducts[94].image_url} /></Link></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='slider-img-container'><Link to={`/products/${randProducts[53].id}`}><img src={randProducts[53].image_url} /></Link></div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
