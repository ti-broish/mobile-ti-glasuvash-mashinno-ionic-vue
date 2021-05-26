<template>
  <ion-page>
    <ion-content>
        <p>parties</p>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Parties',
  components: {
    IonContent,
    IonPage
  },
});
</script>

<style scoped>

</style>