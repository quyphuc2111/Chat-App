const model = {};
model.currentUser = {};
model.conversations = [];
model.currentConversation = {};
model.register = async ({ firstName, lastName, email, password }) => {
    console.log(email)
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        //update profile
        firebase.auth().currentUser.updateProfile({
            displayName: firstName + ' ' + lastName,
        })
        //email verify
        firebase.auth().currentUser.sendEmailVerification()
        alert('Register success! Please cofirm your email');
        view.setActiveScreen('loginPage');
    } catch (err) {
        //    console.log(err)
        alert(err.message)
    }
}
model.login = async ({ email, password }) => {

    try {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password);
        //    alert('login success')
        //    console.log(response)
        // if(response.user.emailVerified) {
        //     view.setActiveScreen('welcomeScreen');
        // } else {
        //     alert('Please verify email!')
        // }
    } catch (err) {
        alert(err.message)
    }
}
// model.addMessToFirestore = async (data) => {
//     const response = await firebase.firestore().collection('conversations').where('users', 'array-contains', model.currentUser.email).get();
//     const users = getDataFromDocs(response.docs)
//     const docID = users[0].id;
//     // console.log(users)
//     const dataToUpdate = {
//         messages: firebase.firestore.FieldValue.arrayUnion(data),
//     }
//      await firebase.firestore().collection('conversations').doc(docID).update(dataToUpdate);

// }

// getDataFromDoc = (res) => {
//     const data = res.data();
//     data.id = res.id;
//     return data;
// };
// getDataFromDocs = (docs) => {
//     return docs.map(getDataFromDoc)
// };
model.addMessage = (message) => {
    const docID = 'wIPQqFZwShwxmdjButNX';
    const dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    };
    firebase.firestore().collection('conversations').doc(docID).update(dataToUpdate);
};

model.getConversations = async () => {
    const response = await firebase.firestore().collection('conversations').where('users', 'array-contains', model.currentUser.email).get();
    model.conversations = getDataFromDocs(response.docs);
    if(model.conversations.length > 0) {
        model.currentConversation = model.conversations[0];
        view.showCurentConversations();
    }
}
model.listenConversationsChange = ()=> {
    let isFirstRun = true;
    firebase.firestore().collection('conversations').where('users', 'array-contains', model.currentUser.email).onSnapshot((snapshot) => {
        if(isFirstRun) {
            isFirstRun = false;
            return 
        }
        const docChange = snapshot.docChanges();
        for(const oneChange of docChange) {
            if(oneChange.type === 'modified') {
                const dataChange = getDataFromDoc(oneChange.doc)
                for(let i =0; i < model.conversations.length; i++) {
                    if(model.conversations[i].id === dataChange.id) {
                        model.conversations[i] = dataChange;
                    }
                }
                if(dataChange.id === model.currentConversation.id) {
                    model.currentConversation = dataChange;
                    // view.showCurentConversations()
                    view.addMessage(model.currentConversation.messages[model.currentConversation.messages.length -1]);
                }
            }
        }
        
        // console.log(snapshot.docChanges())
    });
};
