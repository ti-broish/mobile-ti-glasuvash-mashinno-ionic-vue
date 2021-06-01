<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <page-header-component></page-header-component>
        <!-- Info -->
        <div class="infoContainer">
          <ion-label class="infoTitleLabel">{{ infoTitle }}</ion-label>
          <br />
          <ion-label class="infoDescriptionLabel">{{
            infoDescription
          }}</ion-label>
        </div>
        <!-- Preview -->
        <div class="previewContainer">
          <div class="previewSectionContainer">
            <ion-label class="previewSection">000000035</ion-label>
          </div>
          <div class="previewSeparator"></div>
          <!-- Vote -->
          <div class="voteContainer">
            <div class="box"></div>
            <div class="partyContainer">
              <div class="line"></div>
              <div class="partyLabelContainer">
                <div v-if="party.id < 10">
                  <ion-label class="partyLabel"
                    >0{{ party.id }}. {{ party.name }}</ion-label
                  >
                </div>
                <div v-else-if="party.id === 31">
                  <ion-label class="partyLabel">{{
                    party.name
                  }}</ion-label>
                </div>
                <div v-else>
                  <ion-label class="partyLabel"
                    >0{{ party.id }}. {{ party.name }}</ion-label
                  >
                </div>
                <div class="preferenceLabelContainer">
                  <ion-label class="prefrenceLabel" v-show="hasPreference()"
                    >{{ preference?.id }}. {{ infoCandidate }}
                  </ion-label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="changeButtonContainer">
          <ion-button class="changeButton" @click="didPressChange()">{{
            changeButtonTitle
          }}</ion-button>
        </div>
        <!-- Page footer -->
        <div class="pageFooter">
          <ion-button class="voteButton" @click="didPressVote()">{{
            voteButtonTitle
          }}</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonLabel, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { PreviewPageStrings } from "@/utils/LocalizedStrings";
import { LocalStorageKeys } from "@/store/local-storage-keys";
import { Party, Preference } from "@/store/parties/types";

import PageHeaderComponent from "@/components/PageHeaderComponent.vue";

export default defineComponent({
  name: "Preview",
  components: {
    IonContent,
    IonPage,
    IonLabel,
    IonButton,
    PageHeaderComponent,
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  data() {
    return {
      infoTitle: PreviewPageStrings.title,
      infoDescription: PreviewPageStrings.description,
      infoCandidate: PreviewPageStrings.candidate,
      changeButtonTitle: PreviewPageStrings.changeButton,
      voteButtonTitle: PreviewPageStrings.voteButton,
      party: {} as Party,
      preference: {} as Preference,
    };
  },
  mounted() {
    this.loadSelectedValues();
  },
  methods: {
    loadSelectedValues() {
      const partyJSON = localStorage.getItem(LocalStorageKeys.party);
      if (partyJSON) {
        const storedParty: Party = JSON.parse(partyJSON);
        this.party = storedParty;
      }

      const preferenceJSON = localStorage.getItem(LocalStorageKeys.preference);
      if (preferenceJSON) {
        const storedPreference: Preference = JSON.parse(preferenceJSON);
        this.preference = storedPreference;
      }
    },
    hasPreference() {
      return this.preference?.id > 0;
    },
    resetSelectedValues() {
      localStorage.removeItem(LocalStorageKeys.party);
      localStorage.removeItem(LocalStorageKeys.preference);
    },
    didPressChange() {
      this.resetSelectedValues();
      this.$router.replace("/parties");
    },
    didPressVote() {
      this.resetSelectedValues();
      this.$router.replace("/vote");
    },
  },
});
</script>

<style scoped>
.container {
  margin: 8px;
}

.infoContainer {
  margin-top: 8px;
  padding: 8px;
}

.infoTitleLabel {
  font-size: x-large;
  font-weight: 600;
}

.infoDescriptionLabel {
  font-size: 16px;
}

.previewContainer {
  margin: 16px auto;
  width: 80%;
  border: 4px solid var(--tigm-border-color);
  border-radius: 4px;
}

.previewSection {
  font-size: 16px;
  font-weight: bold;
}

.previewSectionContainer {
  margin: 8px auto;
  text-align: center;
}

.previewSeparator {
  margin-left: 24px;
  margin-right: 24px;
  border: 2px solid var(--tigm-border-color);
}

.voteContainer {
  display: flex;
  flex-direction: row;
}

.box {
  margin-top: 8px;
  margin-left: 24px;
  min-width: 18px;
  width: 18px;
  height: 18px;
  max-height: 18px;
  background: var(--tigm-button-background-color);
}

.partyContainer {
  display: flex;
  flex-direction: row;
}

.line {
  margin-top: 8px;
  margin-left: -10px;
  margin-bottom: 24px;
  width: 15px;
  border-left: 1px solid var(--tigm-border-color);
  border-bottom: 1px solid var(--tigm-border-color);
}

.partyLabelContainer {
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 8px;
  margin-bottom: 16px;
}

.partyLabel {
  font-size: 16px;
}

.preferenceLabelContainer {
  margin-top: 8px;
}

.preferenceLabel {
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