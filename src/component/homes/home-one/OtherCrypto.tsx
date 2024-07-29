"use client"
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Slider from "react-slick";

import partnerThumb_1 from "@/assets/img/othercrypto/eth.svg"
import partnerThumb_2 from "@/assets/img/othercrypto/avax.svg"
import partnerThumb_3 from "@/assets/img/othercrypto/sol.svg"
import partnerThumb_4 from "@/assets/img/othercrypto/bnb.svg"
import partnerThumb_5 from "@/assets/img/othercrypto/base.svg"

interface DataType {
   id: number;
   icon: StaticImageData;
   desc: JSX.Element;
}[];

const partner_data: DataType[] = [
   {
      id: 1,
      icon: partnerThumb_1,
      desc: (<>Send in $ETH</>),
   },
   {
      id: 2,
      icon: partnerThumb_2,
      desc: (<>Send in $AVAX</>),
   },
   {
      id: 3,
      icon: partnerThumb_3,
      desc: (<>Send in $SOL</>),
   },
   {
      id: 4,
      icon: partnerThumb_4,
      desc: (<>Send in $BNB</>),
   },
   {
      id: 5,
      icon: partnerThumb_5,
      desc: (<>Send in $BASE</>),
   },
];

const settings={
   dots: true,
	infinite: true,
	speed: 1000,
	autoplay: true,
	spaceBetween: 30,
	arrows: false,
	slidesToShow: 3,
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


const PartnerArea = () => {
   return (
      <div className="pt-130 bg-black2 pb-20">
         <div className="container">
            <div className="section-title text-center mb-50">
               <h2 className="title style2">LayerZero Expansion ICO</h2>
            </div>
            <div className="slider-area">
               <Slider {...settings} className="row partner-slider1">
                  {partner_data.map((item) => (
                     <div key={item.id} className="col-lg-4">
                        <div className="partner-card">
                           <div className="partner-card-img">
                              <Image src={item.icon} alt="img" />
                           </div>
                           <p className="partner-card-text">{item.desc}</p>
                           <Link className="btn btn3" href="/blog">Send</Link>
                        </div>
                     </div>
                  ))}
               </Slider>
            </div>
         </div>
      </div>
   )
}

export default PartnerArea
