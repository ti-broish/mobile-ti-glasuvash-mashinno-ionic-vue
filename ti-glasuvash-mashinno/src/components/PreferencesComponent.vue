<template>
  <div class="componentContainer">
    <p class="title">{{ title }}</p>
    <ion-grid>
      <ion-row>
        <ion-col v-for="pref in preferences" :key="pref.id">
          <ion-item
            class="ionItem"
            lines="none"
            @click="didSelectPreference(pref)"
          >
            <div>
              <span
                class="idItem"
                v-bind:class="{
                  idItemSelected: selectedPreference?.id === pref.id,
                }"
                >{{ pref.id }}</span
              >
              <selected-box-component
                v-show="selectedPreference?.id === pref.id"
              >
              </selected-box-component>
            </div>
          </ion-item>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script lang="ts">
import { IonGrid, IonRow, IonCol, IonItem } from "@ionic/vue";
import { defineComponent } from "vue";
import { PartiesPageStrings } from "@/utils/LocalizedStrings";
import { Preference } from "@/store/parties/types";

import SelectedBoxComponent from "@/components/SelectedBoxComponent.vue";

export default defineComponent({
  name: "PreferencesComponent",
  props: {
    pPreferences: Array,
    pSelectedPreference: Object,
  },
  emits: {
    "select-preference": null,
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    SelectedBoxComponent,
  },
  data() {
    return {
      title: PartiesPageStrings.preferenceTitle,
      preferences: this.pPreferences ?? ([] as Array<Preference>),
      selectedPreference: {} as Preference,
    };
  },
  methods: {
    reload() {
      console.log("preference: ", this.pSelectedPreference);
      this.selectedPreference = this.pSelectedPreference as Preference;
    },
    didSelectPreference(preference: Preference) {
      if (preference.id === this.selectedPreference?.id) {
        this.$emit("select-preference", null);
      } else {
        this.$emit("select-preference", preference);
      }
    },
  },
  watch: {
    pSelectedPreference: "reload",
  },
});
</script>

<style scoped>
.title {
  font-size: 14px;
  font-weight: 600;
}

.ionItem {
  --padding-start: 4px;
  --padding-end: 0px;

  --inner-padding-start: 4px;
  --inner-padding-end: 0px;
}

.idItem {
  border-radius: 20px !important;
}

.idItemSelected {
  color: white;
  background: var(--tigm-button-background-color);
}
</style>