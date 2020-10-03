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
            break;
        case 'loginPage':
            document.getElementById('app').innerHTML = compoments.loginPage;
            document.getElementById('redirect_register').addEventListener('click', () => {
                view.setActiveScreen('registerPage')
             })
            break;
    }
}