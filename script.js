available = [];
picked = [];

function loadNamesFromFile() {
  var file = document.getElementById("file").files[0];
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function (event) {
    available = event.target.result.split("\n");
    var nameList = document.getElementById("available");
    nameList.innerHTML = "";
    for (var i = 0; i < available.length; i++) {
      nameList.innerHTML += "<li>" + available[i] + "</li>";
    }
  };
}

function pickRandomName() {
  if (available.length == 0) return;

  var randomIndex = Math.floor(Math.random() * available.length);

  picked.push(available[randomIndex]);
  available.splice(randomIndex, 1);
  renderLists();
}

function reset() {
  available = available.concat(picked);
  picked = [];
  renderLists();
}

function renderLists() {
  var availableList = document.getElementById("available");
  var pickedList = document.getElementById("picked");
  availableList.innerHTML = "";
  for (var i = 0; i < available.length; i++) {
    availableList.innerHTML += "<li>" + available[i] + "</li>";
  }
  pickedList.innerHTML = "";
  for (var i = 0; i < picked.length; i++) {
    pickedList.innerHTML += "<li>" + picked[i] + "</li>";
  }
}
