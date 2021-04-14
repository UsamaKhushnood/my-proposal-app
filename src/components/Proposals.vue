<template>
  <div>
    <h1 class="title" style="text-align: center; font-size: 50px">
      My Proposals
    </h1>
    <div class="appbody" style="display: flex; height: 80vh">
      <!-- Add New Proposal  -->
      <div class="newOne section section1">
        <div class="sidebar">
          <form @submit.prevent="AddNew">
            <input
              class="headingInput"
              :class="{ headingMissing: headingMissing }"
              :placeholder="headingPlaceHolder"
              type="text"
              v-model="newProposal.heading"
              required
            />
            <textarea
              class="myTxt2"
              :class="{ inputMissing: inputMissing }"
              type="text"
              @keyup.ctrl.enter="AddNew"
              v-model="newProposal.myInput"
              placeholder="Enter your Proposal Here"
              required
            ></textarea>
            <button id="addNewBtn" type="submit" class="btn btn-primary">
              Add New
            </button>
          </form>
        </div>
      </div>

      <!-- Saved Proposals  -->

      <div class="section section2">
        <div v-show="proposalsList.length < 1" class="loading_spinner">
          <b-spinner label="Spinning"></b-spinner>
        </div>

        <draggable
          class="main"
          v-model="proposalsList"
          @start="dragging = true"
          @end="updateAccordingToSorting"
          handle=".handle"
        >
          <!-- <div> -->

          <div
            id="proposal"
            v-for="(proposal, index) in proposalsList"
            :key="index"
          >
            <h1 class="singleProposalHeading handle" title="Drag to sort">
              <!-- <span style="font-size: 12px;">{{index + 1}})</span> -->
              {{ proposal.heading }}
            </h1>
            <textarea
              class="myTxt"
              :class="['obj-' + index]"
              v-model="proposal.myInput"
              @keyup="proposal.showUpdateBtn = true"
            ></textarea>
            <button
              id="copyBtn"
              class="copyImg"
              title="Copy"
              @click="copyText(index)"
              style="border: 1px solid white"
            >
              <img src="@/assets/icons/icons8-copy.svg" style="width: 20px" />
            </button>
            <button
              id="copyBtn"
              class="deleteImg"
              title="Delete"
              @click="deleteText(index)"
            >
              <img
                src="@/assets/icons/icons8-delete-bin.svg"
                style="width: 20px"
              />
              <span style="margin-left: 7px">Delete</span>
            </button>
            <button
              id="copyBtn"
              class="update"
              title="Update"
              v-show="proposal.showUpdateBtn"
              @click="updateProposal(index)"
            >
              <img src="@/assets/icons/icons8-save.svg" style="width: 20px" />
              <span style="margin-left: 7px">Update</span>
            </button>
          </div>
          <!-- </div>           -->
        </draggable>
      </div>

      <!-- saved proposals end here  -->
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapGetters } from "vuex";
export default {
  name: "Proposals",
  components: { draggable },
  data() {
    return {
      headingPlaceHolder: "Enter heading here",
      headingMissing: false,
      inputMissing: false,
      newProposal: {
        myInput: "",
        heading: "",
        showUpdateBtn: false,
      },
      proposalsList: [],
      message: null,
    };
  },

  methods: {
    AddNew() {
      var v = this
      // Checking if the Input Fields are filled
      if (this.newProposal.heading.trim() == "") {
        this.headingPlaceHolder = "!Please Add heading first";
        this.headingMissing = true;
      } else if (this.newProposal.myInput.trim() == "") {
        this.inputMissing = true;
      } else {
        this.$db
          .collection("usersNewProposal")
          .add({
            myInput: this.newProposal.myInput,
            heading: this.newProposal.heading,
            showUpdateBtn: this.newProposal.showUpdateBtn,
          })
          .then(function(docRef) {
            v.makeToast('primary', 'Add Successfull');
            v.message = 'New Data Added Successfully';
            console.log(docRef.id);
          })
          .catch(function(error) {
            v.makeToast('danger', 'Error');
            v.message = error;
          });

        // Resetting All Values
        this.getFireStoreData();
        this.newProposal.myInput = "";
        this.newProposal.heading = "";
        this.headingPlaceHolder = "Enter Heading here";
        this.inputMissing = false;
        this.headingMissing = false;
      }
    },

    copyText(index) {
      var textToCopy = document.querySelector(`.obj-${index}`);
      textToCopy.select();
      document.execCommand("copy");
    },

    deleteText(index) {
      this.$db
        .collection("usersNewProposal")
        .doc(this.proposalsList[index].id)
        .delete()
        .then(() => {
          console.log("deleted Successfully");
          this.proposalsList.splice(index, 1);
        })
        .catch((error) => {
          console.log("Oops fail to delete record", error);
        });
    },

    updateProposal(index) {
      this.proposalsList[index].showUpdateBtn = false;
      console.log(this.proposalsList[index].id);
      this.$db
        .collection("usersNewProposal")
        .doc(this.proposalsList[index].id)
        .update({
          myInput: this.proposalsList[index].myInput,
        });
    },

    getFireStoreData() {
      this.proposalsList = []
      this.$db.collection("usersNewProposal").orderBy('heading', "asc").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.proposalsList.push({
              id: doc.id,
              heading: doc.data().heading,
              myInput: doc.data().myInput,
              showUpdateBtn: doc.data().showUpdateBtn,
            });
          });
        });
    },

    // Genrating toast 
    makeToast(variant, title) {
      this.$bvToast.toast(this.message, {
        title: title,
        variant: variant,
        solid: true
      })
    }    
  },

  computed: {
    ...mapGetters({
      user: "user",
    }),
  },

  mounted() {
    this.getFireStoreData();
  },
};
</script>

<style scoped>
@import "../css/style.css";
</style>
