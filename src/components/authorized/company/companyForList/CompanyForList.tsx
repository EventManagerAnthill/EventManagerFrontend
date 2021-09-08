import { useConfirm } from "material-ui-confirm";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { CompanyModel } from "../../../../features/company/companyModel";
import { makeCompanyDelRequested } from "../../../../features/company/companySlice";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";
import { routerRedirect } from "../../../../features/routerSlice";
import './CompanyForList.scss';

type Props = Pick<CompanyModel, 'id' | 'name' | 'fotoUrl' | 'userRole'>;

export const CompanyForList = (props: Props) => {
    const history = useHistory();
    const confirm = useConfirm();
    const dispatch = useAppDispatch();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);

    const onClickDeleteCompany = (companyId: number, companyName: string) => {
        confirm({ title: '', description: `Are you sure you want to delete company "${companyName}"?`, confirmationText: 'Delete' })
            .then(() => {
                dispatch(makeCompanyDelRequested(companyId));
            });
    };

    return (
        <div className={isLeftBarOpen ? "companyForListLeftBar" : "companyForList"}>
            <div className="companyForListInfoBlock">
                <div className="companyPhotoBlock">
                    <img className="companyPhoto" src={props.fotoUrl ?? "https://brilliant24.ru/files/cat/template_01.png"} />
                </div>
                <div className="companyMain">
                    <div className="companyNameBlock">
                        <span className="companyName">{props.name ?? "company name"}</span>
                    </div>
                    {(props.userRole == 1 || props.userRole == 2) &&
                        <div className="companyButtonsBlock">
                            <div className="companyButton" onClick={() => history.push(`/company/${props.id}/edit`)}>Edit company</div>
                            {props.userRole == 1 &&
                                <div className="companyButton" onClick={() => onClickDeleteCompany(props.id!, props.name)}>Delete company</div>
                            }
                            <div className="companyButton" onClick={() => history.push(`/company/${props.id}/event/new`)}>+ Add new event</div>
                        </div>
                    }
                </div>
            </div>
            <div className="companyForListBlockButton">
                <div className="companyForListButton" onClick={() => history.push(`/company/${props.id}`)}>Learn more</div>
            </div>
        </div>
    )
}