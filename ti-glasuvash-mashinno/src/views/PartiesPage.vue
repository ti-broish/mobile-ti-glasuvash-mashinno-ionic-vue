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
            ></preferences-component>
          </div>
        </div>
        <!-- footer -->
        <div class="pageFooter"></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonLabel, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
import { PartiesPageStrings } from "@/utils/LocalizedStrings";
import { Party, Preference } from "@/store/parties/types";
import { PartiesBuilder } from "@/store/parties/parties-builder";

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
      console.log("didSelectParty: ", party);
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
    didPressPrevPage() {
      this.page -= 1;

      if (this.page < 0) {
        this.page = 0;
      }
    },
    didPressNextPage() {
      this.page += 1;
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
  position: relative;
  top: 50%;
  margin-top: -20px;
  margin-left: 8px;
  --background-activated: var(--tigm-button-activated-color);
  --border-style: solid;
  --border-width: 2px;
  --border-color: var(--tigm-text-color);
  --border-radius: 4px;
  --color: var(--tigm-text-color);
  font-size: 14px;
  font-weight: 600;
  text-transform: none;
}

.nextPageButton {
  float: right;
  margin-right: 8px;
}

.preferencesContainer {
  width: 40%;
  text-align: center;
}
</style>