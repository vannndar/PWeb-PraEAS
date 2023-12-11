<template>
  <div id="app">
    <h1>Sign in</h1>
    <input v-model="var1" placeholder="email" />
    <br />
    <input v-model="var2" placeholder="password" />
    <br />
    <button @click="login()">Login</button>
    <button @click="logout()">Logout</button>

    <h1>Channel</h1>
    <br />
    <input v-model="var6" placeholder="Channel" />
    <br />
    <button @click="createChannel()">Create Channel</button>
    <button @click="setChannel()">Join Channel Id</button>
    <h1>Channel list</h1>
    <ul id="channellist"></ul>
    <h1>Chat</h1>
    <ul id="messagelist"></ul>
    <input v-model="var7" placeholder="text" />
    <button @click="sendMessage()">Send</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VueCookies from "vue3-cookies";

let var1 = ref("");
let var2 = ref("");
let var6 = ref("");
let var7 = ref("");
let hasil = ref("");
let channel = "";
let userid = "";

const login = async () => {
  try {
    console.log(var1.value, var2.value);
    const req = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: var1.value,
        password: var2.value,
      }),
    });
    const data = await req.json();
    console.log(data);
    userid = data.user.id;
    readChannel();
    if (data.token) {
      VueCookies.set("login", data.token, "1d");
    }
    hasil.value = data;
  } catch (err) {
    console.log(err);
  }
};

const logout = async () => {
  try {
    const req = await fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await req.json();
    console.log(data);
    hasil.value = data;
    userid = "";
    document.getElementById("messagelist").innerHTML = "";
    document.getElementById("channellist").innerHTML = "";
  } catch (err) {
    console.log(err);
    userid = "";
    document.getElementById("messagelist").innerHTML = "";
    document.getElementById("channellist").innerHTML = "";
  }
};

const readChannel = async () => {
  try {
    const req = await fetch("http://localhost:3000/api/channel");
    const data = await req.json();
    hasil.value = data;
    const channellist = document.getElementById("channellist");
    channellist.innerHTML = "";

    if (data.docs && Array.isArray(data.docs)) {
      const reversedDocs = data.docs.slice().reverse();

      reversedDocs.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.name + " " + item.id;
        channellist.appendChild(li);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const createChannel = async () => {
  try {
    const req = await fetch("http://localhost:3000/api/channel", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: var6.value,
      }),
    });
    const data = await req.json();
    console.log(data);
    hasil.value = data;
    readChannel();
  } catch (err) {
    console.log(err);
  }
};

const setChannel = () => {
  channel = var6.value;
  console.log(channel);
  showMessage();
};

const showMessage = async () => {
  try {
    const req = await fetch("http://localhost:3000/api/message");
    const data = await req.json();
    console.log(data);
    hasil.value = data;
    const messageList = document.getElementById("messagelist");
    messageList.innerHTML = "";

    if (data.docs && Array.isArray(data.docs)) {
      const reversedDocs = data.docs.slice().reverse();

      reversedDocs.forEach((item) => {
        console.log(item);
        if (item.channel.id == channel) {
          const li = document.createElement("li");
          li.textContent = item.sender.name + " : " + item.text;
          messageList.appendChild(li);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const sendMessage = async () => {
  try {
    const req = await fetch("http://localhost:3000/api/message", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: var7.value,
        sender: userid,
        channel: channel,
      }),
    });
    const data = await req.json();
    console.log(userid, channel);
    console.log(data);
    hasil.value = data;
    showMessage();
  } catch (err) {
    console.log(err);
  }
};
</script>

<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
