import React from 'react';
import './Facebook.scss';

import { useAppDispatch } from '../../../app/state/store';
import facebookLogo from '../../../assets/images/facebookLogo.png';
import { signInFacebookRequested } from '../../../features/signIn/signInSlice';


export const SignInFacebook = (props) => {
  const dispatch = useAppDispatch();

  // React.useEffect(() => {
  //   window.fbAsyncInit = function () {
  //     window.FB.init({
  //       appId: '223750043009109',
  //       autoLogAppEvents: true,
  //       xfbml: true,
  //       version: 'v11.0'
  //     });

  //     // window.FB.getLoginStatus(function (response) {
  //     //   console.log(response);
  //     // });
  //   };
  // }, []);

  const onClick = async () => {
    const {response} = await new Promise(window.FB.login);
    console.log(response);
    if (response.status === 'connected') {
          dispatch(signInFacebookRequested({ idToken: response.accessToken }));
        }
    // window.FB.login(function (response) {
    //   console.log(response);
    //    else {
    //   }
    // }, {scope: 'name,email,picture'});
  };

  return (
    <button
      className="FacebookButton"
      onClick={onClick}
      disabled={props.disabled}
    >
      <img className="imageForButton" src={facebookLogo} />
      Continue with Facebook
    </button>
  );
}