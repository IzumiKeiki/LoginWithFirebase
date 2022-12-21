<template>
  <div class="container">
    <div class="top">
      <form id="register" @submit.prevent="Register">
        <input
          type="text"
          placeholder="Name : Javascript"
          v-model="name"
          required
        />
        <input
          type="email"
          placeholder="Email : Vue"
          v-model="email"
          required
        />
        <input
          type="password"
          placeholder="Password : Firebase"
          v-model="password"
          required
        />
        <div class="date">
          <input type="date" placeholder="Birthday" v-model="date" required />
        </div>
        <div class="gender">
          <input
            type="radio"
            id="male"
            name="gender"
            v-model="gender"
            value="male"
            required
          />
          <label for="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            v-model="gender"
            value="female"
            required
          />
          <label for="female">Female</label>
        </div>
        <button @click="pickFile">Upload Icon</button>
        <div v-if="imageData" class="upload">
          <img :src="imageData" />
        </div>
        <input
          type="file"
          accept="image/*"
          ref="fileInput"
          @change="onFileChange"
        />
        <div class="term">
          <p>
            <a href="https://en.wikipedia.org/wiki/Terms_of_service"
              >Terms of service
            </a>
          </p>
          <input type="checkbox" id="agree" placeholder="Agree" required />
          <label for="agree">Agree</label>
        </div>
        <button type="submit" value="Register" @click="newUser">
          Register
        </button>
        <p>
          Have an account? <router-link to="/login">Login Here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import db from "../main";

export default {
  name: "RegisterPage",
  data() {
    return { name: "", date: "", gender: "", imageData: "" };
  },

  methods: {
    onFileChange(event) {
      const file = event.target.files;

      if (file[0].size > 1024 * 1024) {
        event.preventDefault();
        alert("File too big (> 1MB)");
        return;
      }

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file[0]);
      fileReader.addEventListener("load", () => {
        this.imageData = fileReader.result;
      });
    },
    pickFile() {
      this.$refs.fileInput.click();
    },
    newUser() {
      let data = {
        name: this.name,
        email: this.email,
        date: this.date,
        gender: this.gender,
        image: this.imageData,
      };
      db.add(data).catch((err) => alert(err.message));
    },
  },

  setup() {
    const email = ref("");
    const password = ref("");
    const Register = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(() => {
          alert("Register successfully");
        })
        .catch((err) => alert(err.message));
    };

    return {
      Register,
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

  input[type="file"] {
    display: none;
  }

  p {
    margin: 30px;
    font-weight: 700;
    color: #fff;
    text-align: center;

    a {
      color: #2ee59d;
    }
  }

  .date {
    display: flex;
    justify-content: center;

    input {
      margin: 0 auto 30px;
    }
  }

  .upload {
    display: flex;
  }

  img {
    margin: 0 auto;
    height: 150px;
  }

  .gender,
  .term {
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      margin: 30px 10px;
    }

    label {
      margin-right: 5px;
    }
  }
}
</style>
