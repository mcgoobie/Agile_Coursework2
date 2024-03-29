function checkName(obj, error, button) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?~]/;
  let stringVal = document.getElementById(obj.id).value;

  if (specialChars.test(stringVal)) {
    obj.style.borderColor = "red";
    document.getElementsByClassName(error)[0].style.display =
      "block";
    document.getElementsByClassName(error)[0].innerHTML =
      "Textfield cannot contain special characters!";
    document.getElementsByClassName(button)[0].disabled = true;
  } else {
    console.log("Pass!");
    obj.style.borderColor = "#ececec";
    document.getElementsByClassName(error)[0].style.display =
      "none";
    document.getElementsByClassName(button)[0].disabled = false;
  }
}

function reg_checkPassword() {
  var pwd = document.getElementById("password");
  var cfmPwd = document.getElementById("cfm-password");

  if (pwd.value !== cfmPwd.value) {
    pwd.style.borderColor = "red";
    cfmPwd.style.borderColor = "red";
    document.getElementsByClassName("formleft-warning")[0].style.display =
      "block";
    document.getElementsByClassName("formleft-warning")[0].innerHTML =
      "Passwords do not match.";
    document.getElementsByClassName("next-btn")[0].disabled = true;
  } else {
    console.log("Passwords match");
    pwd.style.borderColor = "#ececec";
    cfmPwd.style.borderColor = "#ececec";
    document.getElementsByClassName("formleft-warning")[0].style.display =
      "none";
    document.getElementsByClassName("next-btn")[0].disabled = false;
  }
}

function checkFilled(formName, fieldsToVal) {
  var form = document.getElementById(formName);

  if (form.tagName == "DIV") {
    var childElems = form.children;
    console.log(childElems);
    var count = 0;

    for (var i = 0, len = childElems.length; i < len; ++i) {
      if (childElems[i].tagName == "INPUT" && childElems[i].value != "")
        count += 1;
      console.log(count);
    }
  } else if (form.tagName == "FORM") {
    var childElems = form.elements;
    var count = 0;
    console.log(childElems);

    for (var i = 0, len = childElems.length; i < len; ++i) {
      if (childElems[i].value != "") count += 1;
    }
  }

  if (fieldsToVal == count) {
    return true;
  }
}

function reg_enableContactForm() {
  if (checkFilled("register-formbody-left", 6)) {
    document.getElementsByClassName("formleft-warning")[0].style.display =
      "none";
    document.getElementById("register-form-right").style.opacity = "1";
    document.getElementById("mobilenum").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("address").disabled = false;
    document.getElementById("postal").disabled = false;
    document.getElementById("register-btn").disabled = false;
  } else {
    document.getElementsByClassName("formleft-warning")[0].style.display =
      "block";
    document.getElementsByClassName("formleft-warning")[0].innerHTML =
      "There have been fields left empty, fill them out before proceeding.";
    document.getElementsByClassName("next-btn")[0].disabled = true;
  }
}

function validateEmail(button) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var email = document.getElementById("email");

  if (email.value.match(mailformat)) {
    if (button == "register-btn")
      email.style.borderColor = "#ececec";
    else if (button == "save-button")
      email.style.borderColor = "#000000";

    document.getElementById("email-warning").style.display =
      "none";
    document.getElementById(button).disabled = false;

    return true;
  } else {
    email.style.borderColor = "red";
    document.getElementById("email-warning").style.display =
      "block";
    document.getElementById("email-warning").innerHTML =
      "Please enter a valid email address.";
    document.getElementById(button).disabled = true;

    return false;
  }
}

function validateMobile(button) {
  var mobileFormat = /^[0-9]{8}$/;
  var mobileField = document.getElementById("mobilenum");

  if (mobileField.value.match(mobileFormat)) {
    if (button == "register-btn")
      mobileField.style.borderColor = "#ececec";
    else if (button == "save-button")
      mobileField.style.borderColor = "#000000";

    document.getElementById("mobile-warning").style.display =
      "none";
    document.getElementById(button).disabled = false;

    return true;
  } else {
    mobileField.style.borderColor = "red";
    document.getElementById("mobile-warning").style.display =
      "block";
    document.getElementById("mobile-warning").innerHTML =
      "Please enter a valid mobile number of 8 digits only.";
    document.getElementById(button).disabled = true;

    return false;
  }
}

function validatePostal(button) {
  var postalFormat = /^[0-9]{6}$/;
  var postalField = document.getElementById("postal");

  console.log(postalField.value);

  if (postalField.value.match(postalFormat)) {
    if (button == "register-btn")
      postalField.style.borderColor = "#ececec";
    else if (button == "save-button")
      postalField.style.borderColor = "#000000";
    document.getElementById("postal-warning").style.display =
      "none";
    document.getElementById(button).disabled = false;

    return true;
  } else {
    postalField.style.borderColor = "red";
    document.getElementById("postal-warning").style.display =
      "block";
    document.getElementById("postal-warning").innerHTML =
      "Please enter a valid postal number of 6 digits only.";
    document.getElementById(button).disabled = true;

    return false;
  }
}

function editButtonClicked() {
  var form = document.getElementById("edit-form");
  var elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = false;
    elements[i].style.borderColor = "black";
  }

  document.getElementById("edit-button").style.display = "none";

  document.getElementById("save-button").style.display = "grid";
  document.getElementById("cancel-button").style.display = "grid";
}

function updateInput(id, type) {
  document.getElementById(id).value = type;
}

function cancelButtonClicked() {
  var form = document.getElementById("edit-form");
  var elements = form.elements;
  for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = true;
    elements[i].style.borderColor = "#ccc";
  }

  document.getElementById("edit-button").style.display = "grid";

  document.getElementById("save-button").style.display = "none";
  document.getElementById("cancel-button").style.display = "none";
}

function saveButtonClicked() {
  if (checkFilled('edit-form', 6)) {
    console.log("button clicked");
    var form = document.getElementById("edit-form");
    form.submit();
  } else {
    console.log("Failed to Save");
    document.getElementById('error-msg').style.display = "block";
  }
}

function searchForUser(input) {
  var div_row = document.getElementsByClassName("m-booking-divbox");
  var searchKey = document.getElementById(input);

  for (var i = 0; i < div_row.length; i++) {
    var user = div_row[i].children[0];
    user = user.children.namedItem("username")
    var username = user.innerText.toString();

    if (username.includes(searchKey.value) == false) {
      div_row[i].style.display = "none";
    } else if (username.includes(searchKey.value)) {
      div_row[i].style.display = "flex";
    }
  }
}