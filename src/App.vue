<script setup>
import CharacterGrid from "@/components/CharacterGrid.vue";
import AlertBox from "@/components/AlertBox.vue";
</script>

<template>
  <main>
    <AlertBox
      v-if="$error.msg.value"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
    />
    <CharacterGrid v-show="!$error.msg.value"/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
</style>
