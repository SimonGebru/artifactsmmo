const server = "https://api.artifactsmmo.com";
//Your token is automatically set
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IjNnZ2pzMjRnZWJyc2lAZm9sa3VuaXZlcnNpdGV0ZXQubnUiLCJwYXNzd29yZF9jaGFuZ2VkIjoiIn0.U6FAROmkAOPJe0qLM-gVW4JH--nzdLsw9D5FRyll1Zo";
//Put your character name here
const character = "Siempre";

document.getElementById("moveBtn").addEventListener("click", movement);
document.getElementById("fightBtn").addEventListener("click", fight);
document.getElementById("gatherBtn").addEventListener("click", gathering);
document.getElementById("restBtn").addEventListener("click", rest);
document.getElementById("craftBtn").addEventListener("click", craft);

async function movement() {
  const url = server + "/my/" + character + "/action/move";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: '{"x":0,"y":1}', //change the position here
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

fight();

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

rest();

async function startLoop() {
  while (true) {
    console.log("Starting fight sequence...");

    // Första fight
    await fight();
    console.log("Waiting 59 seconds after first fight...");
    await new Promise((resolve) => setTimeout(resolve, 59000)); // Vänta 59 sek

    // Andra fight
    await fight();
    console.log("Waiting 59 seconds after second fight...");
    await new Promise((resolve) => setTimeout(resolve, 61000)); // Vänta 59 sek

    // Rest
    await rest();
    console.log("Waiting 13 seconds after rest...");
    await new Promise((resolve) => setTimeout(resolve, 20000)); // Vänta 13 sek

    console.log("Loop completed, restarting sequence...");
  }
}

// Starta loopen
//startLoop();

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
      code: "wooden_staff",
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
