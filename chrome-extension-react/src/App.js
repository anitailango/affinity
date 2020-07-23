import React, { useState, useEffect } from "react";
import TopBar from "./components/TopBar.js";
import ArticleInfo from "./components/ArticleInfo.js";
import SignIn from "./components/SignIn.js";
import * as firebase from "firebase";
import Rating from "./components/Rating.js";

var firebaseConfig = {
	apiKey: "AIzaSyDKG0ABNrRiJ7xrFdg54VwnP3-_CypLU2c",
	authDomain: "affinity-e502a.firebaseapp.com",
	databaseURL: "https://affinity-e502a.firebaseio.com",
	projectId: "affinity-e502a",
	storageBucket: "affinity-e502a.appspot.com",
	messagingSenderId: "546570219484",
	appId: "1:546570219484:web:bfa107b2857ebdedc36919",
};
firebase.initializeApp(firebaseConfig);

function App() {
	const [signedIn, setSignedIn] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				// User is signed in.
				setSignedIn(true);
			} else {
				// No user is signed in.
				setSignedIn(false);
			}
		});
	});

	return (
		<div className="App" style={styles}>
			{!signedIn ? (
				<SignIn />
			) : (
				<>
					<TopBar />
					<ArticleInfo />
				</>
			)}
			{/* <Rating/> */}
		</div>
	);
}

const styles = {
	minWidth: "314px",
	background: "#F8F8F8",
};

export default App;
