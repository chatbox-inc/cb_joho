<template>
  <div>
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
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
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
</style>
