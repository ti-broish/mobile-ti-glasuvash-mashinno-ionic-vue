<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <page-header-component></page-header-component>
        <!-- content header -->
        <div class="contentHeader">
          <div>
            <ion-label class="titleLabel">{{ title }}</ion-label>
          </div>
          <div class="subtitleContainer">
            <ion-label class="subtitleLabel">{{ subtitle }}</ion-label>
          </div>
        </div>
        <div class="optionsList">
          <div class="selectAllOptionsContainer">
            <ion-checkbox 
              class="checkbox" 
              v-model="selectAllOptions" 
              @ionChange="handleSelectAllOptions($event.target.checked)"
            ></ion-checkbox>
            &nbsp;
            <ion-label class="subtitleLabel">{{ selectAllOptionsText }}</ion-label>
          </div>
          <!-- first option -->
          <div class="option">
            <ion-button class="optionButton" fill="clear" v-bind:class="{ optionButtonSelected: firstOptionSelected }"
              @click="handleFirstOptionSelected()">
              <!-- <ion-checkbox
                class="checkbox"
                :checked="firstOptionSelected" 
              ></ion-checkbox> -->
              <span class="optionText" v-bind:class="{ optionTextSelected: firstOptionSelected }">{{ firstOptionText
              }}</span>
            </ion-button>
          </div>
          <!-- second option -->
          <div class="option">
            <ion-button class="optionButton" fill="clear" v-bind:class="{ optionButtonSelected: secondOptionSelected }"
              @click="handleSecondOptionSelected()">
              <!-- <ion-checkbox
                class="checkbox"
                :checked="secondOptionSelected" 
              ></ion-checkbox> -->
              <span class="optionText" v-bind:class="{ optionTextSelected: secondOptionSelected }">{{ secondOptionText
              }}</span>
            </ion-button>
          </div>
          <!-- third option -->
          <div class="option">
            <ion-button class="optionButton" fill="clear" v-bind:class="{ optionButtonSelected: thirdOptionSelected }"
              @click="handleThirdOptionSelected()">
              <!-- <ion-checkbox
                class="checkbox"
                :checked="thirdOptionSelected" 
              ></ion-checkbox> -->
              <span class="optionText" v-bind:class="{ optionTextSelected: thirdOptionSelected }">{{ thirdOptionText
              }}</span>
            </ion-button>
          </div>
          <!-- fourth option -->
          <div class="option">
            <ion-button class="optionButton" fill="clear" v-bind:class="{ optionButtonSelected: fourthOptionSelected }"
              @click="handleFourthOptionSelected()">
              <!-- <ion-checkbox
                class="checkbox"
                :checked="fourthOptionSelected" 
              ></ion-checkbox> -->
              <span class="optionText" v-bind:class="{ optionTextSelected: fourthOptionSelected }">{{ fourthOptionText
              }}</span>
            </ion-button>
          </div>
        </div>
        <!-- footer -->
        <div class="pageFooter">
          <ion-button class="confirmButton" @click="handleConfirmButton()" :disabled="!hasSelectedOption()">{{
            confirmButtonTitle }}</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonButton,
  IonLabel,
  IonCheckbox,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { VoteOptionsPageStrings } from "@/utils/LocalizedStrings";
import { LocalStorageKeys } from "@/store/local-storage-keys";

import PageHeaderComponent from "@/components/PageHeaderComponent.vue";

