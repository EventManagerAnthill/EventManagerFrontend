import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { useAppDispatch } from '../../../app/state/store'
import './Google.scss';
import googleLogo from '../../../assets/images/googleLogo.png';
import { signInGoogleRequested } from '../../../features/signIn/signInSlice';

const clientId =
  '752253873246-cg9qrlhp0tmtn7cd8vpg4qrfk03br55c.apps.googleusercontent.com';

function SignInGoogle(props) {
  const dispatch = useAppDispatch()

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    console.log(res.tokenObj.id_token);
    dispatch(signInGoogleRequested({idToken: res.tokenObj.id_token}));
  };

  const onFailure = (res) => {
    // console.log('Login failed: res:', res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: false,
    accessType: 'offline',
  });

  return (
    <button
      className="GoogleButton"
      onClick={signIn}
      disabled={props.disabled}
    >
      <img className="imageForButton" src={googleLogo} />
      Continue with Google
    </button>
  );
}

export default SignInGoogle;