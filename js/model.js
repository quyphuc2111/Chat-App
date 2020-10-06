const model = {}
model.register = async ({firstName, lastName, email, password}) => {
    console.log(email)
   try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);

    //update profile
    firebase.auth().currentUser.updateProfile({
        displayName: firstName+' '+ lastName,
    })
    //email verify
    firebase.auth().currentUser.sendEmailVerification()
   } catch (err) {
       console.log(err)
       alert(err.message)
   }
}
