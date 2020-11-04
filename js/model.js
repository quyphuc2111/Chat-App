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
model.addFriendEmail = (email) => {
    const docID = model.currentConversation.id;
    const dataToUpdate = {
        users: firebase.firestore.FieldValue.arrayUnion(email)
    };
    firebase.firestore().collection('conversations').doc(docID).update(dataToUpdate);
}
model.getConversations = async () => {
    const response = await firebase.firestore().collection('conversations').where('users', 'array-contains', model.currentUser.email).get();
    model.conversations = getDataFromDocs(response.docs);
    if (model.conversations.length > 0) {
        model.currentConversation = model.conversations[0];
       
        view.showCurentConversations();
        // console.log(model.conversations)
        view.showListConversation();
        // view.getAllEmail();
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
                    if(model.currentConversation.users.length !== dataChange.users.length) {
                        view.showAllEmail(dataChange.users[dataChange.users.length -1]);
                    } else {
                        const lastMsg = dataChange.messages[dataChange.messages.length -1]
                        if(lastMsg.owner !== model.currentUser.email) {
                        view.showNotification(dataChange.id)
                    }
                        view.addMessage(dataChange.messages[dataChange.messages.length - 1]);
                    }
                    model.currentConversation = dataChange;
                    // view.showCurentConversations()
                    view.scrollToEndElm();
                } else {
                    view.showNotification(dataChange.id)
                }
            } else if(oneChange.type === 'added') {
                const dataChange = getDataFromDoc(oneChange.doc);
                model.conversations.push(dataChange);
                view.addConversation(dataChange);
            }
            // const change = getDataFromDoc(oneChange.doc)
            // view.showNotification(change.id);
        }

        // console.log(snapshot.docChanges())
    });
};
model.createConversation = ({title, users}) => {
    const dataToAdd = {
        title,
        createdAt: new Date().toISOString(),
         messages: [],
         users: [
             model.currentUser.email,
             users,
         ]
    }
    firebase.firestore().collection('conversations').add(dataToAdd)
    view.setActiveScreen('chatPage', true);
};
