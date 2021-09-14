import React from "react";
import './Company.scss';
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { acceptInvitationRequested, getCompanyRequested, makeCompanyDelRequested, selectCompany, selectCompanyIsLoading } from "../../../../features/company/companySlice";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";
import { getCompanyEventsRequested, selectEventIsLoading, selectEventsCompany } from "../../../../features/event/eventSlicer";
import { EventForCompany } from "../../event/eventForCompany/EventForCompany";
import { useConfirm } from "material-ui-confirm";
import { selectUserFormId } from "../../../../features/user/userSlice";
import { Spinner } from "../../../spinner/Spinner";

export const Company = () => {
    let { companyId } = useParams<{ companyId: string | undefined }>();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const confirm = useConfirm();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const company = useAppSelector(selectCompany);
    const eventsCompany = useAppSelector(selectEventsCompany);
    const userId = useAppSelector(selectUserFormId);
    const companyIsLoading = useAppSelector(selectCompanyIsLoading);
    const eventIsLoading = useAppSelector(selectEventIsLoading);

    React.useEffect(() => {
        if (companyId) {
            let param = new URLSearchParams();
            param.append("CompanyId", companyId);
            param.append("page", String(eventsCompany?.paging?.currentPage ?? "1"));
            param.append("pageSize", "6");
            dispatch(getCompanyEventsRequested(param));
            let paramForCompany = new URLSearchParams();
            paramForCompany.append("userId", String(userId));
            dispatch(getCompanyRequested({ companyId: +(companyId), param: paramForCompany }));
        }
    }, [companyId, userId]);

    React.useEffect(() => {
        if (location.search != "") {
            let params = new URLSearchParams(location.search);
            dispatch(acceptInvitationRequested({ companyId: +(params.get("ObjectId")!), email: params.get("email")! }));
        }
    }, []);

    const onClickDeleteCompany = (companyId: number, companyName: string) => {
        confirm({ title: '', description: `Are you sure you want to delete company "${companyName}"?`, confirmationText: 'Delete' })
            .then(() => {
                dispatch(makeCompanyDelRequested(companyId));
            });
    };

    const onClickPage = (numberPage: number) => {
        let param = new URLSearchParams();
        param.append("CompanyId", String(companyId));
        param.append("page", String(numberPage));
        param.append("pagesize", "6");
        dispatch(getCompanyEventsRequested(param));
    };

    const getPages = (totalPages: number) => {
        let content = [];
        let i: number = 1;
        while (i <= totalPages) {
            content.push(i)
            i++;
        }
        return content;
    };

    return (
        <>
            {(companyIsLoading || eventIsLoading) && <Spinner />}
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
                            {eventsCompany && eventsCompany.events && eventsCompany.events.map((event) =>
                                <div className="companyMainEvenBlock">
                                    <EventForCompany id={event.id} name={event.name} description={event.description} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="companyMainFooter">
                        <div className="blockTotal">
                            <span className="total">{`Total objects: ${(eventsCompany && eventsCompany.paging && eventsCompany.paging.totalItems) ?? "0"}`}</span>
                        </div>
                        <div className="blockButtons">
                            <div className="blockPagesButtons">
                                {eventsCompany && eventsCompany.paging && getPages(eventsCompany.paging.totalPages).map((pageNumber) =>
                                    eventsCompany.paging!.currentPage == pageNumber ?
                                        <div className="pageButton">{pageNumber}</div> :
                                        <div className="pageButton pageButtonNotActive" onClick={() => onClickPage(pageNumber)}>{pageNumber}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}