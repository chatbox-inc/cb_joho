<template>
  <div v-if="currenTime" class="main font-mono" :class="actionClass">
    <transition
      name="side-menu"
      enter-active-class="animated slideInRight c-animation__in"
      leave-active-class="animated slideOutRight c-animation__out"
    >
      <the-menu
        v-if="showMenu"
        :frequency="alertFrequency"
        :alert-mode="alertMode"
        @onAlert="onAlert"
        @offAlert="offAlert"
        @closeMenu="closeMenu"
      />
    </transition>
    <the-header
      :frequency="alertFrequency"
      :alert-mode="alertMode"
      :date="currentDate"
      @onAlert="onAlert"
      @offAlert="offAlert"
      @openMenu="openMenu"
    />
    <div class="p-time">
      <time class="lg:hidden text-xl">
        {{ currentDate }}
      </time>
      <time class="text-5xl lg:text-huge">
        {{ currenTime }}
      </time>
    </div>
    <div class="bg-auto p-main__bg bg-sp lg:bg-pc"></div>
    <button v-if="alertMode" class="p-button" @click="playSound">
      音声の再生を始めます
    </button>
  </div>
</template>

<script>
import TheHeader from '@/components/common/TheHeader.vue'
import TheMenu from '@/components/common/TheMenu'

