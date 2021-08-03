<template>
    <div class="d-flex flex-column p-5" id="invoice">
        <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"

        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
    <h1 class="display-1">{{mycocktail}} </h1>
    <img class="rounded mx-auto  d-block photos" :src="mycocktailitem.strDrinkThumb">
    <div class="alert alert-success" role="alert">
    Instructions
    </div>
    <!-- <h2>Instructions</h2> -->
   
     <p class="lead">{{mycocktailitem.strInstructions}}</p>

    <div class="alert alert-success" role="alert">
    Ingredients
    </div>
    <h3 class="lead">{{mycocktailitem.strIngredient1}}</h3>
    <h3 class="lead">{{mycocktailitem.strIngredient2}}</h3>
    <h3 class="lead">{{mycocktailitem.strIngredient3}}</h3>
    <button v-on:click="generatePDF">generatePDF </button>
        </vue-html2pdf>
    </div>
</template>
<script>
import axios from 'axios';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default {
    created(){
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.mycocktail}`)
    .then((response)=>{
      this.cocktails=response.data.drinks;
    }).catch((error)=>{
      console.log(error);
    })
    }, 
    data(){
    return{
      cocktails:[],
    }
    },
    computed:{
        mycocktail(){
            return this.$route.params.id;
        },
        mymessage(){
            return this.$route.params.msg;
        },
        mycocktailitem(){
            return this.cocktails.find(item => item.strDrink==this.mycocktail)
        }
    },
    methods:{
       generatePDF: ()=>{ 
           
           console.log("generate");
           window.html2canvas = html2canvas;
           var doc = new jsPDF("p","pt","a3",false,true);
           doc.html(document.querySelector("#invoice"),{
               callback:function(pdf){
                   pdf.save("mypdf.pdf");
               }
           })
     
    },
    
    }
}
</script>
<style scoped>
*{
    align-items: center;
    justify-content: center;
    background-color:#c5f5e1b6;
    max-height: 11in;
    max-width: 8.5in;
}
.photos{
  height: 400px;
  width: 400px;
  color: black;
  margin: 10px;
  

}
h3{
    width: 50vh;
    
    
}
</style>