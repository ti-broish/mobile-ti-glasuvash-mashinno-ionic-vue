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
            <ion-label class="descriptionLabel">{{ subtitle }}</ion-label>
            <ion-list class="voteOptionsContainer">
              <ion-item lines="none" v-for="voteOption in voteOptions" :key="voteOption.id">
                <div class="optionPrefix"></div>
                <ion-label class="optionLabel">{{ voteOption.name }}</ion-label>
              </ion-item>
            </ion-list>
            <ion-label class="descriptionLabel">{{ descriptionText }}</ion-label>
            <br><br>
            <ion-label class="warningLabel">{{ warningText }}</ion-label>
            <br><br>
            <div class="buttonsContainer">
              <ion-button class="pageButton" fill="clear" @click="handlePreviousButton()">{{ prevButtonTitle
              }}</ion-button>
              <ion-button class="pageButton nextPageButton" fill="clear" @click="handleConfirmButton()">{{
                confirmButtonTitle }}</ion-button>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton, IonLabel, IonList, IonItem, } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import {
  VoteOptionsPageStrings,
  PreviewVoteOptionPageStrings,
} from "@/utils/LocalizedStrings";

import { LocalStorageKeys } from "@/store/local-storage-keys";
import { VoteOptionData} from "../store/vote-option-data";

export default defineComponent({
  name: "PreviewVoteOption",
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonLabel,
    IonList,
    IonItem
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  data() {
    return {
      title: PreviewVoteOptionPageStrings.title,
      subtitle: PreviewVoteOptionPageStrings.subtitle,
      voteOptions: [] as Array<VoteOptionData>,
      descriptionText: PreviewVoteOptionPageStrings.description,
      warningText: PreviewVoteOptionPageStrings.warningText,
      prevButtonTitle: PreviewVoteOptionPageStrings.previousButton,
      confirmButtonTitle: VoteOptionsPageStrings.confirmButton,
    };
  },
  mounted() {
    this.loadSelectedVoteOptions();
  },
  methods: {
    loadSelectedVoteOptions() {
      const storedVoteOptions = localStorage.getItem(LocalStorageKeys.selectedVoteOptions);

      if (storedVoteOptions) {
        this.voteOptions = JSON.parse(storedVoteOptions);
      }
    },
    handlePreviousButton() {
      this.$router.replace("/vote-options");
    },
    handleConfirmButton() {
      if (this.voteOptions.map(option => option.name).includes(VoteOptionsPageStrings.option1)) {
        this.$router.replace("/parties");
      } else {
        this.$router.replace("/candidates");
      }
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
  border-radius: 8px;
  min-width: 80%;
  width: 80%;
}

.labelContainer {
  padding: 16px;
}

.titleLabel {
  font-size: 18px;
  font-weight: bold;
}

.voteOptionsContainer {
  flex-direction: row;
}

ion-item {
  margin-left: 0 !important;
  margin-right: 0 !important;
  --padding-start: 8px;
  --padding-end: 8px;
  --inner-padding-top: 0px;
  --inner-padding-bottom: 0px;
}

.optionPrefix {
  width: 8px;
  height: 2px;
  background-color: #000;
}

.optionLabel {
  font-size: 16px;
  font-weight: bold;
  padding-left: 8px;
}

.descriptionLabel {
  font-size: 16px;
}

.warningLabel {
  font-size: 16px;
  font-weight: bold;
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