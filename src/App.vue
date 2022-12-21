<template>
  <router-view />
</template>

<script>
import { onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace("/login");
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace("/");
        }
      });
    });
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Flamenco:wght@300;400&family=Josefin+Sans:wght@300;500;700&family=Macondo&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  font-family: "JosefinSans", Arial, Helvetica, sans-serif;
  max-width: 1280px;
  margin: 0 auto;
  font-size: 1rem;

  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.05)
      ),
      url("assets/background.jpg");
    background-size: cover;
    background-position: center;
  }

  input {
    display: block;
    margin: 30px;
    padding: 10px 20px;
    font-size: inherit;

    &:focus {
      outline: none;
    }
  }

  button {
    display: block;
    margin: 30px auto;
    padding: 10px 20px;
    text-align: center;
    justify-content: center;
    font-size: inherit;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;

    &:hover {
      background-color: #2ee59d;
      box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
      color: #fff;
      transform: translateY(-7px);
    }
  }
}
</style>
