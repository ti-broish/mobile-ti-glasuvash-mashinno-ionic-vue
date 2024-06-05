<template>
  <ion-page>
    <ion-content ref="content">
      <div class="container">
        <page-header-component :pTitle="title"></page-header-component>
        <!-- Info -->
        <div class="infoContainer">
          <ion-label class="infoTitleLabel">{{ sectionTitle }}</ion-label>
          <br /><br />
          <ion-label class="sectionTextLabel">{{ sectionText0 }}</ion-label>
          <br />
          <ion-label class="sectionTextLabel">{{ sectionText1 }}</ion-label>
          <br />
          <ion-label class="sectionTextLabel">{{ sectionText2 }}</ion-label>
        </div>
        <!-- Preview -->
        <div class="previewContainer">
          <div class="previewSectionContainer">
            <ion-label class="previewSection">000000035</ion-label>
          </div>
          <div class="previewSeparator"></div>
          <!-- Vote -->
          <ion-list>
            <ion-item lines="none" v-for="option in voteOptions" :key="option.name">
              <div class="optionContainer">
                <div class="optionNameContainer">
                  <ion-label class="optionNameLabel">{{
                    option.name
                  }}</ion-label>
                </div>
                <div class="optionValueContainer">
                  <div>{{ option.data?.first }}</div>
                  <div>
                    <ion-label class="partyLabel">{{ option.data?.party }} {{ option.data?.id }}</ion-label>
                  </div>
                </div>
              </div>
            </ion-item>
          </ion-list>
        </div>
        <div class="changeButtonContainer">
          <ion-button class="changeButton" @click="didPressChange()">{{
            changeButtonTitle
          }}</ion-button>
        </div>
        <!-- Page footer -->
        <div class="pageFooter">
          <ion-button class="voteButton" @click="didPressVote()">{{
            voteButtonTitle }}</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonLabel, IonButton } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { PreviewPageStrings, VoteOptionsPageStrings } from "@/utils/LocalizedStrings";
import { LocalStorageKeys } from "@/store/local-storage-keys";
import { Candidates } from "@/store/candidates/types";
import { Party, Preference } from "@/store/parties/types";
import { VoteOptionData } from "../store/vote-option-data";

import PageHeaderComponent from "@/components/PageHeaderComponent.vue";

export default defineComponent({
  name: "Preview-Component",
  components: {
    IonContent,
    IonPage,
    IonLabel,
    IonButton,
    PageHeaderComponent,
  },
  setup() {
    const router = useRouter();
    const content = ref();

    const scrollToBottom = () => {
      content.value.$el.scrollToBottom(300);
    };

    return { router, content, scrollToBottom };
  },
  data() {
    return {
      title: PreviewPageStrings.title,
      sectionTitle: PreviewPageStrings.sectionTitle,
      sectionText0: PreviewPageStrings.sectionText0,
      sectionText1: PreviewPageStrings.sectionText1,
      sectionText2: PreviewPageStrings.sectionText2,
      notaTitle: PreviewPageStrings.notaTitle,
      changeButtonTitle: PreviewPageStrings.changeButton,
      voteButtonTitle: PreviewPageStrings.voteButton,
      voteOptions: [] as Array<VoteOptionData>,
    };
  },
  mounted() {
    this.loadSelectedValues();
  },
  methods: {
    loadSelectedValues() {
      const storedVoteOptions = localStorage.getItem(LocalStorageKeys.selectedVoteOptions);
      if (storedVoteOptions) {
        this.voteOptions = JSON.parse(storedVoteOptions);
      }

      this.scrollToBottom();
    },
    resetSelectedValues() {
      for(let i = 0; i < this.voteOptions.length; i++) {
        this.voteOptions[i].filled = false;
      }

      localStorage.setItem(LocalStorageKeys.selectedVoteOptions, JSON.stringify(this.voteOptions));
    },
    didPressChange() {
      this.resetSelectedValues();
      
      const voteOption = this.voteOptions.filter(option => option.name == VoteOptionsPageStrings.option1)[0];
      if (voteOption) {
        this.$router.replace("/parties");
      } else {
        this.$router.replace("/candidates");
      }
    },
    didPressVote() {
      localStorage.removeItem(LocalStorageKeys.selectedVoteOptions);
      this.resetSelectedValues();
      this.$router.replace("/vote");
    },
  },
});
</script>

<style scoped>
.container {
  margin: 8px;
  padding-top: max(var(--ion-safe-area-top), 22px);
}

.infoContainer {
  margin-top: 8px;
  padding: 8px;
}

.infoTitleLabel {
  font-size: x-large;
  font-weight: 600;
}

.sectionTextLabel {
  font-size: 16px;
}

.previewContainer {
  margin: 16px auto;
  border: 4px solid var(--tigm-border-color);
  border-radius: 8px;
}

.previewSection {
  font-size: 16px;
  font-weight: bold;
}

.previewSectionContainer {
  margin: 16px auto;
  text-align: center;
}

.previewSeparator {
  margin-left: 24px;
  margin-right: 24px;
  border: 2px solid var(--tigm-border-color);
}

.optionContainer {
  margin: auto;
  text-align: center;
  margin-bottom: 16px;
  width: 80%;
}

.optionNameContainer {
  margin: 16px auto;
  width: 80%;
  text-align: center;
}

.optionNameLabel {
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}

.optionValueContainer {
  margin: 16px auto;
  width: 80%;
  text-align: center;
}

.partyLabel {
  font-size: 14px;
}

.changeButtonContainer {
  margin: 8px auto;
  text-align: center;
}

.changeButton {
  width: 60%;
  text-transform: none;
  font-size: 16px;
  --background: var(--tigm-button-background-color);
  --background-activated: var(--tigm-button-activated-color);
  --color: white;
  min-height: 35px;
  height: 35px;
}

.pageFooter {
  height: 100px;
}

.voteButton {
  float: right;
  margin-top: 60px;
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