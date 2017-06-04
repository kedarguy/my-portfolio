function savePrefs() {
    var elBgColor = document.querySelector('#bgColor');
    var elTxtColor = document.querySelector('#txtColor');
    
    var userPref = {
      color: elTxtColor.value,
      bgColor: elBgColor.value
    };
    
    localStorage.setItem('pref', JSON.stringify(userPref));
    
    console.log(userPref);
    
  }
  
function handleUserPref() {
  
    if (localStorage.getItem('pref')) {
      
      var pref = JSON.parse(localStorage.getItem('pref'));
      
      console.log('pref, ',pref);
      
      
      document.body.style.backgroundColor = pref.bgColor;
      document.body.style.color           = pref.color;
    }
}