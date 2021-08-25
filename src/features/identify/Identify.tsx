import React from 'react';
import './Identify.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/state/store';
import { BaseInformation } from '../../components/block/baseInformation/BaseInformation';
import { identifyRequested, selectIdentifyIsLoading, selectIdentifyModel } from './identifySlice';
import { IdentifyModel } from './identifyModel';

export const Identify = () => {
    const isLoading = useAppSelector(selectIdentifyIsLoading);
    const identifyModel = useAppSelector(selectIdentifyModel);
    const dispatch = useAppDispatch();
    const [state, setState] = React.useState<IdentifyModel>(identifyModel);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(identifyRequested(state));
    }

    return (
        <div className="Identify">
            <BaseInformation />
            <div className="IdentifyMain">
                <div className="TopIdentifyMain">
                    <div>
                        <span className="TopIdentifyMain-Span">Not a member yet?</span>
                    </div>
                    <div >
                        <Link className="TopIdentifyMain-Link" to="/signup">Sign up</Link>
                    </div>
                </div>
                <div className="FormIdentifyMain">
                    <div>
                        <span className="FormIdentifyMain-Span">Please enter your email address</span>
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className="InputFormIdentifyMain">
                            <div className="blockInputAndLabel">
                                <label
                                    className="blockLabel">
                                    Email
                                    <input
                                        className="blockInput"
                                        required
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        type="email"
                                        autoFocus
                                        onChange={(e) => setState({ ...state, email: e.currentTarget.value })}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="buttonformBlockRightSigInBlock">
                            <button
                                type="submit"
                                className="AccauntformBlockRightSigInBlock"
                                disabled={isLoading}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

