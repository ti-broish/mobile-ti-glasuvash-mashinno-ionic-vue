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
                class="spanBox"
                v-bind:class="{
                  spanBoxSelected: selectedPreference?.id === pref.id,
                }"
                >{{ pref.id }}</span
              >
              <div class="boxX" v-show="selectedPreference?.id === pref.id">
                <span class="spanBoxX">x</span>
              </div>
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
  color: var(--tigm-text-color);
}

.ionItem {
  --padding-start: 4px;
  --padding-end: 0px;

  --inner-padding-start: 4px;
  --inner-padding-end: 0px;
}

.spanBox {
  display: inline-block;
  margin-top: 8px;
  font-size: 14px;
  color: var(--tigm-text-color);
  border: 2px solid var(--tigm-text-color);
  border-radius: 20px;
  width: 40px;
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  text-align: center;
  padding-top: 8px;
}

.spanBoxSelected {
  color: white;
  background: var(--tigm-text-color);
}

.boxX {
  width: 40px;
  height: 40px;
  text-align: center;
  margin-top: -40px;
}

.spanBoxX {
  font-size: 30px;
  color: white;
}
</style>