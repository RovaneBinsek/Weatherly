<template>
  <div>
    <div v-if="cities.length == 0">
     No cities
    </div>
    <div class="city-list">
      <city v-for="city in cities" class="item" v-bind:key="city.id" :city="city" v-on:removeCity="removeCity"></city>
    </div>
  <city-add  v-on:add="addCity"/>
  </div>
</template>

<script>
import CityAdd from './CityAdd.vue'
import City from './City.vue'
import { reactive, onBeforeMount } from 'vue'
import {getCity} from '../Utils.js'

async function refreshCities(cities){
    
   for(var i = 0; i < cities.length; i++){
      try{
        var city = await getCity(cities[i].city.name);
        cities[i].city = JSON.parse(city);
        cities[i].isValid = true;
      }
      catch{
        cities[i].city.city = {name: cities[i].city.name};
        cities[i].isValid = false;
      }
    }
}

export default {
  name: 'CityList',
  components: {
    CityAdd,
    City
  },
  setup(){    
    var tempCities = [];
    if(document.cookie){
      try{
        tempCities = JSON.parse(document.cookie.split('; ').find(row => row.startsWith('cities')).split('=')[1]);
      }
      catch{
        tempCities = [];
      }
    }
    const cities = reactive(tempCities);
    onBeforeMount(async () => {   
        refreshCities(cities)
      }) 

    const addCity = async (name) => {
      try{
        var city = await getCity(name);
        cities.value = cities.push({city:JSON.parse(city), id: cities[cities.length-1] ? cities[cities.length-1].id + 1 : 0, isValid: true});
      
      }
      catch{
        cities.value = cities.push({city:{name: name}, id: cities[cities.length-1] ? cities[cities.length-1].id + 1 : 0, isValid: false});
      }
      document.cookie ="cities=" + JSON.stringify(cities) 
      refreshCities(cities)
    }
    const removeCity = (id) => {
      for(var i in cities){
        if(cities[i].id == id){
          cities.splice(i,1);
        }
      }
      document.cookie ="cities=" + JSON.stringify(cities)
    }

    setInterval(function(){refreshCities(cities)}, 10000);

    return {cities, addCity, removeCity}
  }
}
</script>

<style scoped>
.city-list{
  display: flex;
  margin: auto; 
  flex-wrap: wrap;
  justify-content: space-between;
}
@media (min-width: 700px) {
  .city-list{
    width: 700px;
  }
}
</style>