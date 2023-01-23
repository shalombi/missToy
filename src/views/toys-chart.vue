

<template>
  <h3 class="chart-subtitle">Average Price Of Product Category</h3>
  <DoughnutChart :chartData="getDataPriceAvg" v-if="toys" />

    <!-- toys:<pre>{{ toys }}</pre> -->
  <!-- <pre v-if="toys">{{ getDataPriceAvg }}</pre> -->
</template>

<script>

import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables)

export default {
  name: 'Home',
  // props: {
  //     data: Object
  // },
  components: { DoughnutChart },
  data() {
    return {
      toys: null,
      filterBy: null,
      // testData:this.getDataPriceAvg,

      labels: ["Doll", "Battery Powered", "Baby"],

      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },

    }
  },
  async created() {
    await this.$store.dispatch({ type: 'loadToys' }).then(toys => this.toys = toys.allToys)
  },

  computed: {
    // toys() {
    //   return this.$store.getters.toys
    // },
    getDataPriceAvg() {

      const data = this.labels.map(label => {
        // console.log('label', label)
        // return

        // return
        // console.log('+++label', label)

        console.log('+++', this.toys)
        
        const filteredToys = this.toys.filter(toy =>
        toy.labels.includes(label)
        )
        // console.log('###', filteredToys)
        
        
        // return 900
        
        return filteredToys.reduce(
          (avgPrice, toy) => avgPrice + (toy.price / filteredToys.length),
          0
          )
      })
      // return data
      // console.log('data',data)
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Price Avg',
            borderRadius: 6,
            //should be an array:
            data,
            backgroundColor: ["#77CEFF", "orange", "green"],
          },
        ],
      }
    },


  }

}
</script>
