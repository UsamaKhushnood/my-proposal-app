<template>
  <div class="row">
    <div class="col-12 text-center mb-4">
      <h1>Login</h1>
    </div>
    <div class="col-sm-5 m-auto">
      <form @submit.prevent="signupRequest" id="signup-form">
        <div class="row text-left">
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
              <span v-if="!xhrRequest">Login</span>
              <span v-if="xhrRequest">Please Wait...</span>
            </button>
            <div
              v-if="xhrRequest"
              class="spinner-border text-secondary _loader"
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div class="col-sm-12 text-center form-group mt-5">
            <p>
              Don't have an account?
              <router-link to="/signup">Signup</router-link>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Signup",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      xhrRequest: false,
      message: '',
    };
  },
  methods: {
    signupRequest() {
      let v = this;
      v.xhrRequest = true;
      v.message = "";
      this.$firebase.auth().signInWithEmailAndPassword(v.form.email, v.form.password).then(
          () => {
            v.message = "Login Successfully.";
            v.xhrRequest = false;
            v.makeToast('success', "Success")
            this.$router.push({ name: 'Home', query: { redirect: '/' } });
          },
          (error) => {
            v.message = error.message;
            v.xhrRequest = false;
            v.makeToast('danger', "Error Message")
          }
        );
    },

    makeToast(variant, title) {
        this.$bvToast.toast(this.message, {
          title: title,
          variant: variant,
          solid: true
        })
      }
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
