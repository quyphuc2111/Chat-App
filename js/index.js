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

        if (res) {
            if (res.emailVerified) {
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
    // firestoreQueries();
}

window.onload = init;

// firestoreQueries = async () => {
//     //get one document
//         // const response = await firebase.firestore().collection('users').doc('7A2v2P0LxyBm0UFBWTPa').get();
//         // const user = getDataFromDoc(response);
//         // console.log(user)
//     //get many document
//         const response = await firebase.firestore().collection('users').where('address','==', 'ha noi').get();
//         const users = getDataFromDocs(response.docs)
//         console.log(users)
//         // console.log(response.docs[0].data())
//     //add new document
//         // const dataToAdd = {
//         //     name: ' Nguyen Thi B',
//         //     age: 20,
//         // }
//         // firebase.firestore().collection('users').add(dataToAdd)
//     // //update document
//     //     const dataToUpdate = {
//     //         name: 'Quan ngao',
//     //         address: 'HN',
//     //         nickname: 'ber',
//     //         phone: firebase.firestore.FieldValue.arrayUnion('0123456')
//     //     };
//     //     const docID = "Qi8nknIb5SMtJ9GUCFws";
//     //     firebase.firestore().collection('users').doc(docID).update(dataToUpdate)
//     //delete document
//     const docID = 'nnnvWdkXg2mTD2CWqxfr';
//     firebase.firestore().collection('users').doc(docID).delete();
// }
// getDataFromDoc = (res) => {
//     const data = res.data();
//     data.id = res.id;
//     return data;
// };
// getDataFromDocs = (docs) => {
//     return docs.map(getDataFromDoc)
//     // const arr = [];
//     // // console.log(docs);
//     // for(const oneDoc of docs) {
//     //     arr.push(getDataFromDoc(oneDoc));
//     // }
//     // return arr;
// }; 



getDataFromDoc = (res) => {
    const data = res.data();
    data.id = res.id;
    return data;
};
getDataFromDocs = (docs) => {
    return docs.map(getDataFromDoc)
};
