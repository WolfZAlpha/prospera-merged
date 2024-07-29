"use client"
import Slider from "react-slick";
import React, { useRef } from "react";
import Image, { StaticImageData } from "next/image"

import testi_bg from "@/assets/img/update/bg/testimonial-4-bg.png"
import avatar_1 from "@/assets/img/update/testimonial/testi_thumb1_1.png"
import avatar_2 from "@/assets/img/update/testimonial/testi_thumb1_2.png"

interface DataType {
   id: number;
   avatar: StaticImageData;
   title: string;
   designation: string;
   des: JSX.Element;
   rating: string[];
}[];

const testi_data: DataType[] = [
   {
      id: 1,
      avatar: avatar_1,
      title: "Romero Eli",
      designation: "Developer",
      des: (<>I&apos;ve tested numerous technologies, but this one is leaps and bounds ahead of the competition. It&apos;s phenomenal.</>),
      rating: ["fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star",],
   },
   {
      id: 2,
      avatar: avatar_2,
      title: "Gomez Goles",
      designation: "Product Designers",
      des: (<>I can&apos;t express how impressed I am with this technology. It outshines anything I&apos;ve ever used before & up to the mark.</>),
      rating: ["fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star",],
   },
   {
      id: 3,
      avatar: avatar_1,
      title: "Romero Eli",
      designation: "Developer",
      des: (<>I&apos;ve tested numerous technologies, but this one is leaps and bounds ahead of the competition. It&apos;s phenomenal.</>),
      rating: ["fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star",],
   },
   {
      id: 4,
      avatar: avatar_2,
      title: "Gomez Goles",
      designation: "Product Designers",
      des: (<>I can&apos;t express how impressed I am with this technology. It outshines anything I&apos;ve ever used before & up to the mark.</>),
      rating: ["fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star", "fas fa-star",],
   },
]

const settings = {
   dots: false,
   infinite: true,
   speed: 1000,
   autoplay: false,
   arrows: false,
   slidesToShow: 2,
   slidesToScroll: 1,
   adaptiveHeight: true,
   responsive: [
      {
         breakpoint: 1400,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
         }
      },
      {
         breakpoint: 1200,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
         }
      },
      {
         breakpoint: 991,
         settings: {
            slidesToShow: 1,
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

const Testimonia = () => {

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
      <div className="pb-140 overflow-hidden">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-8">
                  <div className="section-title text-center mb-50">
                     <span className="sub-title">TESTIMONIAL</span>
                     <h2 className="title style2">Over 400 companies have already tried blockchain</h2>
                  </div>
               </div>
            </div>

            <div className="testimonial-wrap-3">
               <div className="testimonial-wrap-circle1 alltuchtopdown"></div>
               <div className="testimonial-wrap-circle2 leftToRight"></div>
               <div className="testimonial-wrap-circle3 leftToRight"></div>
               <div className="testimonial-wrap-bg alltuchtopdown">
                  <Image src={testi_bg} alt="img" />
               </div>

               <div className="slider-area testimonial-slider-wrap">
                  <Slider {...settings} ref={sliderRef} className="row testimonial-slider1">
                     {testi_data.map((item) => (
                        <div key={item.id} className="col-lg-6 slider-item">
                           <div className="testi-box ">
                              <div className="testi-box-profile">
                                 <div className="testi-box-profile-thumb">
                                    <Image src={item.avatar} alt="img" />
                                 </div>
                                 <div className="testi-box-profile-details">
                                    <h4 className="testi-box_name">{item.title}</h4>
                                    <span className="testi-box_desig">{item.designation}</span>
                                 </div>
                                 <div className="testi-box-profile-ratting">
                                    {item.rating.map((rat, i) => (
                                       <i key={i} className={rat}></i>
                                    ))}
                                 </div>
                              </div>
                              <p className="testi-box_text">{item.des}</p>
                           </div>
                        </div>
                     ))}
                  </Slider>
                  <button onClick={handlePrevClick} data-slider-prev=".testimonial-slider1" className="slider-arrow prev-btn"><i className="fas fa-arrow-left"></i></button>
                  <button onClick={handleNextClick} data-slider-next=".testimonial-slider1" className="slider-arrow next-btn"><i className="fas fa-arrow-right"></i></button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Testimonia
