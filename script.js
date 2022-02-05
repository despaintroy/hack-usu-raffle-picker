const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const get = (key) => JSON.parse(localStorage.getItem(key));
const clear = (key) => localStorage.removeItem(key);

function importNamesFromFile() {
  const setFeedback = (text) =>
    (document.getElementById("feedback").innerHTML = text);
  var file = document.getElementById("file").files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const names = reader.result
        .split("\n")
        .map((n) => n.trim())
        .filter((n) => n.length > 0);
      set("available", names);
      setFeedback("Imported " + names.length + " names.");
    };
  } else {
    setFeedback("No file selected.");
  }
}

function pickRandomName() {
  available = get("available") ?? [];
  picked = get("picked") ?? [];

  if (available.length === 0) return;

  var randomIndex = Math.floor(Math.random() * available.length);
  picked.push(available[randomIndex]);
  available.splice(randomIndex, 1);

  set("picked", picked);
  set("available", available);

  renderLists();
}

function reset() {
  available = get("available") ?? [];
  picked = get("picked") ?? [];

  set("available", available.concat(picked));
  set("picked", []);

  renderLists();
}

function renderLists() {
  var availableList = document.getElementById("available");
  var pickedList = document.getElementById("picked");
  availableList.innerHTML = (get("available") ?? [])
    .map((n) => `<li>${n}</li>`)
    .join("");
  pickedList.innerHTML = (get("picked") ?? [])
    .map((n) => `<li>${n}</li>`)
    .join("");
}
