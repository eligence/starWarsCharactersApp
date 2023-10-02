<script>
import Modal from "@/components/Modal.vue";
export default {
  components: {Modal},
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      ...this.data,
      height: '',
      homeworld: '',
      films: [],
      filmCount: 1
    }
  },
  methods: {
    cmToFt: function (n) {
      const realFeet = ((n * 0.393700) / 12);
      const feet = Math.floor(realFeet);
      const inches = Math.round(10 * ((realFeet - feet) * 12) / 10) ;

      return feet + "'" + inches + '"';
    },
    doFetch: async function (url, handler) {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const resJson = await response.json();
        handler(resJson)
      }
    },
    handleHomeworldFetch: function ({name}) {
      this.homeworld = name;
    },
    handleCharacterFetch:  function (response) {
      this.height = this.cmToFt(response.height);
      this.filmCount = response.films.length;

      this.doFetch(response.homeworld, this.handleHomeworldFetch);

      response.films.forEach(film => {
        this.doFetch(film, this.handleFilmFetch);
      })
    },
    handleFilmFetch: function ({title}) {
      this.films.push(title);
    }
  },
  mounted() {
    if (this.$requestCounter.count.value !== 5) {
      this.doFetch("https://swapi.dev/api/people/" + this.id + '/', this.handleCharacterFetch);
      this.$requestCounter.increment();

    } else {
      setTimeout(() => {
        try {
          throw new Error('We felt a great disturbance in the Force!');

        } catch ({message}) {
          this.$requestCounter.reset();
          this.$error.setMessage(message)
          this.$emit('modal-close')
        }
      }, 1000);
    }
  }
}
</script>

<template>
  <Modal @close="$emit('modal-close')" :x-close="true">
    <h3>{{name}}</h3>
    <h4 class="mt-6 mb-2">Height</h4>
    <p>
      {{height}}
      <span v-if="!height" class="block animate-pulse h-4 w-7 bg-slate-700 rounded"></span>
    </p>
    <h4 class="mt-6 mb-2">Homeworld</h4>
    <p>
      {{homeworld}}
      <span v-if="!homeworld" class="block animate-pulse h-4 w-10 bg-slate-700 rounded"></span>
    </p>
    <h4 class="mt-6 mb-2">Films</h4>
    <ul class="text-center">
      <li v-for="film in films">{{film}}</li>
      <li v-if="films.length != filmCount" class="block animate-pulse h-4 w-48 bg-slate-700 rounded"></li>
    </ul>
  </Modal>

</template>

<style scoped>

</style>
