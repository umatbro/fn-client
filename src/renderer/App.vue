<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { categoryProto } from '../../proto-index'
import config from '../../config'
import { mapActions, mapState } from 'vuex'
import grpc from 'grpc'

export default {
  name: 'fn-client',
  methods: mapActions(['setClient']),
  computed: mapState(['client']),
  created () {
    const client = new categoryProto.SpreadsheetService(
      config.SERVER_HOST,
      grpc.credentials.createInsecure(),
    )
    this.setClient(client)
    this.$store.dispatch('setClient', client)
  },
}
</script>

<style>
  /* CSS */
</style>
