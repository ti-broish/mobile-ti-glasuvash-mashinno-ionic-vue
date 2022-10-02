<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <page-header-component :pTitle="title"></page-header-component>
        <!-- parties -->
        <div class="candidatesContainer">
          <div class="candidatesList">
            <div
              v-for="candidates in currentPageCandidates()"
              :key="candidates.id"
            >
              <candidates-component
                :pCandidates="candidates"
                :pSelectedCandidates="selectedCandidates"
                :pNotaId="notaId"
                @select-candidates="didSelectCandidates($event)"
              ></candidates-component>
            </div>
            <div class="buttonsContainer">
              <ion-button
                class="pageButton"
                fill="clear"
                @click="didPressPrevPage()"
                v-show="page > 0"
                >{{ prevPageTitle }}</ion-button
              >
              <ion-button
                class="pageButton nextPageButton"
                fill="clear"
                @click="didPressNextPage()"
                v-show="hasMorePages > 0"
                >{{ nextPageTitle }}</ion-button
              >
            </div>
          </div>
        </div>
        <!-- footer -->
        <div class="pageFooter">
          <ion-button class="nextStepButton" @click="handleNextStepButton()">{{
            nextStepButtonTitle
          }}</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { Candidates } from "@/store/candidates/types";
import { CandidatesBuilder } from "@/store/candidates/candidates-builder";
import { LocalStorageKeys } from "@/store/local-storage-keys";
import {
  CandidatesPageStrings,
  PartiesPageStrings,
  VoteOptionsPageStrings,
} from "@/utils/LocalizedStrings";

import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import CandidatesComponent from "@/components/CandidatesComponent.vue";

export default defineComponent({
  name: "Candidates",
  components: {
    IonContent,
    IonPage,
    IonButton,
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
      prevPageTitle: PartiesPageStrings.prevPage,
      nextPageTitle: PartiesPageStrings.nextPage,
      nextStepButtonTitle: "",
      notaId: -1,
    };
  },
  mounted() {
    this.loadSelectedVoteOption();
    this.loadCandidates();
  },
  methods: {
    getStoredVoteOption() {
      const storedVoteOption = localStorage.getItem(
        LocalStorageKeys.selectedVoteOption
      );

      return storedVoteOption ?? ""
    }, 
    loadSelectedVoteOption() {
      const storedVoteOption = this.getStoredVoteOption();
      this.title = storedVoteOption;

      if (storedVoteOption == VoteOptionsPageStrings.option2) {
        this.nextStepButtonTitle = PartiesPageStrings.buttonPreview;
      } else {
        this.nextStepButtonTitle = CandidatesPageStrings.nextStep;
      }
    },
    loadCandidates() {
      const builder = new CandidatesBuilder();
      this.candidates = builder.makeCandidates();
      this.notaId = this.candidates[this.candidates.length - 1].id;
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
    didPressPrevPage() {
      this.page -= 1;

      if (this.page < 0) {
        this.page = 0;
      }
    },
    didPressNextPage() {
      this.page += 1;
    },
    handleNextStepButton() {
      localStorage.setItem(
        LocalStorageKeys.candidates,
        JSON.stringify(this.selectedCandidates)
      );
      
      const storedVoteOption = this.getStoredVoteOption();
      if (storedVoteOption == VoteOptionsPageStrings.option2) {
        this.$router.replace("/preview");
      } else {
        this.$router.replace("/parties");
      }
    },
  },
});
</script>

<style scoped>
.container {
  margin: 4px;
  padding-top: max(var(--ion-safe-area-top), 22px);
}

.candidatesContainer {
  flex-direction: row;
  display: flex;
  margin: 8px;
  border: 4px solid var(--tigm-border-color);
}

.candidatesList {
  min-width: 100%;
  width: 100%;
}

.buttonsContainer {
  /* border-right: 4px solid var(--tigm-border-color); */
  width: 100%;
  height: 60px;
}
</style>