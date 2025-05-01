/* 
 Name: Ojonobi Emina
 File: homework3.js
 Date Created: 30th April 2025
 Date Updated: 30th April 2025
 Purpose: Validate data on the fly from a form
*/

var error_flag = 0;

function setup() {
  error_flag = 0;
  console.log(error_flag);
}


function reset() {
  document.getElementById("outputformdata").innerHTML = "(Form successfully cleared!)";
}


function review() {
  var formcontents = document.getElementById("registrationForm");
  var formoutput = "<table class='output'><tr><th>Dataname</th><th>Type</th><th>Value</th></tr>";
  var datatype;

  for (var i = 0; i < formcontents.elements.length; i++) {
    var element = formcontents.elements[i];
    console.log("item: " + i + " " + element.name + " = " + element.value);

    datatype = element.type;

    switch (datatype) {
      case "checkbox":
        if (element.checked) {
          formoutput += "<tr><td align='right'>" + element.name + "</td>";
          formoutput += "<td align='right'>" + datatype + "</td>";
          formoutput += "<td class='outputdata'>Checked</td></tr>";
        }
        break;

      case "radio":
        if (element.checked) {
          formoutput += "<tr><td align='right'>" + element.name + "</td>";
          formoutput += "<td align='right'>" + datatype + "</td>";
          formoutput += "<td class='outputdata'>" + element.value + "</td></tr>";
        }
        break;

      case "button":
      case "submit":
      case "reset":
        break;

      default:
        formoutput += "<tr><td align='right'>" + element.name + "</td>";
        formoutput += "<td align='right'>" + datatype + "</td>";
        formoutput += "<td class='outputdata'>" + element.value + "</td></tr>";
        break;
    }
  }

  formoutput += "</table>";
  document.getElementById("outputDiv").innerHTML = formoutput;
}


