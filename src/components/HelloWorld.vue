<template>
  <div class="hello">
    <h1 class="display-2">Cocktails</h1>

    <input v-model.lazy="message" @keyup.enter="search()" placeholder="search cocktail">
        <!--bootsrap cards -->
        <div class="d-flex flex-row m-auto" >
      <div  v-for="item in cocktails" :key="item.iddrink">
        <div class="card p-2" style="width: 14rem;">
        <img :src="item.strDrinkThumb" class="card-img-top" alt="...">
        <div class="card-body">
        <h6 class="card-title">{{ item.strDrink }}</h6>
        <router-link :to="{name:'cocktail',params:{id:item.strDrink,msg:message}}">
        <a href="#" class="btn btn-primary">More</a>
        </router-link>
        </div>
        </div> 
        </div>
        </div>
        <p class="lead">Rare cat photos</p>
        <div v-if="loading" class="spinner-grow" role="status">
        <span class="sr-only"></span>
        </div>
        <img v-else class="photos rounded" :src="kitty">
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'HelloWorld',
  data(){
    return{
      cocktails:[],
      message:"",
      kitty:"",
      loading:true,
    }
  },
  created(){
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then((response)=>{
      this.cocktails=response.data.drinks;
    }).catch((error)=>{
      console.log(error);
    });
    setInterval(()=>{

      axios.get('https://api.thecatapi.com/v1/images/search')
      .then((response)=>{
        this.loading=false;
        this.kitty=response.data[0].url;
      }).catch((error)=>{
        console.log(error);
        this.loading=true;
      })

    },5000)

  },
  methods:{
    search:function(){
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.mymessage}`)
    .then((response)=>{
      console.log("search");
      console.log(response.data.drinks);
      this.cocktails=response.data.drinks;
    }).catch((error)=>{
      console.log(error);
    })
      this.message="";
    },
  },
  computed:{
    mymessage(){
      if(this.message=="")
      return "margarita";
      return this.message;

    }
  }
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: #c5f5e1b6;
  
}
.photos{
  max-height: 300px;
  width: auto;
  margin: auto;
  

}




</style>
