<template>
  <ion-page>
    <ion-content>
      <div id="pageHeader">
        <p id="rik">{{ electionRegionText }} 310000000 {{ sectionText }} 000000035</p>
        <p id="title">{{ title }}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import { PartiesPageStrings } from '@/utils/LocalizedStrings';


export default defineComponent({
  name: 'Parties',
  components: {
    IonContent,
    IonPage
  }, 
  data() {
    return {
      electionRegionText: PartiesPageStrings.electionRegion, 
      sectionText: PartiesPageStrings.section, 
      title: PartiesPageStrings.title
    }
  }
});
</script>

<style scoped>

#rik {
  font-size: 16px;
  font-weight: bold;
  color: var(--tigm-text-color);
}

#title {
  font-size: x-large;
  font-weight: bold;
  color: var(--tigm-text-color);
}

</style>