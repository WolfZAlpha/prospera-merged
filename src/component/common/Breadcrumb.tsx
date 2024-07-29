import Image from "next/image"
import Link from "next/link";

import breadcrumbShape_1 from "@/assets/img/images/breadcrumb_shape01.png";
import breadcrumbShape_2 from "@/assets/img/images/breadcrumb_shape02.png";

const Breadcrumb = ({ title }: any) => {
   return (
      <section className="breadcrumb-area breadcrumb-bg" style={{ backgroundImage: `url(/assets/img/bg/breadcrumb_bg.png)` }}>
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="breadcrumb-content">
                     <h2 className="title">{title}</h2>
                     <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                           <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                           <li className="breadcrumb-item active" aria-current="page">{title}</li>
                        </ol>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
         <div className="breadcrumb-shape-wrap">
            <Image src={breadcrumbShape_1} alt="" className="alltuchtopdown" />
            <Image src={breadcrumbShape_2} alt="" className="rotateme" />
         </div>
      </section>
   )
}

export default Breadcrumb
