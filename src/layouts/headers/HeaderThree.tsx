"use client";
import Link from "next/link";
import { useState } from "react";
import UseSticky from "../../hooks/UseSticky";
import Image from "next/image";
import NavMenu from "./Menu/NavMenu";
import Sidebar from "./Menu/Sidebar";
import HeaderOffcanvas from "./Menu/HeaderOffcanvas";
import useWalletConnection from '@/hooks/useWalletConnection'; // Adjust the path as needed
import { useWalletContext } from '@/context/WalletContext'; // Adjust the path as necessary

import logo_1 from "@/assets/img/logo/logo.png";

const HeaderThree = () => {
  const { sticky } = UseSticky();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [offCanvas, setOffCanvas] = useState<boolean>(false);
  const { walletInfo, connectWallet, disconnectWallet } = useWalletConnection();
  const { isWalletConnected } = useWalletContext();

  return (
    <>
      <header id="header">
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
                        <li className="header-login">
                          {isWalletConnected ? (
                            <button className="connect-btn" onClick={disconnectWallet}>
                              Disconnect<i className="connect-btn-icon fas fa-wallet"></i>
                            </button>
                          ) : (
                            <button className="connect-btn" onClick={connectWallet}>
                              Connect Wallet<i className="connect-btn-icon fas fa-wallet"></i>
                            </button>
                          )}
                        </li>
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

export default HeaderThree;
