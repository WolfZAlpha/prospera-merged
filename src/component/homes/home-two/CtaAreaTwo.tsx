import Image from "next/image"
import Link from "next/link"

import ctaThumb from "@/assets/img/update/normal/cta_3-1.png";

const CtaAreaTwo = () => {
   return (
      <div className="pb-120 position-relative z-index-common">
         <div className="container">
            <div className="cta-wrap3">
               <div className="cta-wrap-details">
                  <div className="section-title mb-20">
                     <h2 className="title style2 text-title">Be part of the future</h2>
                     <p className="sec-text text-title">We’ve worked with over 400 companies to build blockchain solutions for their business.</p>
                  </div>
                  <Link href="/contact" className="btn btn3">
                     Get started
                  </Link>
               </div>
               <div className="cta-3-thumb movingX">
                  <Image src={ctaThumb} alt="img" />
               </div>
            </div>
         </div>
      </div>
   )
}

export default CtaAreaTwo
