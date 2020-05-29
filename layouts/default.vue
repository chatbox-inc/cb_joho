<template>
  <div>
    <TheHeader />
    <div class="pt-24 bg-gray-100 p-container">
      <nuxt />
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/common/TheHeader'
import TheFooter from '@/components/common/TheFooter'
export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style lang="scss" scoped>
.p-container {
  min-height: 70vh;
}
</style>
