<template>
  <div v-if="currenTime" class="container mx-auto pt-12 font-mono">
    <p class="lg:text-left  md:text-4xl sm:text-sm text-center">
      {{ getDate }}
    </p>
    <time
      class="text-huge-0 text-center md:text-center xl:text-huge-3 md:text-huge-2 sm:text-huge-0 leading-none select-none font-bold mt-3 block "
    >
      {{ currenTime }}
    </time>
    <div
      class="w-full flex pt-8 lg:justify-start sm:justify-center md:justify-end"
    >
      <div class="px-3">
        <label for="mode">音声お知らせ</label>
        <input id="mode" v-model="alertMode" type="checkbox" />
      </div>
      <div class="px-3">
        <label for="alertOn">お知らせ頻度</label>
        <select
          id="alertOn"
          v-model="alertFrequency"
          class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="30">30分</option>
          <option value="00">60分</option>
        </select>
      </div>
    </div>

    <div class="boreder mt-10">
      <h2 class="text-xl">Debug</h2>
      <p>alertMode : {{ alertMode }}</p>
      <p>alertFrequency : {{ alertFrequency }} seconds</p>
    </div>
  </div>
</template>

<script>
import sound from '@/assets/sound/test.mp3'
export default {
  components: {},
  data() {
    return {
      currenTime: null,
      alertMode: false,
      alertFrequency: 30
    }
  },
  computed: {
    getDate() {
      const date = this.$dayjs().format('YYYY年MM月DD日dddd')
      return date
    }
  },
  mounted() {
    this.currenTime = this.setTime()
    setInterval(() => this.setTime(), 1000)
  },
  methods: {
    setTime() {
      if (this.alertMode) {
        this.checkAlert(this.currenTime)
      }
      this.currenTime = this.$dayjs().format('HH:mm:ss')
    },

    playSound() {
      const audio = new Audio(sound)
      audio.play()
    },

    checkAlert(currentTime) {
      const minutes = currentTime.split(':')[2]
      if (
        minutes % this.alertFrequency === 0 ||
        minutes === this.alertFrequency
      ) {
        this.playSound()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
