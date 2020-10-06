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
    }
}

view.setErrorMessage = (elementId, message) => {
    document.getElementById(elementId).innerText = message;
    // document.getElementById(elementId).style.color = 'red';

    
}