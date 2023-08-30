import React, { useState } from "react";

import Link from "next/link";

import "./AccountPanel.scss";
import { useWindowSize } from "@/shared/hooks/windowSize";
import { CSSTransition } from "react-transition-group";

const AccountPanel = (props) => {
    const [windowWidth] = useWindowSize();
    const [showPanel, setShowPanel] = useState(false);
    const panelData = props.panelData;
    return (
        <>
            {windowWidth > 767 ? (
                <div className="left-panel-wrap">
                    <div
                        className={
                            showPanel ? "panel-wrap active" : "panel-wrap"
                        }
                    >
                        {panelData?.map((item, index) => {
                            return (
                                <div
                                    className="box-wrap"
                                    key={index}
                                    onClick={() => setShowPanel(!showPanel)}
                                >
                                    <Link
                                        className="panel-box"
                                        href={item.link}
                                        prefetch={false}
                                        aria-label="panel data"
                                    >
                                        <i className={item.className}></i>
                                        <div className="name-wrap">
                                            <h2>{item.panelItem}</h2>
                                            <h3>{item.panelType}</h3>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                        <div className="logout-wrap">
                            <button
                                className="logout-btn"
                                aria-label="Logout"
                                role="button"
                            >
                                <i className="icon-logout"></i>
                                <span className="logout-text">Log Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="left-panel-wrap">
                    <div
                        className="open-panel"
                        onClick={() => setShowPanel(!showPanel)}
                    >
                        <button
                            className={
                                showPanel ? "mob-menu active" : "mob-menu"
                            }
                            aria-label="menu bar"
                            role="button"
                        >
                            <span className="menu-bar"></span>
                            <span className="menu-bar"></span>
                            <span className="menu-bar"></span>
                        </button>
                        Manage Account
                    </div>
                    <CSSTransition
                        in={showPanel}
                        timeout={200}
                        classNames="slide-in-left"
                        mountOnEnter
                        unmountOnExit
                    >
                        <div
                            className={
                                showPanel ? "panel-wrap active" : "panel-wrap"
                            }
                        >
                            <button
                                className="close-pannel"
                                onClick={() => setShowPanel(!showPanel)}
                            >
                                {" "}
                                <i className="icon-back"></i>Back
                            </button>
                            {panelData?.map((item, index) => {
                                return (
                                    <div
                                        className="box-wrap"
                                        key={index}
                                        onClick={() => setShowPanel(!showPanel)}
                                    >
                                        <Link
                                            className="panel-box"
                                            href={item.link}
                                            aria-label="panel data"
                                        >
                                            <i className={item.className}></i>
                                            <div className="name-wrap">
                                                <h2>{item.panelItem}</h2>
                                                <h3>{item.panelType}</h3>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                            <div className="logout-wrap">
                                <button
                                    className="logout-btn"
                                    aria-label="Logout"
                                    role="button"
                                >
                                    <i className="icon-logout"></i>
                                    <span className="logout-text">Log Out</span>
                                </button>
                            </div>
                        </div>
                    </CSSTransition>
                </div>
            )}
        </>
    );
};

export default AccountPanel;
