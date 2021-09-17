import React from "react";
import './EventNew.scss';
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";
import { selectUserFormId } from "../../../../features/user/userSlice";
import { Spinner } from "../../../spinner/Spinner";
import { useParams } from "react-router-dom";
import { createEventRequested, selectEventNew } from "../../../../features/event/eventSlicer";
import { EventInviteUsersModel, EventModel, EventNewFormModel, EventUploadModel } from "../../../../features/event/eventModel";

type Avatar = {
    file: File | null;
    imagePreviewUrl: string | ArrayBuffer | null;
}

export const EventNew = () => {
    let { companyId } = useParams<{ companyId: string | undefined }>();
    const dispatch = useAppDispatch();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const eventNew = useAppSelector(selectEventNew);
    const [state, setState] = React.useState<EventNewFormModel>(eventNew);
    const userId = useAppSelector(selectUserFormId);
    const [file, setfile] = React.useState<Avatar>({ file: null, imagePreviewUrl: null });
    const input = React.useRef<HTMLInputElement>(null);
    const inputCSV = React.useRef<HTMLInputElement>(null);
    const [fileCSV, setfileCSV] = React.useState<Avatar>({ file: null, imagePreviewUrl: null });
    const [email, setEmail] = React.useState<string>("");
    const [emails, setEmails] = React.useState<string[]>([]);
    const [isValidated, setIsValidated] = React.useState<boolean>(true);
    const inputEmail = React.useRef<HTMLInputElement>(null);

    const setModel = (model: EventModel) => {
        setState({
            ...state,
            eventModel: model,
        });
    }

    const setUploadModel = (model: EventUploadModel, type: "photo" | "csv") => {
        switch (type) {
            case 'photo':
                setState({
                    ...state,
                    eventUploadPhotoModel: model,
                });
                break;
            case 'csv':
                setState({
                    ...state,
                    eventAddUsersCSVModel: model,
                });
                break;
        }
    }

    const setInviteUsersModel = (model: EventInviteUsersModel) => {
        setState({
            ...state,
            eventInviteUsersModel: model,
        });
    }

    const onClickPhoto = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        if (null !== input.current) {
            input.current.click();
        }
    }

    const onClickCSV = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        if (null !== inputCSV.current) {
            inputCSV.current.click();
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

            let formData = new FormData();
            formData.append("file", file);
            setUploadModel({ ...state.eventUploadPhotoModel, formData: formData }, "photo")
        }
    }

    const onChangeCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                setfileCSV({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }

            reader.readAsDataURL(file);

            let formData = new FormData();
            formData.append("file", file);
            setUploadModel({ ...state.eventAddUsersCSVModel, formData: formData }, "csv")
        }
    }

    const onClickDeletePhoto = () => {
        setfile({ file: null, imagePreviewUrl: null });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createEventRequested({ ...state }));
    }

    React.useEffect(() => {
        if (companyId) {
            setModel({ ...state.eventModel, userId: userId, companyId: +(companyId) });
        }
    }, [companyId, userId]);

    const onClickSendInvitations = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            emails.push(email);
            setInviteUsersModel({ ...state.eventInviteUsersModel, email: emails })
            setEmail("");
            setIsValidated(true);
            if (null !== inputEmail.current) {
                inputEmail.current.value = "";
            }
        } else
            setIsValidated(false);
    }

    return (
        <>
            {eventNew.isLoading && <Spinner />}
            <form className={isLeftBarOpen ? "eventWithLeftBar" : "event"} onSubmit={e => handleSubmit(e)}>
                <div className="eventMain">
                    <div className="eventForm">
                        <div className="blockInputAndLabel">
                            <label
                                className="blockLabel">
                                Name of your event
                                <input
                                    className="blockInput"
                                    required
                                    id="nameevent"
                                    name="nameevent"
                                    autoComplete="eventname"
                                    defaultValue={eventNew.eventModel.name}
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
                                    autoComplete="eventdescription"
                                    defaultValue={eventNew.eventModel.description}
                                    onChange={(e) => setModel({ ...state.eventModel, description: e.currentTarget.value })}
                                />
                            </label>
                        </div>
                        <div className="blockInputAndLabel">
                            <label
                                className="blockLabel">
                                Date and time of the beginning
                                <input
                                    required
                                    className="blockInput"
                                    id="beginHoldingDate"
                                    type="datetime-local"
                                    name="beginHoldingDate"
                                    autoComplete="beginHoldingDate"
                                    defaultValue={eventNew.eventModel.beginHoldingDate}
                                    onChange={(e) => setModel({ ...state.eventModel, beginHoldingDate: e.currentTarget.value })}
                                />
                            </label>
                        </div>
                        <div className="blockInputAndLabel">
                            <label
                                className="blockLabel">
                                Date and time of the ending
                                <input
                                    required
                                    className="blockInput"
                                    id="holdingDate"
                                    type="datetime-local"
                                    name="holdingDate"
                                    autoComplete="holdingDate"
                                    defaultValue={eventNew.eventModel.holdingDate}
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
                    <div className="eventPhotoBlock">
                        <div className="PhotoBlock">
                            <img className="eventPhoto"
                                src={(file.imagePreviewUrl && String(file.imagePreviewUrl)) ?? eventNew.eventModel.fotoUrl ?? "https://brilliant24.ru/files/cat/template_01.png"}
                            />
                            <div className="TextBlock" onClick={(e) => onClickPhoto(e)}>
                                Change poster
                            </div>
                        </div>
                        <span className="eventPhotoButton" onClick={onClickDeletePhoto}>
                            Delete poster
                        </span>
                        <input id="inputFile" ref={input} className="eventPhotoInput" type="file" accept=".jpg, .jpeg, .png" onChange={(e) => onChangePhoto(e)} />
                    </div>
                </div>

                <div className="eventInviteBlock">
                    <div className="eventInviteTitleBlock">
                        <span className="eventInviteTitle">Invite people</span>
                    </div>
                    <div className="eventInviteMainBlock">
                        <div className="blockInputAndLabel">
                            <label
                                className="blockLabel">
                                Email
                                <div className="inputEmailAndButtonBlock">
                                    <input
                                        className={isValidated ? "blockInput" : "blockInput blockInputError"}
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        defaultValue={email}
                                        ref={inputEmail}
                                    />
                                    <button type="button" onClick={(e) => onClickSendInvitations(e)} className="buttonBlock">Send invitations</button>
                                </div>
                            </label>
                        </div>
                        <div className="eventCSVBlock">
                            <span className="eventCSVButton" onClick={(e) => onClickCSV(e)}>Download CSV-file</span>
                            <input id="inputFileCSV" ref={inputCSV} className="eventCSVInput" type="file" accept=".csv" onChange={(e) => onChangeCSV(e)} />
                        </div>
                    </div>
                </div>
                {/* <div className="eventInviteEmailsBlock">
                {state.eventInviteUsersModel && state.eventInviteUsersModel.email.map((email) => <div>{email}</div>)}
            </div> */}
                <div className="eventButtonBlock">
                    <button
                        type="submit"
                        className="eventButton"
                        disabled={eventNew.isLoading}
                    >
                        Create event
                    </button>
                </div>
            </form>
        </>
    );
}




