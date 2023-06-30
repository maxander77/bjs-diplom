"use strict";


const userForm = new UserForm();

userForm.loginFormCallback = data => {
  alert(JSON.stringify(data));

  ApiConnector.login(data, response => {
    alert(JSON.stringify(response));

    if (response.success) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(response.error);
     }
   });
  };
  

  userForm.registerFormCallback = data => {
    alert(JSON.stringify(data));
    
    ApiConnector.register(data, response => {
      alert(JSON.stringify(response));

      if (response.success) {
        location.reload();
      } else { 
        userForm.setRegisterErrorMessage(response.error);
       }
    });
  };


