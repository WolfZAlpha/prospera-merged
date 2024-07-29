"use client"
import Link from "next/link";
import { useState } from "react";
import UseSticky from "../../hooks/UseSticky";
import Image from "next/image";
import NavMenu from "./Menu/NavMenu";
import Sidebar from "./Menu/Sidebar";
import HeaderOffcanvas from "./Menu/HeaderOffcanvas";

import logo_1 from "@/assets/img/logo/logo.png";

const HeaderOne = () => {
    const { sticky } = UseSticky();
    const [isActive, setIsActive] = useState<boolean>(false);
    const [offCanvas, setOffCanvas] = useState<boolean>(false);

    return (
        <>
            <header id="header" className="header-layout1">
                <div id="sticky-header" className={`menu-area transparent-header ${sticky ? "sticky-menu" : ""}`}>
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-12">
                                <div className="menu-wrap">
                                    <nav className="menu-nav">
                                        <div className="logo">
                                            <Link href="/"><Image src={logo_1} alt="Logo" /></Link>
                                        </div>
                                        <div className="navbar-wrap main-menu d-none d-lg-flex">
                                            <NavMenu />
                                        </div>
                                        <div className="header-action">
                                            <ul className="list-wrap">
                                                <li>
                                                    <div className="dropdown-link">
                                                        <Link className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink1" data-bs-toggle="dropdown" aria-expanded="false">ENG</Link>
                                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                                                            <li>
                                                                <Link href="#">GER</Link>
                                                                <Link href="#">FREN</Link>
                                                                <Link href="#">ARAB</Link>
                                                                <Link href="#">LAT</Link>
                                                                <Link href="#">SPA</Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li className="header-login"><Link className="btn2" href="/login">LOGIN</Link></li>
                                            </ul>
                                        </div>
                                        <div onClick={() => setIsActive(true)} className="mobile-nav-toggler"><i className="fas fa-bars"></i></div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Sidebar style={false} isActive={isActive} setIsActive={setIsActive} />
            <HeaderOffcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
        </>
    );
}

export default HeaderOne;
