document.addEventListener("DOMContentLoaded", function() {
    const loginTitle = document.querySelector(".login-title");
    const loginForm = document.querySelector(".login-form");
    const loginToggle = document.querySelector("label.login-toggle");
    const signupToggle = document.querySelector("label.signup-toggle");
    const signupLink = document.querySelector(".signup-prompt a");
  
    signupToggle.onclick = () => {
      loginForm.style.marginLeft = "-50%";
      loginTitle.style.marginLeft = "-50%";
    };
  
    loginToggle.onclick = () => {
      loginForm.style.marginLeft = "0%";
      loginTitle.style.marginLeft = "0%";
    };
  
    signupLink.onclick = () => {
      signupToggle.click();
      return false;
    };
  });
  
  document.querySelector('.input-submit').addEventListener('click', function() {
    window.location.href = 'index.html';
  });