function saveNameToCookies() {
  let error_flag = 0;

  let firstname = document.getElementById("firstname").value;
  let mi = document.getElementById("mi").value;
  let lastname = document.getElementById("lastname").value;

  // Validate firstname
  if (firstname.length < 2) {
    document.getElementById("fname_message").innerHTML = "First name needs to contain at least 2 characters";
    error_flag = 1;
  } else {
    if (/^[a-zA-Z2-5'-]+$/.test(firstname)) {
      document.getElementById("fname_message").innerHTML = "";
    } else {
      document.getElementById("fname_message").innerHTML = "Invalid characters in First name.";
      error_flag = 1;
    }
  }

  // Validate middle initial (optional but if entered, must be 1 letter)
  if (mi.length > 0 && !/^[a-zA-Z]$/.test(mi)) {
    document.getElementById("mi_message").innerHTML = "Middle initial must be a single letter.";
    error_flag = 1;
  } else {
    document.getElementById("mi_message").innerHTML = "";
  }

  // Validate lastname
  if (lastname.length < 2) {
    document.getElementById("lname_message").innerHTML = "Last name needs to contain at least 2 characters";
    error_flag = 1;
  } else {
    if (/^[a-zA-Z2-5'-]+$/.test(lastname)) {
      document.getElementById("lname_message").innerHTML = "";
    } else {
      document.getElementById("lname_message").innerHTML = "Invalid characters in Last name.";
      error_flag = 1;
    }
  }

  // Save to cookies if no errors
  if (error_flag == 0) {
    setCookie("firstname", firstname, 7);
    setCookie("mi", mi, 7);
    setCookie("lastname", lastname, 7);
    alert("Name saved in cookies!");
  }
}

function setCookie(name, cvalue, expiryDays) {
  var day = new Date();
  day.setTime(day.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + day.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
}



function validatedate() {
  let x = document.getElementById("DOB").value;
  let inputDate = new Date(x);
  let today = new Date();
  let earliestDate = new Date();
  earliestDate.setFullYear(today.getFullYear() - 120);

  if (x.length === 0) {
    document.getElementById("DOBError").innerHTML = "Date field cannot be empty.";
    error_flag = 1;
  } else {
    if (inputDate > today || inputDate < earliestDate || isNaN(inputDate.getTime())) {
      document.getElementById("DOBError").innerHTML = "Date must be within the last 120 years and not in the future.";
      error_flag = 1;
    } else {
      document.getElementById("DOBError").innerHTML = "";
    }
  }
}


function formatSSN(input) {
  let digits = input.value.replace(/\D/g, "");
  if (digits.length > 9) {
    digits = digits.slice(0, 9);
  }

  let formatted = "";
  if (digits.length > 0) {
    formatted = digits.slice(0, 3);
  }
  if (digits.length >= 4) {
    formatted += "-" + digits.slice(3, 5);
  }
  if (digits.length >= 6) {
    formatted += "-" + digits.slice(5, 9);
  }

  input.value = formatted;
}


function validatessn() {
  let x = document.getElementById("ssn").value;
  let digitsOnly = x.replace(/\D/g, "");

  if (digitsOnly.length !== 9) {
    document.getElementById("ssnError").innerHTML = "SSN must be exactly 9 digits.";
    error_flag = 1;
  } else {
    if (/^\d{9}$/.test(digitsOnly)) {
      document.getElementById("ssnError").innerHTML = "";
    } else {
      document.getElementById("ssnError").innerHTML = "SSN must contain only numbers.";
      error_flag = 1;
    }
  }
}


function validateaddr1() {
  let x = document.getElementById("addr1").value;
  if (x.length < 2) {
    document.getElementById("addr1_message").innerHTML = " Input address here";
    error_flag = 1;
  } else {
    document.getElementById("addr1_message").innerHTML = "";
  }
}


function validateaddr2() {
  let x = document.getElementById("addr2").value;
  if (x.length < 2) {
    document.getElementById("addr2_message").innerHTML = "Enter something on address line";
    error_flag = 1;
  } else {
    document.getElementById("addr2_message").innerHTML = "";
  }
}


function validatecity() {
  if (document.getElementById("city").value.match(/^[ a-zA-Z3-5'-]+$/)) {
    document.getElementById("city_message").innerHTML = "";
  } else {
    document.getElementById("city_message").innerHTML = "Please insert valid characters.";
    error_flag = 1;
  }
}


function validatestate() {
  let z = document.getElementById("state").value;
  if (z === " ") {
    document.getElementById("state_message").innerHTML = "Please choose a state";
    error_flag = 1;
  } else {
    document.getElementById("state_message").innerHTML = "";
  }
}


function passwordinput() {
  var passwordinput = document.getElementById("password").value;
  var passwordoutput = "";

  if (passwordinput.search(/[a-z]/) < 0) {
    passwordoutput = "Enter at least 1 lower case letter";
    error_flag = 1;
  }
  document.getElementById("password_message1").innerHTML = passwordoutput;

  passwordoutput = "";
  if (passwordinput.search(/[A-Z]/) < 0) {
    passwordoutput = "Enter at least 1 upper case letter";
    error_flag = 1;
  }
  document.getElementById("password_message2").innerHTML = passwordoutput;

  passwordoutput = "";
  if (passwordinput.search(/[0-9]/) < 0) {
    passwordoutput = "Enter at least 1 number";
    error_flag = 1;
  }
  document.getElementById("password_message3").innerHTML = passwordoutput;

  passwordoutput = "";
  if (passwordinput.search(/[!\@#\$%&*\-_\\.+\(\)]/) < 0) {
    passwordoutput = "Enter at least 1 special character";
    error_flag = 1;
  }
  document.getElementById("password_message4").innerHTML = passwordoutput;

  passwordoutput = "";
  if (passwordinput.length < 8) {
    passwordoutput = "Enter at least 8 characters";
    error_flag = 1;
  }
  document.getElementById("password_message5").innerHTML = passwordoutput;
}


function passwordmatch() {
  let x = document.getElementById("password").value;
  let y = document.getElementById("confirmpassword").value;

  if (x === y) {
    document.getElementById("password2_text").innerHTML = "";
  } else {
    document.getElementById("password2_text").innerHTML = "Passwords DO NOT match!";
    error_flag = 1;
  }
}

function checkform() {
  error_flag = 0;

  validatefirstname();
  validateMI();
  validatelastname();
  validatedate();
  validatessn();
  validateaddr1();
  validateaddr2();
  validatecity();
  validatestate();
  passwordinput();
  passwordmatch();

  console.log("Error flag: " + error_flag);

  if (error_flag === 1) {
    alert("Please review and fix your errors where needed!");
  } else {
    document.getElementById("submit").disabled = false;
  }
}
