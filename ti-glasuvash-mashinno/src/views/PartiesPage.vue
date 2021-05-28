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
            <div v-for="party in parties" :key="party.id">
              <party-component :pParty="party"></party-component>
            </div>
          </div>
          <!-- preferences -->
          <div class="preferencesContainer">
            <preferences-component :pPreferences="preferences"></preferences-component>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonLabel } from "@ionic/vue";
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
    PartyComponent,
    PreferencesComponent,
  },
  data() {
    return {
      electionRegionText: PartiesPageStrings.electionRegion,
      sectionText: PartiesPageStrings.section,
      title: PartiesPageStrings.title,
      parties: [] as Array<Party>, 
      preferences: [] as Array<Preference>
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
      for(let i = 1; i <= 12; i++) {
        const preference = { id: 100 + i }
        this.preferences.push(preference);
      }
    }
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

.preferencesContainer {
  width: 40%;
  text-align: center;
}
</style>