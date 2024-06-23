/* Posts Page JavaScript */
"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  loadPosts();
  //addEventListeners;
}

async function loadPosts() {
    let postDisplay = document.getElementById("postDisplay");
    try {
        const fetchedPosts = await fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=12&offset=0', {
            headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik9rYXlteWd1eSIsImlhdCI6MTcxOTExNzMzNCwiZXhwIjoxNzE5MjAzNzM0fQ.8zjih2gJpvpOO5dyIkotg0zDX7pSVYqS9kIz5tsl25k'
            }
        });
        
        if (!fetchedPosts.ok) {
            throw new Error(`HTTP error! status: ${fetchedPosts.status}`);
        }
        
        const usablePosts = await fetchedPosts.json();
        let postsLength = Object.keys(usablePosts).length;
        console.log(usablePosts[0].text);

        postDisplay.innerHTML = "";
        for (let i = 0; i < postsLength; i++) {
            postDisplay.insertAdjacentHTML("beforeend",
                `<div class="card w-50">
                    <img class="card-img-top w-100 px-5" src="https://i.pinimg.com/736x/af/01/39/af0139635034fe63770038f11c4793dd.jpg" alt="Title" />
                    <div class="card-body">
                    <h4 class="card-title">${usablePosts[i].username}</h4>
                    <p class="card-text">${usablePosts[i].text}</p>
                </div>`)
        }
        
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}