export default {
  components: {
    TheHeader,
    TheMenu
  },
  data() {
    return {
      currenTime: null,
      currentDate: null,
      canAlert: true,
      alertMode: false,
      alertFrequency: 30,
      isMorning: true,
      isAfternoon: false,
      isEvening: false,
      isNight: false,
      showMenu: false
    }
  },
  computed: {
    getDate() {
      const date = this.$dayjs().format('YYYY - MM - DD  dddd')
      return date
    },
    actionClass() {
      return {
        morning: this.isMorning,
        afternoon: this.isAfternoon,
        evening: this.isEvening,
        night: this.isNight
      }
    }
  },
  mounted() {
    this.currenTime = this.setTime()
    this.currentDate = this.setDate()
    this.alertMode = localStorage.alertMode === 'true'
    this.alertFrequency = localStorage.alertFrequency
      ? parseInt(localStorage.alertFrequency, 10)
      : 30
    setInterval(() => this.setTime(), 1000)
  },
  methods: {
    setTime() {
      /*
      if (this.alertMode) {
        this.checkAlert(this.currenTime)
      }
       */
      this.currenTime = this.$dayjs().format('HH:mm:ss')
      this.changeColor(this.currentTime)
    },

    setDate() {
      return this.$dayjs().format('YYYY - MM - DD ddd')
    },
    /*
    playSound(hour, minute) {
      const sound = require(`@/static/sound/${hour}${minute}.mp3`)
      const audio = new Audio(sound)
      audio.play()

    } */
    playSound() {
      const sound = require(`@/static/sound/0000.mp3`)
      const audio = new Audio(sound)
      audio.play()

      setInterval(() => this.testSound(audio, this.currenTime), 1000)
      /*  sound.jsを用いた場合
      if (process.client) {
        require('@/service/sound.js')
        // wa._initialize() // audioContextを新規作成
        // window.wa = wa
        wa.playSilent()
        setInterval(
          () => this.testSound(wa, this.currenTime),
          1000
        )
      }
      */
      /*
      スマホ側で音声が再生しない_インスタンスは同じ
      const context = new (window.AudioContext || window.webkitAudioContext)
      const soundSrc = require(`@/static/sound/slide.mp3`)
      this.alertVoice(context, soundSrc)
      */
    },
    testSound(context, currentTime) {
      if (this.alertMode) {
        const eachTime = currentTime.split(':')
        const minute = eachTime[1]
        console.log(
          `this.alertFrequency: ${this.alertFrequency}, minute: ${minute}`
        )
        // const hour = eachTime[0]
        if (
          minute % this.alertFrequency === 0 ||
          minute === this.alertFrequency
        ) {
          // const soundSrc = require(`@/static/sound/${hour}${minute}.mp3`)
          /* sound.jsを用いる場合
          context.loadFile(soundSrc, function(buffer) {
            context.play(buffer)
          })
          */
          /* スマホ側で音声されない_インスタンスは同じ
          this.alertVoice(context, soundSrc)
          */
          context.play()
        }
      }
    },
    /*
    alertVoice(context, soundSrc) {
      スマホ側で音声されない_インスタンスは同じ
      const source = context.createBufferSource()

      const request = new XMLHttpRequest()
      request.open('GET', soundSrc, true)
      request.responseType = 'arraybuffer'
      request.send()

      request.onload = function() {
        const res = request.response
        context.decodeAudioData(res, function(buf) {
          source.buffer = buf
        })
      }

      source.connect(context.destination)
      source.start(0)
    },
    */
    slideSound() {
      const sound = require(`@/static/sound/slide.mp3`)
      const audio = new Audio(sound)
      audio.play()
    },

    openMenu() {
      this.showMenu = true
    },

    closeMenu() {
      this.showMenu = false
    },

    onAlert(alertFrequency) {
      this.alertMode = true
      this.alertFrequency = alertFrequency
      this.slideSound()
      this.persist()
    },
    offAlert() {
      this.alertMode = false
      this.slideSound()
      this.persist()
    },
    /*
    checkAlert(currentTime) {
      if (currentTime) {
        const eachTime = currentTime.split(':')
        const minute = eachTime[1]
        const hour = eachTime[0]
        if (
          minute % this.alertFrequency === 0 ||
          minute === this.alertFrequency
        ) {
          if (this.canAlert) this.playSound(hour, minute)
          this.canAlert = false
        } else {
          this.canAlert = true
        }
      }
    },
    */
    changeColor(currentTime) {
      switch (currentTime) {
        case '05:00:00':
          this.isMorning = true
          this.isNight = false
          break
        case '10:00:00':
          this.isAfternoon = true
          this.isMorning = false
          break
        case '16:00:00':
          this.isEvening = true
          this.isAfternoon = false
          break
        case '18:00:00':
          this.isNight = true
          this.isEvening = false
          break
      }
    },
    persist() {
      localStorage.alertMode = this.alertMode
      localStorage.alertFrequency = this.alertFrequency
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-jp.css);
.main {
  min-height: 100vh;
  position: relative;
  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';
}
.morning {
  background: -moz-linear-gradient(top, #96d3e8, rgba(247, 232, 230, 0.9));
  background: -webkit-linear-gradient(top, #96d3e8, rgba(247, 232, 230, 0.9));
  background: linear-gradient(to bottom, #96d3e8, rgba(247, 232, 230, 0.9));
}
.afternoon {
  background: -moz-linear-gradient(top, #95dafa, rgba(243, 251, 254, 0.9));
  background: -webkit-linear-gradient(top, #95dafa, rgba(243, 251, 254, 0.9));
  background: linear-gradient(to bottom, #95dafa, rgba(243, 251, 254, 0.9));
}
.evening {
  background: -moz-linear-gradient(top, #7dc0de, rgba(241, 213, 195, 0.9));
  background: -webkit-linear-gradient(top, #7dc0de, rgba(241, 213, 195, 0.9));
  background: linear-gradient(to bottom, #7dc0de, rgba(241, 213, 195, 0.9));
}
.night {
  background: -moz-linear-gradient(top, #287598, rgba(190, 216, 222, 0.9));
  background: -webkit-linear-gradient(top, #287598, rgba(190, 216, 222, 0.9));
  background: linear-gradient(to bottom, #287598, rgba(190, 216, 222, 0.9));
}
.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.p-time {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 60vh;
  font-size: 10vw;
}
.footer {
  position: absolute;
  height: 21vw;
  width: 100vw;
  bottom: 0;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    z-index: -1;
  }
}

.p-main {
  &__bg {
    opacity: 0.6;
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100%;
    z-index: -1;
    background-position: bottom;
    background-repeat: no-repeat;
  }
}

.c-animation__in {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
}

.c-animation__out {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
}

.p-button {
  width: 100px;
  height: 100px;
  background-color: red;
}
</style>
