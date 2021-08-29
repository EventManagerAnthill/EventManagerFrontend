import React from "react";
import { Link } from "react-router-dom";
import './Header.scss';
import User from '../../../assets/images/User.png'
import { useAppDispatch, useAppSelector } from "../../../app/state/store";
import { leftBarOpen, leftBarClose, selectLeftBarOpen } from '../../../features/leftBar/leftBarSlice';
import { getUserRequested, selectUserFirstName, selectUserfotoUrl, selectUserLastName } from '../../../features/user/userSlice';
import { getEmail } from "../../../useToken";

const optionsForSelect = ["Personal settings", "Sign out"];

export const Header = () => {
    const dispatch = useAppDispatch();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const firstName = useAppSelector(selectUserFirstName);
    const lastName = useAppSelector(selectUserLastName);
    const fotoUrl = useAppSelector(selectUserfotoUrl);

    React.useEffect(() => {
        let param = new URLSearchParams();
        param.append("email", getEmail() ?? "");
        dispatch(getUserRequested(param));
    },[]);

    const onClickMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        isLeftBarOpen ? dispatch(leftBarClose()) : dispatch(leftBarOpen());
    }

    const onClickSelect = (name: string) => {
        console.log(name);
    }

    return (
        <header className="Header">
            <div className="HeadDiv">
                <div className="HeadLeft">
                    <div className="HeadMenu" onClick={(e) => onClickMenu(e)} >
                        <div className={isLeftBarOpen ? "HeadMenu-One HeadMenu-OneClick" : "HeadMenu-One"}></div>
                        <div className={isLeftBarOpen ? "HeadMenu-Two HeadMenu-TwoClick" : "HeadMenu-Two"}></div>
                        <div className={isLeftBarOpen ? "HeadMenu-Three HeadMenu-ThreeClick" : "HeadMenu-Three"}></div>
                    </div>
                    <div className="DivLink">
                        <Link className="DivLink-Link" to="/">Event manager</Link>
                    </div>
                </div>
                <div className="DivUser">
                    <img className="DivUser-Img" src={fotoUrl ?? User} />
                    <span className="DivUser-Text">{lastName}{' '}{firstName}</span>
                    <div className="customSelectBlock">
                        {optionsForSelect.map((option) => (
                            <div className="selectOption" onClick={() => onClickSelect(option)}>
                                {option}
                            </div>))}
                    </div>
                </div>
            </div>
        </header>
    );
}
