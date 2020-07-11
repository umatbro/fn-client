<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <span class="title">Kategorie</span> <small v-if="loading">Loading...</small>
        <p v-if="error">{{ error }}</p>
        <ul>
          <li v-for="(category, index) in categories" :key="index">{{ category.name }}</li>
        </ul>
      </div>

      <div class="right-side">
        <add-spend></add-spend>
      </div>
    </main>
  </div>
</template>

<script>
import AddSpend from './CategoryPage/AddSpend'
import { mapState } from 'vuex'

export default {
  components: { AddSpend },
  data () {
    return {
      categories: [],
      error: null,
      loading: false,
    }
  },
  name: 'category-page',
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
  },
  computed: {
    ...mapState(['client']),
  },
  mounted () {
    const call = this.client.getCategories()
    call.on('data', (response) => {
      this.loading = true
      this.categories.push(response)
    })

    call.on('error', (response) => {
      this.error = response
      console.error(response)
    })

    call.on('end', () => {
      this.loading = false
    })
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
