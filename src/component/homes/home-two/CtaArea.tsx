"use client"
import Image from "next/image"
import { useState } from "react";
import VideoPopup from "@/modals/VideoPopup";
import Link from "next/link"

import cta_thumb from "@/assets/img/update/bg/cta-2-shape1.png"

const CtaArea = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
      <div className="pt-140 pb-140 position-relative z-index-common">
         <div className="bg-gradient-5"></div>
         <div className="cta-2-shape1 alltuchtopdown"><Image src={cta_thumb} alt="img" /></div>
         <div className="cta-2-shape2 alltuchtopdown"></div>
         <div className="cta-2-shape3 leftToRight"></div>
         <div className="container">
            <div className="cta-wrap2 pt-140 pb-140" style={{ backgroundImage: `url(/assets/img/update/bg/cta-2-bg.png)`, backgroundSize: "cover" }}>
               <div className="row gy-40 align-items-center">
                  <div className="col-xl-6 col-lg-8">
                     <div className="section-title mb-50">
                        <span className="sub-title text-white">TECHNOLOGY</span>
                        <h2 className="title style2">How does blockchain work for business?</h2>
                        <p className="sec-text text-white">We’ve worked with over 400 companies to build blockchain solutions for their business, and we are still growing.</p>
                     </div>
                     <Link href="/contact" className="btn btn3">
                        Get started
                     </Link>
                  </div>
                  <div className="col-xl-6 col-lg-4">
                     <div className="text-lg-center">
                        <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="play-btn popup-video">
                           <i>
                              <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M1.66602 11.6553V7.50193C1.66602 2.34526 5.31768 0.233597 9.78602 2.81193L13.391 4.8886L16.996 6.96526C21.4643 9.5436 21.4643 13.7669 16.996 16.3453L13.391 18.4219L9.78602 20.4986C5.31768 23.0769 1.66602 20.9653 1.66602 15.8086V11.6553Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                           </i>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
         {/* video modal start */}
         <VideoPopup
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            videoId={"Ml4XCF-JS0k"}
         />
         {/* video modal end */}
      </>
   )
}

export default CtaArea
