<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <page-header-component></page-header-component>
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
          <div v-if="showCandidatesSection()">
            <div class="previewTitleContainer">
              <ion-label class="previewTitleLabel">{{
                presidentPlaceholder
              }}</ion-label>
            </div>
          </div>
          <div v-if="hasCandidates()">
            <div class="candidatesLabelContainer">
              <div v-if="candidates.id < 10">
                <ion-label class="partyLabel"
                  >0{{ candidates.id }}. {{ candidates.party }}</ion-label
                >
              </div>
              <div v-else-if="candidates.id === 24">
                <ion-label class="partyLabel">{{ candidates.party }}</ion-label>
              </div>
              <div v-else>
                <ion-label class="partyLabel"
                  >{{ candidates.id }}. {{ candidates.party }}</ion-label
                >
              </div>
              <div>
                <ion-label class="partyLabel">{{
                  candidates.president
                }}</ion-label>
                <br />
                <ion-label class="partyLabel">{{
                  candidates.vice_president
                }}</ion-label>
              </div>
            </div>
          </div>
          <div v-else-if="showCandidatesSection()">
            <div class="notaContainer">
              <ion-label class="notaLabel">{{ notaTitle }}</ion-label>
            </div>
          </div>
          <!-- Party -->
          <div v-if="showPartySection()">
            <div class="previewTitleContainer">
              <ion-label class="previewTitleLabel">{{
                partyPlaceholder
              }}</ion-label>
            </div>
          </div>
          <div v-if="hasParty()">
            <div class="voteContainer">
              <!-- <div class="box"></div> -->
              <div class="partyContainer">
                <!-- <div class="line"></div> -->
                <div class="partyLabelContainer">
                  <div v-if="party.id < 10">
                    <ion-label class="partyLabel"
                      >0{{ party.id }}. {{ party.name }}</ion-label
                    >
                  </div>
                  <div v-else-if="party.id === 37">
                    <ion-label class="partyLabel">{{ party.name }}</ion-label>
                  </div>
                  <div v-else>
                    <ion-label class="partyLabel"
                      >{{ party.id }}. {{ party.name }}</ion-label
                    >
                  </div>
                  <div class="preferenceLabelContainer">
                    <div v-if="hasPreference()">
                      <ion-label class="prefrenceLabel"
                        >{{ preference?.id }}. {{ candidatePlaceholder }}
                      </ion-label>
                    </div>
                    <div v-else-if="party.is === 37">
                      <ion-label class="notaLabel">{{ notaTitle }}</ion-label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="showPartySection()">
            <div class="notaContainer">
              <ion-label class="notaLabel">{{ notaTitle }}</ion-label>
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
          <ion-button
            class="voteButton"
            @click="didPressVote()"
            :disabled="!hasParty() && !hasCandidates()"
            >{{ voteButtonTitle }}</ion-button
          >
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonLabel, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import {
  PreviewPageStrings,
  VoteOptionsPageStrings,
} from "@/utils/LocalizedStrings";
import { LocalStorageKeys } from "@/store/local-storage-keys";
import { Candidates } from "@/store/candidates/types";
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
      sectionTitle: PreviewPageStrings.sectionTitle,
      sectionText0: PreviewPageStrings.sectionText0,
      sectionText1: PreviewPageStrings.sectionText1,
      sectionText2: PreviewPageStrings.sectionText2,
      presidentPlaceholder: PreviewPageStrings.presidentPlaceholder,
      partyPlaceholder: PreviewPageStrings.partyPlaceholder,
      candidatePlaceholder: PreviewPageStrings.candidatePlaceholder,
      notaTitle: PreviewPageStrings.notaTitle,
      changeButtonTitle: PreviewPageStrings.changeButton,
      voteButtonTitle: PreviewPageStrings.voteButton,
      candidates: {} as Candidates,
      party: {} as Party,
      preference: {} as Preference,
    };
  },
  mounted() {
    this.loadSelectedValues();
  },
  methods: {
    getContent() {
      return document.querySelector('ion-content');
    }, 
    loadSelectedValues() {
      const candidatesJSON = localStorage.getItem(LocalStorageKeys.candidates);
      if (candidatesJSON) {
        const storedCandidates: Candidates = JSON.parse(candidatesJSON);
        this.candidates = storedCandidates;
      }

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

      this.getContent()?.scrollToBottom(1500);
    },
    hasCandidates() {
      return this.candidates?.id > 0;
    },
    hasParty() {
      return this.party?.id > 0;
    },
    hasPreference() {
      return this.preference?.id > 0;
    },
    showCandidatesSection() {
      return (
        this.getStoredVoteOption() == VoteOptionsPageStrings.option1 ||
        this.getStoredVoteOption() == VoteOptionsPageStrings.option2
      );
    },
    showPartySection() {
      return (
        this.getStoredVoteOption() == VoteOptionsPageStrings.option1 ||
        this.getStoredVoteOption() == VoteOptionsPageStrings.option3
      );
    },
    resetSelectedValues() {
      localStorage.removeItem(LocalStorageKeys.candidates);
      localStorage.removeItem(LocalStorageKeys.party);
      localStorage.removeItem(LocalStorageKeys.preference);
    },
    getStoredVoteOption() {
      const storedVoteOption = localStorage.getItem(
        LocalStorageKeys.selectedVoteOption
      );

      return storedVoteOption ?? "";
    },
    didPressChange() {
      this.resetSelectedValues();

      if (this.showCandidatesSection()) {
        this.$router.replace("/candidates");
      } else {
        this.$router.replace("/parties");
      }
    },
    didPressVote() {
      localStorage.removeItem(LocalStorageKeys.selectedVoteOption);
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
  width: 80%;
  border: 4px solid var(--tigm-border-color);
  border-radius: 4px;
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

.previewTitleContainer {
  margin: 16px auto;
  width: 80%;
  text-align: center;
}

.previewTitleLabel {
  font-size: 18px;
  font-weight: 600;
}

.voteContainer {
  display: flex;
  flex-direction: row;
}

.notaContainer {
  margin: 16px auto;
  text-align: center;
}

.notaLabel {
  font-size: 16px;
}

.box {
  margin-top: 8px;
  margin-left: 25px;
  min-width: 18px;
  width: 18px;
  height: 18px;
  max-height: 18px;
  background: var(--tigm-button-background-color);
}

.partyContainer {
  /* display: flex;
  flex-direction: row; */
  margin: auto;
  text-align: center;
  margin-bottom: 16px;
}

.line {
  margin-top: 8px;
  margin-left: -10px;
  margin-bottom: 24px;
  width: 15px;
  border-left: 1px solid var(--tigm-border-color);
  border-bottom: 1px solid var(--tigm-border-color);
}

.candidatesLabelContainer {
  margin: auto;
  text-align: center;
  margin-bottom: 16px;
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