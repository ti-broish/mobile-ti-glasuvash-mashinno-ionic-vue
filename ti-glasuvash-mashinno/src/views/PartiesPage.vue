<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <div class="pageHeader">
          <ion-label class="rik">
            {{ electionRegionText }} 310000000 {{ sectionText }} 000000035
          </ion-label>
          <br />
          <ion-label class="title">{{ title }}</ion-label>
        </div>
        <!-- parties -->
        <div class="partiesContainer">
          <div class="partiesList">
            <div v-for="party in currentPageParties()" :key="party.id">
              <party-component
                :pParty="party"
                :pSelectedParty="selectedParty"
                @select-party="didSelectParty($event)"
              ></party-component>
            </div>
            <div class="buttonsContainer">
              <ion-button
                class="pageButton"
                fill="clear"
                @click="didPressPrevPage()"
                v-show="page > 0"
                >{{ prevPageTitle }}</ion-button
              >
              <ion-button
                class="pageButton nextPageButton"
                fill="clear"
                @click="didPressNextPage()"
                v-show="hasMorePages > 0"
                >{{ nextPageTitle }}</ion-button
              >
            </div>
          </div>
          <!-- preferences -->
          <div class="preferencesContainer">
            <preferences-component
              :pPreferences="preferences"
              :pSelectedPreference="selectedPreference"
              @select-preference="didSelectPreference($event)"
              v-show="selectedParty?.id > 0 && selectedParty?.id < 31"
            ></preferences-component>
          </div>
        </div>
        <!-- footer -->
        <div class="pageFooter">
          <ion-button class="previewButton" @click="didPressPreview()">{{
            previewButtonTitle
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
import { PartiesPageStrings } from "@/utils/LocalizedStrings";
import { Party, Preference } from "@/store/parties/types";
import { PartiesBuilder } from "@/store/parties/parties-builder";
import { LocalStorageKeys } from "@/store/local-storage-keys";

import PartyComponent from "@/components/PartyComponent.vue";
import PreferencesComponent from "@/components/PreferencesComponent.vue";

export default defineComponent({
  name: "Parties",
  components: {
    IonContent,
    IonPage,
    IonLabel,
    IonButton,
    PartyComponent,
    PreferencesComponent,
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  data() {
    return {
      electionRegionText: PartiesPageStrings.electionRegion,
      sectionText: PartiesPageStrings.section,
      title: PartiesPageStrings.title,
      prevPageTitle: PartiesPageStrings.prevPage,
      nextPageTitle: PartiesPageStrings.nextPage,
      previewButtonTitle: PartiesPageStrings.buttonPreview,
      parties: [] as Array<Party>,
      preferences: [] as Array<Preference>,
      selectedParty: {} as Party,
      selectedPreference: {} as Preference | null,
      page: 0,
      hasMorePages: true,
      itemsPerPage: 13,
    };
  },
  mounted() {
    this.loadParties();
    this.loadPreferences();
  },
  methods: {
    loadParties() {
      const builder = new PartiesBuilder();
      this.parties = builder.makeParties();
      console.log("parties: ", this.parties);
    },
    loadPreferences() {
      for (let i = 1; i <= 12; i++) {
        const preference = { id: 100 + i };
        this.preferences.push(preference);
      }
    },
    didSelectParty(party: Party) {
      if (party == null || party?.id != this.selectedParty?.id) {
        this.selectedPreference = null;
      }

      this.selectedParty = party;
    },
    currentPageParties(): Array<Party> {
      const result = Array<Party>();
      const startIndex = this.itemsPerPage * this.page;
      let itemsCount = this.itemsPerPage * (this.page + 1);

      if (itemsCount > this.parties.length) {
        itemsCount = this.parties.length;
      }

      for (let i = startIndex; i < itemsCount; i++) {
        result.push(this.parties[i]);
      }

      this.hasMorePages =
        this.itemsPerPage * (this.page + 1) < this.parties.length;

      return result;
    },
    didSelectPreference(preference: Preference) {
      this.selectedPreference = preference;
    },
    didPressPrevPage() {
      this.page -= 1;

      if (this.page < 0) {
        this.page = 0;
      }
    },
    didPressNextPage() {
      this.page += 1;
    },
    didPressPreview() {
      if (this.selectedParty?.id > 0) {
        localStorage.setItem(
          LocalStorageKeys.party,
          JSON.stringify(this.selectedParty)
        );
        localStorage.setItem(
          LocalStorageKeys.preference,
          JSON.stringify(this.selectedPreference)
        );

        this.$router.replace("/preview");
      } else {
        alert(PartiesPageStrings.noParty);
      }
    },
  },
});
</script>

<style scoped>
.container {
  margin: 4px;
}

.pageHeader {
  padding: 8px;
}

.rik {
  font-size: 16px;
  font-weight: bold;
  color: var(--tigm-text-color);
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: var(--tigm-text-color);
}

.partiesContainer {
  flex-direction: row;
  display: flex;
  border: 4px solid var(--tigm-text-color);
}

.partiesList {
  width: 60%;
}

.buttonsContainer {
  border-right: 1px solid var(--tigm-text-color);
  width: 100%;
  height: 100px;
}

.pageButton {
  margin-top: 30px;
  margin-left: 8px;
  --background-activated: var(--tigm-button-activated-color);
  --border-style: solid;
  --border-width: 2px;
  --border-color: var(--tigm-text-color);
  --border-radius: 4px;
  --color: var(--tigm-text-color);
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: none;
  min-height: 40px;
  height: 40px;
}

.nextPageButton {
  float: right;
  margin-right: 8px;
}

.preferencesContainer {
  width: 40%;
  text-align: center;
}

.pageFooter {
  height: 100px;
}

.previewButton {
  float: right;
  margin-top: 30px;
  margin-right: 8px;
  --background: var(--tigm-text-color);
  --color: white;
  text-transform: none;
  font-size: 16px;
  min-width: 160px;
  width: 160px;
  min-height: 40px;
  height: 40px;
}
</style>