<template>
  <ion-page>
    <ion-content>
      <div class="contentContainer">
        <frame-component :pTitle="title" :pSubtitle="subtitle"></frame-component>
        <div id="waitingContainer">
          <ion-label id="waitingLabel">{{ waitingTitle }}</ion-label>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonLabel } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { VotePageStrings } from "@/utils/LocalizedStrings";

import FrameComponent from "@/components/FrameComponent.vue";

export default defineComponent({
  name: "Vote-Component",
  components: {
    IonContent,
    IonPage,
    IonLabel,
    FrameComponent
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  data() {
    return {
      title: VotePageStrings.title,
      subtitle: VotePageStrings.subtitle,
      waitingTitle: VotePageStrings.waiting,
    };
  },
  methods: {
    countdown() {
      const timeinterval = setInterval(() => {
        clearInterval(timeinterval);
        this.$router.replace("/vote-confirmation");
      }, 3000);
    },
  },
  ionViewWillEnter() {
    this.countdown();
  },
});
</script>

<style scoped>
#waitingContainer {
  margin-top: 32px;
  text-align: center;
}

#waitingLabel {
  font-size: 16px;
  font-weight: 600;
  color: var(--tigm-border-color);
}
</style>