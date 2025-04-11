import { deletePostFromDatabase, editPostInDatabase, getPosts, addPostToDatabase} from "./requests.js";
import { addPostForm, mainDiv, showEveryPost } from "./domManipulators.js";
import { RANDOM_AUTHORS, CATEGORIES } from "./constants.js";
import { getRandomNum } from "./utils.js";

export async function deleteButtonAction(button) {
  const idOfPostToBeDeleted = button.parentElement.getAttribute("id");
  try {
    const response = await deletePostFromDatabase(idOfPostToBeDeleted);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    button.parentElement.remove();
    alert("Post został poprawnie usunięty.");
  } catch {
    alert("Nie udało się usunąć posta.");
  }
}

const editForm = document.querySelector(".edit-post-form-ref")
const idInputElement = editForm.querySelector(".id-input-ref")
const titleInputElement = editForm.querySelector(".title-input-ref")
const descInputElement = editForm.querySelector(".desc-input-ref")

// CLOSE EDIT POST FORM

const closeButton = document.querySelector(".close-form-ref")
closeButton.addEventListener("click", () => { // MAM PYTANIE, CZEMU JAK TUTAJ MAM EVENT CLICK TO TAK JAKBY SIE SUBMITUJE TEN FORM
  closeButton.parentElement.classList.add("hidden")
  idInputElement.value = ''
  titleInputElement.value = ''
  descInputElement.value = ''
})

export async function editPostAction() {
    const idErrorElement = editForm.querySelector(".id-error-ref")
    const titleErrorElement = editForm.querySelector(".title-error-ref")
    const descErrorElement = editForm.querySelector(".desc-error-ref")

  // ============================
    // TODO: GOTOWE dodać Close button do formularza, zeby go chowało i czyscilo 
    editForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const idInputValue = idInputElement.value
      const titleInputValue = titleInputElement.value
      const descInputValue = descInputElement.value
    
      const isIdError = idInputValue == ''
      const isTitleError = titleInputValue == ''
      const isDescError = descInputValue == ''

      if(isIdError){
        idErrorElement.classList.remove("hidden")
      }
      else{
        idErrorElement.classList.add("hidden")
      }
      if(isTitleError){
        titleErrorElement.classList.remove("hidden")
      }
      else{
        titleErrorElement.classList.add("hidden")
      }
      if(isDescError){
        descErrorElement.classList.remove("hidden")
      }
      else{
        descErrorElement.classList.add("hidden")
      }
      if(isIdError || isTitleError || isDescError){
        return
      }
      try {
        const response = await editPostInDatabase(idInputValue, titleInputValue, descInputValue);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await getPosts();
        showEveryPost(data);
        editForm.classList.toggle("hidden")
        alert("Pomyślnie edytowano post.")
        idInputElement.value = ""
        titleInputElement.value = ""
        descInputElement.value = ""
      }
      catch{
        alert("Nie udało się edytować posta.");
      }
    })
}



export async function addPostFormAction(e){
  e.preventDefault()
  const titleInputElement = addPostForm.querySelector('.title-input-ref');
  const descInputElement = addPostForm.querySelector('.desc-input-ref');

  const titleValue = titleInputElement.value;
  const descValue = descInputElement.value;

  const titleErrorElement = addPostForm.querySelector(".title-error-ref")
  const descErrorElement = addPostForm.querySelector(".desc-error-ref")

  const isTitleError = titleValue == '' || titleValue.length < 3;
  const isDescError = descValue == '' || descValue.length < 3;

  if(isTitleError){
    titleErrorElement.classList.remove("hidden")
  }
  else{
    titleErrorElement.classList.add("hidden")
  }
  if(isDescError){
    descErrorElement.classList.remove("hidden")
  }
  else{
    descErrorElement.classList.add("hidden")
  }
  if(isTitleError || isDescError){
    return
  }

  const author = RANDOM_AUTHORS[getRandomNum(0, RANDOM_AUTHORS.length - 1)];
  const category = CATEGORIES[getRandomNum(0, CATEGORIES.length - 1)];
  const likes = getRandomNum(10, 1000);
  const views = getRandomNum(10, 1000);

  try {
    const response = await addPostToDatabase(
      titleValue,
      descValue,
      author,
      category,
      views,
      likes
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    mainDiv.innerHTML = "";
    const data = await getPosts();
    showEveryPost(data);
    addPostForm.classList.add("hidden")
    alert("Pomyślnie dodano post!")
    titleInputElement.value = ""
    descInputElement.value = ""
  } catch {
    alert("Nie udało się dodać posta.");
  }
}
