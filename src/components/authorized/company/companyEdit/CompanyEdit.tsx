import React from "react";
import './CompanyEdit.scss';
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";
import { createCompanyRequested, deletePhotoRequested, editCompanyRequested, getCompanyRequested, selectCompany, selectCompanyEdit, uploadPhotoRequested } from "../../../../features/company/companySlice";
import { CompanyFormModel, CompanyModel, CompanyUploadModel } from "../../../../features/company/companyModel";
import { useHistory, useParams } from "react-router-dom";
import { selectUserId } from "../../../../features/user/userSlice";
import { Spinner } from "../../../spinner/Spinner";

type Avatar = {
    file: File | null;
    imagePreviewUrl: string | ArrayBuffer | null;
}

export const CompanyEdit = () => {
    let { companyId } = useParams<{ companyId: string | undefined }>();
    const dispatch = useAppDispatch();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const companyEdit = useAppSelector(selectCompanyEdit);
    const company = useAppSelector(selectCompany);
    const [state, setState] = React.useState<CompanyFormModel>(companyEdit);
    const [file, setfile] = React.useState<Avatar>({ file: null, imagePreviewUrl: null });
    const input = React.useRef<HTMLInputElement>(null);
    const userId = useAppSelector(selectUserId);

    React.useEffect(() => {
        if (companyId) {
            let paramForCompany = new URLSearchParams();
            paramForCompany.append("userId", String(userId));
            dispatch(getCompanyRequested({ companyId: +(companyId), param: paramForCompany }));
        }
    }, [companyId]);

    React.useEffect(() => {
        if (company) {
            setState({ ...state, companyModel: company })
        }
    }, [company?.id]);

    const setModel = (model: CompanyModel) => {
        setState({
            ...state,
            companyModel: model,
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
            if (file) {
                reader.onloadend = () => {
                    setfile({
                        file: file,
                        imagePreviewUrl: reader.result
                    });
                }
                reader.readAsDataURL(file);
            }
        }
    }

    const onClickDeletePhoto = () => {
        setfile({ file: null, imagePreviewUrl: null });
        let param = new URLSearchParams();
        param.append("CompanyId", String(state.companyModel.id));
        dispatch(deletePhotoRequested(param));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(editCompanyRequested(state.companyModel));
        if (file.file !== null) {
            let param = new URLSearchParams();
            param.append("companyId", String(state.companyModel.id));
            let formData = new FormData();
            formData.append("file", file.file);
            dispatch(uploadPhotoRequested({ ...state.companyUploadModel, param: param, formData: formData }));
        }
    }

    return (
        <>
        {companyEdit.isLoading && <Spinner />}
            <form className={isLeftBarOpen ? "companyEditWithLeftBar" : "companyEdit"} onSubmit={e => handleSubmit(e)}>
                <div className="companyEditMain">
                    <div className="companyEditForm">
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
                                    defaultValue={state.companyModel.name}
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
                                    defaultValue={state.companyModel.description}
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
                    <div className="companyEditPhotoBlock">
                        <div className="PhotoBlock">
                            <img className="companyPhoto"
                                src={(file.imagePreviewUrl && String(file.imagePreviewUrl)) ?? state.companyModel.fotoUrl ?? "https://brilliant24.ru/files/cat/template_01.png"}
                            />
                            <div className="TextBlock" onClick={(e) => onClickPhoto(e)}>
                                Change image
                            </div>
                        </div>
                        <span className="companyEditPhotoButton" onClick={onClickDeletePhoto}>
                            Delete image
                            <input id="inputFile" ref={input} className="companyEditPhotoInput" type="file" accept=".jpg, .jpeg, .png" onChange={(e) => onChangePhoto(e)} />
                        </span>

                    </div>
                </div>

                <div className="companyEditButtonBlock">
                    <button
                        type="submit"
                        className="companyEditButton"
                        disabled={companyEdit.isLoading}
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}