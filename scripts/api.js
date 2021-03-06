'use strict';

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/michaelr/bookmarks';

  const getBookmarks = function() {
    return fetch(BASE_URL);
  };

  const createBookMark = function(obj) {
    const newBookmark = JSON.stringify(obj);
    const options = {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: newBookmark
    };
    return fetch(BASE_URL, options);
  };

  const deleteBookmark = function(id) {
    const options = {
      method: 'DELETE'
    };
    return fetch(`${BASE_URL}/${id}`, options);
  };
  
  return {
    getBookmarks,
    createBookMark,
    deleteBookmark
  };
})();