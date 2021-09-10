import React from "react";
import './CompanyNew.scss';
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";
import { createCompanyRequested, selectCompanyNew } from "../../../../features/company/companySlice";
import { CompanyFormModel, CompanyInviteUsersModel, CompanyModel, CompanyNewFormModel, CompanyUploadModel } from "../../../../features/company/companyModel";
import { selectUserId } from "../../../../features/user/userSlice";

type Avatar = {
    file: File | null;
    imagePreviewUrl: string | ArrayBuffer | null;
}

export const CompanyNew = () => {
    const dispatch = useAppDispatch();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const companyNew = useAppSelector(selectCompanyNew);
    const [state, setState] = React.useState<CompanyNewFormModel>(companyNew);
    const userId = useAppSelector(selectUserId);
    const [file, setfile] = React.useState<Avatar>({ file: null, imagePreviewUrl: null });
    const input = React.useRef<HTMLInputElement>(null);
    const inputCSV = React.useRef<HTMLInputElement>(null);
    const [fileCSV, setfileCSV] = React.useState<Avatar>({ file: null, imagePreviewUrl: null });
    const [email, setEmail] = React.useState<string>("");
    const [emails, setEmails] = React.useState<string[]>([]);
    const [isValidated, setIsValidated] = React.useState<boolean>(true);
    const inputEmail = React.useRef<HTMLInputElement>(null);

    const setModel = (model: CompanyModel) => {
        setState({
            ...state,
            companyModel: model,
        });
    }

    const setUploadModel = (model: CompanyUploadModel, type: "photo" | "csv") => {
        switch (type) {
            case 'photo':
                setState({
                    ...state,
                    companyUploadPhotoModel: model,
                });
                break;
            case 'csv':
                setState({
                    ...state,
                    companyAddUsersCSVModel: model,
                });
                break;
        }
    }

    const setInviteUsersModel = (model: CompanyInviteUsersModel) => {
        setState({
            ...state,
            companyInviteUsersModel: model,
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
            setUploadModel({ ...state.companyUploadPhotoModel, formData: formData }, "photo")
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
            setUploadModel({ ...state.companyAddUsersCSVModel, formData: formData }, "csv")
        }
    }

    const onClickDeletePhoto = () => {
        setfile({ file: null, imagePreviewUrl: null });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createCompanyRequested({ ...state }));
    }

    React.useEffect(() => {
        setModel({ ...state.companyModel, userId: userId });
    }, []);

    const onClickSendInvitations = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            emails.push(email);
            setInviteUsersModel({ ...state.companyInviteUsersModel, email: emails })
            setEmail("");
            setIsValidated(true);
            if (null !== inputEmail.current) {
                inputEmail.current.value = "";
            }   
        } else
            setIsValidated(false);
    }

    return (
        <form className={isLeftBarOpen ? "companyWithLeftBar" : "company"} onSubmit={e => handleSubmit(e)}>
            <div className="companyMain">
                <div className="companyForm">
                    <div className="blockInputAndLabel">
                        <label
                            className="blockLabel">
                            Name of your company
                            <input
                                className="blockInput"
                                required
                                id="nameCompany"
                                name="nameCompany"
                                autoComplete="companyname"
                                defaultValue={companyNew.companyModel.name}
                                onChange={(e) => setModel({ ...state.companyModel, name: e.currentTarget.value })}
                            />
                        </label>
                    </div>
                    <div className="blockInputAndLabel">
                        <label
                            className="blockLabel">
                            Description of your company
                            <textarea
                                className="blockTextarea"
                                id="descriptionCompany"
                                name="descriptionCompany"
                                autoComplete="companydescription"
                                defaultValue={companyNew.companyModel.description}
                                onChange={(e) => setModel({ ...state.companyModel, description: e.currentTarget.value })}
                            />
                        </label>
                    </div>
                    <div className="blockRadioAndLabel">
                        <span className="blockLabel"> Choose the type of  your company</span>
                        <div className="blockRadio">
                            <label
                                className="blockRadioLabel">
                                <input
                                    className="blockInputRadio"
                                    type="radio"
                                    name="type"
                                    value="1"
                                    checked={state.companyModel.type == 1}
                                    onChange={(e) => setModel({ ...state.companyModel, type: +(e.currentTarget.value) })}
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
                                    checked={state.companyModel.type == 2}
                                    onChange={(e) => setModel({ ...state.companyModel, type: +(e.currentTarget.value) })}
                                />
                                Private
                            </label>
                            <span className="blockInfoType">{state.companyModel.type == 1 ? "Everyone will see events of this company" : "Only members of this company will see events"}</span>
                        </div>
                    </div>
                </div>
                <div className="companyPhotoBlock">
                    <div className="PhotoBlock">
                        <img className="companyPhoto"
                            src={(file.imagePreviewUrl && String(file.imagePreviewUrl)) ?? companyNew.companyModel.fotoUrl ?? "https://brilliant24.ru/files/cat/template_01.png"}
                        />
                        <div className="TextBlock" onClick={(e) => onClickPhoto(e)}>
                            Change image
                        </div>
                    </div>
                    <span className="companyPhotoButton" onClick={onClickDeletePhoto}>
                        Delete image
                        <input id="inputFile" ref={input} className="companyPhotoInput" type="file" accept=".jpg, .jpeg, .png" onChange={(e) => onChangePhoto(e)} />
                    </span>
                </div>
            </div>

            <div className="companyInviteBlock">
                <div className="companyInviteTitleBlock">
                    <span className="companyInviteTitle">Invite people</span>
                </div>
                <div className="companyInviteMainBlock">
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
                    <div className="companyCSVBlock">
                        <span className="companyCSVButton" onClick={(e) => onClickCSV(e)}>Download CSV-file</span>
                        <input id="inputFileCSV" ref={inputCSV} className="companyCSVInput" type="file" accept=".csv" onChange={(e) => onChangeCSV(e)} />
                    </div>
                </div>
            </div>
            {/* <div className="companyInviteEmailsBlock">
                {state.companyInviteUsersModel && state.companyInviteUsersModel.email.map((email) => <div>{email}</div>)}
            </div> */}
            <div className="companyButtonBlock">
                <button
                    type="submit"
                    className="companyButton"
                    disabled={companyNew.isLoading}
                >
                    Create company
                </button>
            </div>
        </form>
    );
}




