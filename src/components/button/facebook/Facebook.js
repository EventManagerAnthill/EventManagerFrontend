import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import './Facebook.scss';
import { useAppDispatch } from '../../../app/state/store';
import facebookLogo from '../../../assets/images/facebookLogo.png';
import { signInFacebookRequested } from '../../../features/signIn/signInSlice';

function SignInFacebook(props) {
  const dispatch = useAppDispatch();

  const fbResponse = (response) => {
    console.log(response);
    dispatch(signInFacebookRequested({idToken: response.accessToken}));
  }
  return (
    <FacebookLogin
      appId="223750043009109"
      callback={fbResponse}
      fields="name,email,picture"
      render={renderProps => (
        <button
          className="FacebookButton"
          onClick={renderProps.onClick}
          disabled={props.disabled}
        >
          <img className="imageForButton" src={facebookLogo} />
          Continue with Facebook
        </button>
      )}
    />
  );
}

export default SignInFacebook;