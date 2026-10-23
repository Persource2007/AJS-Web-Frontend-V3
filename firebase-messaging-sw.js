importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

// Initialize Firebase with the received config
firebase.initializeApp({
	apiKey: "AIzaSyDMRGcbz4AHQyNKVcKUXDLZ2KnK4Q55cTQ",
	authDomain: "ajs-project-f206b-integration.firebaseapp.com",
	projectId: "ajs-project-f206b-integration",
	messagingSenderId: "364370679822",
	appId: "1:364370679822:web:da02508ed0e322711ac45f",
});
messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
