<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <page-header-component :pTitle="currentVoteOption.name"></page-header-component>
        <!-- parties -->
        <div class="candidatesContainer">
          <div class="candidatesList">
            <div v-for="candidates in currentPageCandidates()" :key="candidates.id">
              <candidates-component :pCandidates="candidates" :pSelectedCandidates="selectedCandidates" :pNotaId="notaId"
                @select-candidates="didSelectCandidates($event)"></candidates-component>
            </div>
            <div class="buttonsContainer">
              <ion-button class="pageButton" fill="clear" @click="didPressPrevPage()" v-show="page > 0">{{ prevPageTitle
              }}</ion-button>
              <ion-button class="pageButton nextPageButton" fill="clear" @click="didPressNextPage()"
                v-show="hasMorePages">{{ nextPageTitle }}</ion-button>
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
import { stringifyQuery, useRouter } from "vue-router";
import { Candidates } from "@/store/candidates/types";
import { CandidatesBuilder } from "@/store/candidates/candidates-builder";
import { LocalStorageKeys } from "@/store/local-storage-keys";
import {
  CandidatesPageStrings,
  PartiesPageStrings,
  VoteConfirmationPageStrings,
  VoteOptionsPageStrings,
} from "@/utils/LocalizedStrings";

import PageHeaderComponent from "@/components/PageHeaderComponent.vue";
import CandidatesComponent from "@/components/CandidatesComponent.vue";
import { VoteOptionData } from "../store/vote-option-data";

export default defineComponent({
  name: "Candidates-Component",
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
      candidates: [] as Array<Candidates>,
      selectedCandidates: {} as Candidates,
      page: 0,
      hasMorePages: true,
      itemsPerPage: 15,
      prevPageTitle: PartiesPageStrings.prevPage,
      nextPageTitle: PartiesPageStrings.nextPage,
      nextStepButtonTitle: "",
      notaId: -1,
      voteOptions: [] as Array<VoteOptionData>,
      currentVoteOption: {} as VoteOptionData | null
    };
  },
  mounted() {
    this.loadSelectedVoteOptions();
    this.loadCandidates();
  },
  watch: {
    selectedCandidates: "updateNextStepButtonTitle"
  },
  methods: {
    hasAllVoteOptionsData() {
      const notFilledAndNoData = this.voteOptions.filter(option => option.filled == false && option.data == null)[0];
      if (notFilledAndNoData) {
        return false;
      }
      
      const notFilled = this.voteOptions.filter(option => option.filled == false)[0];
      if (notFilled) {
        return false;
      }

      return true;
    },
    updateNextStepButtonTitle() {
      if (this.hasAllVoteOptionsData()) {
        this.nextStepButtonTitle = PartiesPageStrings.buttonPreview;
      } else {
        this.nextStepButtonTitle = CandidatesPageStrings.nextStep;
      }
    },
    loadSelectedVoteOptions() {
      const storedVoteOptions = localStorage.getItem(LocalStorageKeys.selectedVoteOptions);

      if (storedVoteOptions) {
        this.voteOptions = JSON.parse(storedVoteOptions);

        const voteOption = this.voteOptions.filter(option => option.filled == false)[0];
        if (voteOption) {
          this.currentVoteOption = voteOption;

          const data = voteOption.data;
          if (data) {
            this.selectedCandidates = data;
            this.saveVoteOptionData(data);
          }

          this.updateNextStepButtonTitle();
        } else {
          // TODO: - implement
        }
      }
    },
    loadCandidates() {
      const builder = new CandidatesBuilder();
      this.candidates = builder.makeCandidates();
      this.notaId = this.candidates[this.candidates.length - 1].id;
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
    saveVoteOptionData(candidates: Candidates) {
      const option = this.currentVoteOption as VoteOptionData;
      if (option) {
        option.data = candidates;
        option.filled = option.data !== null;

        localStorage.setItem(LocalStorageKeys.selectedVoteOptions, JSON.stringify(this.voteOptions));
      }
    },
    didSelectCandidates(candidates: Candidates) {
      this.saveVoteOptionData(candidates);
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
      const currentVoteOptionFilled = this.currentVoteOption?.filled;
      if (currentVoteOptionFilled) {
        if (this.nextStepButtonTitle == CandidatesPageStrings.nextStep) {
          this.$router.go(0);
        } else {
          this.$router.replace("/preview");
        }
      } else {
        this.$router.push("/empty-vote");
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