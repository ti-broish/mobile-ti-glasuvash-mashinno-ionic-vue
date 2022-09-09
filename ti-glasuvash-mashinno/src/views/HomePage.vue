<template>
  <ion-page>
    <ion-content>
      <div class="contentContainer">
        <frame-component :pTitle="title" :pSubtitle="subtitle" :pHint="hint">
        </frame-component>
        <div class="cardButtonContainer">
          <ion-button class="cardButton" @click="() => router.replace('/parties')">
            {{ cardButtonTitle }}
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { HomePageStrings } from "@/utils/LocalizedStrings";

import FrameComponent from "@/components/FrameComponent.vue";

export default defineComponent({
  name: "Home",
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
