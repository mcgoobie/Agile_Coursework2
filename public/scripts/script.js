function checkName(obj, error) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?~]/;
  let stringVal = document.getElementById(obj.id).value;

  if (specialChars.test(stringVal)) {
    obj.style.borderColor = "red";
    document.getElementsByClassName(error)[0].style.display = "block";
    document.getElementsByClassName(error)[0].innerHTML = "Textfield cannot contain special characters!";
    document.getElementsByClassName("next-btn")[0].disabled = true;
  }
  else {
    console.log("Pass!");
    obj.style.borderColor = "#ececec";
    document.getElementsByClassName(error)[0].style.display = "none";
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

function checkFilled(formName, fieldsToVal) {
  var form = document.getElementById(formName);

  if (form.tagName == "DIV") {
    var childElems = form.children;
    console.log(childElems);
    var count = 0;

    for (var i = 0, len = childElems.length; i < len; ++i) {
      if (childElems.tagName == "input" && childElems[i].value != "")
        count += 1;
    }
  } else if (form.tagName == "FORM") {
    var childElems = form.elements;
    var count = 0;
    console.log(childElems);

    for (var i = 0, len = childElems.length; i < len; ++i) {
      if (childElems[i].value != "")
        count += 1;
    }
  }

  if (fieldsToVal == count) {
    return true;
  }
}

function reg_enableContactForm() {
  if (checkFilled("register-formbody-left", 6)) {
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
  console.log(type);
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