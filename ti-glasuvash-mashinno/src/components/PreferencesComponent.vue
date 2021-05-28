<template>
  <div class="componentContainer">
    <p class="title">{{ title }}</p>
    <ion-grid>
      <ion-row>
        <ion-col v-for="pref in preferences" :key="pref.id">
          <ion-button class="preferenceButton" fill="clear">{{ pref.id }}</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script lang="ts">
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import { defineComponent } from "vue";
import { PartiesPageStrings } from "@/utils/LocalizedStrings";
import { Preference } from "@/store/parties/types";

export default defineComponent({
  name: "PreferencesComponent",
  props: {
    pPreferences: Array,
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
  },
  data() {
    return {
      title: PartiesPageStrings.preferenceTitle,
      preferences: this.pPreferences ?? ([] as Array<Preference>),
    };
  },
});
</script>

<style scoped>
.title {
  font-size: 14px;
  font-weight: 600;
  color: var(--tigm-text-color);
}

.preferenceButton {
  width: 40px;
  height: 40px;
  --border-style: solid;
  --border-width: 2px;
  --border-color: var(--tigm-text-color);
  --border-radius: 20px;
  --color: var(--tigm-text-color);
}
</style>