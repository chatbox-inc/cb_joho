<template>
  <div class="container mx-auto pt-12">
    <time
      class="text-huge leading-none select-none font-bold mt-3 block text-shadow font-mono"
    >
      {{ currenTime }}
    </time>
    <p class="text-right text-4xl">{{ getDate }}</p>
    <button
      class="bg-blue-400 p-5 rounded text-white text-lg hover:bg-blue-600"
      @click.prevent="playSound"
    >
      test sound
    </button>
  </div>
</template>

<script>
import sound from '@/assets/sound/test.mp3'
export default {
  components: {},
  data() {
    return {
      currenTime: null
    }
  },
  computed: {
    getDate() {
      const date = this.$dayjs().format('YYYY年MM月DD日dddd')
      return date
    }
  },
  mounted() {
    this.currenTime = this.setDate()
    setInterval(() => this.setDate(), 1000)
  },
  methods: {
    setDate() {
      this.currenTime = this.$dayjs().format('HH:mm:ss')
    },

    playSound() {
      const audio = new Audio(sound)
      audio.play()
    }
  }
}
</script>

<style lang="scss" scoped>
.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.text-huge {
  font-size: 16rem;
}
</style>
