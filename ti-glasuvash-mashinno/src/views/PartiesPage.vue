<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <page-header-component></page-header-component>
        <!-- parties -->
        <div class="partiesContainer">
          <div class="partiesList">
            <div v-for="party in currentPageParties()" :key="party.id">
              <party-component
                :pParty="party"
                :pSelectedParty="selectedParty"
                :pNotaId="notaId"
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
              v-show="selectedParty?.id > 0 && selectedParty?.id < notaId"
            ></preferences-component>
          </div>
        </div>
        <!-- footer -->
        <div class="pageFooter">
          <ion-button class="nextStepButton" @click="handleNextStepButton()">{{
            nextStepButtonTitle
          }}</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { PartiesPageStrings } from "@/utils/LocalizedStrings";
import { Party, Preference } from "@/store/parties/types";
import { PartiesBuilder } from "@/store/parties/parties-builder";
import { LocalStorageKeys } from "@/store/local-storage-keys";

import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import PartyComponent from "@/components/PartyComponent.vue";
import PreferencesComponent from "@/components/PreferencesComponent.vue";

export default defineComponent({
  name: "Parties-Component",
  components: {
    IonContent,
    IonPage,
    IonButton,
    PageHeaderComponent,
    PartyComponent,
    PreferencesComponent,
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  data() {
    return {
      prevPageTitle: PartiesPageStrings.prevPage,
      nextPageTitle: PartiesPageStrings.nextPage,
      nextStepButtonTitle: PartiesPageStrings.buttonPreview,
      parties: [] as Array<Party>,
      preferences: [] as Array<Preference>,
      selectedParty: {} as Party,
      selectedPreference: {} as Preference | null,
      page: 0,
      hasMorePages: true,
      itemsPerPage: 13,
      notaId: -1,
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
      this.notaId = this.parties[this.parties.length - 1].id;
      console.log("parties: ", this.parties);
    },
    loadPreferences() {
      for (let i = 1; i <= 32; i++) {
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
    handleNextStepButton() {
      localStorage.setItem(
        LocalStorageKeys.party,
        JSON.stringify(this.selectedParty)
      );
      localStorage.setItem(
        LocalStorageKeys.preference,
        JSON.stringify(this.selectedPreference)
      );

      this.$router.replace("/preview");
    },
  },
});
</script>

<style scoped>
.container {
  margin: 4px;
  padding-top: max(var(--ion-safe-area-top), 22px);
}

.partiesContainer {
  flex-direction: row;
  display: flex;
  border-left: 2px solid var(--tigm-border-color);
  border-top: 2px solid var(--tigm-border-color);
  border-bottom: 2px solid var(--tigm-border-color);
  min-height: 100vh;
}

.partiesList {
  width: 60%;
}

.buttonsContainer {
  /* border-right: 4px solid var(--tigm-border-color); */
  width: 100%;
  height: 60px;
}

.preferencesContainer {
  width: 40%;
  text-align: center;
  border-left: 2px solid var(--tigm-border-color);
  border-right: 2px solid var(--tigm-border-color);
}
</style>