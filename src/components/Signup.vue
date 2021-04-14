<template>
  <div class="row">
    <div class="col-12 text-center mb-4">
      <h1>Sign Up</h1>
    </div>
    <div class="col-sm-5 m-auto">
      <form @submit.prevent="signupRequest" id="signup-form">
        <div class="row text-left">
          <div class="col-sm-12 form-group">
            <label for="name">User Name</label>
            <input
              type="name"
              id="name"
              v-model="form.name"
              class="form-control form-control-lg"
              required
            />
          </div>
          <div class="col-sm-12 form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="form-control form-control-lg"
              required
            />
          </div>
          <div class="col-sm-12 form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              class="form-control form-control-lg"
              required
            />
          </div>
          <div class="col-sm-12 text-center form-group">
            <button
              v-bind:disabled="xhrRequest"
              v-bind:class="{ disabled: xhrRequest }"
              class="btn btn-lg btn-primary px-4 btn-block"
            >
              <span v-if="!xhrRequest">Sign Up</span>
              <span v-if="xhrRequest">Please Wait...</span>
            </button>
            <div
              v-if="xhrRequest"
              class="spinner-border text-primary _loader"
              role="status"
            >
              <div class="sr-only">Loading...</div>
            </div>
          </div>
          <div class="col-sm-12 text-center form-group mt-5">
            <p>
              Already have an account?
              <router-link to="/login">Login</router-link>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
// import firebase from "firebase";
export default {
  name: "Signup",
  data() {
    return {
      form: {
        name: "",        
        email: "",
        password: "",
      },
      xhrRequest: false,
      message: null,
    };
  },
  methods: {

    signupRequest() {
      let v = this;
      v.xhrRequest = true;
      v.message = "";

      this.$firebase
        .auth()
        .createUserWithEmailAndPassword(v.form.email, v.form.password)
        .then(
          (data) => {
            data.user.updateProfile({
              displayName: this.form.name
            })
            v.message = "Register Successfully.";
            v.xhrRequest = false;
            v.makeToast("success", "Success");
            this.$router.push({ name: 'Home', query: { redirect: '/' } });
          },
          (error) => {
            v.message = error.message;
            v.xhrRequest = false;
            v.makeToast("danger", "Error Message");
          }
        );
    },

    makeToast(variant, title) {
      this.$bvToast.toast(this.message, {
        title: title,
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>
<style scoped>
._loader {
  position: relative;
  top: 6px;
  left: 10px;
}
</style>
