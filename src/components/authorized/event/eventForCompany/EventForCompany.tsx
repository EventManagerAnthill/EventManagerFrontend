import React from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../../../app/state/store";
import { selectCompaniesByUser } from "../../../../features/company/companySlice";
import { EventModel } from "../../../../features/event/eventModel";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";
import './EventForCompany.scss';

type Props = Pick<EventModel, 'id' | 'name' | 'description'>;

export const EventForCompany = (props: Props) => {
    const history = useHistory();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);

    return (
        <div className={isLeftBarOpen ? "eventForCompanyLeftBar" :"eventForCompany"}>
            <div className="eventForCompanyInfoBlock">
                <span className="eventForCompanyName">{props.name ?? "event name"}</span>
                <span className="eventForCompanyDescription">{props.description ?? "event description"}</span>
            </div>
            <div className="eventForCompanyBlockButton">
                <div className="eventForCompanyButton" onClick={() => history.push(`/event/${props.id}`)}>Learn more</div>
            </div>
        </div>
    )
}