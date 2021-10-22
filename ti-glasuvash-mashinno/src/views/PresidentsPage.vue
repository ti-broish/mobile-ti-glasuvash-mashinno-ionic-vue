<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <page-header-component :pTitle="title"></page-header-component>
        <!-- parties -->
        <div class="presidentsContainer">
          <div class="presidentsList">
            <div
              v-for="candidates in currentPageCandidates()"
              :key="candidates.id"
            >
              <candidates-component
                :pCandidates="candidates"
                :pSelectedCandidates="selectedCandidates"
                @select-candidates="didSelectCandidates($event)"
              ></candidates-component>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { Candidates } from "@/store/candidates/types";
import { CandidatesBuilder } from "@/store/candidates/candidates-builder";
import { LocalStorageKeys } from "@/store/local-storage-keys";

import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import CandidatesComponent from "@/components/CandidatesComponent.vue";

export default defineComponent({
  name: "Presidents",
  components: {
    IonContent,
    IonPage,
    // IonButton,
    PageHeaderComponent,
    CandidatesComponent,
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  data() {
    return {
      title: "",
      candidates: [] as Array<Candidates>,
      selectedCandidates: {} as Candidates,
      page: 0,
      hasMorePages: true,
      itemsPerPage: 13,
    };
  },
  mounted() {
    this.loadSelectedVoteOption();
    this.loadCandidates();
  },
  methods: {
    loadSelectedVoteOption() {
      const storedVoteOption = localStorage.getItem(
        LocalStorageKeys.selectedVoteOption
      );
      if (storedVoteOption) {
        this.title = storedVoteOption;
      }
    },
    loadCandidates() {
      const builder = new CandidatesBuilder();
      this.candidates = builder.makeCandidates();
      console.log("candidates: ", this.candidates);
    },
    currentPageCandidates(): Array<Candidates> {
      const result = Array<Candidates>();
      const startIndex = this.itemsPerPage * this.page;
      let itemsCount = this.itemsPerPage * (this.page + 1);

      if (itemsCount > this.candidates.length) {
        itemsCount = this.candidates.length;
      }

      for (let i = startIndex; i < itemsCount; i++) {
        result.push(this.candidates[i]);
      }

      this.hasMorePages =
        this.itemsPerPage * (this.page + 1) < this.candidates.length;

      return result;
    },
    didSelectCandidates(candidates: Candidates) {
      this.selectedCandidates = candidates;
    },
  },
});
</script>

<style scoped>
.container {
  margin: 4px;
  padding-top: max(var(--ion-safe-area-top), 22px);
}

.presidentsContainer {
  flex-direction: row;
  display: flex;
  margin: 8px;
  border: 4px solid var(--tigm-border-color);
}

.presidentsList {
  margin: 20px;
}
</style>