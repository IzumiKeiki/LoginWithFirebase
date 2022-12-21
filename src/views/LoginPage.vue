<template>
  <div class="container">
    <div class="top">
      <form @submit.prevent="Login">
        <input
          id="email"
          type="text"
          placeholder="Email : vue@gmail.com"
          v-model="email"
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Password : firebase"
          v-model="password"
          required
        />
        <button @click="loginCheck" type="submit" value="Login">Login</button>
        <p>
          Need an account?
          <router-link id="register" to="/register">Register Here</router-link>
        </p>
      </form>
    </div>
    <h1>Be my friend!</h1>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  name: "LoginPage",
  data() {
    return {
      user: {},
    };
  },
  setup() {
    const email = ref("");
    const password = ref("");

    const Login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .catch((err) => alert(err.message));
    };

    return {
      Login,
      email,
      password,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin: 30px;
    font-weight: 700;
    color: #fff;
    text-align: center;

    a {
      color: #2ee59d;
    }
  }

  h1 {
    font-family: "Flamenco", Arial, Helvetica, sans-serif;
    font-size: 7rem;
    line-height: 1.5;
    letter-spacing: 5px;
    padding: 30px;
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 5rem;
    }
  }
}
</style>
