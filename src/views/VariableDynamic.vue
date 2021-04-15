<template>
  <div id="savedTemplates" class="container-fluid">
    <h1 class="text-center">Variable Proposal text</h1>
    <div class="row mt-5">
      <div class="col-md-3 new-proposal-box">
        <form @submit.prevent="addProposal()">
          <div class="form-group">
            <small id="heading_help" class="form-text text-muted">
              Start by adding a cool Heading
            </small>
            <input
              type="text"
              class="form-control"
              id="proposal_heading"
              aria-describedby="heading_help"
              v-model="newProposal.heading"
              required
            />
          </div>

          <div
            class="form-group"
            v-for="(textBox, textBoxKey) in newProposal.proposalBody"
            :key="textBoxKey"
          >
            <small class="form-text text-muted">
              {{ textBox.heading }}
            </small>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
              v-model="textBox.textarea"
              required
            ></textarea>
          </div>

          <div
            class="addNewElement text-primary text-center position-relative my-2"
          >
            <div class="addIcon" @click="showtooltip = !showtooltip">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-plus-circle"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                />
              </svg>
            </div>
            <transition name="showTooltip">
              <div class="module-tooltip" v-show="showtooltip">
                <div class="tooltip-arrow"></div>
                <div class="tooltip-header">
                  <div
                    class="btn-group btn-block"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button type="button" class="btn btn-dark">Elements</button>
                    <button type="button" class="btn btn-dark">Saved</button>
                  </div>
                </div>
                <div class="tooltip-content">
                  <button
                    class="btn btn-primary btn-block"
                    @click.prevent="addSimpleTextBox()"
                  >
                    Add Simple Text
                  </button>
                  <button
                    class="btn btn-success btn-block"
                    v-b-modal.variableTextModal
                    @click.prevent
                  >
                    Add Variable Text
                  </button>
                </div>
              </div>
            </transition>

            <!-- Modal -->
            <b-modal
              id="variableTextModal"
              centered
              scrollable
              size="xl"
              title="Variable Text"
            >
              <div class="row">
                <div class="col-md-3">
                  <p class="text-Primary">Add New Variable Text</p>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control mb-2"
                      v-model="newVariable.heading"
                    />
                    <textarea
                      class="form-control mb-2"
                      rows="10"
                      v-model="newVariable.textarea"
                    ></textarea>
                    <button
                      class="btn btn-primary btn-block"
                      @click="addVarTextBox()"
                    >
                      Add to list and insert
                    </button>
                    <button
                      class="btn btn-success btn-block"
                      @click="addVarToList()"
                    >
                      Add to list
                    </button>
                  </div>
                </div>
                <div class="col-md-9">
                  <p class="text-success text-center">Saved Variables</p>
                  <div class="row">
                    <div
                      class="col-md-6"
                      v-for="(variableText, vIndex) in variablesList"
                      :key="vIndex"
                    >
                      <div class="form-group">
                        <small class="text-muted">
                          {{ variableText.heading }}
                        </small>
                        <textarea
                          class="form-control"
                          v-model="variableText.textarea"
                          rows="5"
                        ></textarea>
                        <button
                          class="btn btn-dark btn-block mt-2"
                          @click="insertVariables(vIndex)"
                        >
                          Insert
                        </button>
                        <button
                          class="btn btn-dark btn-block mt-2"
                          @click="updateVariables(vIndex)"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-modal>
          </div>
          <button class="btn btn-block btn-dark mt-4" type="submit">Add</button>
        </form>
      </div>

      <!-- Edit variables second col  -->
      <div class="col-md-3">
        <div class="row" v-show="variablesList.length > 0">
          <div class="col-md-12">
            <h4 class="text-center text-primary border-bottom pb-2">
              Saved Variables
            </h4>
            <div
              class="form-group"
              v-for="(variable, variableIndex) in variablesList"
              :key="variableIndex"
            >
              <button
                class="btn btn-outline-dark btn-block btn-sm"
                @click="insertVariables(variableIndex)"
              >
                {{ variable.heading }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Saved Proposals  third col -->
      <div class="col-md-6">
        <div class="row">
          <div
            class="col-md-6 form-group"
            v-for="(proposal, proposalIndex) in proposalsList"
            :key="proposalIndex"
          >
            <input
              type="text"
              class="form-control"
              v-model="proposal.heading"
            />
            <textarea
              class="form-control border-radius-0"
              :class="['obj-' + proposalIndex]"
              name="singleProposal"
              rows="5"
              v-model="proposal.text"
              style="width: 100%"
            ></textarea>
            <button
              class="btn btn-outline-primary btn-block mt-1"
              @click="copyProposal(proposalIndex)"
            >
              copy
            </button>
            <button
              class="btn btn-outline-danger btn-block mt-1"
              @click="deleteProposal(proposalIndex)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "variable-dynamic",
  data: () => ({
    showtooltip: false,
    someText: "some text",
    newProposal: {
      heading: "",
      proposalBody: [{ textarea: "", type: "simple" }],
    },
    proposalsList: [],
    newVariable: { heading: "", textarea: "", type: "var", varPath: "" },
    variablesList: [],
    dynamicProposalData: [],
  }),
  methods: {
    addSimpleTextBox() {
      var newProposalTextBoxes = this.newProposal.proposalBody;
      newProposalTextBoxes.push({ textarea: "", type: "simple" });
      this.showtooltip = !this.showtooltip;
    },

    addVarTextBox() {
      var newProposalTextBoxes = this.newProposal.proposalBody;
      newProposalTextBoxes.push(this.newVariable);
      this.variablesList.push(this.newVariable);
      localStorage.setItem(
        "localStorageVariables",
        JSON.stringify(this.variablesList)
      );
      this.newVariable = { heading: "", textarea: "", type: "var" };
    },

    insertVariables(vIndex) {
      var newProposalTextBoxes = this.newProposal.proposalBody;
      newProposalTextBoxes.push(this.variablesList[vIndex]);
      this.variablesList[vIndex].varPath = `${vIndex}`;
    },

    updateVariables() {
      this.getUpdatedProposal()
      localStorage.setItem(
        "localStorageVariables",
        JSON.stringify(this.variablesList)
      );
    },

    addVarToList() {
      this.variablesList.push(this.newVariable);
      localStorage.setItem(
        "localStorageVariables",
        JSON.stringify(this.variablesList)
      );
      this.newVariable = {
        heading: "",
        textarea: "",
        type: "var",
        varPath: `${this.variablesList.length + 1}`,
      };
    },

    addProposal() {
      // var proposals = this.newProposal.proposalBody;
      var dynamicProposalList = this.dynamicProposalData;
      // var text = "";
      dynamicProposalList.push(this.newProposal);
      // proposals.forEach((proposal) => {
      //   text = text + proposal.textarea + "\n";
      // });
      // this.proposalsList.push({
      //   heading: this.newProposal.heading,
      //   text: text,
      // });
      // localStorage.setItem('localStorageProposals', JSON.stringify(this.proposalsList))
      this.newProposal = {
        heading: "",
        proposalBody: [{ textarea: "", type: "simple" }],
      };
      this.getUpdatedProposal();
    },

    getUpdatedProposal() {
      this.proposalsList = [];
      var proposalsList = this.proposalsList;
      var dynamicProposalList = this.dynamicProposalData;
      dynamicProposalList.forEach((dynamicProposal) => {
        var text = "";
        var heading = dynamicProposal.heading;
        dynamicProposal.proposalBody.forEach((single) => {
          if(single.type === 'simple'){
             text = text + single.textarea + "\n";
          }else {
            var variableText = this.variablesList[single.varPath].textarea
            text = text + variableText + "\n"
          }
         
        });
        proposalsList.push({ heading: heading, text: text });
      });

      localStorage.setItem('dynamicPorposalsList', JSON.stringify(this.dynamicProposalData))
      // dynamicProposalList.forEach(dynamicProposal => {
      //   proposalsList.push(dynamicProposal)
      // });
    },

    copyProposal(proposalIndex) {
      var textToCopy = document.querySelector(`.obj-${proposalIndex}`);
      textToCopy.select();
      document.execCommand("copy");
    },

    deleteProposal(proposalIndex) {
      this.proposalsList.splice(proposalIndex, 1);
      this.dynamicProposalData.splice(proposalIndex, 1)
      localStorage.setItem(
        "dynamicPorposalsList",
        JSON.stringify(this.dynamicProposalData)
      );
    },
  },

  mounted() {
    if (localStorage.localStorageProposals) {
      this.proposalsList = JSON.parse(localStorage.localStorageProposals);
    }
    if (localStorage.localStorageVariables) {
      this.variablesList = JSON.parse(localStorage.localStorageVariables);
    }
    if (localStorage.dynamicPorposalsList) {
      this.dynamicProposalData = JSON.parse(localStorage.dynamicPorposalsList);
      this.getUpdatedProposal()
    }
  },
};
</script>

<style lang="scss">
.addIcon {
  svg {
    cursor: pointer;
    background: #fff;
    width: 25px;
    fill: var(--primary);
    transition: all 0.3s;
    &:hover {
      fill: var(--dark);
      transform: scale(1.2);
    }
  }
}

.module-tooltip {
  background: #fff;
  border: 1px solid var(--dark);
  margin: 0 auto;
  width: 60%;
  margin-top: 15px;
  transition: all 0.3s ease-in;
}

.tooltip-arrow {
  width: 10px;
  height: 10px;
  border: 1px solid var(--dark);
  position: absolute;
  transform: rotate(45deg);
  background: var(--dark);
  text-align: center;
  top: 35px;
  margin: 0 auto;
  border-right: 0;
  border-bottom: 0;
  left: 49%;
}

.tooltip-header {
  .btn {
    border-radius: 0;
    width: 50%;
  }
}

.tooltip-content {
  padding: 20px;
}

// animating tooltip
.showTooltip-enter,
.list-leave-to {
  visibility: hidden;
  height: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
}

.showTooltip-enter-active {
  transition: all 0.3s;
}

.form-control {
  border-radius: 0;
}
</style>
