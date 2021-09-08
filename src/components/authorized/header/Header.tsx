import React from "react";
import { Link, useHistory } from "react-router-dom";
import './Header.scss';
import User from '../../../assets/images/User.png'
import { useAppDispatch, useAppSelector } from "../../../app/state/store";
import { leftBarOpen, leftBarClose, selectLeftBarOpen } from '../../../features/leftBar/leftBarSlice';
import { getUserRequested, selectUserFirstName, selectUserfotoUrl, selectUserLastName } from '../../../features/user/userSlice';
import { getEmail, signOut } from "../../../useToken";
import { useConfirm } from 'material-ui-confirm';

const optionsForSelect = ["Personal settings", "Sign out"];

export const Header = () => {
    const history = useHistory();
    const confirm = useConfirm();
    const dispatch = useAppDispatch();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const firstName = useAppSelector(selectUserFirstName);
    const lastName = useAppSelector(selectUserLastName);
    const fotoUrl = useAppSelector(selectUserfotoUrl);

    React.useEffect(() => {
        let param = new URLSearchParams();
        param.append("email", getEmail() ?? "");
        dispatch(getUserRequested(param));
    }, []);

    const onClickMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        isLeftBarOpen ? dispatch(leftBarClose()) : dispatch(leftBarOpen());
    }

    const onClickSelect = (option: string) => {
        switch (option) {
            case 'Personal settings':
                history.push("/personalsettings");
                break;
            case 'Sign out':
                confirm({ title: '', description: 'Are you sure you want to sign out?', confirmationText: 'Sign out' })
                    .then(() => {
                        signOut();
                        history.push("/");
                    });
                break;
        }
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
                    <span className="DivUser-Text">{lastName == "" ? "lastName" : lastName}{' '}{firstName == "" ? "firstName" : firstName}</span>
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
