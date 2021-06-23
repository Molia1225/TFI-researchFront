<template>
  <div class="footer" v-if="false">
  </div>
</template>

<script>
import { ScrollTop } from '../assets/common'

export default {
  data() {
    return {
      duration: 0,
    }
  },
  methods: {
    getEleTop(element) {
      return document.getElementById(element)
        ? document.getElementById(element).offsetTop - 50
        : 0
    },
    navClick(element, duration) {
      setTimeout(() => {
        let top = this.getEleTop(element)
        ScrollTop(top, duration)
      }, 100)
    },
  },
}
</script>

<style lang="less">

</style>
