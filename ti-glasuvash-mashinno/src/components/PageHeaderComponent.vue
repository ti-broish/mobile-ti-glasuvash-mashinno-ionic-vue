<template>
  <div class="pageHeader">
    <ion-label class="pageHeaderSection">
      {{ electionRegionText }} 310000000 {{ sectionText }} 000000035
    </ion-label>
    <br />
    <ion-label class="pageHeaderTitle">{{ title }}</ion-label>
  </div>
</template>

<script lang="ts">
import { IonLabel } from "@ionic/vue";
import { defineComponent } from "vue";
import { PageHeaderStrings } from "@/utils/LocalizedStrings";

export default defineComponent({
  name: "PageHeaderComponent",
  props: {
    pTitle: String,
  },
  components: {
    IonLabel,
  },
  data() {
    return {
      electionRegionText: PageHeaderStrings.electionRegion,
      sectionText: PageHeaderStrings.section,
      title: this.pTitle ?? PageHeaderStrings.title,
    };
  },
  methods: {
    reload() {
      this.title = this.pTitle ?? PageHeaderStrings.title;
    }
  }, 
  watch: {
    pTitle: "reload",
  },
});
</script>

<style scoped>
.pageHeader {
  padding: 8px;
}

.pageHeaderSection {
  font-size: 16px;
  font-weight: bold;
}

.pageHeaderTitle {
  font-size: 18px;
  font-weight: bold;
}
</style>
