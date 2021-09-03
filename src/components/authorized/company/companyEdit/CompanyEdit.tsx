import React from "react";
import './CompanyEdit.scss';
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";
import { createCompanyRequested, selectCompanyNew } from "../../../../features/company/companySlice";
import { CompanyFormModel, CompanyModel, CompanyUploadPhotoModel } from "../../../../features/company/companyModel";
import { selectUserId } from "../../../../features/user/userSlice";

type Avatar = {
    file: File | null;
    imagePreviewUrl: string | ArrayBuffer | null;
}

export const CompanyEdit = () => {
    const dispatch = useAppDispatch();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const companyNew = useAppSelector(selectCompanyNew);
    const [state, setState] = React.useState<CompanyFormModel>(companyNew);
    const userId = useAppSelector(selectUserId);
    const [file, setfile] = React.useState<Avatar>({ file: null, imagePreviewUrl: null });
    const input = React.useRef<HTMLInputElement>(null);


    const setModel = (model: CompanyModel) => {
        setState({
            ...state,
            companyModel: model,
        });
    }

    const setUploadModel = (model: CompanyUploadPhotoModel) => {
        setState({
            ...state,
            companyUploadModel: model,
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

            let formData = new FormData();
            formData.append("file", file);
            setUploadModel({ ...state.companyUploadModel, formData: formData })
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createCompanyRequested({ ...state }));
    }

    React.useEffect(() => {
        setModel({ ...state.companyModel, userId: userId });
    }, []);

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
                    <img className="companyPhoto" src={(file.imagePreviewUrl && String(file.imagePreviewUrl)) ?? companyNew.companyModel.fotoUrl} />
                    <span className="companyPhotoButton" onClick={(e) => onClickPhoto(e)}>
                        Add logo or photo of your company
                        <input id="inputFile" ref={input} className="companyPhotoInput" type="file" accept=".jpg, .jpeg, .png" onChange={(e) => onChangePhoto(e)} />
                    </span>

                </div>
            </div>

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