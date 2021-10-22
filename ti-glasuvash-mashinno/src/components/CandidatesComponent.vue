<template>
  <div
    class="componentContainer"
    v-bind:class="{ componentContainerSelected: isSelected() }"
  >
    <ion-item
      class="ionItem"
      v-bind:class="{ ionItemSelected: isSelected() }"
      @click="didSelectCandidates()"
      lines="none"
    >
      <span
        class="partyItem"
        v-bind:class="{ nameItemSelected: isSelected() }"
        >{{ candidates?.party }}</span
      >
      <div>
        <div v-if="candidates.id < 10">
          <span class="idItem" v-bind:class="{ idItemSelected: isSelected() }"
            >0{{ candidates?.id }}
          </span>
        </div>
        <div v-else-if="candidates.id === 36">
          <span class="idItem" v-bind:class="{ idItemSelected: isSelected() }">
          </span>
        </div>
        <div v-else>
          <span
            class="idItem"
            v-bind:class="{ idItemSelected: isSelected() }"
            >{{ candidates?.id }}</span
          >
        </div>
        <selected-box-component
          :pHasValue="selectedCandidates?.id !== 36"
          v-show="isSelected()"
        ></selected-box-component>
      </div>
      <span class="nameItem" v-bind:class="{ nameItemSelected: isSelected() }"
        >{{ candidates?.president }}<br />{{ candidates?.vice_president }}</span
      >
    </ion-item>
  </div>
</template>

<script lang="ts">
import { IonItem } from "@ionic/vue";
import { defineComponent } from "vue";

import SelectedBoxComponent from "@/components/SelectedBoxComponent.vue";

export default defineComponent({
  name: "CandidatesComponent",
  props: {
    pCandidates: Object,
    pSelectedCandidates: Object,
  },
  emits: {
    "select-candidates": null,
  },
  components: {
    IonItem,
    SelectedBoxComponent,
  },
  data() {
    return {
      candidates: this.pCandidates ?? null,
      selectedCandidates: this.pSelectedCandidates ?? null,
    };
  },
  methods: {
    reload() {
      this.selectedCandidates = null;

      if (this.candidates?.id === this.pSelectedCandidates?.id) {
        this.selectedCandidates = this.candidates;
      }
    },
    isSelected() {
      return this.candidates?.id === this.pSelectedCandidates?.id;
    },
    didSelectCandidates() {
      if (this.candidates?.id === this.pSelectedCandidates?.id) {
        this.$emit("select-candidates", null);
      } else {
        this.$emit("select-candidates", this.candidates);
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
  /* border-bottom: 1px solid var(--tigm-border-color); */
  border: 1px solid var(--tigm-border-color);
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

.partyItem {
  margin-top: 16px;
  margin-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 14px;
  font-weight: 600;
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
