<template>
  <div class="home">
    <Proposals />
  </div>
</template>

<script>
// @ is an alias to /src
import Proposals from '@/components/Proposals.vue'

export default {
  name: 'Home',
  components: {
    Proposals
  }
}
</script>
