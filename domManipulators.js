import { getPostsFromGivenCategory} from "./utils.js";

import {deleteButtonAction, editPostAction, addPostFormAction} from "./postsService.js"

// ------------------------------------------------------------------------

export const mainDiv = document.getElementById("main-div-ref");
export const addPostForm = document.querySelector(".add-post-form-ref")
addPostForm.addEventListener("submit", async (e) => addPostFormAction(e))

// ------------------------------------------------------------------------

function setPostIdOnElement(element, postId){
  element.setAttribute("data-id",postId)
}


export function showEveryPost(postData) {
  mainDiv.innerHTML = "";
  for (let i = 0; i < postData.length; i++) {
    const currentPost = postData[i];
    const divPost = document.createElement("div");
    setPostIdOnElement(divPost, currentPost.id)
    const postBorder = document.createElement("p");
    const postBorder2 = document.createElement("p");
    postBorder.textContent = "------------------------";
    postBorder2.textContent = "------------------------";
    divPost.append(postBorder);
    addPostToSite(currentPost, divPost);
    divPost.append(postBorder2);
    mainDiv.append(divPost);
  }
}

// ------------------------------------------------------------------------

function addPostToSite(postData, location) {
  const title = document.createElement("p");
  title.textContent = postData.title;
  title.classList.add("title-ref")
  const description = document.createElement("p");
  description.textContent = postData.description;
  description.classList.add("desc-ref")
  const category = document.createElement("p");
  category.textContent = postData.category;
  const author = document.createElement("p");
  author.textContent = postData.author;
  const likesAndViews = document.createElement("p");
  likesAndViews.textContent =
    postData.likes + " likes | " + postData.views + " views";

  location.append(getEditButtonToPost())
  location.append(getDeleteButtonToPost());
  location.appendChild(title);
  location.appendChild(description);
  location.appendChild(category);
  location.appendChild(author);
  location.appendChild(likesAndViews);
}

// ------------------------------------------------------------------------

function getDeleteButtonToPost() {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", async () => deleteButtonAction(deleteButton));
  return deleteButton;
}

// ------------------------------------------------------------------------

function getEditButtonToPost() {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Edit";
  deleteButton.addEventListener("click", () => {
    const postId = deleteButton.parentElement.dataset.id
    const postTitle = deleteButton.parentElement.querySelector(".title-ref").textContent
    const postDesc = deleteButton.parentElement.querySelector(".desc-ref").textContent

    const editForm = document.querySelector(".edit-post-form-ref")
    editForm.classList.remove("hidden")
    
    const idInputElement = editForm.querySelector(".id-input-ref")
    idInputElement.value = postId

    const titleInputElement = editForm.querySelector(".title-input-ref")
    titleInputElement.value = postTitle

    const descInputElement = editForm.querySelector(".desc-input-ref")
    descInputElement.value = postDesc


  });
  return deleteButton;
}

// ------------------------------------------------------------------------

export function createAddPostButton() {
  const buttonRef = document.getElementById("add-post-ref");
  buttonRef.addEventListener("click", async () => {
    addPostForm.classList.toggle("hidden")
  });
}

// ------------------------------------------------------------------------

function showPostsFromGivenCategory(postData, category) {
  const arrOfPosts = getPostsFromGivenCategory(postData, category);
  mainDiv.innerHTML = "";
  for (let i = 0; i < arrOfPosts.length; i++) {
    const post = arrOfPosts[i];

    const postBorder = document.createElement("p");
    const postBorder2 = document.createElement("p");
    postBorder.textContent = "------------------------";
    postBorder2.textContent = "------------------------";

    // TODO: GOTOWE przerobic na jedno zrodlo prawdy
    const divPost = document.createElement("div");
    setPostIdOnElement(divPost,post.id)
    mainDiv.appendChild(divPost);
    divPost.appendChild(postBorder);
    addPostToSite(post, divPost);
    divPost.appendChild(postBorder2);
  }
}

// ------------------------------------------------------------------------

export function loadForm(postData) {
  // wzięte z https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
  const form = document.querySelector(".category-form-ref");
  const log = document.querySelector("#log");
  form.addEventListener(
    "submit",
    (event) => {
      const data = new FormData(form);
      let output = "";
      for (const entry of data) {
        output = `${output}${entry[0]}=${entry[1]}\r`;
        if (entry[1] != "none") {
          showPostsFromGivenCategory(postData, entry[1]);
        } else {
          showEveryPost(postData);
        }
      }
      log.innerText = output;
      event.preventDefault();
    },
    false
  );
}

// ------------------------------------------------------------------------
