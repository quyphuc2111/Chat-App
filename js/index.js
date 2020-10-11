const init = () => {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBf0uxc2QgTUqIGNgqWq8ii_WrAB2Wg9CM",
        authDomain: "chat-app-d2471.firebaseapp.com",
        databaseURL: "https://chat-app-d2471.firebaseio.com",
        projectId: "chat-app-d2471",
        storageBucket: "chat-app-d2471.appspot.com",
        messagingSenderId: "568276837479",
        appId: "1:568276837479:web:368fb1d4050a68080120c2"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // console.log(firebase.app().name)
    // keep login status
    firebase.auth().onAuthStateChanged((res) => {
      
        if(res) {
            if(res.emailVerified) {
                model.currentUser = {
                    displayName: res.displayName,
                    email: res.email,
                }
                view.setActiveScreen('chatPage');
            } else {
                view.setActiveScreen('loginPage');
                alert('Please verify email!');
            }
        } else {
            view.setActiveScreen('registerPage');
        }
    })

}

window.onload = init
