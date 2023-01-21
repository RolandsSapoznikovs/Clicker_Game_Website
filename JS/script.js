const { Script } = require("vm");

document.getElementsByClassName("RegisterButton").onclick = function()
{
  location.href = "Register.html"
}

function myFunction() {
  var x = document.getElementById("passwordid");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function deleteData(event, id) {
  event.preventDefault();
  fetch('/delete-data/${id}', {
    method: 'DELETE'
  })
  .then(data => {
    console.log(data);
  })
}