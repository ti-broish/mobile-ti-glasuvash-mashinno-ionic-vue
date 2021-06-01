<template>
  <div class="selectedImageBox">
    <img class="selectedImage" src="/assets/close.svg" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SelectedBoxComponent",
});
</script>

<style scoped>
.selectedImageBox {
  width: 40px;
  height: 40px;
  text-align: center;
  margin-top: -40px;
}

.selectedImage {
  margin-top: 8px auto;
}
</style>
