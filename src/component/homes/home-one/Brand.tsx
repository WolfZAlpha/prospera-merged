"use client"
import Image, { StaticImageData } from "next/image"
import Slider from "react-slick";

import brandImg_1 from "@/assets/img/brand/brand_img01.png"
import brandImg_2 from "@/assets/img/brand/brand_img02.png"
import brandImg_3 from "@/assets/img/brand/brand_img03.png"
import brandImg_4 from "@/assets/img/brand/brand_img04.png"
import brandImg_7 from "@/assets/img/brand/brand_img07.png"

const brand_data: StaticImageData[] = [brandImg_1, brandImg_2, brandImg_3, brandImg_4, brandImg_7,];

const settings = {
   dots: false,
   infinite: true,
   speed: 1000,
   autoplay: true,
   arrows: false,
   slidesToShow: 5,
   slidesToScroll: 2,
   responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
			}
		},
	]
}

const Brand = () => {
   return (
      <div className="brand-area2">
         <div className="container">
            <div className="row g-0">
               <div className="col-lg-12">
                  <div className="brand-title text-center">
                     <h6 className="title">Our top Partner</h6>
                  </div>
               </div>
            </div>
            <div className="brand-item-wrap style2">
               <Slider {...settings} className="row g-0 brand-active2">
                  {brand_data.map((item, i) => (
                     <div key={i} className="col-12">
                        <div className="brand-item">
                           <Image src={item} alt="" />
                        </div>
                     </div>
                  ))}
               </Slider>
            </div>
         </div>
      </div>
   )
}

export default Brand;
