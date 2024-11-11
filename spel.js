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
    body: '{"x":0,"y":2}', //change the position here
  };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

movement();

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

gathering();

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
      code: "copper_dagger",
      quantity: 1,
    }),
  };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

craft();
