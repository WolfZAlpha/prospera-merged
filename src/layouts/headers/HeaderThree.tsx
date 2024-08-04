"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import UseSticky from "../../hooks/UseSticky";
import Image from "next/image";
import NavMenu from "./Menu/NavMenu";
import Sidebar from "./Menu/Sidebar";
import HeaderOffcanvas from "./Menu/HeaderOffcanvas";
import useWalletConnection from "@/hooks/useWalletConnection";
import { useWalletContext } from "@/context/WalletContext";

import logo_1 from "@/assets/img/logo/logo.png";

const HeaderThree = () => {
  const { sticky } = UseSticky();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [offCanvas, setOffCanvas] = useState<boolean>(false);
  const { connectWallet, disconnectWallet } = useWalletConnection();
  const { isWalletConnected } = useWalletContext();
  const [isMobile, setIsMobile] = useState<boolean>(true); // Default to true for mobile-first approach
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    handleResize(); // Check initially

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const buttonStyle: React.CSSProperties = {
    backgroundColor: sticky ? "#fff" : "#000",
    color: sticky ? "#000" : "#fff",
    border: sticky ? "1px solid #000" : "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.875rem",
    transition: "background-color 0.3s, color 0.3s, border 0.3s",
  };

  const logoWidth = isMobile ? 120 : 150;

  return (
    <>
      <header id="header" style={{ position: "relative" }}>
        {isClient && (
          <div
            id="sticky-header"
            className={`menu-area transparent-header ${
              sticky ? "sticky-menu" : ""
            }`}
            style={{
              width: "100%",
              background: sticky ? "rgba(255, 255, 255, 0.9)" : "transparent",
              transition: "background 0.3s",
            }}
          >
            <div className="container custom-container">
              <div className="row">
                <div className="col-12">
                  <div
                    className="menu-wrap"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <nav
                      className="menu-nav"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div
                        className="logo"
                        style={{ flex: "1", display: "flex", alignItems: "center" }}
                      >
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
                        className="navbar-wrap main-menu"
                        style={{ flex: "3", display: isMobile ? "none" : "flex" }}
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
                                style={buttonStyle}
                              >
                                Disconnect
                                <i
                                  className="connect-btn-icon fas fa-wallet"
                                  style={{ marginLeft: "8px" }}
                                ></i>
                              </button>
                            ) : (
                              <button
                                className="connect-btn"
                                onClick={connectWallet}
                                style={buttonStyle}
                              >
                                Connect Wallet
                                <i
                                  className="connect-btn-icon fas fa-wallet"
                                  style={{ marginLeft: "8px" }}
                                ></i>
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
                              color: "#000",
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
                            style={buttonStyle}
                          >
                            Disconnect
                            <i
                              className="connect-btn-icon fas fa-wallet"
                              style={{ marginLeft: "8px" }}
                            ></i>
                          </button>
                        ) : (
                          <button
                            className="connect-btn"
                            onClick={connectWallet}
                            style={buttonStyle}
                          >
                            Connect Wallet
                            <i
                              className="connect-btn-icon fas fa-wallet"
                              style={{ marginLeft: "8px" }}
                            ></i>
                          </button>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <Sidebar style={false} isActive={isActive} setIsActive={setIsActive} />
      <HeaderOffcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
    </>
  );
};

export default HeaderThree;