<template>
  <ion-page>
    <ion-content>
      <div class="contentContainer">
        <div class="removeCardContainer">
          <ion-label class="removeCardLabel">{{ title }}</ion-label>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonLabel } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { RemoveCardPageStrings } from "@/utils/LocalizedStrings";

export default defineComponent({
  name: "RemoveCard",
  components: {
    IonContent,
    IonPage,
    IonLabel,
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  data() {
    return {
      title: RemoveCardPageStrings.title,
    };
  },
  methods: {
    countdown() {
      const timeinterval = setInterval(() => {
        clearInterval(timeinterval);
        this.$router.replace("/home");
      }, 5000);
    },
  },
  ionViewWillEnter() {
    this.countdown();
  },
});
</script>

<style scoped>
.removeCardContainer {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
}

.removeCardLabel {
  font-size: 16px;
  font-weight: 600;
  color: var(--tigm-border-color);
}
</style>