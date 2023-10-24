<template>
  <ion-page>
    <ion-content>
      <div class="contentContainer">
        <frame-component :pTitle="title" :pSubtitle="subtitle" :pHint="hint">
        </frame-component>
        <div class="cardButtonContainer">
          <ion-button class="cardButton" @click="() => router.replace('/vote-options')">
            {{ cardButtonTitle }}
          </ion-button>
        </div>
      </div>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <div style="text-align: center; height:64px;">
          <a style="color: #262629;" href="https://tibroish.bg/privacy-notice">{{ privacyNotice }}</a>
        </div>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { HomePageStrings } from "@/utils/LocalizedStrings";

import FrameComponent from "@/components/FrameComponent.vue";

export default defineComponent({
  name: "Home-Component",
  components: {
    IonContent,
    IonPage,
    IonButton,
    FrameComponent,
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  data() {
    return {
      title: HomePageStrings.title, 
      subtitle: HomePageStrings.subtitle, 
      hint: HomePageStrings.hint, 
      cardButtonTitle: HomePageStrings.cardButtonTitle, 
      privacyNotice: HomePageStrings.privacyNotice
    };
  },
});
</script>

<style scoped>
.cardButtonContainer {
  margin: -78px auto;
  text-align: center;
}

.cardButton {
  font-size: 16px;
  --background: var(--tigm-border-color);
  --background-activated: var(--tigm-button-activated-color);
}
</style>
