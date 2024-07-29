import Image from "next/image"
import Link from "next/link"

import thumb_1 from "@/assets/img/update/normal/why_1-1.png";

const FeatureAreaThree = () => {
   return (
      <div className="pt-140 pb-140 overflow-hidden position-relative z-index-common">
         <div className="feature-shape-4-1  spin"></div>
         <div className="feature-shape-4-2 alltuchtopdown"></div>
         <div className="feature-shape-4-3 alltuchtopdown"></div>
         <div className="feature-shape-4-4"></div>
         <div className="container">
            <div className="row justify-content-between align-items-center">
               <div className="col-xl-5">
                  <div className="section-title mb-50">
                     <span className="sub-title">POSSIBILITIES</span>
                     <h2 className="title style2">What does it mean for your business?</h2>
                     <p className="mt-25">We’ve worked with over 400 companies to build blockchain solutions for their business, and we are still growing.</p>
                  </div>
               </div>
               <div className="col-xl-6">
                  <ul className="feature-category-list mb-xl-0 mb-60">
                     <li>
                        <Link href="/blog-details">Smart contracts</Link>
                     </li>
                     <li>
                        <Link href="/blog-details">Paying employees</Link>
                     </li>
                     <li>
                        <Link href="/blog-details">Cloud storage</Link>
                     </li>
                     <li>
                        <Link href="/blog-details">Electronic voting</Link>
                     </li>
                  </ul>
               </div>
            </div>
            <div className="feature-wrap-4">
               <div className="row align-items-center">
                  <div className="col-lg-6">
                     <div className="feature-wrap4-thumb text-center alltuchtopdown">
                        <Image src={thumb_1} alt="img" />
                     </div>
                  </div>
                  <div className="col-lg-6">
                     <div className="section-title mb-0">
                        <span className="sub-title text-title">FEATURES</span>
                        <h2 className="title style2 text-title">What does it mean for your business?</h2>
                        <p className="text-title mt-20 mb-55">Our team has created blockchain solutions for over 400 companies, and we are still growing. From less paperwork and fewer disputes, to happier customers and entirely new business methods, <a className="text-title text-decoration-underline" href="#">a shared record of truth is invaluable.</a></p>
                        <Link href="/contact" className="btn btn btn3">
                           Get started
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FeatureAreaThree
