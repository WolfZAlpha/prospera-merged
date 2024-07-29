import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import icon_1 from "@/assets/img/update/invest/invest-icon-1.png"
import icon_2 from "@/assets/img/update/invest/invest-icon-2.png"
import icon_3 from "@/assets/img/update/invest/invest-icon-3.png"
import icon_4 from "@/assets/img/update/invest/invest-icon-4.png"
import icon_5 from "@/assets/img/update/invest/invest-icon-5.png"

interface DataType {
   id: number;
   icon: StaticImageData;
   title: string;
}

const invest_data: DataType[] = [
   {
      id: 1,
      icon: icon_1,
      title: "Send BTC",
   },
   {
      id: 2,
      icon: icon_2,
      title: "Send ETH",
   },
   {
      id: 3,
      icon: icon_3,
      title: "Send SOL",
   },
   {
      id: 4,
      icon: icon_4,
      title: "Send ARB",
   },
   {
      id: 5,
      icon: icon_5,
      title: "Send USDT",
   },
];

const InvestArea = () => {
   return (
      <div className="pt-130 overflow-hidden">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-7">
                  <div className="section-title text-center mb-50">
                     <h2 className="title style2">Crypto We Accept</h2>
                  </div>
               </div>
            </div>
            <div className="row gy-30">
               {invest_data.map((item) => (
                  <div key={item.id} className="col-lg-3 col-md-6">
                     <div className="invest-card">
                        <div className="invest-card-icon">
                           <Image src={item.icon} alt="icon" />
                        </div>
                        <Link className="btn btn3" href="#">{item.title}</Link>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default InvestArea
