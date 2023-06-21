"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  let storyStar;
  try {
    storyStar = story.getStar(currentUser);
  } catch { storyStar = ""}
  
  const hostName = story.getHostName();
  //Mike added the input:checkbox line
  return $(`
  <li id="${story.storyId}">
    <div>
      ${storyStar}

        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title} 
          </a> 
        <small class="story-hostname">(${hostName})</small>
        <div class="story-author">by ${story.author}</div>
        <div class="story-user">posted by ${story.username}</div>
      </div>
    </li>
    `);
}


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story); //turns a story into HTML friendly
    
    //if logged in, also add check
    
    $allStoriesList.append($story); // appends HTML friendly story to DOM
  }

  $allStoriesList.show();
}


// ** Handle submission of a new story

async function submitNewStory(evt){
  console.debug('submitNewStory',evt)
  evt.preventDefault();
  const title = $('#story-title').val();
  const author = $('#story-author').val();
  const url = $('#story-url').val();
  const newStory = {title, author, url}
  // console.log('newStory is',newStory) 
  if(currentUser == null){
    alert('You must be signed in to do that!')
  } else { await storyList.addStory(currentUser,newStory)} // call the addStory method I wrote earlier
  $submissionForm.trigger("reset"); //clear the form
  getAndShowStoriesOnStart(); // re-load the stories on page
  $submissionForm.hide()// collapse the submit form
}

$submissionForm.on('submit',submitNewStory) //adds event listener

//handle addFavorite click
async function toggleFavorite(evt){
  let $clickTarget = $(evt.target)
  let $targetLi = $clickTarget.closest("li")
  let storyId = $targetLi.attr("id")

  if($clickTarget.hasClass('far')){
    //clicked a non favorite. POST to favorites
    await currentUser.addOrDeleteFavorite(storyId,"POST"); // add to favorites
    console.log('ran ADD request for:',storyId)
  } else
  
  if($clickTarget.hasClass('fas')){ 
    //clicked a favorite. DELETE from favorites
    await currentUser.addOrDeleteFavorite(storyId,"DELETE");
      console.log('ran DELETE request for:',storyId)
    }
  putStoriesOnPage() //repaint the stories and their stars
  }
$allStoriesList.on("click",".fa-star",toggleFavorite)