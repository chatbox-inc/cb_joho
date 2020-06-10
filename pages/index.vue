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
      <p>alertFrequency : {{ alertFrequency }} minutes</p>
    </div>
  </div>
</template>

<script>
import aws from 'aws-sdk'
import dotenv from 'dotenv'
export default {
  components: {},
  data() {
    return {
      currenTime: null,
      canAlert: true,
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

    playSound(currentTime) {
      dotenv.config()
      const accesskey = process.env.AWS_ACCESS_KEY_ID
      const secretKey = process.env.AWS_SECRET_ACCESS_KEY
      const regionName = process.env.AWS_DEFAULT_REGION

      aws.config.update({
        accessKeyId: accesskey,
        secretAccessKey: secretKey,
        region: regionName
      })
      console.log('access:', accesskey)
      console.log('region:', regionName)
      console.log('secret:', secretKey)
      const polly = new aws.Polly()
      const params = {
        OutputFormat: 'mp3',
        Text: currentTime,
        VoiceId: 'Mizuki',
        SampleRate: '22050',
        TextType: 'text',
        LanguageCode: 'ja-JP'
      }

      polly.synthesizeSpeech(params, function(err, data) {
        if (err) {
          console.log(err, err.stack)
        } else {
          console.log(data)
          const audioCtx = new AudioContext()
          const source = audioCtx.createBufferSource()
          source.buffer = data.AudioStream
          source.connect(audioCtx.destination)
          source.start()
        }
      })
    },

    checkAlert(currentTime) {
      const eachTime = currentTime.split(':')
      const minutes = eachTime[1]
      if (
        minutes % this.alertFrequency === 0 ||
        minutes === this.alertFrequency
      ) {
        if (this.canAlert) this.playSound(currentTime)
        this.canAlert = false
      } else {
        this.canAlert = true
      }

      console.log(this.canAlert)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
