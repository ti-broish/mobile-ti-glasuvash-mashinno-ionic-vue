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
import { LocalStorageKeys } from "@/store/local-storage-keys";
import { VoteOptionsPageStrings } from "@/utils/LocalizedStrings";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const router = useRouter();

    useBackButton(10, () => {
      if (router.currentRoute.value.path === "/preview-vote-option") {
        router.replace("/vote-options");
      } else if (router.currentRoute.value.path === "/vote-options") {
        router.replace("/home");
      } else if (router.currentRoute.value.path === "/home") {
        App.exitApp();
      } else {
        const storedVoteOption =
          localStorage.getItem(LocalStorageKeys.selectedVoteOption) ?? "";

        if (storedVoteOption == VoteOptionsPageStrings.option1) {
          if (router.currentRoute.value.path === "/parties") {
            router.replace("/candidates");
          } else if (router.currentRoute.value.path === "/preview") {
            router.replace("/parties");
          }
        } else if (storedVoteOption == VoteOptionsPageStrings.option2) {
          if (router.currentRoute.value.path === "/preview") {
            router.replace("/candidates");
          }
        } else if (storedVoteOption == VoteOptionsPageStrings.option3) {
          if (router.currentRoute.value.path === "/preview") {
            router.replace("/parties");
          }
        }
      }
    });
  },
});
</script>