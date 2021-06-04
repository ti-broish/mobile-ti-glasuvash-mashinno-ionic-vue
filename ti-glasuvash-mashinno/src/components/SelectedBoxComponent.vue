<template>
  <div v-if="pHasValue">
    <div class="selectedImageBox">
      <img class="selectedImage" src="/assets/close.svg" />
    </div>
  </div>
  <div v-else>
    <div class="selectedImageBoxNoValue">
      <img class="selectedImage" src="/assets/close.svg" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SelectedBoxComponent",
  props: {
    pHasValue: Boolean,
  },
});
</script>

<style scoped>
.selectedImageBox {
  width: 35px;
  height: 35px;
  text-align: center;
  margin-top: -35px;
}

.selectedImageBoxNoValue {
  width: 35px;
  height: 35px;
  text-align: center;
  margin-top: -39px;
}

.selectedImage {
  margin-top: 8px auto;
}
</style>
