import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import rcPost_1 from "@/assets/img/blog/rc_post01.jpg"
import rcPost_2 from "@/assets/img/blog/rc_post02.jpg"
import rcPost_3 from "@/assets/img/blog/rc_post03.jpg"

interface DataType {
   id: number;
   img: StaticImageData;
   date: string;
   title: string;
}
const rc_data: DataType[] = [
   {
      id: 1,
      img: rcPost_1,
      date: "July 25,2024",
      title: "We Advocate Swapping Screen Time",
   },
   {
      id: 2,
      img: rcPost_2,
      date: "MARCH 20,2024",
      title: "Utilizing mobile technology in the field",
   },
   {
      id: 3,
      img: rcPost_3,
      date: "JULY 18,2024",
      title: "Building intelligent transportation systems",
   },
]

const BlogRcPost = () => {
   return (
      <div className="blog-widget">
         <h4 className="widget-title">Recent Posts</h4>
         <div className="rc-post-wrap">
            {rc_data.map((item) => (
               <div key={item.id} className="rc-post-item">
                  <div className="thumb">
                     <Link href="/blog-details"><Image src={item.img} alt="" /></Link>
                  </div>
                  <div className="content">
                     <span className="date">{item.date}</span>
                     <h6 className="title"><Link href="/blog-details">{item.title}</Link></h6>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default BlogRcPost
