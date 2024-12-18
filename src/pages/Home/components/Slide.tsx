import React from 'react';
import '../styles/Slide.scss';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import IMAGES from 'assets/images';

const Slide = () => {
  return (
    <div className="p-4 bg-white rounded-xl h-[300px] w-full">
      <Swiper slidesPerView={2} spaceBetween={16} className="mySwiper">
        <SwiperSlide>
          <img className="slide-img" src={IMAGES.Slide.slide_1} alt="slide-1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="slide-img" src={IMAGES.Slide.slide_2} alt="slide-1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="slide-img" src={IMAGES.Slide.slide_3} alt="slide-1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="slide-img" src={IMAGES.Slide.slide_4} alt="slide-1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="slide-img" src={IMAGES.Slide.slide_5} alt="slide-1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="slide-img" src={IMAGES.Slide.slide_6} alt="slide-1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="slide-img" src={IMAGES.Slide.slide_7} alt="slide-1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="slide-img" src={IMAGES.Slide.slide_8} alt="slide-1" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slide;
