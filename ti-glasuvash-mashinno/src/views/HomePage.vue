<template>
  <ion-page>
    <ion-content>
      <div class="contentContainer">
        <div id="titleContainer">
          <ion-label id="titleLabel">{{ title }}</ion-label>
        </div>
        <div id="subtitleContainer">
          <p>{{ subtitle }}</p>
        </div>
        <div id="cardContainer">
          <div id="box">
            <div id="boxHeader"></div>
            <div id="box1"></div>
            <div id="cardButtonContainer">
              <ion-button
                id="cardButton"
                @click="() => router.replace('/parties')"
              >
                {{ cardButtonTitle }}
              </ion-button>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonLabel, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { HomePageStrings } from "@/utils/LocalizedStrings";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    IonLabel, 
    IonButton
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  data() {
    return {
      title: HomePageStrings.title,
      subtitle: HomePageStrings.subtitle,
      cardButtonTitle: HomePageStrings.cardButtonTitle,
    };
  },
});
</script>

<style scoped>
#titleContainer {
  width: 100%;
  max-width: 1024px;
  margin: 32px auto;
  text-align: center;
}

#titleLabel {
  font-size: x-large;
  font-weight: bold;
  color: var(--tigm-text-color);
}

#subtitleContainer {
  margin: 32px auto;
  width: 100%;
  max-width: 1024px;
}

#subtitleContainer p {
  font-size: 16px;
  line-height: 22px;
  color: var(--tigm-text-color);
  text-align: center;
}

#cardContainer {
  margin: 16px auto;
  width: 75%;
  max-width: 1024px;
  text-align: center;
  border: var(--tigm-border-color);
}

#box {
  margin: auto;
  width: 100%;
  height: 350px;
  border: 2px solid var(--tigm-border-color);
  border-radius: 4px;
}

#boxHeader {
  margin: 32px auto;
  width: 25%;
  border: 4px solid var(--tigm-border-color);
  border-radius: 4px;
}

#box1 {
  margin-top: 32px;
  margin-left: 32px;
  margin-right: 32px;
  height: 200px;
  border: 2px solid var(--tigm-border-color);
  border-radius: 4px;
}

#cardButtonContainer {
  margin-top: 16px;
  /*
  position: absolute;
  left: 0;
  right: 0;
  top: 80%;
  transform: translateY(-80%);
  */
}

#cardButton {
  font-size: 16px;
  --background: var(--tigm-border-color);
  --background-activated: var(--tigm-button-activated-color);
}
</style>