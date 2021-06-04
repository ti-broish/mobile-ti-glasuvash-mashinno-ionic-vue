<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, useBackButton } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { App } from "@capacitor/app";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const router = useRouter();

    useBackButton(10, () => {
      if (router.currentRoute.value.path === "/parties") {
        router.replace("/home");
      } else if (router.currentRoute.value.path === "/preview") {
        router.replace("/parties");
      } else {
        App.exitApp();
      }
    });
  },
});
</script>