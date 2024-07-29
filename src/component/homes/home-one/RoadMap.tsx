"use client"
import Image from "next/image"
import Slider from "react-slick";
import React, { useRef } from "react";
import road_map_data from "@/data/RoadMapData";

import roadmap_bg from "@/assets/img/update/bg/bg-gradient1-1.jpg";

const settings = {
   dots: false,
   infinite: true,
   speed: 1000,
   autoplay: true,
   arrows: false,
   slidesToShow: 4,
   slidesToScroll: 1,
   responsive: [
      {
         breakpoint: 1400,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
         }
      },
      {
         breakpoint: 1200,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
         }
      },
      {
         breakpoint: 992,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
         }
      },
      {
         breakpoint: 767,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
         }
      },
      {
         breakpoint: 575,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
         }
      },
   ]
}

const RoadMap = () => {

   const sliderRef = useRef<Slider | null>(null);

   const handlePrevClick = () => {
      if (sliderRef.current) {
         sliderRef.current.slickPrev();
      }
   };

   const handleNextClick = () => {
      if (sliderRef.current) {
         sliderRef.current.slickNext();
      }
   };

   return (
      <div className="pt-130 pb-140 overflow-hidden bg-black2 position-relative z-index-common" id="roadMap">
         <div className="bg-gradient-2">
            <Image src={roadmap_bg} alt="img" />
         </div>
         <div className="container">
            <div className="row justify-content-between">
               <div className="col-lg-6 col-sm-8">
                  <div className="section-title mb-50">
                     <h2 className="title style2">Our Roadmap</h2>
                  </div>
               </div>
               <div className="col-sm-auto">
                  <div className="icon-box">
                     <button onClick={handlePrevClick} className="slider-arrow prev-btn default"><i className="fas fa-arrow-left"></i></button>
                     <button onClick={handleNextClick} className="slider-arrow next-btn default"><i className="fas fa-arrow-right"></i></button>
                  </div>
               </div>
            </div>
         </div>
         <div className="container-fluid p-0">
            <div className="slider-area position-relative">
               <Slider {...settings} ref={sliderRef} className="row roadMap-active2 roadmap-slider1">
                  {road_map_data.map((item) => (
                     <div key={item.id} className="col-lg-4">
                        <div className="roadmap-item">
                           <span className="roadmap-title">{item.sub_title}</span>
                           <div className="roadmap-content">
                              <h4 className="title"><span className="dot"></span>{item.title}</h4>
                              <p>{item.desc}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </Slider>
            </div>
         </div>
      </div>
   )
}

export default RoadMap
