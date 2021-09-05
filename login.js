/*===== LOGIN SHOW and HIDDEN =====*/
const signUp = document.getElementById('sign-up'),
    signIn = document.getElementById('sign-in'),
    loginIn = document.getElementById('login-in'),
    loginUp = document.getElementById('login-up')


signUp.addEventListener('click', ()=>{
    // Remove classes first if they exist
    loginIn.classList.remove('block')
    loginUp.classList.remove('none')

    // Add classes
    loginIn.classList.toggle('none')
    loginUp.classList.toggle('block')
})

signIn.addEventListener('click', ()=>{
    // Remove classes first if they exist
    loginIn.classList.remove('none')
    loginUp.classList.remove('block')

    // Add classes
    loginIn.classList.toggle('block')
    loginUp.classList.toggle('none')
})

function login() {
    event.preventDefault();
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const arrayUsers = localStorage.getItem('users');
    const jsonArrayUsers = JSON.parse(arrayUsers);
    const findIndexUser = jsonArrayUsers.findIndex(function (user) {
      return user.email == emailInput.value;
    });


    if (findIndexUser === -1) {
      const errorMessage = document.getElementById('error');
      errorMessage.style.display = 'inline';
      errorMessage.style.color = 'red';
      errorMessage.innerHTML = 'Email not exist!';
    } else {
      if (jsonArrayUsers[findIndexUser].password === passwordInput.value) {
        localStorage.setItem('login', JSON.stringify(true));
        location.replace('./index.html');
      } else {
        const errorMessage = document.getElementById('error');
        errorMessage.style.display = 'inline';
        errorMessage.style.color = 'red';
        errorMessage.innerHTML = 'Password not match!';
      }
    }
  }

  function saveUserToLocalstorage(email, password) {
    const arrayUser = localStorage.getItem('users');
    if (arrayUser === null) {
      const newArrayUsers = [
        {
          email: email,
          password: password,
        },
      ];
      localStorage.setItem('users', JSON.stringify(newArrayUsers));
      location.replace('./login.html');
    } else {
      const newArrayUsers = JSON.parse(arrayUser);
      const findUserIndex = newArrayUsers.findIndex(function (user) {
        return user.email === email;
      });
      if (findUserIndex === -1) {
        newArrayUsers.push({
          email: email,
          password: password,
        });
        localStorage.setItem('users', JSON.stringify(newArrayUsers));
        location.replace('./login.html');
      } else {
        const validText = document.getElementById('valid-text');
        validText.innerHTML = 'Email already existed!';
        validText.style.display = 'inline';
        validText.style.color = 'red';
      }
    }
  }
  
  function signup() {
    event.preventDefault();
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rePasswordInput = document.getElementById('re-password');
    if (passwordInput.value == rePasswordInput.value) {
      const validText = document.getElementById('valid-text');
      validText.innerHTML = 'Validation';
      validText.style.display = 'inline';
      validText.style.color = 'green';
      saveUserToLocalstorage(emailInput.value, passwordInput.value);
    } else {
      const validText = document.getElementById('valid-text');
      validText.innerHTML = 'Password and re-password not match';
      validText.style.display = 'inline';
      validText.style.color = 'red';
      console.log('non-Valid');
    }
  }
  
  const signupBtn = document.getElementById('signup_btn');
  
  signupBtn.addEventListener('click', signup);