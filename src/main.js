import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

// using firebase 
// const firebase = require("firebase")
require("firebase/firestore");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZv1uxR5d-OEHHgn3PGwmZqV291Bqk-jY",
    authDomain: "my-proposel.firebaseapp.com",
    databaseURL: "https://my-proposel.firebaseio.com",
    projectId: "my-proposel",
    storageBucket: "my-proposel.appspot.com",
    messagingSenderId: "997442622377",
    appId: "1:997442622377:web:af92198e23e83d64742ab8",
    measurementId: "G-SC42QFMY5E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
});

// setting up global varibale 
Vue.prototype.$firebase = firebase;
const db = firebase.firestore();
Vue.prototype.$db = db;

// Adding Robotod font
var link = document.createElement('link');
link.href = "//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons";
document.head.appendChild(link);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')