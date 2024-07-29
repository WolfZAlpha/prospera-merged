import Image, { StaticImageData } from "next/image"
import Link from "next/link"

import founder_thumb_1 from "@/assets/img/update/team/founder-1-1.png"
import founder_thumb_2 from "@/assets/img/update/team/founder-1-2.png"

interface DataType {
   id: number;
   thumb: StaticImageData;
   title: string;
   designasion: string
}[];

const founder_data: DataType[] = [
   {
      id: 1,
      thumb: founder_thumb_1,
      title: "Eleanor Pena",
      designasion: "Founder & CEO",
   },
   {
      id: 2,
      thumb: founder_thumb_2,
      title: "William Xeno",
      designasion: "Founder & CEO",
   },
]

const TeamFounder = () => {
   return (
      <div className="pb-110">
         <div className="container">
            <div className="section-title text-center mb-50">
               <h2 className="title style2">Active founders</h2>
            </div>
            <div className="row gy-4 justify-content-center">
               {founder_data.map((item) => (
                  <div key={item.id} className="col-lg-6">
                     <div className="founder-card">
                        <div className="founder-card-img">
                           <Image src={item.thumb} alt="img" />
                        </div>
                        <div className="founder-card-details">
                           <h3 className="founder-card-title">{item.title}</h3>
                           <p className="founder-card-desig">{item.designasion}</p>
                           <div className="social-btn">
                              <Link href="https://www.linkedin.com/">
                                 <i className="fab fa-linkedin"></i>
                              </Link>
                              <Link href="#">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path
                                       d="M10.0596 7.34522L15.8879 0.570312H14.5068L9.44607 6.45287L5.40411 0.570312H0.742188L6.85442 9.46578L0.742188 16.5703H2.12338L7.4676 10.3581L11.7362 16.5703H16.3981L10.0593 7.34522H10.0596ZM8.16787 9.54415L7.54857 8.65836L2.62104 1.61005H4.74248L8.71905 7.29827L9.33834 8.18405L14.5074 15.5779H12.386L8.16787 9.54449V9.54415Z"
                                       fill="currentColor"></path>
                                 </svg>
                              </Link>
                              <Link href="https://youtube.com/">
                                 <i className="fab fa-youtube"></i>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default TeamFounder
