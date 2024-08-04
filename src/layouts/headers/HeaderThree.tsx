"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import UseSticky from "../../hooks/UseSticky";
import Image from "next/image";
import NavMenu from "./Menu/NavMenu";
import Sidebar from "./Menu/Sidebar";
import HeaderOffcanvas from "./Menu/HeaderOffcanvas";
import useWalletConnection from "@/hooks/useWalletConnection"; // Adjust the path as needed
import { useWalletContext } from "@/context/WalletContext"; // Adjust the path as necessary

import logo_1 from "@/assets/img/logo/logo.png";

const HeaderThree = () => {
  const { sticky } = UseSticky();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [offCanvas, setOffCanvas] = useState<boolean>(false);
  const { connectWallet, disconnectWallet } = useWalletConnection();
  const { isWalletConnected } = useWalletContext();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check the width once the component has mounted
  useEffect(() => {
    const checkMobileView = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 992);
      }
    };

    checkMobileView(); // Initial check

    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const mobileNavTogglerStyle = {
    display: isMobile ? "block" : "none",
    position: "relative" as "relative",
    zIndex: 10,
  };

  const headerActionStyle = {
    display: isMobile ? "none" : "block",
  };

  const mobileWalletActionStyle: React.CSSProperties = {
    display: isMobile ? "block" : "none",
    position: "absolute" as "absolute",
    top: "70px",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center" as "center",
    zIndex: 10,
  };

  const logoWidth = isMobile ? 120 : 150; // Ensure width is a number

  return (
    <>
      <header id="header">
        <div
          id="sticky-header"
          className={`menu-area transparent-header ${
            sticky ? "sticky-menu" : ""
          }`}
        >
          <div className="container custom-container">
            <div className="row">
              <div className="col-12">
                <div className="menu-wrap">
                  <nav
                    className="menu-nav"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="logo">
                      <Link href="/">
                        <Image
                          src={logo_1}
                          alt="Logo"
                          width={logoWidth}
                          height={50}
                          style={{ height: "auto" }}
                        />
                      </Link>
                    </div>
                    <div
                      className="navbar-wrap main-menu d-none d-lg-flex"
                      style={{ flex: "1", justifyContent: "center" }}
                    >
                      <NavMenu />
                    </div>
                    <div className="header-action" style={headerActionStyle}>
                      <ul className="list-wrap">
                        <li className="header-login">
                          {isWalletConnected ? (
                            <button
                              className="connect-btn"
                              onClick={disconnectWallet}
                            >
                              Disconnect
                              <i className="connect-btn-icon fas fa-wallet"></i>
                            </button>
                          ) : (
                            <button
                              className="connect-btn"
                              onClick={connectWallet}
                            >
                              Connect Wallet
                              <i className="connect-btn-icon fas fa-wallet"></i>
                            </button>
                          )}
                        </li>
                      </ul>
                    </div>
                    <div
                      onClick={() => setIsActive(true)}
                      className="mobile-nav-toggler"
                      style={mobileNavTogglerStyle}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "44px", // Ensures perfect circle
                          height: "44px",
                          backgroundColor: "#01ff02",
                          borderRadius: "50%",
                        }}
                      >
                        <i
                          className="fas fa-bars"
                          style={{
                            fontSize: "24px",
                            cursor: "pointer",
                            color: "#000", // Ensure the icon is visible on green
                          }}
                        ></i>
                      </div>
                    </div>
                  </nav>
                </div>
                <div
                  className="mobile-wallet-action"
                  style={mobileWalletActionStyle}
                >
                  <ul className="list-wrap">
                    <li className="header-login">
                      {isWalletConnected ? (
                        <button
                          className="connect-btn"
                          onClick={disconnectWallet}
                        >
                          Disconnect
                          <i className="connect-btn-icon fas fa-wallet"></i>
                        </button>
                      ) : (
                        <button className="connect-btn" onClick={connectWallet}>
                          Connect Wallet
                          <i className="connect-btn-icon fas fa-wallet"></i>
                        </button>
                      )}
                    </li>
                  </ul>
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
};

export default HeaderThree;
