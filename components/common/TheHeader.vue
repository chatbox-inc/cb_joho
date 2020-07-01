<template>
  <div>
    <div class="header lg:flex">
      <div class="hidden w-full lg:block lg:flex lg:justify-between p-timer">
        <div>
          {{ date }}
        </div>
        <div class="hidden lg:block l-box lg:text-center">
          <a
            href="#home"
            class="w-20 inline-block"
            @click="$emit('onAlert', 30)"
          >
            30min
          </a>
          <a
            href="#about"
            class="w-20 ml-8 inline-block"
            @click="$emit('onAlert', 60)"
          >
            1h
          </a>
          <a href="#work" class="w-20 inline-block" @click="$emit('offAlert')">
            off
          </a>
          <div class="l-box__line l-box__lineHome" :class="actionClass"></div>
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
    },
    date: {
      type: String,
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
    },

    actionClass() {
      return {
        'c-active__30': this.frequency === 30 && this.alertMode,
        'c-active__60': this.frequency === 60 && this.alertMode,
        'c-active__off': !this.alertMode
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
  font-size: 32px;
}

.l-box {
  position: relative;

  &__line {
    position: absolute;
    width: 80px;
    height: 2px;
    bottom: -8px;
    background-color: #303133;
  }

  &__lineHome {
    left: 4%;
    transition: 0.9s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }
}

.c-active {
  &__30 {
    left: 4%;
  }

  &__60 {
    left: 45%;
  }

  &__off {
    left: 72%;
  }
}
</style>
