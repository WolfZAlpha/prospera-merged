"use client"
import Image from "next/image"
import Link from "next/link"

import logo_1 from "@/assets/img/logo/logo.png"

const FooterTwo = () => {
   return (
      <footer className="footer-wrapper footer-layout2 pb-50">
         <div className="container">
            <div className="row justify-content-between">
               <div className="col-xl-auto col-lg-6 order-xl-1">
                  <div className="widget footer-widget">
                     <div className="widget-about">
                        <div className="footer-logo">
                           <Link href="/"><Image src={logo_1} style={{ height: "35px" }} alt="iko" /></Link>
                        </div>
                        <p className="about-text">$PROS is a cutting-edge De-Fi company at the forefront of innovation in the Artificial Intelligence sector. PROSPERA Established in 2024</p>
                        <div className="social-btn style2">
                           <Link href="https://facebook.com/"><i className="fab fa-facebook-f"></i></Link>
                           <Link href="#">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                 <path
                                    d="M10.0596 7.34522L15.8879 0.570312H14.5068L9.44607 6.45287L5.40411 0.570312H0.742188L6.85442 9.46578L0.742188 16.5703H2.12338L7.4676 10.3581L11.7362 16.5703H16.3981L10.0593 7.34522H10.0596ZM8.16787 9.54415L7.54857 8.65836L2.62104 1.61005H4.74248L8.71905 7.29827L9.33834 8.18405L14.5074 15.5779H12.386L8.16787 9.54449V9.54415Z"
                                    fill="currentColor"></path>
                              </svg>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="col-xl-auto col-lg-6 order-xl-3">
                  <div className="footer-widget widget-newsletter">
                     <h3 className="fw-title">SIGN UP FOR EMAIL UPDATES</h3>
                     <p className="newsletter-text">Sign up with your email address to receive news and updates</p>
                     <form onSubmit={(e) => e.preventDefault()} className="newsletter-form">
                        <div className="form-group">
                           <input className="form-control" type="email" placeholder="Your Email Address" />
                        </div>
                        <button type="submit" className="btn btn5">Subscribe</button>
                     </form>
                  </div>
               </div>
               <div className="col-xl-auto col-lg-6 order-xl-2">
                  <div className="footer-widget widget-contact">
                     <h3 className="fw-title">CONTACT US</h3>
                     <p className="contact-info-text">At The Bank, Withdrawling Bags, of $PROS Q-Div&apos;s, Prosper, USA</p>
                     <div className="contact-info-link">Call Us: <Link href="tel:8002758777">77077372</Link></div>
                     <div className="contact-info-link"><Link href="mailto:contact@prospera.io">contact@prospera.io</Link></div>
                     <p className="copyright-text">Copyright © 2024 <Link href="#">PROSPERA.</Link> All rights reserved.</p>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default FooterTwo
