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
  </div>
</template>

<script>
import TheHeader from '../components/common/TheHeader.vue'
import TheMenu from '@/components/common/TheMenu'
// import { PollyService } from '../service/PollyService.js'
// import sound from '@/assets/sound/polly.mp3'

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
    setInterval(() => this.setTime(), 1000)
  },
  methods: {
    setTime() {
      if (this.alertMode) {
        this.checkAlert(this.currenTime)
      }
      this.currenTime = this.$dayjs().format('HH:mm:ss')
      this.changeColor(this.currentTime)
    },

    setDate() {
      return this.$dayjs().format('YYYY - MM - DD ddd')
    },

    playSound(currentTime) {
      // const audio = new Audio(sound)
      // audio.play()
      // PollyService.timeVoice(currentTime)
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
    },
    offAlert() {
      this.alertMode = false
    },

    checkAlert(currentTime) {
      if (currentTime) {
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
      }
    },

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
</style>
