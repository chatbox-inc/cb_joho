<template>
  <div class="p-container">
    <TheHeader />
    <div class="pt-24 bg-gray-100 flex-grow">
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
