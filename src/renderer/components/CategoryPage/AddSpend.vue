<template>
  <div>
    <v-select
      :options="subcategories" 
      label="name" 
      v-model="selectedSubcategory" 
      @input="printSelected"></v-select>
     <h3>Kwota</h3>
    <input v-model.number="amount" type="number">
    <h3>Data</h3>
    <datepicker
      v-model="date"
      :format="customFormatter"
      :disabled-dates="disabledDates"
      ></datepicker>
  </div>
</template>
<script>
import vSelect from 'vue-select'
import Datepicker from 'vuejs-datepicker'
import 'vue-select/dist/vue-select.css'

export default {
  components: {
    vSelect,
    Datepicker,
  },
  data () {
    return {
      selectedSubcategory: null,
      subcategories: [{ name: 'KFC' }, { name: 'Mac' }],
      amount: 0,
      date: new Date(),
      disabledDates: {
        to: new Date(2019, 11, 32),
        from: new Date(2021, 0, 0),
      },
      language: 'pl',
    }
  },
  props: ['category'],
  methods: {
    printSelected (value) {
      if (value !== null) console.log(value, value.name)
    },
    customFormatter (date) {
      const prependZero = (val) => (val.toString().length < 2 ? '0' + val : val)
      return `${prependZero(date.getMonth() + 1)}-${prependZero(date.getDate())}`
    },
  },
  watch: {
    amount (newVal, old) {
      console.log(old, newVal)
    },
  },
}
</script>

<style scoped>
input {
  width: 100%;
  font-size: 2rem;
  text-align: center;
}

.datepicker {
  width: 100%;
}

h1, h2, h3 {
  margin-top: 0.5rem;
  text-align: center;
}
</style>