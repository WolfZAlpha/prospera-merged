import Image, { StaticImageData } from "next/image";

import shape_1 from "@/assets/img/update/feature/feature-shape-2-1.png"
import shape_2 from "@/assets/img/update/feature/feature-shape-2-2.png"
import shape_3 from "@/assets/img/update/feature/feature-shape-2-3.png"
import feature_thumb_1 from "@/assets/img/update/feature/feature-card-thumb-1.png"
import feature_thumb_2 from "@/assets/img/update/feature/feature-card-thumb-2.png"
import feature_thumb_3 from "@/assets/img/update/feature/feature-card-thumb-3.png"

interface DataType {
   id: number;
   title: string;
   thumb: StaticImageData;
   desc_1: string;
   desc_2: string;
}[];

const feature_data: DataType[] = [
   {
      id: 1,
      title: "Transference",
      thumb: feature_thumb_2,
      desc_1: "We’ve worked with over 400 companies to build blockchain solutions for their business.",
      desc_2: "We’ve worked with over 400 companies to build",
   },
   {
      id: 2,
      title: "Secure & Safe",
      thumb: feature_thumb_3,
      desc_1: "We’ve worked with over 400 companies to build blockchain solutions for their business.",
      desc_2: "We’ve worked with over 400 companies to build",
   },
];

const FeatureArea = () => {
   return (
      <div className="feature-area-2 pt-110 pb-140 position-relative overflow-hidden" style={{ backgroundImage: `url(/assets/img/update/bg/feature-area-bg.png)`, backgroundSize: "cover", backgroundPosition: "center" }} id="blockchain">
         <div className="feature-area-shape">
            <Image className="feature-shape2-1 alltuchtopdown" src={shape_1} alt="img" />
            <Image className="feature-shape2-2 alltuchtopdown" src={shape_2} alt="img" />
            <Image className="feature-shape2-3 leftToRight" src={shape_3} alt="img" />
         </div>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-5 col-lg-8">
                  <div className="section-title text-center mb-50">
                     <span className="sub-title">ABOUT BLOCKCHAIN</span>
                     <h2 className="title style2">Why blockchain?</h2>
                     <p className="sec-text">We’ve worked with over 400 companies to build blockchain solutions for their business, and we are still growing.
                     </p>
                  </div>
               </div>
            </div>
            <div className="feature-grid-wrap">
               <div className="feature-card-grid">
                  <div className="feature-card-details">
                     <h3 className="feature-card-title">Flexibility</h3>
                     <p className="feature-card-text">We’ve worked with over 400 companies to build blockchain solutions for their business.</p>
                     <div className="checklist">
                        <ul>
                           <li><i className="fas fa-circle"></i> Blockchain solutions for their business.</li>
                           <li><i className="fas fa-circle"></i> Blockchain solutions for their business.</li>
                           <li><i className="fas fa-circle"></i> Blockchain solutions for their business.</li>
                        </ul>
                     </div>
                  </div>
                  <div className="feature-card-img">
                     <Image className="alltuchtopdown" src={feature_thumb_1} alt="img" />
                  </div>
               </div>
               {feature_data.map((item) => (
                  <div key={item.id} className="feature-card-grid">
                     <div className="feature-card-details">
                        <h3 className="feature-card-title">{item.title}</h3>
                        <p className="feature-card-text">{item.desc_1}</p>
                        <p className="feature-card-text">{item.desc_2}</p>
                     </div>
                     <div className="feature-card-img">
                        <Image src={item.thumb} alt="img" />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default FeatureArea
