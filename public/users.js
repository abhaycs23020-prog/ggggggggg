function register() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (!user || !pass) {
    alert("Please enter details!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[user]) {
    alert("User already exists!");
  } else {
    users[user] = pass;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered successfully!");
  }
}

function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[user] && users[user] === pass) {
    localStorage.setItem("currentUser", user);
    window.location.href = "categories.html";
  } else {
    alert("Invalid login!");
  }
}
