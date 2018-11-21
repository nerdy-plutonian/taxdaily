//service worker container
let swRegistration;

//listen for submit
document.getElementById('loginForm').addEventListener('submit', login);

function login(e){
    
    const username = document.getElementById('inputUsername').value;
    const password = document.getElementById('inputPassword').value;
    
    fetch('http://iml.npa-enterprise.com/AndroidPortalService/api/!/GetUserByUsername')
    .then(res => res.json())
    .then(data => {
        let found = false;
        console.log(data);
        data.forEach(user => {
            if((username == user.szUserName) && (password == user.szPassword)){
                found = true;
                window.location.assign("home.html")
                return;
            }
        });
        if(!found){
            alert('Wrong username or password!');
        }
    });

    
      e.preventDefault();
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');
  
    navigator.serviceWorker.register('sw.js')
    .then(function(swReg) {
      console.log('Service Worker is registered', swReg);
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
    });
  } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }