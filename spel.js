const server = "https://api.artifactsmmo.com";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IjNnZ2pzMjRnZWJyc2lAZm9sa3VuaXZlcnNpdGV0ZXQubnUiLCJwYXNzd29yZF9jaGFuZ2VkIjoiIn0.U6FAROmkAOPJe0qLM-gVW4JH--nzdLsw9D5FRyll1Zo";
const character = "Siempre";

/*document.getElementById("moveBtn").addEventListener("click", movement);*/
document.getElementById("upBtn").addEventListener("click", () => movement(0, -1)); // Flytta uppåt
document.getElementById("downBtn").addEventListener("click", () => movement(0, 1)); // Flytta neråt
document.getElementById("leftBtn").addEventListener("click", () => movement(-1, 0)); // Flytta vänster
document.getElementById("rightBtn").addEventListener("click", () => movement(1, 0)); // Flytta höger
document.getElementById("fightBtn").addEventListener("click", fight);
document.getElementById("gatherBtn").addEventListener("click", gathering);
document.getElementById("restBtn").addEventListener("click", rest);
document.getElementById("craftBtn").addEventListener("click", craft);
document.getElementById("starLoopBtn").addEventListener("click", toggleStarLoop);
document.getElementById("startLoopBtn").addEventListener("click", toggleStartLoop);
document.getElementById("chickBtn").addEventListener("click", movechick);
document.getElementById("minBtn").addEventListener("click", movemin);
document.getElementById("woodBtn").addEventListener("click", movewoodcut);
document.getElementById("storeBtn").addEventListener("click", movestore);

let starLoopRunning = false; // Flagga för starLoop
let startLoopRunning = false; // Flagga för startLoop

let currentX = 0; // Startkoordinat för x
let currentY = 0; // Startkoordinat för y
let isInitialized = false;

let cooldownTimer = 0;
let cooldownInterval;

function startCooldown (duration) {
  cooldownTime = duration;

  if (cooldownInterval){
    clearInterval(cooldownInterval);
  }
  document.getElementById("cooldown").innerText = `Cooldown: ${cooldownTime}s`;

  cooldownInterval = setInterval(() => {
    cooldownTime -= 1;

    if (cooldownTime > 0) {
      document.getElementById("cooldown").innerText = `Cooldown: ${cooldownTime}s`;
    } else {
      document.getElementById("cooldown").innerText = "Cooldown: Ready!";
      clearInterval(cooldownInterval);
    }
  }, 1000);
  
}

function updateInfoBox() {
  document.getElementById("characterName").innerText = `Name: ${character}`;
  document.getElementById("coordinates").innerText = `Coordinates: (${currentX}, ${currentY})`;
}

async function mycharacter() {
  const url = server + "/characters/" + character;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // Sätt aktuella koordinater från servern
    currentX = data.data.x;
    currentY = data.data.y;
    console.log(`Initialized Position: (${currentX}, ${currentY})`);

    updateInfoBox();
    // Sätt flaggan som true för att tillåta rörelse
    isInitialized = true;
  } catch (error) {
    console.log("Error fetching character data:", error);
  }
}

// Funktion för rörelse
async function movement(deltaX, deltaY) {
  // Kontrollera om karaktärens position har initierats
  if (!isInitialized) {
    console.log("Position not initialized yet. Please wait...");
    return;
  }

  // Uppdatera koordinaterna baserat på rörelse
  currentX += deltaX;
  currentY += deltaY;

  const url = server + "/my/" + character + "/action/move";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      x: currentX,
      y: currentY,
    }),
  };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log("Movement result:", data);

    if (data.cooldown && data.cooldown.remaining_seconds) {
      startCooldown(data.cooldown.remaining_seconds); // Använd remaining_seconds för nedräkning
    } else {
      console.warn("No cooldown information found in response.");
    }
    
    /*currentX = data.x
    currentY = data.y*/

    updateInfoBox();
  } catch (error) {
    console.error("Error in movement:", error);
  }
}

// Anropa mycharacter vid sidladdning för att initiera positionen
mycharacter();

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
    const data = await response.json();
    console.log(data);
    if (data.data.cooldown && data.data.cooldown.remaining_seconds) {
      startCooldown(data.data.cooldown.remaining_seconds); // Använd remaining_seconds för nedräkning
    } else {
      console.warn("No cooldown information found in response.");
    }
  } catch (error) {
    console.log(error);
  }
}

//fight();

