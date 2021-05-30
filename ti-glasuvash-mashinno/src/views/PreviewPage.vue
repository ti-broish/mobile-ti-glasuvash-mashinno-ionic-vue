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
        <div class="infoContainer">
          <div class="info">
            <ion-label class="infoTitle">{{ infoTitle }}</ion-label>
            <br />
            <ion-label class="infoDescription">{{ infoDescription }}</ion-label>
          </div>
        </div>
        <div class="previewContainer">
          <ion-label class="previewSection">000000035</ion-label>
          <div class="previewSeparator"></div>
          <ion-label class="previewTitle">{{ title }}</ion-label>
        </div>
        <!-- Page footer -->
        <div class="pageFooter">
          <ion-button
            class="voteButton"
            @click="() => router.replace('/vote')"
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
  PartiesPageStrings,
  PreviewPageStrings,
} from "@/utils/LocalizedStrings";
// import { Party, Preference } from "@/store/parties/types";
// import { PartiesBuilder } from "@/store/parties/parties-builder";

// import PartyComponent from "@/components/PartyComponent.vue";
// import PreferencesComponent from "@/components/PreferencesComponent.vue";

export default defineComponent({
  name: "Preview",
  components: {
    IonContent,
    IonPage,
    IonLabel,
    IonButton,
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
      infoTitle: PreviewPageStrings.title,
      infoDescription: PreviewPageStrings.description,
      voteButtonTitle: PreviewPageStrings.voteButton,
    };
  },
  //   mounted() {

  //   },
  //   methods: {

  //   }
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

.infoContainer {
  margin: 8px auto;
}

.infoTitle {
  padding: 8px;
  font-size: x-large;
  font-weight: 600;
  color: var(--tigm-text-color);
}

.infoDescription {
  padding: 8px;
  font-size: 16px;
  color: var(--tigm-text-color);
}

.previewContainer {
  margin: 32px auto;
  width: 50%;
  height: 200px;
  border: 1px solid brown;
}

.previewSection {
  font-size: 16px;
  font-weight: bold;
  color: var(--tigm-text-color);
}

.pageFooter {
  height: 100px;
}

.voteButton {
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