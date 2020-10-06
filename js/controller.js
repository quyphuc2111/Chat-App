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