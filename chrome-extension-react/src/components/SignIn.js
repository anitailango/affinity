import React from "react";
import * as firebase from "firebase";
import * as firebaseui from "firebaseui";

function SignIn() {
	const ui = new firebaseui.auth.AuthUI(firebase.auth());
	var uiConfig = {
		callbacks: {
			signInSuccessWithAuthResult: function (authResult, redirectUrl) {
				// User successfully signed in.
				// Return type determines whether we continue the redirect automatically
				// or whether we leave that to developer to handle.
				return true;
			},
			// uiShown: function () {
			// 	// The widget is rendered.
			// 	// Hide the loader.
			// 	document.getElementById('loader').style.display = 'none';
			// }
		},
		// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
		signInFlow: "popup",
		signInOptions: [
			// Leave the lines as is for the providers you want to offer your users.
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
		],
	};
	// The start method will wait until the DOM is loaded.
	ui.start("#firebaseui-auth-container", uiConfig);
	return (
		<div>
			<div id="firebaseui-auth-container"></div>
			{/* <div id="loader">Loading...</div> */}
		</div>
	);
}

export default SignIn;
