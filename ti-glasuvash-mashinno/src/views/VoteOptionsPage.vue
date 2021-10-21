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
          <div class="option">
            <ion-button
              class="optionButton"
              fill="clear"
              v-bind:class="{ optionButtonSelected: firstOptionSelected }"
              @click="handleFirstOptionSelected()"
            >
              <ion-checkbox
                class="checkbox"
                :checked="firstOptionSelected" 
              ></ion-checkbox>
              <span
                class="optionText"
                v-bind:class="{ optionTextSelected: firstOptionSelected }"
                >{{ firstOptionText }}</span
              >
            </ion-button>
          </div>
        </div>
        <!-- footer -->
        <div class="pageFooter">
          <ion-button class="confirmButton" @click="handleConfirmButton()">{{
            confirmButtonTitle
          }}</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton, IonLabel, IonCheckbox } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { VoteOptionsPageStrings } from "@/utils/LocalizedStrings";

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
      firstOptionText: VoteOptionsPageStrings.option1,
      firstOptionSelected: false,
      secondOptionText: VoteOptionsPageStrings.option2,
      thirdOptionText: VoteOptionsPageStrings.option3,
      confirmButtonTitle: VoteOptionsPageStrings.confirmButton,
    };
  },
  methods: {
    handleConfirmButton() {
      // TODO: - implement
    },
    handleFirstOptionSelected() {
      this.firstOptionSelected = !this.firstOptionSelected;
    },
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
  border: 1px solid var(--tigm-border-color);
}

.titleLabel {
  font-size: 22px;
  font-weight: bold;
  border: 1px solid var(--tigm-border-color);
}

.subtitleContainer {
  margin-top: 4px;
}

.subtitleLabel {
  font-size: 18px;
  border: 1px solid var(--tigm-border-color);
}

.optionsList {
  margin: 20px auto;
  text-align: center;
  border: 2px solid var(--tigm-border-color);
}

.option {
  text-align: center;
  border: 2px solid magenta;
  border-radius: 4px;
  min-width: 50%;
  width: 50%;
  height: 100px;
}

.optionButton {
  margin: 0px;
  --color: var(--ion-background-color);
  --background: var(--ion-background-color);
  --background-activated: var(--ion-background-color);
  --background-hover: var(--ion-background-color);
  --background-focused: var(--ion-background-color);
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

.checkbox {
  --background: none;
  --background-checked: none;
  --border-color: none;
  --border-color-checked: none;
  --size: 44px;
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
  float: right;
  margin-top: 15px;
  margin-right: 8px;
  --background: var(--tigm-button-background-color);
  --background-activated: var(--tigm-button-activated-color);
  --color: white;
  text-transform: none;
  font-size: 16px;
  min-width: 160px;
  width: 160px;
  min-height: 35px;
  height: 35px;
}
</style>