<template>
  <div
    class="fixed w-full h-full top-0 l-menu left-0 flex items-center justify-center bg-white"
  >
    <div class="flex w-full h-full">
      <div class="l-menu__left"></div>
      <div class="mx-auto rounded z-50 py-5 overflow-y-auto">
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
              <li
                class="l-list__line l-list__lineHome"
                :class="activeFrequency"
              ></li>
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
        'c-active__off': !this.alertMode,
        'c-active__30': this.frequency === 30 && this.alertMode,
        'c-active__60': this.frequency === 60 && this.alertMode
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.l-menu {
  background-color: rgba(190, 223, 245, 0.65);
  background: linear-gradient(
    rgba(255, 255, 255, 0.6),
    rgba(190, 223, 245, 0.6)
  );
  background: linear-gradient(
    rgba(191, 223, 247, 0.85) 0%,
    hsla(204, 56%, 89%, 0.85) 63%
  );
  backdrop-filter: blur(2px);
  &__left {
    opacity: 0.5;
  }

  &__right {
    width: 100vw;
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
    background-color: #eceef2;
    display: block;
  }
  &__line {
    position: absolute;
    left: 30px;
    width: 2px;
    height: 30%;
    background-color: #409eff;
    margin: 0;
  }

  &__lineHome {
    top: 0;
    transition: 0.9s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }
}

.c-active {
  &__30 {
    top: 0;
  }

  &__60 {
    top: 35%;
  }

  &__off {
    top: 70%;
  }
}
</style>
