const view = {}
view.setActiveScreen = (screenName, fromCreate = false) => {
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
            const createConversation = document.querySelector('.create-conversation .btn.cursor_pointer')
            createConversation.addEventListener('click', () => {
                view.setActiveScreen('createConversationPage');
            });
            const addFriendEmail = document.getElementById('add-friend-email');
            // console.log(addFriendEmail)


            sendMessageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const message = sendMessageForm.message.value;
                //  console.log(message)
                const messageSend = {
                    owner: model.currentUser.email,
                    content: message,
                    createdAt: new Date().toISOString(),
                }
                if (message.trim() !== '') {
                    model.addMessage(messageSend);
                    sendMessageForm.message.value = '';
                }

            })
            if (!fromCreate) {
                //lay cuoc hoi thoai
                model.getConversations();
                // lang nghe thay doi cuoc hoi thoai
                model.listenConversationsChange();
            } else {
                view.showCurentConversations();
                // console.log(model.conversations)
                view.showListConversation();

            }
            addFriendEmail.addEventListener('submit', (e) => {
                e.preventDefault() !== "";
                const friendEmail = addFriendEmail.friendEmail.value;
                if(friendEmail.trim()) {
                    controller.addFriendEmail(friendEmail);
                }
                addFriendEmail.friendEmail.value = "";
                })
               document.querySelector('#send-message-form input').addEventListener('click', () => {
                   view.hideNotification(model.currentConversation.id)
               })
               const mediaQuery = window.matchMedia('screen and (max-width: 768px)')
            //    console.log(mediaQuery)
               if(mediaQuery.matches) {
                   document.querySelector('.create-conversation button').innerHTML = `<i class="fa fa-user-plus"></i>`
               } 
            break;
        case 'createConversationPage':
            document.getElementById('app').innerHTML = compoments.createConversation;
            const createConversationForm = document.getElementById('create-conversation-form');
            const btnCancel = createConversationForm.querySelector('.btn.btn-cancel');
            btnCancel.addEventListener('click', () => {
                view.setActiveScreen('chatPage', true)
            })
            //    console.log(btnSave)
            // btnCancel.addEventListener('click', () => {
            //     view.setActiveScreen('chatPage')
            // });
            createConversationForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const data = {
                    title: createConversationForm.title.value.trim(),
                    users: createConversationForm.email.value.trim(),

                }
                controller.createConversation(data);



            });
            break;
    }
}
view.setErrorMessage = (elementId, message) => {
    document.getElementById(elementId).innerText = message;
}
view.addMessage = (message) => {
    const messsageWrapper = document.createElement('div');
    messsageWrapper.classList.add('message')
    if (model.currentUser.email === message.owner) {
        messsageWrapper.classList.add('message-mine')
        messsageWrapper.innerHTML = `<div class="message-content">${message.content}</div>`
    } else {
        messsageWrapper.classList.add('message-other')
        messsageWrapper.innerHTML = `<div class="owner">${message.owner}</div>
        <div class="message-content">${message.content}</div>`
    }
    document.querySelector('.list-messages').appendChild(messsageWrapper)
}
view.showCurentConversations = () => {
    document.querySelector('.list-messages').innerHTML = '';

    document.querySelector('.conversation-title').textContent = model.currentConversation.title;
    for (const oneMessage of model.currentConversation.messages) {
        view.addMessage(oneMessage);
    }
    //show all email
    document.querySelector('.all-email-user').innerHTML = '';
    for (const elm of model.currentConversation.users) {
        //    console.log(elm)
        view.showAllEmail(elm)
    }

    view.scrollToEndElm();
};
view.showListConversation = () => {
    for (const conversation of model.conversations) {
        view.addConversation(conversation);
    }
};
view.addConversation = (conversation) => {
    const conversationWrapper = document.createElement('div');
    conversationWrapper.classList.add('conversation');
    conversationWrapper.id = conversation.id
    if (conversation.id === model.currentConversation.id) {
        conversationWrapper.classList.add('current');
    }
    conversationWrapper.innerHTML = `<div class="left-conversation-title">${conversation.title}</div>
  <div class="num-of-user">${conversation.users.length} users</div>
  <div class="notification"></div>`

  const mediaQuery = window.matchMedia('screen and (max-width: 768px')
  if(mediaQuery.matches) {
    conversationWrapper.firstElementChild.innerHTML = conversation.title.charAt(0).toUpperCase();
  }
  mediaQuery.addListener(matches => {
    // console.log(matches)
    if(matches.matches) {
        conversationWrapper.firstElementChild.innerHTML = conversation.title.charAt(0).toUpperCase();
        document.querySelector('.create-conversation button').innerHTML = `<i class="fa fa-user-plus"></i>`
    } else {
        conversationWrapper.firstElementChild.innerHTML = conversation.title;
        document.querySelector('.create-conversation button').innerHTML = '+ New Conversation'
    }
  })
    document.querySelector('.list-conversation').appendChild(conversationWrapper);
    conversationWrapper.addEventListener('click', () => {
        //xoa current class cu 
        const current = document.querySelector('.current');
        current.classList.remove('current');
        // them current vao cai dc click
        conversationWrapper.classList.add('current');
        // show conversation click len man hinh
        for (const elm of model.conversations) {
            if (elm.id === conversation.id) {
                model.currentConversation = elm;
                view.showCurentConversations();
            }
        }
        view.hideNotification(conversation.id)
    });
}
view.scrollToEndElm = () => {
    const elm = document.querySelector('.list-messages');
    elm.scrollTop = elm.scrollHeight;
}

view.showAllEmail = (users) => {
    const emailWrapper = document.createElement('div');
    emailWrapper.innerHTML = `<div>${users}</div>`
    document.querySelector('.all-email-user').appendChild(emailWrapper);
}
view.showNotification = (id) => {
    const conversationElement = document.getElementById(id);
    // console.log(conversationElement)
    // conversationElement.lastElementChild.style = 'display: block'
    conversationElement.querySelector('.notification').style = 'display: block';
}
view.hideNotification = (id) => {
    const conversationElement = document.getElementById(id) 
    conversationElement.querySelector('.notification').style = 'display: none';
}