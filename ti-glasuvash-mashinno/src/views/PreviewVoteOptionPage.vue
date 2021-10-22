<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <div class="content">
          <div class="labelContainer">
            <ion-label class="titleLabel">{{ title }}</ion-label>
          </div>
          <div class="separator"></div>
          <div class="previewContainer">
            <div class="labelContainer">
              <ion-label class="optionLabel">{{ selectedVoteOptionText }}</ion-label>
            </div>
            <div class="labelContainer">
              <ion-label class="descriptionLabel">{{ descriptionText }}</ion-label>
            </div>
            <div class="buttonsContainer">
              <ion-button
                class="pageButton"
                fill="clear"
                @click="handlePreviousButton()"
                >{{ prevButtonTitle }}</ion-button
              >
              <ion-button
                class="pageButton nextPageButton"
                fill="clear"
                @click="handleConfirmButton()"
                >{{ confirmButtonTitle }}</ion-button
              >
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton, IonLabel } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import {
  VoteOptionsPageStrings,
  PreviewVoteOptionPageStrings,
} from "@/utils/LocalizedStrings";

import { LocalStorageKeys } from "@/store/local-storage-keys";

export default defineComponent({
  name: "PreviewVoteOption",
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonLabel,
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  mounted() {
    this.loadSelectedVoteOption();
  },
  data() {
    return {
      title: PreviewVoteOptionPageStrings.title,
      selectedVoteOptionText: "", 
      descriptionText: PreviewVoteOptionPageStrings.description, 
      prevButtonTitle: PreviewVoteOptionPageStrings.previousButton,
      confirmButtonTitle: VoteOptionsPageStrings.confirmButton,
    };
  },
  methods: {
    loadSelectedVoteOption() {
      const storedVoteOption = localStorage.getItem(
        LocalStorageKeys.selectedVoteOption
      );
      if (storedVoteOption) {
        this.selectedVoteOptionText = storedVoteOption;
      }
    },
    handlePreviousButton() {
      this.$router.replace("/vote-options");
    },
    handleConfirmButton() {
      // TODO: - implement
    },
  },
});
</script>

<style scoped>
.container {
  margin: 4px;
  padding-top: max(var(--ion-safe-area-top), 22px);
}

.content {
  margin: 20px auto;
  border: 2px solid var(--tigm-border-color);
  border-radius: 4px;
  min-width: 50%;
  width: 50%;
}

.labelContainer {
  padding: 16px;
}

.titleLabel {
  font-size: 18px;
  font-weight: bold;
}

.optionLabel {
  font-size: 22px;
  font-weight: bold;
}

.descriptionLabel {
  font-size: 16px;
}

.separator {
  background: var(--tigm-border-color);
  min-width: 100%;
  width: 100%;
  min-height: 2px;
  height: 2px;
}

.previewContainer {
  margin: 16px;
}

.buttonsContainer {
  width: 100%;
  height: 70px;
}

.pageButton {
  margin-top: 15px;
  margin-left: 8px;
  --background: var(--tigm-border-color);
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

.nextPageButton {
  float: right;
  margin-right: 8px;
}
</style>