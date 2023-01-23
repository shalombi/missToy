

<template>
  <DoughnutChart :chartData="data" />
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
      // testData:this.$store.getters.testData

      testData: {
        labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
        datasets: [
          {
            data: [76, 344, 60, 70, 5],
            backgroundColor: [
              'red', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'
            ],
          },
        ]
      }
    }
  }

}
</script>

