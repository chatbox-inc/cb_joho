<template>
  <div>
    <div class="header lg:flex">
      <div class="hidden lg:block p-timer">
        <div class="hidden lg:block">
          <input
            id="select30"
            type="radio"
            name="time"
            @click="$emit('onAlert', 30)"
          />
          <label for="select30">30min</label>
          <input
            id="select60"
            type="radio"
            name="time"
            @click="$emit('onAlert', 60)"
          />
          <label for="select60">1h</label>
          <input
            id="select00"
            type="radio"
            name="time"
            @click="$emit('offAlert')"
          />
          <label for="select00">off</label>
        </div>
      </div>
      <div class="lg:hidden">
        <div class="block flex justify-between lg:hidden">
          <div class="flex items-center">
            <img
              src="@/assets/images/header/header_bell.svg"
              alt="現在のアラート頻度"
              class="h-6"
            />
            <p class="ml-2">{{ currentFrequency }}</p>
          </div>
          <div>
            <a href="#" @click.prevent="$emit('openMenu')">
              <img
                src="@/assets/images/header/header_hamburger.png"
                alt="メニューはこちら"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    frequency: {
      type: Number,
      required: true
    },
    alertMode: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    currentFrequency() {
      if (!this.alertMode) {
        return 'off'
      }
      switch (this.frequency) {
        case 60:
          return '1h'
        case 30:
          return '30m'
        default:
          return 'off'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
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
</style>
