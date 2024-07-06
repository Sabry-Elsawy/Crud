// Selecting DOM elements
var firstName=document.getElementById('fname')
var lastName=document.getElementById('lname')
var phoneNumber=document.getElementById('pnumber')
var email=document.getElementById('email')
var date=document.getElementById('date')
var addContact=document.getElementById('btn')
var profilePhoto=document.getElementById('profilePhoto')
var inputPhoto=document.getElementById('inputPhoto')
var inputs=Array.from(document.querySelectorAll('.input'))   // Assuming .input is a class used for inputs
var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
var inn=document.getElementById('dis')
var searchInput = document.getElementById('searchInput');
var delet=document.getElementById('delet')
var deletPhoto=document.getElementById('deletPhoto')
var btnMood = 'Add contact'
var modalBtn=document.getElementById('modalBtn')
var currentIndex=0
 
var users=[]
// Load users from localStorage on page load
if(JSON.parse(localStorage.getItem('userList')) !=null){
    users=JSON.parse(localStorage.getItem('userList')) 
    displayData()
}
 
 




// Event listener for inputPhoto change event
inputPhoto.addEventListener('change', function () {
    var reader = new FileReader();
    reader.onload = function (e) {
        // Update profile photo preview with selected image
        profilePhoto.src = e.target.result;
    }

    // Read the selected file as a data URL
    reader.readAsDataURL(inputPhoto.files[0]);
});
// Event listener for Add/Update contact button
addContact.addEventListener('click',function(){
    if (addContact.innerHTML=='Add contact') {
        getData()
    }
    else{
        udpateContact()
        
    }
 
    displayData()
 
    
    clearInputs()
    restForm()
    myModal.hide();
})
 

// Function to retrieve form data and add to users array
function getData(){
    
 
    var user={
        firstName:firstName.value,
        lastName:lastName.value,
        phoneNumber:phoneNumber.value,
        email:email.value,
        date:date.value,
        photo: profilePhoto.getAttribute('src')
    }
    users.push(user)
    localStorage.setItem('userList',JSON.stringify(users))
}
     
 

// Function to display users data in the list
function displayData(){
    var cartiona=''
    for (let i = 0; i < users.length; i++) {
         cartiona += `
          <li>
                    <div class="content-list">
                        <img src="${users[i].photo}" alt="">
                        <div class="caption">
                            <h1>${users[i].firstName} ${users[i].lastName}</h1>
                            <p>${users[i].phoneNumber}</p>
                        </div>
                    </div>
                    <div class="icon">
                        <i class="fa-solid fa-eye" onclick="dispalyFixedData(${i})"></i>
                        <i class="fa-solid fa-pen-to-square" onclick="getDataInfo(${i})"></i>
                        <i class="fa-solid fa-trash" onclick="deleteItem(${i})"></i>
                    </div>
                </li>
         `
        
    }
    document.getElementById('list').innerHTML=cartiona
}



// Function to clear input fields
function clearInputs(){
    for (let index = 0; index < inputs.length; index++) {
         inputs[index].value=''
        
    }
    profilePhoto.src = 'images/profile.png';
}

function deleteItem(index){
      users.splice(index,1)
      localStorage.setItem('userList',JSON.stringify(users))
      displayData()
}


// Function to delete a user from users array and localStorage
function getDataInfo(index){
    currentIndex=index
    myModal.show();

    var currentUser=users[index]
    firstName.value=currentUser.firstName;
    lastName.value=currentUser.lastName;
    phoneNumber.value=currentUser.phoneNumber;
    email.value=currentUser.email;
    date.value=currentUser.date;
    profilePhoto.src=currentUser.photo;

    addContact.innerHTML='Update contact'
    btnMood='Update contact'

}

// Function to update existing user data
function  udpateContact(){
    var user={
        firstName:firstName.value,
        lastName:lastName.value,
        phoneNumber:phoneNumber.value,
        email:email.value,
        date:date.value,
        photo: profilePhoto.getAttribute('src')
    }
     users[currentIndex]=user
     
      
    localStorage.setItem('userList',JSON.stringify(users))
    
      addContact.innerHTML='Add contact'
      btnMood='Add contact'
}


