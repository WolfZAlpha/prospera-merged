import Image from "next/image";
import Link from "next/link";

import hero_thumb from "@/assets/img/update/hero/bitcoin.svg";

const HeroArea = () => {
   return (
      <div className="hero-wrapper hero-2">
         <div className="hero-bg-gradient1"></div>
         <div className="hero-bg-gradient2"></div>
         <div className="hero-gradient-ball alltuchtopdown"></div>
         <div className="ripple-shape">
            <span className="ripple-1"></span>
            <span className="ripple-2"></span>
            <span className="ripple-3"></span>
            <span className="ripple-4"></span>
            <span className="ripple-5"></span>
         </div>
         <div className="container">
            <div className="hero-style2">
               <div className="row">
                  <div className="col-lg-12">
                     <h6 className="hero-subtitle">GET NEW SOLUTION</h6>
                     <h1 className="hero-title">Blockcha<span>i<Image className="bitcoin" src={hero_thumb} alt="img" /></span>n</h1>
                     <div className="btn-wrap">
                        <h3 className="hero-title2">Technology for business</h3>
                        <div className="hero-content">
                           <p className="hero-text">We’ve worked with over 400 companies to build blockchain solutions for their business, and we are still growing.</p>
                           <Link href="/contact" className="btn btn3" >
                              Get Started Today
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeroArea
