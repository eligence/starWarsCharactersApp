<script>
import Card from "@/components/Card.vue";

const SWAPI_ROOT = "https://swapi.dev/api/"

export default {
  components: {Card},
  data() {
    return {
      characters: [],
      loading: false
    }
  },
  computed: {
    placeholders() {
      return 4 + this.characters.length % 4
    }
  },
  methods: {
    fetchCharacters: function (page) {
      this.loading = true;
      fetch(page ? page : SWAPI_ROOT + 'people/')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          return response.json()
        })
        .then(response => {
          this.characters = [
            ...this.characters,
            ...response.results.map(({name, url}) => {
              return {
                name,
                id: url.split('/').filter(el => parseInt(el))
              }
            })
          ]
          if (response.next) {
            this.fetchCharacters(response.next)
          } else {
            this.loading = false
          }
        });
    }
  },
  mounted() {
    this.fetchCharacters()
  }
}

</script>

<template>
  <div class="wrapper grid grid-cols-4 gap-4 relative">
    <Card v-for="(character, id) in characters" :key="id" :data="character"/>
    <Card v-if="loading" v-for="n in placeholders" :key="`placeholder-${n}`"/>
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100%;
  min-width: 100%;
}
</style>
