"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

//** show the story Submit form **/
function navSubmitForm(evt) {
  console.debug("navSubmitForm", evt);
  hidePageComponents();
  $submissionForm.show()
  putStoriesOnPage();
}

$body.on("click", "#submit-form", navSubmitForm);


/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);


function showfavoriteStars(){
  for(let star of Array.from(favoriteStars)){
    star.classList.remove('hidden')
  }
}
function hidefavoriteStars(){
  for(let box of Array.from(favoriteStars)){
    star.classList.add('hidden')
  }
}

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $(".account-forms-container").hide() //I added this. Not sure why I needed to.
  $navLogin.hide();
  $navLogOut.show();
  showfavoriteStars()
  $navUserProfile.text(`${currentUser.username}`).show(); //inserts username into the element and set to show
}
