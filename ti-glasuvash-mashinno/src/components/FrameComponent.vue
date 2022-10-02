<template>
  <div class="frameTitleContainer">
    <ion-label class="frameTitleLabel">{{ pTitle }}</ion-label>
  </div>
  <div class="frameSubtitleContainer">
    <ion-label class="frameSubtitleLabel">{{ pSubtitle }}</ion-label>
    <p>{{ pHint }}</p>
  </div>
  <div class="frameContainer">
    <div class="frame1">
      <div class="frame2"></div>
      <div class="frame3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { IonLabel } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "FrameComponent",
  props: {
    pTitle: String,
    pSubtitle: String, 
    pHint: String
  },
  components: {
    IonLabel,
  },
});
</script>

<style scoped>
.frameTitleContainer {
  width: 100%;
  max-width: 1024px;
  margin: 32px auto;
  text-align: center;
}

.frameTitleLabel {
  font-size: x-large;
  font-weight: bold;
}

.frameSubtitleContainer {
  margin: 32px auto;
  width: 100%;
  max-width: 1024px;
  text-align: center;
}

.frameSubtitleContainer p {
  font-size: 16px;
  line-height: 22px;
  text-align: center;
}

.frameSubtitleLabel {
  font-weight: bold;
}

.frameContainer {
  margin: 16px auto;
  width: 320px;
  text-align: center;
  border: var(--tigm-border-color);
}

.frame1 {
  margin: auto;
  width: 280px;
  height: 380px;
  border: 2px solid var(--tigm-border-color);
  border-radius: 4px;
}

.frame2 {
  margin: 32px auto;
  width: 25%;
  border: 4px solid var(--tigm-border-color);
  border-radius: 4px;
}

.frame3 {
  margin-top: 32px;
  margin-left: 32px;
  margin-right: 32px;
  height: 200px;
  border: 2px solid var(--tigm-border-color);
  border-radius: 4px;
}
</style>
