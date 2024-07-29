import Image from "next/image";
import Link from "next/link";

import logo_1 from "@/assets/img/logo/logo.png";

const HeaderOffcanvas = ({ offCanvas, setOffCanvas }: any) => {
   return (
      <>
         <div className={`${offCanvas ? "offcanvas-menu-visible" : ""}`}>
            <div className={`extra-info ${offCanvas ? "active" : ""}`}>
               <div className="close-icon menu-close">
                  <button onClick={() => setOffCanvas(false)}><i className="far fa-window-close"></i></button>
               </div>
               <div className="logo-side mb-30">
                  <Link href="/"><Image src={logo_1} alt="Logo" /></Link>
               </div>
               <div className="side-info mb-30">
                  <div className="contact-list mb-30">
                     <h4>Office Address</h4>
                     <p>123/A, Miranda City Likaoli <br /> Prikano, Dope</p>
                  </div>
                  <div className="contact-list mb-30">
                     <h4>Phone Number</h4>
                     <p>+0989 7876 9865 9</p>
                     <p>+(090) 8765 86543 85</p>
                  </div>
                  <div className="contact-list mb-30">
                     <h4>Email Address</h4>
                     <p>info@example.com</p>
                     <p>example.mail@hum.com</p>
                  </div>
               </div>
               <div className="social-icon-right mt-30">
                  <Link href="#"><i className="fab fa-facebook-f"></i></Link>
                  <Link href="#"><i className="fab fa-twitter"></i></Link>
                  <Link href="#"><i className="fab fa-google-plus-g"></i></Link>
                  <Link href="#"><i className="fab fa-instagram"></i></Link>
               </div>
            </div>
            <div onClick={() => setOffCanvas(false)} className={`offcanvas-overly ${offCanvas ? "active" : ""}`}></div>
         </div>
      </>
   )
}

export default HeaderOffcanvas
