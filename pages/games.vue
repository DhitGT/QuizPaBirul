<template>
  <div>
    <navbar />
    <div class="container mt-16">
      <level-selector
        :currentLevel="user_info ? user_info.currentLevel + 1 : 1"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_info: this.$cookies.get('user_info')
        ? JSON.parse(this.$cookies.get('user_info'))
        : null,
    }
  },
  mounted() {
    this.user_info = this.$cookies.get('user_info')
      ? JSON.parse(this.$cookies.get('user_info'))
      : null
    console.log('coockie : ' + this.user_info)

    if (!this.user_info) {
      window.location.href = '/register'
    }
  },
}
</script>
