'use strict';

const bookmarkList = (function() {
  const renderRating = function(rating) {
    let str = '';
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        str += '<span class="fa fa-star checked"></span>';
      } else {
        str += '<span class="fa fa-star"></span>';
      }
    }
    return str;
  };

  const renderList = function() {
    console.log('Rendering bookmarks');
    let htmlStr = '';
    store.bookmarks.map(bookmark => {
      let rating = renderRating(bookmark.rating);
      htmlStr += `<div class="bookmark">
      <h3>${bookmark.title}</h3>
      <div class="bookmark-rating">${rating}</div>
    </div>`;
    });
    $('.bookmark-container').html(htmlStr);
  };

  const renderForm = function() {
    let htmlStr = '';
    if (store.adding) {
      console.log('Let\'s add a bookmark');
      htmlStr = `<form class="add-bookmark-form" action="">
        <label for="title">Title</label>
        <input type="text" id="title" name="title">
        <label for="url">URL</label>
        <input type="text" id="url" name="url">
        <label for="description">Description</label>
        <input type="text" id="description" name="description">
        <label for="rating">Rating</label>
        <input type="radio" name="rating" value="1">1</input>
        <input type="radio" name="rating" value="2">2</input>
        <input type="radio" name="rating" value="3">3</input>
        <input type="radio" name="rating" value="4">4</input>
        <input type="radio" name="rating" value="5">5</input>
      </form>
      <button class="submit-button">Submit</button>
      <button class="cancel-button">Cancel</button>`;
    } else {
      console.log('Let\'s render the filter dropdown');
      htmlStr = '<button class="add-button">Add Bookmark</button>';
    }
    $('.form-container').html(htmlStr);
  };

  const renderError = function() {
    if (store.error) {
      console.log(`There is an error: ${store.error}`);
      $('.error-container').html(`<p>${store.error}</p>`).removeClass('hidden');
    } else {
      console.log('No errors. Everything is fine');
      $('.error-container').addClass('hidden');
    }
  };

  const clearForm = function() {
    $('#title').val('');
    $('#url').val('');
    $('#description').val('');
    $('input[name="rating"]').prop('checked', false);
    renderError();
    if (!store.error) {
      store.setAdding();
    }
    store.setError('');
  };

  const handleAddButtonClick = function() {
    $('.form-container').on('click', '.add-button',function(e) {
      store.setAdding();
      renderForm();
    });
  };

  const handleSubmitButtonClick = function() {
    $('.form-container').on('click', '.submit-button', function(e) {
      const form = $('.add-bookmark-form')[0];
      const formData = new FormData(form);
      const obj = {};
      formData.forEach((val, field) => {
        obj[field] = val;
      });
      if (!obj.title) {
        store.setError('Empty title input');
      }
      obj.rating = parseInt(obj.rating);
      console.log(obj);
      clearForm();
      renderForm();
    });
  };
  
  const handleCancelButtonClick = function() {
    $('.form-container').on('click', '.cancel-button', function(e) {
      clearForm();
      renderForm();
    });
  };

  return {
    renderList,
    renderForm,
    renderError,
    handleSubmitButtonClick,
    handleAddButtonClick,
    handleCancelButtonClick,
  };
}());