import React from "react";
import './Company.scss';
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { getCompanyRequested, selectCompany } from "../../../../features/company/companySlice";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";
import { getCompanyEventsRequested, selectEventsCompany } from "../../../../features/event/eventSlicer";
import { EventForCompany } from "../../event/eventForCompany/EventForCompany";

export const Company = () => {
    let { companyId } = useParams<{ companyId: string | undefined }>();
    const dispatch = useAppDispatch();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const company = useAppSelector(selectCompany);
    const eventsCompany = useAppSelector(selectEventsCompany);

    React.useEffect(() => {
        if (companyId) {
            let param = new URLSearchParams();
            param.append("CompanyId", companyId);
            dispatch(getCompanyEventsRequested(param));
            dispatch(getCompanyRequested(+(companyId)));
        }
    }, [companyId]);

    return (
        <div className={isLeftBarOpen ? "companyContainerLeftBar" :"companyContainer"}>
            <div className="companyHeader">
                <div className="companyHeaderBlock">
                    <div className="companyHeaderImageBlock">
                        <img className="companyHeaderImage" src={(company && company.fotoUrl)} />
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
    )
}