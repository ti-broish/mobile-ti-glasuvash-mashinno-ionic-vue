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
      <div class="idItemContainer">
        <!-- <div v-if="candidates.id < 10">
          <span class="idItem" v-bind:class="{ idItemSelected: isSelected() }"
            >0{{ candidates?.id }}
          </span>
        </div> -->
        <div v-if="candidates.id === notaId">
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
          :pHasValue="selectedCandidates?.id !== notaId"
          v-show="isSelected()"
        ></selected-box-component>
      </div>
      <span class="nameItem" v-bind:class="{ nameItemSelected: isSelected() }"
        >{{ candidates?.first }}<br />{{ candidates?.second }}</span
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
    pNotaId: Number, // NOTA - None of the above
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
      notaId: this.pNotaId ?? -1
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
    pSelectedCandidates: "reload",
  },
});
</script>

<style scoped>
.componentContainer {
  margin: auto;
  border-bottom: 1px solid var(--tigm-border-color);
  min-height: 60px;
  background: white;
}

.componentContainerSelected {
  background: var(--tigm-button-background-color);
}

.ionItem {
  --padding-start: 0px;
  --inner-padding-end: 0px;
}

.ionItemSelected {
  --background: var(--tigm-button-background-color);
}

.idItemSelected {
  color: white;
  border: 2px solid white;
}

.idItemContainer {
  min-width: 10%;
  width: 10%;
}

.partyItem {
  margin-top: 8px;
  margin-bottom: 8px;
  padding-left: 8px;
  padding-right: 4px;
  font-size: 13px;
  font-weight: 600;
  min-width: 50%;
  width: 50%;
  text-align: left;
}

.nameItem {
  margin-top: 8px;
  margin-bottom: 8px;
  padding-left: 4px;
  padding-right: 8px;
  font-size: 13px;
  font-weight: 600;
  min-width: 40%;
  width: 40%;
  text-align: right;
}

.nameItemSelected {
  color: white;
}
</style>
