<template>
  <div id="themenavigation" class="mb-5">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="/">My Proposals</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item href="/variable">Variable Proposals</b-nav-item> -->
          <b-nav-item href="/variable-dynamic">Dynamic Proposals</b-nav-item>
          <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/login" v-if="!user.loggedIn">Login</b-nav-item>
          <b-nav-item href="/signup" v-if="!user.loggedIn">Signup</b-nav-item>
          <b-nav-item-dropdown right v-if="user.loggedIn"> 
            <!-- Using 'button-content' slot -->
            <template #button-content >
              {{user.data.displayName || 'Me'}}
            </template>
            <b-dropdown-item href="#" @click="logUser">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="signOut" >Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ThemeNavigation",
  data: () => ({

  }),
  methods:{
    logUser(){
      console.log(this.user, 'user is here',);
    },
    signOut() {
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: 'Login', query: { redirect: '/login' } });
        });
    }
  },
    computed: {
    ...mapGetters({
      user: "user"
    })
  }

};
</script>
<style scoped>
.md-tabs + .md-tabs {
  margin-top: 24px;
}
</style>
