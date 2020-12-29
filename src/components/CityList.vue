<template>
  <div>
    <div v-if="cities.length == 0">
     No cities
    </div>
    <div v-for="city in cities" class="item" v-bind:key="city.id">{{city.city.name}}</div>
  <city-add  v-on:add="addCity"/>
  </div>
</template>

<script>
import CityAdd from './CityAdd.vue'
import { reactive } from 'vue'

export default {
  name: 'CityList',
  components: {
    CityAdd
  },
  setup(){
    
    const cities = reactive([])

    const addCity = async (name) => {
      var xmlHttp = new XMLHttpRequest();
      try{
          var promise = new Promise(function(resolve, reject) {
          xmlHttp.onreadystatechange = function() {
            console.log(JSON.stringify(xmlHttp))
              if (xmlHttp.readyState == 4) {
                  if (xmlHttp.status >= 300) {
                      reject("Error, status code = " + xmlHttp.status)
                  } else {
                      resolve(xmlHttp.response);
                  }
              }
          }
          xmlHttp.open( "GET", "http://api.openweathermap.org/data/2.5/weather?q="+name+"&APPID=6dae4f71f35c5a3ff7c8863d753dd6a6", true );
          console.log(JSON.stringify(xmlHttp))
          xmlHttp.send( null );
      });
      var city = await promise;
      cities.value = cities.push({city:JSON.parse(city), id: cities.length});
      
      }
      catch{
      cities.value = cities.push({city:{name: name}, id: cities.length});
      }
      
    }

    return {cities, addCity}
  }
}
</script>

<style scoped>
</style>