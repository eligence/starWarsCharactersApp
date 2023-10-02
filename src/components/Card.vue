<script>
import CharacterInfo from "@/components/CharacterInfo.vue";
import AlertBox from "@/components/AlertBox.vue";
export default {
  components: {AlertBox, CharacterInfo},
  props: {
    data: {
      type: Object,
      default: () => {
        return {name: '', id: ''}
      }
    }
  },
  data() {
    return {
      cardClasses: '',
      showInfo: false,
      isModalActive: this.$showModal.value
    }
  },
  methods: {
    toggleInfo(show) {
      this.showInfo = show;
      this.$showModal.set(show)
    }
  }
}
</script>

<template>
  <div
      @click.stop="toggleInfo(true)"
      class="card bg-white dark:bg-slate-800 p-4 ring-1 ring-slate-900/5 rounded-lg shadow-lg max-w-xs w-full h-28 relative hover:cursor-pointer"
      :class="[!data.name || isModalActive ? 'pointer-events-none' : 'hover:dark:bg-slate-700']
  ">
    <h3 v-if="data.name">{{data.name}}</h3>
    <span v-else class="block animate-pulse h-5 w-9/12 bg-slate-700 rounded"></span>
    <CharacterInfo
        v-if="showInfo"
        :data="data"
        @modal-close="toggleInfo(false)"
        @click.stop
    />
  </div>
</template>

<style scoped>
</style>
