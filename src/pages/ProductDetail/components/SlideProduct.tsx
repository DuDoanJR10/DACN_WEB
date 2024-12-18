import React from 'react';
import '../styles/SlideProduct.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

interface SlideProductProps {
  data: string[];
}
const SlideProduct = ({ data }: SlideProductProps) => {
  return (
    <div className="SlideProduct mt-4">
      <Swiper
        slidesPerView={4}
        spaceBetween={12}
        className="mySwiper h-20"
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {data?.map((url, index: number) => (
          <SwiperSlide key={index}>
            <img className=" object-cover" src={`${process.env.API_URL}uploads/${url}`} alt="slide-1" />
          </SwiperSlide>
        ))}
        {data?.map((url, index: number) => (
          <SwiperSlide key={index}>
            <img className=" object-cover" src={`${process.env.API_URL}uploads/${url}`} alt="slide-1" />
          </SwiperSlide>
        ))}
        {data?.map((url, index: number) => (
          <SwiperSlide key={index}>
            <img className=" object-cover" src={`${process.env.API_URL}uploads/${url}`} alt="slide-1" />
          </SwiperSlide>
        ))}
        {data?.map((url, index: number) => (
          <SwiperSlide key={index}>
            <img className=" object-cover" src={`${process.env.API_URL}uploads/${url}`} alt="slide-1" />
          </SwiperSlide>
        ))}
        {data?.map((url, index: number) => (
          <SwiperSlide key={index}>
            <img className=" object-cover" src={`${process.env.API_URL}uploads/${url}`} alt="slide-1" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideProduct;
