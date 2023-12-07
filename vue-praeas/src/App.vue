<template>
  <div id="app">
    <input v-model="var1" placeholder="email" />
    <input v-model="var2" placeholder="password" />
    <br />
    <input v-model="var3" placeholder="account id" />
    <input v-model="var4" placeholder="email update" />
    <br />
    <button @click="login">login</button>
    <button @click="logout">logout</button>
    <button @click="create">create</button>
    <button @click="read">read</button>
    <button @click="update">update</button>
    <button @click="deleteAccount">deleteAccount</button>
    <br />
    <div>
      <h2>Result or Data:</h2>
      <p>{{ hasil }}</p>
    </div>
  </div>
</template>

<script type="module">
import qs from "https://cdn.skypack.dev/qs";
export default {
  name: "App",
  data() {
    return {
      var1: "",
      var2: "",
      var3: "",
      var4: "",
      hasil: "",
    };
  },
};
const app = Vue.createApp({
  data() {
    return {
      var1: "",
      var2: "",
      var3: "",
      var4: "",
      hasil: "",
    };
  },
  methods: {
    async login() {
      try {
        console.log(this.var1, this.var2);
        const req = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.var1,
            password: this.var2,
          }),
        });
        const data = await req.json();
        console.log(data);
        if (data.token) {
          this.$cookies.set("login", data.token, "1d"); // Set cookie here
        }
        this.hasil = data;
      } catch (err) {
        console.log(err);
      }
    },
    async logout() {
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
        this.hasil = data;
      } catch (err) {
        console.log(err);
      }
    },
    async read() {
      try {
        const req = await fetch("http://localhost:3000/api/" + this.selected);
        const data = await req.json();
        console.log(data);
        this.hasil = data;
      } catch (err) {
        console.log(err);
      }
    },
    async create() {
      try {
        const req = await fetch("http://localhost:3000/api/" + this.selected, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.var1,
            password: this.var2,
          }),
        });
        const data = await req.json();
        console.log(data);
        this.hasil = data;
      } catch (err) {
        console.log(err);
      }
    },
    async update() {
      const stringifiedQuery = qs.stringify(
        {
          where: {
            title: {
              id: this.var3,
            },
          },
        },
        { addQueryPrefix: true }
      );
      try {
        const req = await fetch(
          "http://localhost:3000/api/" + this.selected + "/" + stringifiedQuery,
          {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.var4,
            }),
          }
        );
        const data = await req.json();
        console.log(data);
        this.hasil = data;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteAccount() {
      try {
        const req = await fetch(
          "http://localhost:3000/api/" + this.selected + "/" + this.var3,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await req.json();
        console.log(data);
        this.hasil = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
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
