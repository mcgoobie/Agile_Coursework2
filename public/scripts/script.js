function reg_checkName(obj) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?~]/;
  let stringVal = document.getElementById(obj.id).value;

  if (specialChars.test(stringVal)) {
    obj.style.borderColor = "red";
    document.getElementsByClassName("formleft-warning")[0].style.display = "block";
    document.getElementsByClassName("formleft-warning")[0].innerHTML = "Textfield cannot contain special characters!";
    document.getElementsByClassName("next-btn")[0].disabled = true;
  }
  else {
    console.log("Pass!");
    obj.style.borderColor = "#ececec";
    document.getElementsByClassName("formleft-warning")[0].style.display = "none";
    document.getElementsByClassName("next-btn")[0].disabled = false;
  }

}

function reg_checkPassword() {
  var pwd = document.getElementById("password");
  var cfmPwd = document.getElementById("cfm-password");

  if (pwd.value !== cfmPwd.value) {
    pwd.style.borderColor = "red";
    cfmPwd.style.borderColor = "red";
    document.getElementsByClassName("formleft-warning")[0].style.display = "block";
    document.getElementsByClassName("formleft-warning")[0].innerHTML = "Passwords do not match.";
    document.getElementsByClassName("next-btn")[0].disabled = true;
  } else {
    console.log("Passwords match")
    pwd.style.borderColor = "#ececec";
    cfmPwd.style.borderColor = "#ececec";
    document.getElementsByClassName("formleft-warning")[0].style.display = "none";
    document.getElementsByClassName("next-btn")[0].disabled = false;
  }
}

function reg_checkFilled() {
  if (
    document.getElementById("fname").value != "" &&
    document.getElementById("lname").value != "" &&
    document.getElementById("username").value != "" &&
    document.getElementById("dob").value != "" &&
    document.getElementById("password").value != "" &&
    document.getElementById("cfm-password").value != ""
  ) {
    return true;
  }
}

function reg_enableContactForm() {
  if (reg_checkFilled()) {
    document.getElementsByClassName("formleft-warning")[0].style.display = "none";
    document.getElementById("register-form-right").style.opacity = "1";
    document.getElementById("mobilenum").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("address").disabled = false;
    document.getElementById("postal").disabled = false;
    document.getElementById("register-btn").disabled = false;
  } else {
    document.getElementsByClassName("formleft-warning")[0].style.display = "block";
    document.getElementsByClassName("formleft-warning")[0].innerHTML = "There have been fields left empty, fill them out before proceeding.";
    document.getElementsByClassName("next-btn")[0].disabled = true;
  }
}

function reg_validateEmail(obj) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var email = document.getElementById(obj.id);

  if (email.value.match(mailformat)) {
    email.style.borderColor = "#ececec";
    document.getElementsByClassName("formright-warning")[0].style.display = "none";
    document.getElementById("register-btn").disabled = false;
  }
  else {
    email.style.borderColor = "red";
    document.getElementsByClassName("formright-warning")[0].style.display = "block";
    document.getElementsByClassName("formright-warning")[0].innerHTML = "Please enter a valid email address.";
    document.getElementById("register-btn").disabled = true;
  }
}