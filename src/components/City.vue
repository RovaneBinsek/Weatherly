<template>
  <div class="city">
    <div class="city-inner">
      <div class="name">
        {{city.city.name}}
        <div class="close" v-on:click="$emit('removeCity', city.id)">X</div>
      </div>
      <div class="weather" v-if="city.isValid">
        <img class="weather-icon" :src="imageUrl(city.city.weather[0].icon)"/>
        <span class="information">{{getCelsius(city.city.main.temp)}}°C / {{city.city.main.humidity}}%</span>

      </div>
      <div v-if="!city.isValid">
        <img class="unknown-icon" src="../assets/empty.png"/>

      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'City',
  props: {
    city: Object
  },
  emmits: {
    removeCity: null
  },
  setup(){    
    var imageUrl = (icon) => {
      return "http://openweathermap.org/img/wn/"+icon+"@2x.png"
    }
    var getCelsius = (kelvin) => {
      return (kelvin - 273.15).toFixed(1);
    }

    return { imageUrl, getCelsius }
  }
}
</script>

<style scoped>
  .city{
    width: 100%;
  }
  .city-inner{
    border: solid 1px beige;
    border-radius: 15px;
    margin: 10px;
    padding: 15px;
    background: rgb(212, 204, 126);
    height: 150px;
    position: relative;
  }
  .name{
    font-size: 20px;
    width: 100%;
  }
  .close{
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
    padding-top: -50px;
  }
  .information{
    font-size: 24px;
  }
  .weather{
    display: grid;;
  }
  .weather-icon{
    margin: auto;
  }
  @media (min-width: 700px) {
    .city{
      flex-basis: 33%;
      margin: auto;
    }
  }
  .unknown-icon{
    height: 100px;
    margin-top: 15px;
  }
</style>