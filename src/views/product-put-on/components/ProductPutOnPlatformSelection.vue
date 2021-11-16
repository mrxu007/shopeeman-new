<template>
  <div>平台选品库</div>
</template>

<script>
import CollectionApI from './collection-interface'
export default {
  data() {
    return {
      CollectionApIInstance: new CollectionApI(this)
    }
  }
}
</script>

<style>
</style>
