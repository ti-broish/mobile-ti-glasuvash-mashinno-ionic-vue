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
        <div v-if="party.id < 10">
          <span class="spanBox" v-bind:class="{ spanBoxSelected: isSelected() }"
            >0{{ party?.id }}
          </span>
        </div>
        <div v-else-if="party.id === 31">
          <span
            class="spanBox"
            v-bind:class="{ spanBoxSelected: isSelected() }"
          ></span>
        </div>
        <div v-else>
          <span
            class="spanBox"
            v-bind:class="{ spanBoxSelected: isSelected() }"
            >{{ party?.id }}</span
          >
        </div>
        <div id="boxX" v-show="isSelected()">
          <span id="spanBoxX">x</span>
        </div>
      </div>
      <span
        class="spanText"
        v-bind:class="{ spanTextSelected: isSelected() }"
        >{{ party?.name }}</span
      >
    </ion-item>
  </div>
</template>

<script lang="ts">
import { IonItem } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PartyComponent",
  props: {
    pParty: Object,
    pSelectedParty: Object,
  },
  emits: {
    "select-party": null,
  },
  components: {
    IonItem,
  },
  data() {
    return {
      party: this.pParty ?? null,
      selectedParty: this.pSelectedParty ?? null,
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
  border-right: 1px solid var(--tigm-text-color);
  border-bottom: 1px solid var(--tigm-text-color);
  min-height: 60px;
  background: white;
}

.componentContainerSelected {
  background: var(--tigm-text-color);
}

.ionItem {
  --padding-start: 8px;
}

.ionItemSelected {
  --background: var(--tigm-text-color);
}

.spanBox {
  display: inline-block;
  margin-top: 8px;
  font-size: 14px;
  color: var(--tigm-text-color);
  border: 2px solid var(--tigm-text-color);
  border-radius: 4px;
  width: 40px;
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  text-align: center;
  padding-top: 8px;
}

.spanBoxSelected {
  color: white;
  border: 2px solid white;
}

#boxX {
  width: 40px;
  height: 40px;
  text-align: center;
  margin-top: -40px;
}

#spanBoxX {
  font-size: 30px;
  color: white;
}

.spanText {
  padding: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--tigm-text-color);
}

.spanTextSelected {
  color: white;
}
</style>
