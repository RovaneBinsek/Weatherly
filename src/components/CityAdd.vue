<template>
<div>
  <button v-if="!visible" v-on:click="visible = !visible">ADD CITY</button>
   <teleport  to="body">
     <div class="modal"  v-if="visible">
       <div class="modal-content">
        <span>City name</span>
        <input v-model="city" type="text"/>
        <div>
        <button  v-on:click="$emit('add', city)">ADD</button>
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
  setup(){
    var visible = ref(false);

    return{visible}
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
  width: 20%;
}

button{
  width: 100px;
  padding: 10px;
  margin: 5px;
}
</style>