export default defineComponent({
  name: "VoteOptions",
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonLabel,
    IonCheckbox,
    PageHeaderComponent,
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  data() {
    return {
      title: VoteOptionsPageStrings.title,
      subtitle: VoteOptionsPageStrings.subtitle,
      selectAllOptionsText: VoteOptionsPageStrings.selectAll,
      selectAllOptions: false, 
      firstOptionText: VoteOptionsPageStrings.option1,
      firstOptionSelected: false,
      secondOptionText: VoteOptionsPageStrings.option2,
      secondOptionSelected: false,
      thirdOptionText: VoteOptionsPageStrings.option3,
      thirdOptionSelected: false,
      fourthOptionText: VoteOptionsPageStrings.option4,
      fourthOptionSelected: false,
      confirmButtonTitle: VoteOptionsPageStrings.confirmButton,
    };
  },
  watch: {
    firstOptionSelected: "updateCheckbox",
    secondOptionSelected: "updateCheckbox",
    thirdOptionSelected: "updateCheckbox",
    fourthOptionSelected: "updateCheckbox",
  },
  methods: {
    updateCheckbox() {
      this.selectAllOptions = this.firstOptionSelected
        && this.secondOptionSelected
        && this.thirdOptionSelected
        && this.fourthOptionSelected;
    },
    hasSelectedOption() {
      return (
        this.firstOptionSelected ||
        this.secondOptionSelected ||
        this.thirdOptionSelected ||
        this.fourthOptionSelected
      );
    },
    handleConfirmButton() {
      const selectedOptions = [];
      if (this.firstOptionSelected) {
        selectedOptions.push(this.firstOptionText);
      } 
      
      if (this.secondOptionSelected) {
        selectedOptions.push(this.secondOptionText);
      } 
      
      if (this.thirdOptionSelected) {
        selectedOptions.push(this.thirdOptionText);
      } 
      
      if (this.fourthOptionSelected) {
        selectedOptions.push(this.fourthOptionText);
      }

      localStorage.setItem(LocalStorageKeys.selectedVoteOption, JSON.stringify(selectedOptions));
      this.$router.replace("/preview-vote-option");
    },
    handleSelectAllOptions(value: boolean) {
      this.selectAllOptions = value;
      this.firstOptionSelected = value;
      this.secondOptionSelected = value;
      this.thirdOptionSelected = value;
      this.fourthOptionSelected = value;
    },
    handleFirstOptionSelected() {
      this.firstOptionSelected = !this.firstOptionSelected;
    },
    handleSecondOptionSelected() {
      this.secondOptionSelected = !this.secondOptionSelected;
    },
    handleThirdOptionSelected() {
      this.thirdOptionSelected = !this.thirdOptionSelected;
    },
    handleFourthOptionSelected() {
      this.fourthOptionSelected = !this.fourthOptionSelected;
    }
  },
});
</script>

<style scoped>
.container {
  margin: 4px;
  padding-top: max(var(--ion-safe-area-top), 22px);
}

.contentHeader {
  padding: 4px;
  /* border: 1px solid var(--tigm-border-color); */
}

.titleLabel {
  font-size: 22px;
  font-weight: bold;
  /* border: 1px solid var(--tigm-border-color); */
}

.subtitleContainer {
  margin-top: 4px;
}

.subtitleLabel {
  font-size: 18px;
  /* border: 1px solid var(--tigm-border-color); */
}

.optionsList {
  margin: 20px auto;
  text-align: center;
  /* border: 2px solid var(--tigm-border-color); */
}

.option {
  margin: 20px auto;
  text-align: center;
  border: 2px solid var(--tigm-border-color);
  border-radius: 4px;
  min-width: 75%;
  width: 75%;
  height: 60px;
}

.optionButton {
  margin: 0px;
  --color: var(--ion-background-color);
  --background: var(--ion-background-color);
  --background-activated: var(--ion-background-color);
  --background-hover: var(--ion-background-color);
  --background-focused: var(--ion-background-color);
  --border-radius: 0px;
  min-width: 100%;
  width: 100%;
  min-height: 100%;
  height: 100%;
}

.optionButtonSelected {
  --color: var(--tigm-border-color);
  --background: var(--tigm-border-color);
  --background-activated: var(--tigm-border-color);
  --background-hover: var(--tigm-border-color);
  --background-focused: var(--tigm-border-color);
}

.selectAllOptionsContainer {
  margin-left: 12.5%;
  min-width: 75%;
  width: 75%;
  text-align: left;
  display: flex;
  align-items: center;
  /* border: 2px dashed blue; */
}

.checkbox {
  margin-right: 8px;
  --background: none;
  --background-checked: var(--tigm-border-color);
  --border-color: none;
  --border-color-checked: var(--tigm-border-color);
  --size: 24px;
}

.optionText {
  margin: 8px;
  color: var(--tigm-border-color);
  font-size: 16px;
  text-align: left;
  white-space: normal;
}

.optionTextSelected {
  color: var(--ion-background-color);
}

.pageFooter {
  height: 80px;
}

.confirmButton {
  /* float: right;
  margin-top: 15px;
  margin-right: 8px;
  --background: var(--tigm-button-background-color);
  --background-activated: var(--tigm-button-activated-color);
  --color: white;
  text-transform: none;
  font-size: 14px;
  min-width: 160px;
  width: 160px;
  min-height: 36px;
  height: 36px; */
  float: right;
  margin-top: 15px;
  margin-left: 8px;
  --background: var(--tigm-button-background-color);
  --background-activated: var(--tigm-button-activated-color);
  --border-style: solid;
  --border-width: 2px;
  --border-color: var(--tigm-border-color);
  --border-radius: 8px;
  --color: white;
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  text-transform: none;
  min-height: 36px;
  height: 36px;
}
</style>