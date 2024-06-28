/* Posts Page JavaScript */
"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    loadPosts();
    addEventListeners();
}

function addEventListeners(){
    document.getElementById("logoutBtn").addEventListener("click", logout);
    //document.getElementById("plagueBtn").addEventListener("click", plagueMode)

}



//will load in 12 posts from the API
async function loadPosts() {

    const loginJSON = window.localStorage.getItem("login-data");
    let convertJSON = JSON.parse(loginJSON) || {}

    //gets the id for the main display
    let postDisplay = document.getElementById("postDisplay");

    //fetching the api information
    try {
        const fetchedPosts = await fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=4&offset=0', {
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${convertJSON.token}`
            }
        });

        const fetchedPosts2 = await fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/users?limit=4&offset=50', {
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${convertJSON.token}`
            }
        });
        
        if (!fetchedPosts.ok) {
            throw new Error(`HTTP error! status: ${fetchedPosts.status}`);
        }
        
        //convert the fetched object to one where we can use the objects props
        const usablePosts = await fetchedPosts.json();
        const usableUsers = await fetchedPosts2.json();

        //get the length of the object
        let postsLength = Object.keys(usablePosts).length;

        //check if it works
        console.log(usableUsers);
        console.log(usablePosts);

        //reset the posts page and display the posts
        for (let i = 0; i < postsLength; i++) {
            postDisplay.insertAdjacentHTML("beforeend",
                `<div class="card w-50">
                    <img class="card-img-top w-100 px-5" src="https://i.pinimg.com/736x/af/01/39/af0139635034fe63770038f11c4793dd.jpg" alt="Title" />
                    <div class="card-body">
                    <h4 class="card-title">${usablePosts[i].username}</h4>
                    <p class="card-text">${usablePosts[i].text}</p>
                    <p class="card-text">${usablePosts[i].createdAt}</p>
                </div>`)
        }



        postDisplay.insertAdjacentHTML("beforeend",`<section id="trending">
            <ul>
                <h3>Birthdays</h3>
                <li id="tags">${usableUsers[0].username} - ${usableUsers[0].createdAt}</li>
                <li id="tags">${usableUsers[1].username} - ${usableUsers[0].createdAt}</li>
                <li id="tags">${usableUsers[2].username} - ${usableUsers[0].createdAt}</li>
                <li id="tags">${usableUsers[3].username} - ${usableUsers[0].createdAt}</li>
                <div></div>
            </ul>
        </section>
        <p id="cornerP">Image of the day:</p>
        <img id="cornerImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo5gqu6bKAKNsj1RNVt539Teg5ZKST8UT-tA&s" alt="Title" />
        `)
        
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

async function logout () {
    const loginData = getLoginData();

    // GET /auth/logout
    const options = { 
        method: "GET",
        headers: { 
            // This header is how we authenticate our user with the
            // server for any API requests which require the user
            // to be logged-in in order to have access.
            // In the API docs, these endpoints display a lock icon.
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {
            // We're using `finally()` so that we will continue with the
            // browser side of logging out (below) even if there is an 
            // error with the fetch request above.

            window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
            window.location.assign("/");  // redirect back to landing page
        });
}