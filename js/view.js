const view = {}
view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'welcomeScreen':
            document.getElementById('app').innerHTML = compoments.welcomPage;
            break;
        case 'registerPage':
            document.getElementById('app').innerHTML = compoments.registerPage;
            document.getElementById('redirect_login').addEventListener('click', () => {
               view.setActiveScreen('loginPage')
            })
            const registerForm = document.getElementById('register_form')
            // console.log(registerForm)
            registerForm.addEventListener('submit', (event) => {              
                event.preventDefault();
                const dataLogin = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value,
                }
                // console.log(dataLogin)
               controller.register(dataLogin)
            })
            break;
        case 'loginPage':
            document.getElementById('app').innerHTML = compoments.loginPage;
            document.getElementById('redirect_register').addEventListener('click', () => {
                view.setActiveScreen('registerPage')
             })
             const loginForm = document.getElementById('login_form')
             // console.log(loginForm)
             loginForm.addEventListener('submit', (event) => {              
                 event.preventDefault();
                 const dataLogin = {
                     email: loginForm.email.value,
                     password: loginForm.password.value,
                 
                 }
                 // console.log(dataLogin)
                controller.login(dataLogin)
             })
            break;
        case 'chatPage': 
             document.getElementById('app').innerHTML = compoments.chatPage;
             const sendMessageForm = document.getElementById('send-message-form');
             sendMessageForm.addEventListener('submit' , (e) => {
                 e.preventDefault();
                 const message = sendMessageForm.message.value;
                //  console.log(message)
                const messageSend = {
                    owner: model.currentUser.email,
                    content: message,
                    createdAt: new Date().toISOString(),
                }
                // const messageReceive = {
                //     owner: 'Nguyen Phuc',
                //     content: message,
                // }
                if(message.trim() !== '') {
                    // view.addMessage(messageSend);
                    // view.addMessage(messageReceive);
                        // const date = new Date().toISOString();
                        // const dataAddToFirestore = {
                        //     owner: messageSend.owner,
                        //     content: messageSend.content,
                        //     createdAt: date,
                        // }
                        // console.log(dataAddToFirestore);
                        // model.addMessToFirestore(dataAddToFirestore)
                       
                        model.addMessage(messageSend);
                    sendMessageForm.message.value = '';
                } 
             })
             //lay cuoc hoi thoai
             model.getConversations();
             // lang nghe thay doi cuoc hoi thoai
             model.listenConversationsChange();


             break;
    }
}
view.setErrorMessage = (elementId, message) => {
    document.getElementById(elementId).innerText = message;
}
view.addMessage = (message) => {
    const messsageWWrapper = document.createElement('div');
    messsageWWrapper.classList.add('message')
    if(model.currentUser.email === message.owner) {
        messsageWWrapper.classList.add('message-mine')
        messsageWWrapper.innerHTML = `<div class="message-content">${message.content}</div>`
    }else {
        messsageWWrapper.classList.add('message-other')
        messsageWWrapper.innerHTML = `<div class="owner">${message.owner}</div>
        <div class="message-content">${message.content}</div>`
    }
    document.querySelector('.list-messages').appendChild(messsageWWrapper)
}
view.showCurentConversations = () => {
    document.querySelector('.list-messages').innerHTML = '';
    document.querySelector('.conversation-title').textContent = model.currentConversation.title;
    for(const oneMessage of model.currentConversation.messages) {
        view.addMessage(oneMessage);
    }
    
};
