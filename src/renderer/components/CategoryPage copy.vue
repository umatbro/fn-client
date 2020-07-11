<template>
<div>

  <h1>{{ test }}</h1>
  <ul>
    <li v-for="(category, index) in categories" :key="index">{{ category }}</li>
  </ul>
</div>  
</template>

<script>
export default {
  data () {
    return {
      test: 'test',
      categories: [
        'Wynagrodzenie',
        'Jedzenie',
        'Hobby',
      ],
    }
  },
}
</script>