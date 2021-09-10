import React from "react";
import './Company.scss';
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { getCompanyRequested, makeCompanyDelRequested, selectCompany, selectCompanyIsLoading } from "../../../../features/company/companySlice";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";
import { getCompanyEventsRequested, selectEventsCompany } from "../../../../features/event/eventSlicer";
import { EventForCompany } from "../../event/eventForCompany/EventForCompany";
import { useConfirm } from "material-ui-confirm";
import { selectUserId } from "../../../../features/user/userSlice";
import { Spinner } from "../../../spinner/Spinner";

export const Company = () => {
    let { companyId } = useParams<{ companyId: string | undefined }>();
    const history = useHistory();
    const dispatch = useAppDispatch();
    const confirm = useConfirm();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const company = useAppSelector(selectCompany);
    const eventsCompany = useAppSelector(selectEventsCompany);
    const userId = useAppSelector(selectUserId);
    const companyIsLoading = useAppSelector(selectCompanyIsLoading);


    React.useEffect(() => {
        if (companyId) {
            let param = new URLSearchParams();
            param.append("CompanyId", companyId);
            dispatch(getCompanyEventsRequested(param));
            let paramForCompany = new URLSearchParams();
            paramForCompany.append("userId", String(userId));
            dispatch(getCompanyRequested({ companyId: +(companyId), param: paramForCompany }));
        }
    }, [companyId, userId]);

    const onClickDeleteCompany = (companyId: number, companyName: string) => {
        confirm({ title: '', description: `Are you sure you want to delete company "${companyName}"?`, confirmationText: 'Delete' })
            .then(() => {
                dispatch(makeCompanyDelRequested(companyId));
            });
    };

    return (
        <>
            {companyIsLoading && <Spinner />}
            <div className={isLeftBarOpen ? "companyContainerLeftBar" : "companyContainer"}>
                <div className="companyHeader">
                    <div className="companyHeaderBlock">
                        <div className="companyHeaderImageBlock">
                            <img className="companyHeaderImage" src={(company && company.fotoUrl) ?? "https://brilliant24.ru/files/cat/template_01.png"} />
                        </div>
                        <div className="companyHeaderInfo">
                            <div className="companyHeaderNameBlock">
                                <span className="companyName">{(company && company.name) ?? "Company name"}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="companyMain">
                    <div className="companyMainBlock">
                        <div className="companyMainDescriptionBlock">
                            <span className="companyMainDescription">{(company && company.description) ?? "Company description"}</span>
                        </div>
                    </div>
                    <div className="companyMainButtonsBlock">
                        <button className="companyMainButton" onClick={() => history.push(`/company/${companyId}/members`)}>Members</button>
                        <button className="companyMainButton" onClick={() => history.push(`/company/${companyId}/edit`)}>Edit company</button>
                        <button className="companyMainButton" onClick={() => onClickDeleteCompany(+(companyId!), company!.name)}>Delete company</button>
                        <button className="companyMainButton" onClick={() => history.push(`/company/${companyId}/event/new`)}>+ Add new event</button>
                    </div>
                    <div className="companyMainEventsBlock">
                        <span className="companyMainEventsBlockSpan">Our events</span>
                    </div>
                    <div>
                        <div className="companyMainEventsWrapBlock">
                            {eventsCompany && eventsCompany.map((event) =>
                                <div className="companyMainEvenBlock">
                                    <EventForCompany id={event.id} name={event.name} description={event.description} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}