// Event listener for search input
searchInput.addEventListener('keyup', function () {
    search(this.value);
});


// Function to filter and display users based on search input
function search(searchTxt){
    var cartiona=''
    for (let i = 0; i < users.length; i++) {

        if (users[i].firstName.toLowerCase().includes(searchTxt.toLowerCase()) || users[i].lastName.toLowerCase().includes(searchTxt.toLowerCase())) {
            cartiona += `
            <li>
                      <div class="content-list">
                          <img src="${users[i].photo}" alt="">
                          <div class="caption">
                              <h1>${users[i].firstName} ${users[i].lastName}</h1>
                              <p>${users[i].phoneNumber}</p>
                          </div>
                      </div>
                      <div class="icon">
                          <i class="fa-solid fa-eye" onclick="dispalyFixedData(${i})"></i>
                          <i class="fa-solid fa-pen-to-square" onclick="getDataInfo(${i})"></i>
                          <i class="fa-solid fa-trash" onclick="deleteItem(${i})"></i>
                      </div>
                  </li>
           `
          
      }
      document.getElementById('list').innerHTML=cartiona
        }
    
}


// Event listener for modal button to reset form

modalBtn.addEventListener('click', function () {
    resetFormData();
    clearInputs()
    // Change addBtn text to 'Add'
    addContact.innerHTML = 'Add contact'

    // Set button mood to 'add' mode
    btnMood = 'Add contact'
})


 
function dispalyFixedData(index) {
    // Populate form fields with data from selected user
    myModal.show();
    firstName.value = users[index].firstName;
    lastName.value = users[index].lastName;
    phoneNumber.value = users[index].phoneNumber;
    email.value = users[index].email;
    date.value = users[index].date;
   
    profilePhoto.src = users[index].photo;

    // Hide buttons and adjust styles for readonly view
    addContact.style.visibility = 'hidden'; // Hide add/update button
     

 
    photoBtn.style.display = 'none'; // Reduce opacity of photo button

    // Make all inputs readonly and disable pointer events
    inputs.forEach(input => {
        input.readOnly = true; // Set input fields to readonly
        input.style.pointerEvents = 'none'; // Disable pointer events on inputs
    });
}

function resetFormData() {
    addContact.style.visibility = 'visible'; // Make add/update button visible
 
 
    photoBtn.style.display = 'inline-block';  // Set full opacity for photo button

    // Enable editing for all input fields
    inputs.forEach(input => {
        input.readOnly = false; // Allow input fields to be editable
        input.style.pointerEvents = 'visible'; // Enable pointer events on inputs
    });
}




// Function to validate input fields
function validateInputs() {
   
    var namePattern =  /^[a-zA-Z]{2,9}$/;
 
var phonePattern = /^(010|011|012|015)[0-9]{8}$/;  

    if (!namePattern.test(firstName.value)) {
        firstName.classList.add('is-invalid');
        firstName.classList.remove('is-valid');
        addContact.disabled = true;
        return false;
    } else {
        firstName.classList.add('is-valid');
        firstName.classList.remove('is-invalid');
    }

    if (!namePattern.test(lastName.value)) {
        lastName.classList.add('is-invalid');
        lastName.classList.remove('is-valid');
        addContact.disabled = true;
        return false;
    } else {
        lastName.classList.add('is-valid');
        lastName.classList.remove('is-invalid');
    }

    if (!phonePattern.test(phoneNumber.value)) {
        phoneNumber.classList.add('is-invalid');
        phoneNumber.classList.remove('is-valid');
        addContact.disabled = true;
        return false;
    } else {
        phoneNumber.classList.add('is-valid');
        phoneNumber.classList.remove('is-invalid');
    }

    addContact.removeAttribute('disabled');
    return true;
}

// Event listeners for input fields to validate on keyup
firstName.onkeyup = function() {
    validateInputs();
}

lastName.onkeyup = function() {
    validateInputs();
}

phoneNumber.onkeyup = function() {
    validateInputs();
}


// Function to reset form validation styles
function restForm(){
    for (let index = 0; index < inputs.length; index++) {
        
        inputs[index].classList.remove('is-valid');
        inputs[index].classList.remove('is-invalid');
    }
}


