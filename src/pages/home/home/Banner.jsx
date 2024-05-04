import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Banner.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import img1 from "../../../assets/banner/img1.jpg";
import img2 from "../../../assets/banner/img2.jpg";
import img3 from "../../../assets/banner/img3.jpg";
import img4 from "../../../assets/banner/img4.jpg";
import img5 from "../../../assets/banner/img5.jpg";
import img6 from "../../../assets/banner/img6.jpg";
import img7 from "../../../assets/banner/img7.jpg";
import img8 from "../../../assets/banner/img8.jpg";
import img9 from "../../../assets/banner/img9.jpg";
import img10 from "../../../assets/banner/img10.jpg";



const Banner = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={img1} alt="" /></SwiperSlide>
        <SwiperSlide><img src={img2} alt="" /></SwiperSlide>
        <SwiperSlide><img src={img3} alt="" /></SwiperSlide>
        <SwiperSlide><img src={img4} alt="" /></SwiperSlide>
        <SwiperSlide><img src={img5} alt="" /></SwiperSlide>
        <SwiperSlide><img src={img6} alt="" /></SwiperSlide>
        <SwiperSlide><img src={img7} alt="" /></SwiperSlide>
        <SwiperSlide><img src={img8} alt="" /></SwiperSlide>
        <SwiperSlide><img src={img9} alt="" /></SwiperSlide>
        <SwiperSlide><img src={img10} alt="" /></SwiperSlide>
       
        
      </Swiper>
    </div>
  );
};

export default Banner;
