<template>
  <div class="componentContainer">
    <span class="spanBox">{{ party?.id }}</span>
    <span class="spanText">{{ party?.displayName }}</span>
    <ion-button class="button" fill="clear" @click="didSelectParty()"></ion-button>
  </div>
</template>

<script lang="ts">
import { Party } from "@/store/parties/types";
import { IonButton } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PartyComponent",
  props: {
    pParty: Object,
  },
  emits: {
    "select-party": null,
  },
  components: {
    IonButton,
  },
  data() {
    return {
      party: this.pParty ?? null,
    };
  },
  methods: {
    didSelectParty() {
      console.log("didSelectParty: ", this.party);
    }
  }
});
</script>

<style scoped>
.componentContainer {
  border-right: 1px solid var(--tigm-text-color);
  border-bottom: 1px solid var(--tigm-text-color);
  height: 70px;
}

.button {
  width: 100%;
  height: 100%;
  margin-top: -48px;
}

.spanBox {
  display: inline-block;
  margin-left: 8px;
  margin-top: 8px;
  font-size: 16px;
  color: var(--tigm-text-color);
  border: 2px solid var(--tigm-text-color);
  border-radius: 4px;
  width: 40px;
  height: 40px;
  text-align: center;
  padding-top: 8px;
}

.spanText {
  margin-left: 8px;
  font-size: 16px;
  color: var(--tigm-text-color);
}
</style>
