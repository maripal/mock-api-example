/* This app doesn't follow a11y best practices, and the JS file is incomplete. 
Complete the getDataFromApi, displaySearchData, and watchSubmit functions. 
When you're done, this app should allow a user to search for an artist and song title (both should be required), 
and display the song lyrics. You should make requests to this API: https://lyricsovh.docs.apiary.io/# . 
Also make any necessary adjustments to make this app accessible. */

function getDataFromApi(artist, title, callback) {
  const lyricsUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`;

  const query = {
  	artist: `${artist}`,
  	title: `${title}`
  }
  $.getJSON(lyricsUrl, query, displaySearchData)
}

function displaySearchData(data) {
  let results = JSON.stringify(data.lyrics).replace(/\\n/g, "<br>");
  $('.js-search-results').html(`<p>${results}</p>`);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
  	event.preventDefault();

  	let queryArtistTarget = $(event.currentTarget).find('.js-query-artist');
  	let artistSearch = queryArtistTarget.val();
  	queryArtistTarget.val('');
  	let queryTitleTarget = $(event.currentTarget).find('.js-query-title');
  	let titleSearch = queryTitleTarget.val();
  	queryTitleTarget.val('');
  	$('.js-search-results').prop('hidden', false);
  	getDataFromApi(artistSearch, titleSearch, displaySearchData);
  })
}

$(watchSubmit);