function saveContact() {
    
    var elUserName = document.querySelector('#username');
    var elTel = document.querySelector('#tel');
    
    
    var contact = {
      username: elUserName.value,
      phone: elTel.value
    };
    
    
    saveToStorage('userContact', contact);
}