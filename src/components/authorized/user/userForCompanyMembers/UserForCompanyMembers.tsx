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
        <div className={isLeftBarOpen ? "companyForListLeftBar" : "companyForList"}>
            <div className="companyForListInfoBlock">
                <div className="companyPhotoBlock">
                    <img className="companyPhoto" src={props.fotoUrl ?? "https://brilliant24.ru/files/cat/template_01.png"} />
                </div>
                <div className="companyMain">
                    <div className="companyNameBlock">
                        <span className="companyName">{(props.lastName + " " + props.firstName) ?? "user"}</span>
                    </div>
                    {/* {(props.userRole == 1 || props.userRole == 2) &&
                        <div className="companyButtonsBlock">
                            <div className="companyButton" onClick={() => history.push(`/company/${props.id}/edit`)}>Edit company</div>
                            {props.userRole == 1 &&
                                <div className="companyButton" onClick={() => onClickDeleteCompany(props.id!, props.name)}>Delete company</div>
                            }
                            <div className="companyButton" onClick={() => history.push(`/company/${props.id}/event/new`)}>+ Add new event</div>
                        </div>
                    } */}
                </div>
            </div>
            <div className="companyForListBlockButton">
                <div className="companyForListButton">Learn more</div>
            </div>
        </div>
    )
}