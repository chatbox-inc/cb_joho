<template>
  <div
    v-if="currenTime"
    class="main font-mono"
    :class="{
      morning: isMorning,
      afternoon: isAfternoon,
      evening: isEvening,
      night: isNight
    }"
  >
    <div class="header">
      <div class="text-huge-0">
        <p class="p-date">{{ getDate }}</p>
      </div>
      <div class="p-timer">
        <input
          id="select30"
          v-model="alertFrequency"
          type="radio"
          name="time"
          value="30"
        />
        <label for="select30">30min</label>
        <input
          id="select60"
          v-model="alertFrequency"
          type="radio"
          name="time"
          value="60"
        />
        <label for="select60">1h</label>
        <input
          id="select00"
          v-model="alertFrequency"
          type="radio"
          name="time"
          value="00"
        />
        <label for="select00">off</label>
      </div>
    </div>
    <div class="p-time">
      <time class="text-huge-2">
        {{ currenTime }}
      </time>
    </div>

    <div class="boreder mt-10">
      <h2 class="text-xl">Debug</h2>
      <p>alertMode : {{ alertMode }}</p>
      <p>alertFrequency : {{ alertFrequency }} minutes</p>
      <label for="mode">音声お知らせ</label>
      <input id="mode" v-model="alertMode" type="checkbox" />
      <p>isMorning : {{ isMorning }}</p>
      <p>isAfternoon : {{ isAfternoon }}</p>
      <p>isEvening : {{ isEvening }}</p>
      <p>isNight : {{ isNight }}</p>
    </div>

    <div class="footer">
      <img src="../assets/images/town_pc.svg" />
    </div>
  </div>
</template>

<script>
import sound from '@/assets/sound/polly.mp3'
export default {
  components: {},
  data() {
    return {
      currenTime: null,
      canAlert: true,
      alertMode: false,
      alertFrequency: 30,
      isMorning: false,
      isAfternoon: false,
      isEvening: false,
      isNight: true
    }
  },
  computed: {
    getDate() {
      const date = this.$dayjs().format('YYYY - MM - DD  dddd')
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
      this.changeColor(this.currentTime)
    },

    playSound() {
      const audio = new Audio(sound)
      audio.play()
    },

    checkAlert(currentTime) {
      const eachTime = currentTime.split(':')
      const minutes = eachTime[1]
      if (
        minutes % this.alertFrequency === 0 ||
        minutes === this.alertFrequency
      ) {
        if (this.canAlert) this.playSound()
        this.canAlert = false
      } else {
        this.canAlert = true
      }
    },

    changeColor(currentTime2) {
      const test = this.$dayjs().format('HH:mm:ss')
      switch (test) {
        case '5:00:00':
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
.header {
  display: flex;
  margin: 30px;
}
.p-date {
  margin: 0 0 0 auto;
}
.p-timer {
  margin-left: auto;
  font-size: 32px;
  input {
    display: none;
  }
  label {
    margin-right: 10px;
  }
  input[type='radio']:checked + label {
    border-bottom: solid;
    text-decoration-color: #303133;
  }
}
.p-time {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
.footer {
  position: absolute;
  height: 20vw;
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
</style>
