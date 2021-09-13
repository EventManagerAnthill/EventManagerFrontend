import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { CompanyModel } from "../../../../features/company/companyModel";
import { makeCompanyDelRequested } from "../../../../features/company/companySlice";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";
import { routerRedirect } from "../../../../features/routerSlice";
import { UserModel } from "../../../../features/user/userModel";
import './UserForCompanyMembers.scss';

type Props = Pick<UserModel, 'id' | 'firstName' | 'lastName' | 'fotoUrl'>;

export const UserForCompanyMembers = (props: Props) => {
    const dispatch = useAppDispatch();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);

    return (
        <div className={isLeftBarOpen ? "userForListLeftBar" : "userForList"}>
            <div className="userForListInfoBlock">
                <div className="userPhotoBlock">
                    <img className="userPhoto" src={props.fotoUrl ?? "https://brilliant24.ru/files/cat/template_01.png"} />
                </div>
                <div className="userMain">
                    <div className="userNameBlock">
                        <span className="userName">{(props.lastName + " " + props.firstName) ?? "user"}</span>
                    </div>
                    {/* {(props.userRole == 1 || props.userRole == 2) &&
                        <div className="userButtonsBlock">
                            <div className="userButton" onClick={() => history.push(`/user/${props.id}/edit`)}>Edit user</div>
                            {props.userRole == 1 &&
                                <div className="userButton" onClick={() => onClickDeleteuser(props.id!, props.name)}>Delete user</div>
                            }
                            <div className="userButton" onClick={() => history.push(`/user/${props.id}/event/new`)}>+ Add new event</div>
                        </div>
                    } */}
                </div>
            </div>
            <div className="userForListBlockButton">
                <div className="userForListButton">Learn more</div>
            </div>
        </div>
    )
}