async function gathering() {
  const url = server + '/my/' + character + '/action/gathering';
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

    if (data.cooldown && data.cooldown.remaining_seconds) {
      startCooldown(data.cooldown.remaining_seconds); // Använd remaining_seconds för nedräkning
    } else {
      console.warn("No cooldown information found in response.");
    }

    /*currentX = data.x
    currentY = data.y

    updateInfoBox();*/
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

    if (data.cooldown && data.cooldown.remaining_seconds) {
      startCooldown(data.cooldown.remaining_seconds); // Använd remaining_seconds för nedräkning
    } else {
      console.warn("No cooldown information found in response.");
    }

    /*currentX = data.x
    currentY = data.y

    updateInfoBox();*/
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

    if (data.cooldown && data.cooldown.remaining_seconds) {
      startCooldown(data.cooldown.remaining_seconds); // Använd remaining_seconds för nedräkning
    } else {
      console.warn("No cooldown information found in response.");
    }

    /*currentX = data.x
    currentY = data.y

    updateInfoBox();*/
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
    await new Promise((resolve) => setTimeout(resolve, 30000)); // Vänta 34 sek

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
    console.log("Waiting 31 seconds after first fight...");
    await new Promise((resolve) => setTimeout(resolve, 31000)); // Vänta 59 sek

    // Andra fight
   /* await fight();
    console.log("Waiting 61 seconds after second fight...");
    await new Promise((resolve) => setTimeout(resolve, 30000)); */// Vänta 61 sek

    // Rest
    await rest();
    console.log("Waiting 31 seconds after rest...");
    await new Promise((resolve) => setTimeout(resolve, 30000)); // Vänta 20 sek

    console.log("Start Loop completed, restarting sequence...");
  }
  console.log("Start Loop stopped.");
}
async function movechick() {
      
  const url = server + '/my/' + character +'/action/move';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: '{"x":0,"y":1}' //change the position here
  };
  
  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log(data);

    if (data.cooldown && data.cooldown.remaining_seconds) {
      startCooldown(data.cooldown.remaining_seconds); // Använd remaining_seconds för nedräkning
    } else {
      console.warn("No cooldown information found in response.");
    }

    currentX = data.character.x
    currentY = data.character.y

    updateInfoBox();
  } catch (error) {
    console.log(error);
  }
  }
  
//movechick();
async function movemin() {
      
  const url = server + '/my/' + character +'/action/move';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: '{"x":1,"y":5}' //change the position here
  };
  
  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log(data);

    if (data.cooldown && data.cooldown.remaining_seconds) {
      startCooldown(data.cooldown.remaining_seconds); // Använd remaining_seconds för nedräkning
    } else {
      console.warn("No cooldown information found in response.");
    }

    currentX = data.character.x
    currentY = data.character.y

    updateInfoBox();
  } catch (error) {
    console.log(error);
  }
  }
  
//movemin();

async function movewoodcut() {
      
  const url = server + '/my/' + character +'/action/move';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: '{"x":-2,"y":-3}' //change the position here
  };
  
  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log(data);

    if (data.cooldown && data.cooldown.remaining_seconds) {
      startCooldown(data.cooldown.remaining_seconds); // Använd remaining_seconds för nedräkning
    } else {
      console.warn("No cooldown information found in response.");
    }

    currentX = data.character.x
    currentY = data.character.y

    updateInfoBox();
  } catch (error) {
    console.log(error);
  }
  }

  //movewoodcut()

  async function movestore() {
      
    const url = server + '/my/' + character +'/action/move';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: '{"x":2,"y":1}' //change the position here
    };
    
    try {
      const response = await fetch(url, options);
      const { data } = await response.json();
      console.log(data);
  
      if (data.cooldown && data.cooldown.remaining_seconds) {
        startCooldown(data.cooldown.remaining_seconds); // Använd remaining_seconds för nedräkning
      } else {
        console.warn("No cooldown information found in response.");
      }
  
      currentX = data.character.x
      currentY = data.character.y
  
      updateInfoBox();
    } catch (error) {
      console.log(error);
    }
    }

    //movestore

async function dep() {
  const url = server + "/my/" + character + "/action/bank/deposit";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      code: "emerald_stone",
      quantity: 1,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("Crafting result:", data);

    if (data.cooldown && data.cooldown.remaining_seconds) {
      startCooldown(data.cooldown.remaining_seconds); // Använd remaining_seconds för nedräkning
    } else {
      console.warn("No cooldown information found in response.");
    }

    /*currentX = data.x
    currentY = data.y

    updateInfoBox();*/
  } catch (error) {
    console.error("Error in crafting:", error);
  }
}
