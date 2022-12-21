<template>
  <div class="container">
    <div class="top">
      <h1>Welcome !</h1>
      <div class="group">
        <div class="toggleInfor">
          <button @click="getData">Show your information</button>
          <button @click="hideData">Hide your information</button>
        </div>
        <div class="logout">
          <button @click="Logout">Logout</button>
        </div>
      </div>
    </div>

    <div v-if="user.name" class="bottom">
      <div class="text">
        <p>Name : {{ user.name }}</p>
        <p>Email : {{ user.email }}</p>
        <p>Birthday : {{ user.date }}</p>
        <p>Gender : {{ user.gender }}</p>
      </div>
      <img :src="user.imageData" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import db from "../main";

export default {
  name: "HomeView",
  data() {
    return {
      user: {
        name: "",
        email: "",
        date: "",
        gender: "",
        imageData: "",
      },
    };
  },
  methods: {
    hideData() {
      this.user.name = "";
      this.user.email = "";
      this.user.date = "";
      this.user.gender = "";
      this.user.imageData = "";
    },
    async getData() {
      let data = [];
      await db
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push({
              name: doc.data().name,
              email: doc.data().email,
              date: doc.data().date,
              gender: doc.data().gender,
              imageData: doc.data().image,
            });
          });
          return data;
        })
        .catch((err) => alert(err.message));

      const currentEmail = firebase.auth().currentUser.email;
      const currentUser = data.filter((o) => o.email.includes(currentEmail));
      this.user = currentUser[0];
    },
  },
  setup() {
    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .catch((err) => alert(err.message));
    };

    return {
      Logout,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin: 40px auto;
    font-family: "Flamenco", Arial, Helvetica, sans-serif;
    font-size: 5rem;
  }

  .group {
    width: 100%;
    padding: 30px 0 50px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;

    .toggleInfor {
      width: 70vh;

      button {
        width: 15rem;
      }
    }

    .logout {
      padding: 0 50px;
    }
  }

  .bottom {
    display: flex;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 90%;

    .text {
      margin: 50px;
      font-size: 1.5rem;

      p {
        margin: 20px 0;
      }
    }

    img {
      width: 20rem;
      height: 20rem;
      margin: 30px auto;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
    }
  }

  @media (max-width: 784px) {
    h1 {
      font-size: 4rem;
    }

    .toggleInfor {
      margin: 0 auto;

      button {
        width: 15rem;
      }
    }

    .logout {
      padding: 0;
      margin: 0 auto;
    }

    .bottom {
      .text {
        font-size: 1.2rem;
      }

      img {
        margin: 50px auto 100px;
        width: 15rem;
        height: 15rem;
      }
    }
  }
}
</style>
