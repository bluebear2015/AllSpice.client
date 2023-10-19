<template>

 
 <section class="d-flex">
         
    <div class="col-4  glassCardHeart p-1">
      <div class="d-flex justify-content-center bg-dark rounded elevation-5 border border-2 border-secondary my-1">
   <h5 class="text-center bgGreen text-light elevation-5 m-2 p-1 rounded fw-bold">{{activeRecipe.title}}</h5>
  </div>
   <img class="recipeImg elevation-5 border border-2 border-dark" :src="activeRecipe.img" alt="">
   
    </div>
    <div class="col-4 elevation-5 mx-1  glassCardHeart border border-2 border-dark">
      <div class="d-flex justify-content-center bg-dark rounded elevation-5 border border-2 border-secondary m-1">
      <h5 class="text-center bgGreen text-light elevation-5 m-2 p-1 rounded fw-bold">Igredients</h5>
     
      </div>
      <div v-for="i in ingredients" :key="i.id" class="fs-5 fw-bold m-2 d-flex justify-content-between">
     <div class="text-center">
     {{i.name}}
    </div>
   <div class="text-center">
     {{i.quantity}}
     </div>
     <div class="col-2 d-flex align-items-center" v-if="account.id == activeRecipe.creatorId">
            <button @click="deleteIngredient(i.id)" class="deleteIngredientButton d-flex align-items-center"><i
                    class="mdi mdi-minus-thick"></i></button>
        </div>
          </div>
    </div>
    <div class="col-4 elevation-5 mx-1 p-1 glassCardHeart border border-2 border-dark">
      <div class="d-flex justify-content-center bg-dark rounded elevation-5 border border-2 border-secondary m-1">
       <h5 class=" text-center bgGreen text-light elevation-5 m-1 rounded fw-bold p-1">Instructions</h5>
       </div>
       <div class="fw-bold m- fs-5">
    {{activeRecipe.instructions}}
      
         </div>
   
    </div>

 </section>
 <section>
<div class="btn-group" v-if="account.id == activeRecipe.creatorId">
  <button class="m-2 btn btn-light bgGreen btn-lg dropdown-toggle fw-bold text-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Add Ingredients  + 
  </button>
  <div v-for="a in activeRecipe" :key="a.id" class="btnIng dropdown-menu glassCard3 p-2">
    <ingredientForm :recipe = "a"/>
  </div>
</div>

    <div class="my-2 d-flex justify-content-end delete-recipe-button" v-if="account.id == activeRecipe.creatorId">
                        <button 
                        @click="deleteRecipe(activeRecipe.id)" 
                        class="btn btn-danger mdi mdi-delete">
                        </button>
                    </div>
                    </section>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState.js'
import { ingredientsService } from '../services/IngredientsService';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { recipesService } from '../services/RecipesService.js';
import { Modal } from 'bootstrap';
import IngredientForm from './IngredientForm.vue';



export default {
  components: { IngredientForm },

  setup() {
// async function getIngredients(recipeId){
// try {
//   // const recipeId = AppState.activeRecipe.id
//   const results = await ingredientsService.getIngredients(recipeId)
//   AppState.ingredients = results
// } catch (error) {
//   Pop.error(error, "Rm, getAllIngredients")
// }
// }


    return {
activeRecipe: computed(()=> AppState.activeRecipe),
 ingredients: computed(() => AppState.ingredients),
 recipe: computed(()=> AppState.recipes),
 account: computed(() => AppState.account),
 
 async deleteRecipe(recipeId) {
                try {
                    if (await Pop.confirm("Are you sure you want to delete this recipe?")) {
                        await recipesService.deleteRecipe(recipeId)
                        const activeModel = document.getElementById('activeRecipeModal')
                        Modal.getInstance(activeModel).hide()
                        Pop.delete("Deleted Recipe")
                    }
                } catch (error) {
                    Pop.error('error deleting recipe', error)
                }
            },

            async deleteIngredient(ingredientId) {
                try {
                    await ingredientsService.deleteIngredient(ingredientId)
                } catch (error) {
                    Pop.error('error deleting ingredient', error)
                }
            }

    }
  }
}
</script>
<style>
.recipeImg{
   width: 100%; 
    height: 500px;
    object-fit: cover;
    object-position: center;
    border-radius: 1rem;
    
}
.bgGreen{
  background-color: #527360;
}

.glassCard{
    background: rgba(137, 147, 117, 0.747);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(6.4px);
-webkit-backdrop-filter: blur(6.4px);
border: 1px solid rgba(94, 90, 90, 0.3);
border-color: #adabaa;

}

.btnIng{
  width: 500px; 
    height: 200px;
}

.glassCardHeart{
    background: rgba(245, 236, 236, 0.708);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(6.4px);
-webkit-backdrop-filter: blur(6.4px);
border: 1px solid rgba(94, 90, 90, 0.3);
border-color: #adabaa;

}
.hero-img {
    background: url("https://images.unsplash.com/photo-1512388810659-4685f86d5f45?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1400") no-repeat center center;
    background-size: cover; /* This ensures the image covers the entire container */
    aspect-ratio: 1/1;
}

.glassCard3 {
   background-image: url("https://images.unsplash.com/photo-1628006203055-b4aa5f6300f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80");
 background-size: cover; /* This ensures the image covers the entire container */
    aspect-ratio: 1/1;
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.4px);
    -webkit-backdrop-filter: blur(6.4px);
    border: 1px solid rgba(94, 90, 90, 0.3);
    border-color: #adabaa;
}


.textGreen{
color: #527360; 
}
</style>