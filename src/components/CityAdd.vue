<template>
<div>
  <button class="add-city" v-if="!visible" v-on:click="visible = !visible">ADD CITY</button>
   <teleport  to="body">
     <div class="modal"  v-if="visible">
       <div class="modal-content">
        <div class="header">ADD CITY</div>
        <div class="form-row">
          <input v-model="cityName" type="text"/>
        </div>
        <div>
        <button  v-on:click="addCity(); visible = !visible">ADD</button>
        <button  v-on:click="visible = !visible">CANCEL</button>
       </div>

       </div>
     </div>
  </teleport>
</div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CityAdd',
  components: {
  },
  emmits:{
    add: null,
  },
  setup(props, { emit }){
    var visible = ref(false);
    var cityName = ref("");

    const addCity = () => {
      emit('add', cityName.value);
      cityName.value = "";
    }

    return{ visible, addCity, cityName }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1; 
  padding-top: 100px; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4); 
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 300px;
  border-radius: 15px;
  text-align: center;
}

.header{
  font-size: 24px;
  margin: 15px;
}

.form-row input{
  margin: 10px;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
}

button{
  width: 100px;
  padding: 10px;
  margin: 5px;
  margin-bottom: 20px;
}

.add-city{
  margin-top: 40px
}
</style>