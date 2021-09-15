import React from "react";
import './Event.scss';
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";
import { cancelEventRequested, getEventRequested, makeEventDelRequested, selectEvent, selectEventIsLoading } from "../../../../features/event/eventSlicer";
import { useConfirm } from "material-ui-confirm";
import { selectUserFormId } from "../../../../features/user/userSlice";
import { Spinner } from "../../../spinner/Spinner";

export const EventComponent = () => {
    let { eventId } = useParams<{ eventId: string | undefined }>();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const confirm = useConfirm();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const event = useAppSelector(selectEvent);
    const userId = useAppSelector(selectUserFormId);
    const eventIsLoading = useAppSelector(selectEventIsLoading);

    React.useEffect(() => {
        if (eventId) {
            let param = new URLSearchParams();
            param.append("userId", String(userId));
            dispatch(getEventRequested({ eventId: +(eventId), param: param }));
        }
    }, [eventId, userId]);

    // React.useEffect(() => {
    //     if (location.search != "") {
    //         let params = new URLSearchParams(location.search);
    //         dispatch(acceptInvitationRequested({ companyId: +(params.get("ObjectId")!), email: params.get("email")! }));
    //     }
    // }, []);

    const onClickDeleteEvent = (eventId: number, eventName: string) => {
        confirm({ title: '', description: `Are you sure you want to delete event "${eventName}"?`, confirmationText: 'Yes', cancellationText: 'No' })
            .then(() => {
                dispatch(makeEventDelRequested(eventId));
            });
    };

    const onClickCancelEvent = (eventId: number, eventName: string) => {
        confirm({ title: '', description: `Are you sure you want to cancel event "${eventName}"?`, confirmationText: 'Yes', cancellationText: 'No' })
            .then(() => {
                dispatch(cancelEventRequested(eventId));
            });
    };

    return (
        <>
            {(eventIsLoading || eventIsLoading) && <Spinner />}
            <div className={isLeftBarOpen ? "eventContainerLeftBar" : "eventContainer"}>
                {(event && event.fotoUrl) &&
                    <div className="eventHeader">
                        <img className="eventHeaderPoster" src={(event && event.fotoUrl)} />
                    </div>
                }
                <div className="eventMain">
                    <div className="eventMainBlock">
                        <div className="eventMainInfo">
                            <div className="eventMainNameBlock">
                                <span className="eventName">{(event && event.name) ?? "Event name"}</span>
                            </div>
                        </div>
                        <div className="eventMainDescriptionBlock">
                            <span className="eventMainDescription">{(event && event.description) ?? "Event description"}</span>
                        </div>
                    </div>
                    {event && event.userRole && (event.userRole == 1 || event.userRole == 1) &&
                        <div className="eventMainButtonsBlock">
                            <button className="eventMainButton" onClick={() => history.push(`/event/${eventId}/members`)}>Members</button>
                            <button className="eventMainButton" onClick={() => history.push(`/event/${eventId}/edit`)}>Edit event</button>
                            <button className="eventMainButton" onClick={() => onClickCancelEvent(+(eventId!), event?.name ?? "")}>Cancel event</button>
                            {event.userRole == 1 &&
                                <button className="eventMainButton" onClick={() => onClickDeleteEvent(+(eventId!), event?.name ?? "")}>Delete event</button>
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    )
}