function init() {
  
  var contact = getFromStorage('userContact');
  console.log('contact', contact);
  
  document.querySelector('#username').innerText = contact.username;
  
} 
