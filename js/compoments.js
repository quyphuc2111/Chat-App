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
<div class="header">MindX chat </div>
<div class="main">
  <div class="aside-left">
    <div class="create-conversation">
      <button class="btn cursor_pointer">+ New conversation</button>
    </div>
    <div class="list-conversation"></div>
  </div>
  <div class="conversation-detail">
    <div class="conversation-title"></div>
    <div class="list-messages"></div>
    <form id="send-message-form">
      <input type="text" placeholder="Type a message" name='message'>
      <button class="btn">Send</button>
    </form>
  </div>
  <div class="aside-right">
  <form id="add-friend-email">
    <div class="all-email-user"></div>
    <div class="input_wrapper">
      <input type="text" placeholder="Enter friend email" name="friendEmail">
      <div id="friend-email_error" class="err"></div>
    </div>
    <div class="add-user">
      <button class="btn cursor_pointer">Add</button>
    </div>
  </form>
  
  
</div>
</div>
</div>`
compoments.createConversation = ` <div class="chat-container">
<div class="header">Minx Chat</div>
<div class="main">
  <div class="form-wrapper">
    <form id="create-conversation-form">
      <div class="title"><h1>Creat a new conversation</h1></div>
      <div class="input_wrapper">
        <input type="text" placeholder="Conversation name" name="title">
        <div id="titlee_error" class="err"></div>
      </div>
      <div class="input_wrapper" >
        <input type="text" placeholder="Friend email" name='email'>
        <div id="email_error" class="err"></div>
      </div>
      <div class="input_wrapper conversation-action">
        <button type="submit" class="btn btn-save">Save</button>
        <button type="button"class="btn btn-cancel">Cancel</button>
      </div>
    </form>
  </div>
</div>
</div>`