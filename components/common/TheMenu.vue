<template>
  <div
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center bg-white"
  >
    <div class="flex w-full h-full">
      <div class="l-menu__left"></div>
      <div class=" bg-white  mx-auto rounded z-50 py-5 overflow-y-auto">
        <div class="l-menu__right text-left px-6">
          <div>
            <a href="#" @click.prevent="$emit('closeMenu')">
              <img
                class="h-8 w-8 ml-auto"
                src="@/assets/images/menu/menu_times3.svg"
                alt="閉じる"
              />
            </a>
          </div>
          <div class="mt-20 text-center">
            <p class="text-xl">時報設定</p>
            <ol
              class="l-list mt-12 text-3xl space-y-8"
              :class="activeFrequency"
            >
              <li class="">
                <a href="" @click.prevent="$emit('onAlert', 30)">
                  30min
                </a>
              </li>
              <li class="">
                <a href="" @click.prevent="$emit('onAlert', 60)">1h</a>
              </li>
              <li class="">
                <a href="" @click.prevent="$emit('offAlert')">off</a>
              </li>
            </ol>
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
    activeFrequency() {
      return {
        'l-active__off': !this.alertMode,
        'l-active__30': this.frequency === 30 && this.alertMode,
        'l-active__60': this.frequency === 60 && this.alertMode
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.l-menu {
  &__left {
    background-color: #303133;
    opacity: 0.5;
    width: 20vw;
  }

  &__right {
    width: 80vw;
  }
}

.l-list {
  position: relative;
  &:before {
    position: absolute;
    top: 0;
    left: 30px;
    content: '';
    width: 2px;
    height: 100%;
    background-color: #e4e7ed;
    display: block;
  }

  &:after {
    position: absolute;
    left: 30px;
    content: '';
    width: 2px;
    height: 30%;
    background-color: #409eff;
    display: block;
  }
}

.l-active {
  &__30 {
    &:after {
      top: 0;
    }
  }

  &__60 {
    &:after {
      top: 35%;
    }
  }

  &__off {
    &:after {
      bottom: 0;
    }
  }
}
</style>
