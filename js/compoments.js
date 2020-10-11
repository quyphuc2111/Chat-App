const compoments = {}
compoments.welcomPage = '<h3>Hello world </h3>'
compoments.registerPage = `  <div class="register_container">
<div class="background_img"></div>
<div class="form_wrapper">
    <div class="register_header">MindX Chat</div>
    <form id="register_form">
        <div class="name_wrapper">
            <div class="input_wrapper">
                <input type="text" placeholder="First name" name="firstName">
                <div id="first_name_error" class="err"></div>
            </div>
            <div class="input_wrapper">
                <input type="text" placeholder="Last name" name="lastName">
                <div id="last_name_error" class="err"></div>
            </div>
        </div>
        
        <div class="input_wrapper">
            <input type="text" placeholder="Email" name="email">
            <div id="email_error" class="err"></div>
        </div>
        <div class="input_wrapper">
            <input type="password" placeholder="Password" name="password">
            <div id="password_error" class="err"></div>
        </div>
        <div class="input_wrapper">
            <input type="password" placeholder="Confirm password" name="confirmPassword">
            <div id="confirm_password_error" class="err"></div>
        </div>
        <div class="register_form_action">
            <div>Already have an account? <span id="redirect_login" class="cursor_pointer">Login</span></div>
           <button class="btn" type="submit">Register</button>
           
        </div>
    </form>
</div>
</div>`
compoments.loginPage = ` <div class="login_container">
<div class="background_img"></div>
<div class="form_wrapper">
    <div class="login_header">MindX Chat</div>
    <form id="login_form">    
        <div class="input_wrapper">
            <input type="text" placeholder="Email" name="email">
            <div id="email_error" class="err"></div>
        </div>
        <div class="input_wrapper">
            <input type="password" placeholder="Password" name="password">
            <div id="password_error" class="err"></div>
        </div>
        <div class="login_form_action">
            <div>Don't have an account? <span id="redirect_register" class="cursor_pointer">Register</span></div>
           <button class="btn" type="submit">Login</button>
           
        </div>
    </form>
</div>
</div>`
compoments.chatPage = `<div class="chat-container">
<div class="header">MindX chat</div>
<div class="main">
    <div class="conversation-detail">
        <div class="conversation-title">Conversation</div>
        <div class="list-messages"></div>
        <form id="send-message-form">
            <input type="text" placeholder="Type a message" name='message'>
            <button class="btn">Send</button>
        </form>
    </div>

</div>
</div>`