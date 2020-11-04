const controller = {};
controller.register = ({ firstName, lastName, email, password, confirmPassword }) => {
    if (firstName === '') {
        view.setErrorMessage('first_name_error','Please input first name')
    } else {
        view.setErrorMessage('first_name_error','')
    }
    if (lastName === '') {
        view.setErrorMessage('last_name_error','Please input last name')
    } else {
        view.setErrorMessage('last_name_error','')
    }
    if (email === '') {
        view.setErrorMessage('email_error','Please input email')
    } else {
        view.setErrorMessage('email_error','')

    }
    if (password === '') {
        view.setErrorMessage('password_error','Please input password')
    } else {
        view.setErrorMessage('password_error','')

    }
    if (confirmPassword === '') {
        view.setErrorMessage('confirm_password_error','Please input confirm password')
    } else if(password !== confirmPassword) {
        view.setErrorMessage('confirm_password_error',"Password didn't match")

    } else {
        view.setErrorMessage('confirm_password_error','')
    }
  if(firstName !== '' 
  && lastName !== ''
  && email !== '' 
  && password !== ''
  && confirmPassword !== '' 
  && password === confirmPassword) {
      const dataRegister = {
          firstName,
          lastName,
          email,
          password,

      }
      
      model.register(dataRegister)
  }
}
controller.login = ({email, password}) => {
    if (email === '') {
        view.setErrorMessage('email_error','Please input email')
    } else {
        view.setErrorMessage('email_error','')
    }
    if (password === '') {
        view.setErrorMessage('password_error','Please input password')
    } else {
        view.setErrorMessage('password_error','')
    }
    if(email !== '' && password !== '') {
        const dataLogin = {email, password}
        model.login(dataLogin)
    }
}

controller.createConversation = ({title, users}) => {
   
        
        if (users === '') {
            view.setErrorMessage('email_error','Please input email')
        } else if(!validateEmail(users)) {
            view.setErrorMessage('email_error','Invalid email')
        } else {
            view.setErrorMessage('email_error','')
        }
        if (title === '') {
            view.setErrorMessage('titlee_error','Please input title')
        } else {
            view.setErrorMessage('titlee_error','')
        }
        if(users !== '' && title !== '' && validateEmail(users)) {
            const dataCreatConversation = {title, users}
            model.createConversation(dataCreatConversation)
        }
};
controller.addFriendEmail = (email) => {
    if(email === "") {
        view.setErrorMessage('friend-email_error', 'Please input email')
    } else if(!validateEmail(email)) {
        view.setErrorMessage('friend-email_error','Invalid email')
    }else {
        view.setErrorMessage('friend-email_error','')
    }
    if(email !== "" && validateEmail(email)) {
        
        model.addFriendEmail(email)
    }
}
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}