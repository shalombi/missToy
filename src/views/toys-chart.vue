

<template>
  <h3 class="chart-subtitle">Average Price Of Product Category</h3>
  <DoughnutChart :chartData="getDataPriceAvg" v-if="toys" />
  <h3 class="chart-subtitle">Data Of Stock</h3>
  <BarChart :chartData="getDataLabelStock" v-if="toys" :options="options" />


  toys:<pre>{{ toys }}</pre>
  <!-- <pre v-if="toys">{{ getDataPriceAvg }}</pre> -->
</template>

<script>

import { DoughnutChart } from 'vue-chart-3';
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables)

export default {
  name: 'Home',
  // props: {
  //     data: Object
  // },
  components: { DoughnutChart, BarChart },
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
        // console.log('+++', this.toys)
        const filteredToys = this.toys.filter(toy =>
          toy.labels.includes(label)
        )
        return filteredToys.reduce(
          (avgPrice, toy) => avgPrice + (toy.price / filteredToys.length),
          0
        )
      })
      // console.log('labels',this.labels)
      // console.log('data',data)
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Price Avg',
            borderRadius: 6,
            data,
            backgroundColor: ["#77CEFF", "orange", "green"],
          },
        ],
      }
    },


    getDataLabelStock() {
      const data = this.labels.map(label => {
        return this.toys.reduce(

          (acc, toy) =>
            toy.labels.includes(label) && toy.inStock
              ? acc + 1
              : acc,
          0
          
        )
      })
      console.log('labels',this.labels)
      console.log('data',data)
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Stock Data',
            borderRadius: 6,
            data,
            backgroundColor: ["#77CEFF", "orange", "#123E6B"]
          },
        ],
      }
    }

  }

}
</script>
