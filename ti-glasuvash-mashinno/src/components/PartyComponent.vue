<template>
  <div
    class="componentContainer"
    v-bind:class="{ componentContainerSelected: isSelected() }"
  >
    <ion-item
      class="ionItem"
      v-bind:class="{ ionItemSelected: isSelected() }"
      @click="didSelectParty()"
      lines="none"
    >
      <div>
        <!-- <div v-if="party.id < 10">
          <span class="idItem" v-bind:class="{ idItemSelected: isSelected() }"
            >0{{ party?.id }}
          </span>
        </div> -->
        <div v-if="party.id === notaId">
          <span class="idItem" v-bind:class="{ idItemSelected: isSelected() }">
          </span>
        </div>
        <div v-else>
          <span
            class="idItem"
            v-bind:class="{ idItemSelected: isSelected() }"
            >{{ party?.id }}</span
          >
        </div>
        <selected-box-component
          :pHasValue="selectedParty?.id !== notaId"
          v-show="isSelected()"
        ></selected-box-component>
      </div>
      <span
        class="nameItem"
        v-bind:class="{ nameItemSelected: isSelected() }"
        >{{ party?.name }}</span
      >
    </ion-item>
  </div>
</template>

<script lang="ts">
import { IonItem } from "@ionic/vue";
import { defineComponent } from "vue";

import SelectedBoxComponent from "@/components/SelectedBoxComponent.vue";

export default defineComponent({
  name: "PartyComponent",
  props: {
    pParty: Object,
    pSelectedParty: Object, 
    pNotaId: Number, // NOTA - None of the above
  },
  emits: {
    "select-party": null,
  },
  components: {
    IonItem,
    SelectedBoxComponent,
  },
  data() {
    return {
      party: this.pParty ?? null,
      selectedParty: this.pSelectedParty ?? null,
      notaId: this.pNotaId ?? -1
    };
  },
  methods: {
    reload() {
      this.selectedParty = null;

      if (this.party?.id === this.pSelectedParty?.id) {
        this.selectedParty = this.party;
      }
    },
    isSelected() {
      return this.party?.id === this.selectedParty?.id;
    },
    didSelectParty() {
      if (this.party?.id === this.selectedParty?.id) {
        this.$emit("select-party", null);
      } else {
        this.$emit("select-party", this.party);
      }
    },
  },
  watch: {
    pSelectedParty: "reload",
  },
});
</script>

<style scoped>
.componentContainer {
  /* border-right: 1px solid var(--tigm-border-color); */
  border-bottom: 1px solid var(--tigm-border-color);
  min-height: 60px;
  background: white;
}

.componentContainerSelected {
  background: var(--tigm-button-background-color);
}

.ionItem {
  --padding-start: 8px;
}

.ionItemSelected {
  --background: var(--tigm-button-background-color);
}

.idItemSelected {
  color: white;
  border: 2px solid white;
}

.nameItem {
  margin-top: 16px;
  margin-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 14px;
  font-weight: 600;
}

.nameItemSelected {
  color: white;
}
</style>
