<template>
  <div>
    <span id="message-presenter" :style="{'color': messagePresenter.severityClass}">{{ messagePresenter.text }}</span>
    <section v-if="category">
    <h1>{{ category.name }}</h1>
    
    <v-select
      :options="subcategories" 
      label="name" 
      v-model="selectedSubcategory"></v-select>
     <h3>Kwota</h3>
    <input v-model.number="amount" type="number">

    <h3>Data</h3>
    <datepicker
      v-model="date"
      :format="customFormatter"
      :disabled-dates="disabledDates"
      ></datepicker>

      <button v-if="selectedSubcategory && amount" @click="putCostEntry()">Confirm</button>
      </section>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import Datepicker from 'vuejs-datepicker'
import { mapState } from 'vuex'
import 'vue-select/dist/vue-select.css'

export default {
  components: {
    vSelect,
    Datepicker,
  },
  data () {
    return {
      selectedSubcategory: null,
      amount: 0,
      date: new Date(),
      disabledDates: {
        to: new Date(2019, 11, 32),
        from: new Date(2021, 0, 0),
      },
      language: 'pl',
      messagePresenter: {
        text: null,
        severityClass: null,
      },
    }
  },
  computed: {
    subcategories () {
      return this.category.subcategories
    },
    ...mapState(['client']),
  },
  props: ['category'],
  methods: {
    customFormatter (date) {
      const prependZero = (val) => (val.toString().length < 2 ? '0' + val : val)
      return `${prependZero(date.getMonth() + 1)}-${prependZero(date.getDate())}`
    },
    putCostEntry () {
      console.log('Put cost entry')
      this.client.putCostEntry({
        costEntry: {
          category: this.selectedSubcategory,
          amount: this.amount,
          timestamp: { seconds: this.date.getTime() / 1000 },
        },
      }, (error, response) => {
        if (error) {
          console.log(error)
          return this.displayMessage(error, 'error')
        }
        if (response.errorOccurred) {
          console.log(response)
          this.displayMessage(response.message, 'error')
        } else {
          console.log(response.message)
          this.displayMessage(response.message, 'success')
          this.clearCategory()
        }
      })
    },
    /**
     * Clear selected category and the input
     */
    clearCategory () {
      this.selectedSubcategory = null
      this.amount = 0
    },
    displayMessage (message, messageSeverity = 'info') {
      const severityColors = new Map([
        ['info', 'blue'],
        ['success', 'green'],
        ['error', 'red'],
        ['warning', 'yellow'],
      ])
      this.messagePresenter.text = message
      this.messagePresenter.severityClass = severityColors.get(messageSeverity)

      console.log(this.messagePresenter.severityClass)
      setTimeout(() => { this.messagePresenter.text = null }, 5000)
    },
  },
  watch: {},
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
button {
  width: 100%;
  font-size: 2rem;
  text-align: center;
}
</style>