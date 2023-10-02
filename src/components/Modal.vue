<script>

export default {
  props: {
    xClose: Boolean,
    default: false
  },
  data() {
    return {
      msg: this.$error.msg.value,
      close: this.$error.setMessage
    }
  }
}
</script>

<template>
  <div class="wrapper flex flex-col items-center justify-center text-xl">
    <div class="inner relative bg-slate-800 p-6 ring-1 ring-slate-900/5 rounded-lg shadow-lg h-28">
      <button v-if="xClose" @click="$emit('close')" class="absolute top-3 right-3 pointer-events-auto pointer-events-auto">[x]</button>
      <div class="flex flex-col items-center justify-between">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--vt-c-text-light-2);
}

.inner {
  height: min-content;
  width: 800px;
  max-width: 90%;
}

svg {
  width: 100px;
  color: var(--vt-c-divider-dark-1);
  fill: currentColor;
}
</style>
