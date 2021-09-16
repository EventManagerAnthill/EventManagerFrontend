import React from "react";
import './EventEdit.scss';
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";
import { selectUserFormId } from "../../../../features/user/userSlice";
import { Spinner } from "../../../spinner/Spinner";
import { useParams } from "react-router-dom";
import { deletePhotoRequested, editEventRequested, getEventRequested, selectEvent, selectEventEdit, selectEventIsLoading, uploadPhotoRequested } from "../../../../features/event/eventSlicer";
import { EventFormModel, EventModel } from "../../../../features/event/eventModel";

type Avatar = {
    file: File | null;
    imagePreviewUrl: string | ArrayBuffer | null;
}

export const EventEdit = () => {
    let { eventId } = useParams<{ eventId: string | undefined }>();
    const dispatch = useAppDispatch();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const eventEdit = useAppSelector(selectEventEdit);
    const event = useAppSelector(selectEvent);
    const eventIsLoading = useAppSelector(selectEventIsLoading);
    const [state, setState] = React.useState<EventFormModel>(eventEdit);
    const userId = useAppSelector(selectUserFormId);
    const [file, setfile] = React.useState<Avatar>({ file: null, imagePreviewUrl: null });
    const input = React.useRef<HTMLInputElement>(null);

    const setModel = (model: EventModel) => {
        setState({
            ...state,
            eventModel: model,
        });
    }

    const onClickPhoto = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        if (null !== input.current) {
            input.current.click();
        }
    }

    const onChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                setfile({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }

            reader.readAsDataURL(file);
        }
    }

    const onClickDeletePhoto = () => {
        setfile({ file: null, imagePreviewUrl: null });
        let param = new URLSearchParams();
        param.append("EventId", String(state.eventModel.id));
        dispatch(deletePhotoRequested(param));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(editEventRequested({ ...state.eventModel }));
        if (file.file !== null) {
            let param = new URLSearchParams();
            param.append("eventId", String(state.eventModel.id));
            let formData = new FormData();
            formData.append("file", file.file);
            dispatch(uploadPhotoRequested({ ...state.eventUploadPhotoModel, param: param, formData: formData }));
        }
    }

    React.useEffect(() => {
        if (eventId) {
            let param = new URLSearchParams();
            param.append("userId", String(userId));
            dispatch(getEventRequested({ eventId: +(eventId), param: param }));
        }
    }, [eventId, userId]);

    React.useEffect(() => {
        if (event) {
            setState({ ...state, eventModel: event })
        }
    }, [event?.id]);

    return (
        <>
            {(eventEdit.isLoading || eventIsLoading) && <Spinner />}
            <form className={isLeftBarOpen ? "eventEditWithLeftBar" : "eventEdit"} onSubmit={e => handleSubmit(e)}>
                <div className="eventEditMain">
                    <div className="eventEditForm">
                        <div className="blockInputAndLabel">
                            <label
                                className="blockLabel">
                                Name of your event
                                <input
                                    className="blockInput"
                                    required
                                    id="nameevent"
                                    name="nameevent"
                                    autoComplete="eventEditname"
                                    defaultValue={eventEdit.eventModel.name}
                                    onChange={(e) => setModel({ ...state.eventModel, name: e.currentTarget.value })}
                                />
                            </label>
                        </div>
                        <div className="blockInputAndLabel">
                            <label
                                className="blockLabel">
                                Add a description
                                <textarea
                                    className="blockTextarea"
                                    id="descriptionevent"
                                    name="descriptionevent"
                                    autoComplete="eventEditdescription"
                                    defaultValue={eventEdit.eventModel.description}
                                    onChange={(e) => setModel({ ...state.eventModel, description: e.currentTarget.value })}
                                />
                            </label>
                        </div>
                        <div className="blockInputAndLabel">
                            <label
                                className="blockLabel">
                                Add a holding date
                                <input
                                    required
                                    className="blockInput"
                                    id="descriptionevent"
                                    type="datetime-local"
                                    name="descriptionevent"
                                    autoComplete="eventEditholdingdate"
                                    defaultValue={eventEdit.eventModel.holdingDate}
                                    onChange={(e) => setModel({ ...state.eventModel, holdingDate: e.currentTarget.value })}
                                />
                            </label>
                        </div>
                        <div className="blockRadioAndLabel">
                            <span className="blockLabel"> Choose the type of your event</span>
                            <div className="blockRadio">
                                <label
                                    className="blockRadioLabel">
                                    <input
                                        className="blockInputRadio"
                                        type="radio"
                                        name="type"
                                        value="1"
                                        checked={state.eventModel.type == 1}
                                        onChange={(e) => setModel({ ...state.eventModel, type: +(e.currentTarget.value) })}
                                    />
                                    Public
                                </label>
                                <label
                                    className="blockRadioLabel">
                                    <input
                                        className="blockInputRadio"
                                        type="radio"
                                        name="type"
                                        value="2"
                                        checked={state.eventModel.type == 2}
                                        onChange={(e) => setModel({ ...state.eventModel, type: +(e.currentTarget.value) })}
                                    />
                                    Private
                                </label>
                                <span className="blockInfoType">{state.eventModel.type == 1 ? "Everyone will see this event" : "Only members of this event will see it"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="eventEditPhotoBlock">
                        <div className="PhotoBlock">
                            <img className="eventEditPhoto"
                                src={(file.imagePreviewUrl && String(file.imagePreviewUrl)) ?? eventEdit.eventModel.fotoUrl ?? "https://brilliant24.ru/files/cat/template_01.png"}
                            />
                            <div className="TextBlock" onClick={(e) => onClickPhoto(e)}>
                                Change poster
                            </div>
                        </div>
                        <span className="eventEditPhotoButton" onClick={onClickDeletePhoto}>
                            Delete poster
                        </span>
                        <input id="inputFile" ref={input} className="eventEditPhotoInput" type="file" accept=".jpg, .jpeg, .png" onChange={(e) => onChangePhoto(e)} />
                    </div>
                </div>
                {/* <div className="eventEditInviteEmailsBlock">
            {state.eventInviteUsersModel && state.eventInviteUsersModel.email.map((email) => <div>{email}</div>)}
        </div> */}
                <div className="eventEditButtonBlock">
                    <button
                        type="submit"
                        className="eventEditButton"
                        disabled={eventEdit.isLoading}
                    >
                        Create event
                    </button>
                </div>
            </form>
        </>
    );
}




