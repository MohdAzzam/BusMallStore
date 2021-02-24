/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);
// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
//make the selected Element Globaly
let selectEl;
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  selectEl = document.getElementById('items'); // get the drop down list from the form 
  let option;

  for (let i in Product.allProducts) {
    //console.log(Product.allProducts[i]); // check if the product have value
    option = document.createElement('option'); // create option to append it to the drop down list 
    selectEl.appendChild(option); //append the option into the drop down list  
    option.textContent = Product.allProducts[i].name; //  add the value of each product into the drop down list 
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart

function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  let selected = selectEl.value;// getting the selected data from the drop down list 
  // TODO: get the quantity
  let quantity = document.getElementById('quantity').value;
  // TODO: using those, add one item to the Cart
  new Cart(cart.addItem(selected,quantity));


}

// TODO: Update the cart count in the header nav with the number of items in the Cart
let count = 0; 
function updateCounter() { 
  let itemCount = document.getElementById('itemCount');
  count++;  
  itemCount.textContent= count;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  let itemSelected =selectEl.value;
  let itemQuantity= document.getElementById('quantity').value;
  // TODO: Add a new element to the cartContents div with that information
  let cartContents=document.getElementById('cartContents');
  let ulEl= document.createElement('ul');
  cartContents.appendChild(ulEl);
  let liEl = document.createElement('li');
  ulEl.appendChild(liEl);
  liEl.textContent=`${itemSelected} ${itemQuantity}`
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
