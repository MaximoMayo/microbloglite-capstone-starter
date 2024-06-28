/* Landing Page JavaScript */

"use strict";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const imageOne = document.getElementById("header");

loginForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const loginData = {
        username: loginForm.username.value,
        password: loginForm.password.value,
    }

    // Disables the button after the form has been submitted already:
    loginForm.loginButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    login(loginData);

};

async function login (loginData) {
    // POST /auth/login
    const options = { 
        method: "POST",
        headers: {
            // This header specifies the type of content we're sending.
            // This is required for endpoints expecting us to send
            // JSON data.
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    };

    return fetch(apiBaseURL + "/auth/login", options)
        .then(response => response.json())
        .then(loginData => {
            if (loginData.message === "Invalid username or password") {
                console.error(loginData)
                // Here is where you might want to add an error notification 
                // or other visible indicator to the page so that the user is  
                // informed that they have entered the wrong login info.
                return null
            }

            window.localStorage.setItem("login-data", JSON.stringify(loginData));
            window.location.assign("posts.html");  // redirect

            return loginData;
        });
}

registerForm.onsubmit = function(event) {
    event.preventDefault();

    const loginData = {
        username: registerForm.newUser.value,
        fullName: "Grunk",
        password: registerForm.newPassword.value,
    }

    console.log(loginData.username);
    console.log(loginData.password);

    registerUser(loginData);
}

async function registerUser(loginData) {
  
    try {
      const response = await fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/users', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("User created:", data);
      
      // After creating the user, log in with the new credentials
    } catch (error) {
      console.error('Error creating user:', error);
    }
}

const clickSound = new Audio ("sounds/trumpet.mp3");
clickSound.volume = .3;

imageOne.addEventListener("click", function(){
  console.log("You're not allowed here! I will notify the council!");
  clickSound.play();
});