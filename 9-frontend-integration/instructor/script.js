console.log("hello world");

// dom selection form with id "login-form"
const loginForm = document.querySelector("#login-form");

// dom selection pre with id "data-server"
const dataServer = document.querySelector("#data-server");
dataServer.textContent = "Hello from JavaScript";

// add event listener on dom load and get all links
document.addEventListener("DOMContentLoaded", getAllLinks);

async function loginFormSubmit(event) {
  event.preventDefault();
  const email = event.target[0].value;
  const password = event.target[1].value;
  // frontend validation, prevent form submission if email or password is empty
  if (!email || !password) {
    alert("Please fill all the fields");
    return;
  }

  const url = "http://localhost:9090/login";
  const body = {
    email,
    password,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  // check if the response is successful
  if (!response.ok) {
    alert("Failed to login");
    return;
  }
  // response.json() returns a promise is due to fetch web api async nature
  const data = await response.json();
  console.log(data);
  // data is the response from the server
  alert(`Token is ${data.token}`);

  // save the token to local storage
  localStorage.setItem("token", data.token);
  // redirect to instructor/dashboard.html
  window.location.href = "/instructor/dashboard.html";
}

async function registerFormSubmit(event) {
  event.preventDefault();
  const email = event.target[0].value;
  const username = event.target[1].value;
  const password = event.target[2].value;
  // frontend validation, prevent form submission if email or username or password is empty
  if (!email || !password || !username) {
    alert("Please fill all the fields");
    return;
  }

  // fetch post api to http://localhost:9090/register
  const url = "http://localhost:9090/register";
  const body = {
    email,
    username,
    password,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  // check if the response is successful
  if (!response.ok) {
    alert("Failed to register");
    return;
  }
  // response.json() returns a promise is due to fetch web api async nature
  const data = await response.json();

  // data is the response from the server
  window.location.href = "/instructor/index.html";
}

async function getAllLinks() {
  const url = "http://localhost:9090/links";
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    alert("Failed to get links");
    window.location.href = "/instructor/index.html";
    return;
  }
  const data = await response.json();
  dataServer.textContent = JSON.stringify(data, null, 2);
}
