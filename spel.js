const server = "https://api.artifactsmmo.com";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IjNnZ2pzMjRnZWJyc2lAZm9sa3VuaXZlcnNpdGV0ZXQubnUiLCJwYXNzd29yZF9jaGFuZ2VkIjoiIn0.U6FAROmkAOPJe0qLM-gVW4JH--nzdLsw9D5FRyll1Zo";
const character = "Siempre";

document.getElementById("moveBtn").addEventListener("click", movement);
document.getElementById("fightBtn").addEventListener("click", fight);
document.getElementById("gatherBtn").addEventListener("click", gathering);
document.getElementById("restBtn").addEventListener("click", rest);
document.getElementById("craftBtn").addEventListener("click", craft);
document.getElementById("starLoopBtn").addEventListener("click", toggleStarLoop);
document.getElementById("startLoopBtn").addEventListener("click", toggleStartLoop);

let starLoopRunning = false; // Flagga för starLoop
let startLoopRunning = false; // Flagga för startLoop


async function movement() {
  const url = server + "/my/" + character + "/action/move";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: '{"x":2,"y":1}',
  };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

//movement();

async function fight() {
  const url = server + "/my/" + character + "/action/fight";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

//fight();

async function gathering() {
  const url = server + "/my/" + character + "/action/gathering";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

//gathering();



async function rest() {
  const url = server + "/my/" + character + "/action/rest";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
//rest();


async function craft() {
  const url = server + "/my/" + character + "/action/crafting";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      code: "copper",
      quantity: 1,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("Crafting result:", data);
  } catch (error) {
    console.error("Error in crafting:", error);
  }
}

//craft();

function toggleStarLoop() {
  starLoopRunning = !starLoopRunning;
  document.getElementById("starLoopBtn").textContent = starLoopRunning ? "Stop" : "Start";

  if (starLoopRunning) {
    starLoop();
  }
}

// Funktion för att växla startLoop
function toggleStartLoop() {
  startLoopRunning = !startLoopRunning;
  document.getElementById("startLoopBtn").textContent = startLoopRunning ? "Stop" : "Start";

  if (startLoopRunning) {
    startLoop();
  }
}

// Asynkron loopfunktion för starLoop
async function starLoop() {
  while (starLoopRunning) {
    console.log("Starting gathering sequence in Star Loop...");

    // Gather
    await gathering();
    console.log("Waiting 34 seconds after gathering...");
    await new Promise((resolve) => setTimeout(resolve, 34000)); // Vänta 34 sek

    console.log("Star Loop completed, restarting sequence...");
  }
  console.log("Star Loop stopped.");
}

// Asynkron loopfunktion för startLoop
async function startLoop() {
  while (startLoopRunning) {
    console.log("Starting fight sequence in Start Loop...");

    // Första fight
    await fight();
    console.log("Waiting 59 seconds after first fight...");
    await new Promise((resolve) => setTimeout(resolve, 59000)); // Vänta 59 sek

    // Andra fight
    await fight();
    console.log("Waiting 61 seconds after second fight...");
    await new Promise((resolve) => setTimeout(resolve, 61000)); // Vänta 61 sek

    // Rest
    await rest();
    console.log("Waiting 20 seconds after rest...");
    await new Promise((resolve) => setTimeout(resolve, 20000)); // Vänta 20 sek

    console.log("Start Loop completed, restarting sequence...");
  }
  console.log("Start Loop stopped.");
}
