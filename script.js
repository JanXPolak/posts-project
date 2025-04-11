import { getPosts } from "./requests.js";
import {createAddPostButton, loadForm, showEveryPost} from './domManipulators.js'
import { editPostAction } from "./postsService.js";

// ------------------------------------------------------------------------

async function runApp() {
  const data = await getPosts();
  createAddPostButton();
  loadForm(data);
  showEveryPost(data);
  editPostAction();
}

runApp();
