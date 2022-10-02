<template>
  <ion-page>
    <ion-content>
      <div class="contentContainer">
        <div class="circleContainer">
          <div class="circle">
            <div class="checkmark"></div>
          </div>
        </div>
        <div>
          <ion-label class="titleLabel">{{ title }}</ion-label>
        </div>
        <div class="subtitleLabelContainer">
          <ion-label class="subtitleLabel">{{ subtitle }}</ion-label>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonLabel } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { VoteConfirmationPageStrings } from "@/utils/LocalizedStrings";

export default defineComponent({
  name: "VoteConfirmation",
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
      title: VoteConfirmationPageStrings.title,
      subtitle: VoteConfirmationPageStrings.subtitle,
    };
  },
  methods: {
    countdown() {
      const timeinterval = setInterval(() => {
        clearInterval(timeinterval);
        this.$router.replace("/remove-card");
      }, 6000);
    },
  },
  ionViewWillEnter() {
    this.countdown();
  },
});
</script>

<style scoped>
.contentContainer {
  text-align: center;
}

.circleContainer {
  text-align: center;
}

.circle {
  margin: 32px auto;
  position: relative;
  background: #00D5BD;
  border-radius: 50%;
  width: 72px;
  height: 72px;
}

.checkmark {
  position: absolute;
  transform: rotate(45deg) translate(-50%, -50%);
  left: 35%;
  top: 45%;
  height: 32px;
  width: 16px;
  border-bottom: 5px solid #ffffff;
  border-right: 5px solid #ffffff;
}

.titleLabel {
  font-size: x-large;
  font-weight: bold;
}

.subtitleLabelContainer {
  margin-top: 16px;
}

.subtitleLabel {
  font-size: 16px;
  font-weight: 600;
  color: var(--tigm-border-color);
}
</style>