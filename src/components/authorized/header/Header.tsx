import React from "react";
import { Link } from "react-router-dom";
import './Header.scss';
import User from '../../../assets/images/User.png'

export const Header = () => {
    let isClickMenu:boolean = false;

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        isClickMenu ? isClickMenu = false : isClickMenu = true;
    }

    return (
        <header className="Header">
            <div className="HeadDiv">
                <div className="HeadLeft">
                    <div className="HeadMenu" onClick={(e) => onClick(e)} >
                        <div className={!isClickMenu ? "HeadMenu-One" : "HeadMenu-OneClick"}></div>
                        <div className={!isClickMenu ? "HeadMenu-Two" : "HeadMenu-TwoClick"}></div>
                        <div className={!isClickMenu ? "HeadMenu-Three" : "HeadMenu-ThreeClick"}></div>
                    </div>
                    <div className="DivLink">
                        <Link className="DivLink-Link" to="/">Event manager</Link>
                    </div>
                </div>
                <div className="DivUser">
                    <img className="DivUser-Img" src={User} />
                    <span className="DivUser-Text">Iarkin Viacheslav</span>
                </div>
            </div>
        </header>
    );
}
