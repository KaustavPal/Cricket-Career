const nameInput = document.querySelector("#name");
const dobInput = document.querySelector("#dob");
const photoInput = document.querySelector("#photo");
const birthplaceInput = document.querySelector("#birthplace");
const careerInput = document.querySelector("#career");
const matchesInput = document.querySelector("#matches");
const scoreInput = document.querySelector("#score");
const fiftiesInput = document.querySelector("#fifties");
const centuriesInput = document.querySelector("#centuries");
const wicketsInput = document.querySelector("#wickets");
const averageInput = document.querySelector("#average");
const addBtn = document.querySelector("#add-player");
const playerSearchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");

addBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const dob = dobInput.value;
  const photo = photoInput.value;
  const birthplace = birthplaceInput.value;
  const career = careerInput.value;
  const matches = matchesInput.value;
  const score = scoreInput.value;
  const fifties = fiftiesInput.value;
  const centuries = centuriesInput.value;
  const wickets = wicketsInput.value;
  const average = averageInput.value;
  try {
    if (
      name &&
      dob &&
      photo &&
      birthplace &&
      career &&
      matches &&
      score &&
      fifties &&
      centuries &&
      wickets &&
      average
    ) {
      await axios.post("http://localhost:3000/cricketcareer/add-player", {
        name,
        dob,
        photo,
        birthplace,
        career,
        matches,
        score,
        fifties,
        centuries,
        wickets,
        average,
      });

      nameInput.value = "";
      dobInput.value = "";
      photoInput.value = "";
      birthplaceInput.value = "";
      careerInput.value = "";
      matchesInput.value = "";
      scoreInput.value = "";
      fiftiesInput.value = "";
      centuriesInput.value = "";
      wicketsInput.value = "";
      averageInput.value = "";

      await getPlayers();
    }
  } catch (err) {
    console.log(err);
  }
});

async function getPlayers() {
  try {
    const response = await axios.get(
      "http://localhost:3000/cricketcareer/players"
    );
  } catch (err) {
    console.log(err);
  }
}

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const searchPlayer = playerSearchInput.value;
    if (searchPlayer) {
      const response = await axios.post(
        "http://localhost:3000/cricketcareer/player-search",
        { searchPlayer }
      );

      const player = response.data;
      showPlayer(player);
      playerSearchInput.value = "";
    }
  } catch (err) {
    console.log(err);
  }
});

function showPlayer(player) {
  const div = document.querySelector("#player-info-div");
  div.innerHTML = `<div><img src=${player.photo} width=200></img><h2>${
    player.name
  }</h2><p>${new Date(
    player.dob
  ).toLocaleDateString()}</p><h2>Personal Information</h2><p>No of Matches: ${
    player.matches
  }</p><p>Runs: ${player.score}</p><p>No of Fifties: ${
    player.fifties
  }</p><p>No of Centuries: ${player.centuries}</p><p>Wickets: ${
    player.wickets
  }</p><p>Average: ${
    player.average
  }</p></div><div><buttton id="edit-btn" class="edit-btn btn btn-primary" onclick=editInfo(${
    player.name
  })>Edit Info</buttton><p>${player.career}</p></div>`;
}

async function editInfo(player) {
  const searchPlayer = player;
  try {
    const response = await axios.post(
      "http://localhost:3000/cricketcareer/player-search",
      { searchPlayer }
    );
    const player = response.data;
    nameInput.value = player.name;
    dobInput.value = player.dob;
    photoInput.value = player.photo;
    birthplaceInput.value = player.birthplace;
    careerInput.value = player.career;
    matchesInput.value = player.matches;
    scoreInput.value = player.score;
    fiftiesInput.value = player.fifties;
    centuriesInput.value = player.centuries;
    wicketsInput.value = player.wickets;
    averageInput.value = player.average;

    const name = nameInput.value;
    const dob = dobInput.value;
    const photo = photoInput.value;
    const birthplace = birthplaceInput.value;
    const career = careerInput.value;
    const matches = matchesInput.value;
    const score = scoreInput.value;
    const fifties = fiftiesInput.value;
    const centuries = centuriesInput.value;
    const wickets = wicketsInput.value;
    const average = averageInput.value;

    if (
      name &&
      dob &&
      photo &&
      birthplace &&
      career &&
      matches &&
      score &&
      fifties &&
      centuries &&
      wickets &&
      average
    ) {
      await axios.put("http://localhost:3000/cricketcareer/edit-player", {
        name,
        dob,
        photo,
        birthplace,
        career,
        matches,
        score,
        fifties,
        centuries,
        wickets,
        average,
      });

      nameInput.value = "";
      dobInput.value = "";
      photoInput.value = "";
      birthplaceInput.value = "";
      careerInput.value = "";
      matchesInput.value = "";
      scoreInput.value = "";
      fiftiesInput.value = "";
      centuriesInput.value = "";
      wicketsInput.value = "";
      averageInput.value = "";

      showPlayer(name);
    }
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("DOMContentLoaded", getPlayers);
