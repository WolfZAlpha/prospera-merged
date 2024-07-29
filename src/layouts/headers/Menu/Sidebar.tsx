"use client";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

import logo_1 from "@/assets/img/logo/logo.png";

const Sidebar = ({ isActive, setIsActive }: any) => {

    return (
        <div className={` ${isActive ? "mobile-menu-visible" : ""}`}>
            <div className="mobile-menu">
                <nav className="menu-box">
                    <div onClick={() => setIsActive(false)} className="close-btn"><i className="fas fa-times"></i></div>
                    <div className="nav-logo">
                        <Link href="/"><Image src={logo_1} alt="Logo" /></Link>
                    </div>
                    <div className="menu-outer">
                        <MobileMenu setIsActive={setIsActive} />
                    </div>
                    <div className="social-links">
                        <ul className="clearfix list-wrap">
                            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                            <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div onClick={() => setIsActive(false)} className="menu-backdrop"></div>
        </div>
    )
}

export default Sidebar