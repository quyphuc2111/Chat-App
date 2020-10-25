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

model.addMessage = (message) => {
    const docID = model.currentConversation.id;
    const dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    };
    firebase.firestore().collection('conversations').doc(docID).update(dataToUpdate);
};

model.getConversations = async () => {
    const response = await firebase.firestore().collection('conversations').where('users', 'array-contains', model.currentUser.email).get();
    model.conversations = getDataFromDocs(response.docs);
    if (model.conversations.length > 0) {
        model.currentConversation = model.conversations[0];
        view.showCurentConversations();
        // console.log(model.conversations)
        view.showListConversation();
    }
}
model.listenConversationsChange = () => {
    let isFirstRun = true;
    firebase.firestore().collection('conversations').where('users', 'array-contains', model.currentUser.email).onSnapshot((snapshot) => {
        if (isFirstRun) {
            isFirstRun = false;
            return
        }
        const docChange = snapshot.docChanges();
        for (const oneChange of docChange) {
            if (oneChange.type === 'modified') {
                const dataChange = getDataFromDoc(oneChange.doc)
                for (let i = 0; i < model.conversations.length; i++) {
                    if (model.conversations[i].id === dataChange.id) {
                        model.conversations[i] = dataChange;
                    }
                }
                if (dataChange.id === model.currentConversation.id) {
                    model.currentConversation = dataChange;
                    // view.showCurentConversations()
                    view.addMessage(model.currentConversation.messages[model.currentConversation.messages.length - 1]);
                    view.scrollToEndElm();
                }
            }
        }

        // console.log(snapshot.docChanges())
    });
};
model.createConversation = (data) => {
    const dataToAdd = {
        title: data.title,
        createdAt: new Date().toISOString(),
         messages: [],
         users: [
             model.currentUser.email,
             data.users,
         ]


    }
    firebase.firestore().collection('conversations').add(dataToAdd)
};
