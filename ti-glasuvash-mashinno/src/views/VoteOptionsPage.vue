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
            <ion-checkbox class="checkbox" v-model="selectAllOptions"
              @ionChange="handleSelectAllOptions($event.target.checked)"></ion-checkbox>
            &nbsp;
            <ion-label class="subtitleLabel">{{ selectAllOptionsText }}</ion-label>
          </div>
          <!-- first option -->
          <div class="option">
            <ion-button class="optionButton" fill="clear" v-bind:class="{ optionButtonSelected: firstOptionSelected }"
              @click="handleFirstOptionSelected()">
              <ion-checkbox class="radioCheckbox" :checked="firstOptionSelected"></ion-checkbox>
              <span class="optionText" v-bind:class="{ optionTextSelected: firstOptionSelected }">{{ firstOptionText
              }}</span>
            </ion-button>
          </div>
          <!-- second option -->
          <div class="option">
            <ion-button class="optionButton" fill="clear" v-bind:class="{ optionButtonSelected: secondOptionSelected }"
              @click="handleSecondOptionSelected()">
              <ion-checkbox class="radioCheckbox" :checked="secondOptionSelected"></ion-checkbox>
              <span class="optionText" v-bind:class="{ optionTextSelected: secondOptionSelected }">{{ secondOptionText
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
import { VoteOptionData } from "../store/vote-option-data";

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
      this.selectAllOptions = this.firstOptionSelected && this.secondOptionSelected;
    },
    hasSelectedOption() {
      return (
        this.firstOptionSelected || this.secondOptionSelected
      );
    },
    handleConfirmButton() {
      const selectedOptions = Array<VoteOptionData>();
      if (this.firstOptionSelected) {
        selectedOptions.push({ id: selectedOptions.length, name: this.firstOptionText, data: null, filled: false });
      } 
      
      if (this.secondOptionSelected) {
        selectedOptions.push({ id: selectedOptions.length, name: this.secondOptionText, data: null, filled: false });
      }

      localStorage.setItem(LocalStorageKeys.selectedVoteOptions, JSON.stringify(selectedOptions));
      this.$router.replace("/preview-vote-option");
    },
    handleSelectAllOptions(value: boolean) {
      this.selectAllOptions = value;

      if (value) {
        this.firstOptionSelected = true;
        this.secondOptionSelected = true;
      } else {
        if (this.firstOptionSelected && this.secondOptionSelected) {
          this.firstOptionSelected = false;
          this.secondOptionSelected = false;
        }
      }
    },
    handleFirstOptionSelected() {
      this.firstOptionSelected = !this.firstOptionSelected;
    },
    handleSecondOptionSelected() {
      this.secondOptionSelected = !this.secondOptionSelected;
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
  padding-top: 4px;
  padding-bottom: 4px;
  margin-left: max(var(--ion-safe-area-left), 7px);
}

.titleLabel {
  font-size: 22px;
  font-weight: bold;
}

.subtitleContainer {
  margin-top: 4px;
}

.subtitleLabel {
  font-size: 18px;
}

.optionsList {
  margin: 20px auto;
  text-align: center;
}

.option {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  text-align: center;
  border: 2px solid var(--tigm-border-color);
  border-radius: 4px;
  min-width: 75%;
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
  margin-left: 20px;
  min-width: 75%;
  width: 75%;
  text-align: left;
  display: flex;
  align-items: center;
  /* border: 2px dashed blue; */
}

.checkbox {
  margin-right: 4px;
  --checkbox-background: none;
  --checkbox-background-checked: var(--tigm-checkbox-background-activated-color);
  --checkmark-color: var(--tigm-border-color);
  --border-color: var(--tigm-border-color);
  --border-color-checked: var(--tigm-border-color);
  --size: 24px;
  --border-radius: 4px;
}

.radioCheckbox {
  --checkbox-background: none;
  --checkbox-background-checked: var(--tigm-checkbox-background-activated-color);
  --checkmark-color: var(--tigm-border-color); 
  --border-color: var(--tigm-border-color);
  --border-color-checked: var(--tigm-border-color-checked);
  --border-radius: 50% !important;
  width: 24px;
  height: 24px;
}

.optionText {
  margin-left: 8px;
  color: var(--tigm-border-color);
  font-size: 16px;
  text-align: left;
  white-space: normal;
}

.optionTextSelected {
  color: var(--tigm-background-color);
}

.pageFooter {
  height: 80px;
}

.confirmButton {
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
  position: absolute;
  bottom: 14px;
  right: 14px;
}
</style>