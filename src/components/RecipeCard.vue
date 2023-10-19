<template>

    <section class="d-flex justify-content-between text-light p-3 " >
        <div type="button"  @click="setActiveRecipe(recipe.id)" data-bs-toggle="modal" data-bs-target="#activeRecipeModal" class="card elevation-5 m-2 p-2" :style="{ backgroundImage: `url(${recipe.img})` }">
                <div class="d-flex justify-content-between">
                <div class="text p-1"> <span class="glassCard5 p-1 fw-bolder text-light fs-5 fst-italic">
                  <span class="text-warning"> # </span>{{ recipe.category }}</span></div>
      <div class="glassCardHeart2 p-1">
              <i class="mdi mdi-heart-outline unFavorited" style="display: flex; justify-content: center; align-items: center;"></i>
            </div>
         </div>
         <section class="row">
               <div class="d-flex justify-content-between align-items-center">
              
            <div  class="favorite-button p-1 m-2 rounded-5 d-flex justify-content-center align-items-center fs-3 text-light">
    <i class="mdi mdi-heart-outline unFavorited"></i>
</div>
<!-- <div v-if="isUnfavorite" class="unfavorite-button p-1 m-2 rounded-5 d-flex justify-content-center align-items-center fs-3">
    <i class="mdi mdi-heart favorited"></i>
</div> -->
            </div>

         </section>
            
                <section class="card cardBoxing text-center glassCard5">
                    <div class="fs-5 fw-bold text-decoration-underline shotened-instuctions2">{{ recipe.title }}</div>
                    <div class="fw-light shortened-instructions">{{recipe.instructions}}</div>
                </section>
                
        </div>
            </section>


<div class="modal fade" id="activeRecipeModal" data-bs-backdrop="static" 
data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" 
aria-hidden="true">

  <div class="modal-dialog modal-xl ">
   <div class="modal-content glassCard3">
      <div class="d-flex justify-content-between">
        <div class="btn" @click="favoriteRecipe(recipe.id)">
            <div class="glassCardHeart2 p-1">
              <i class="heart mdi mdi-heart-outline unFavorited" style="display: flex; justify-content: center; align-items: center;"></i>
            </div>
         </div>
          <button type="button" class="btn btn-secondary btn-sm bg-dark m-1" data-bs-dismiss="modal">X</button>
        </div>
     
      <div class="modal-body custom-modal">
        
        <Recipemodel/>
      </div>
    
   
      
    </div>
  </div>
</div>

</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Recipe } from '../models/Recipe';
import { recipesService } from '../services/RecipesService.js';
import Pop from '../utils/Pop.js';
import { ingredientsService } from '../services/IngredientsService.js';


export default {
    props:{
        recipe: {type: Recipe, reqired: true}
    },

  setup() {

   

    return {
  async checkFavorite(recipeId, favUnfav) {
                if (favUnfav == 'favorite') {
                    let favorite = AppState.favorites.find(f => f.id == recipeId)
                    if (favorite) {
                        return false
                    } else {
                        return true
                    }
                }
                if (favUnfav == 'unfavorite') {
                    let favorite = AppState.favorites.find(f => f.id == recipeId)
                    if (favorite) {
                        return true
                    } else {
                        return false
                    }
                }
            },

       async favoriteRecipe(recipeId) {
                try {
                    await recipesService.favoriteRecipe(recipeId)
                } catch (error) {
                    Pop.error(error, 'error favoriting recipe')
                }
            },

            async unfavoriteRecipe(recipeId) {
                try {
                    await recipesService.unfavoriteRecipe(recipeId)
                } catch (error) {
                    Pop.error(error, 'error unfavoriting recipe')
                }
            },
    async setActiveRecipe(recipeId)
    {
        try {
            AppState.activeRecipe = {}
              const results = await ingredientsService.getIngredients(recipeId)
              AppState.ingredients = results
            await recipesService.setActiveRecipe(recipeId)
            await ingredientsService.getIngredients(recipeId)
        } catch (error) {
            Pop.error(error, "RC setActiveRecipe")
        }
    },
//     async getIngredients(recipeId){
// try {
//   // const recipeId = AppState.activeRecipe.id
//   const results = await ingredientsService.getIngredients(recipeId)
//   AppState.ingredients = results
// } catch (error) {
//   Pop.error(error, "Rm, getAllIngredients")
// }
// }

//     computed: {
//   isFavorite() {
//     return this.checkFavorite(this.recipe.id, 'favorite');
//   },
//   isUnfavorite() {
//     return this.checkFavorite(this.recipe.id, 'unfavorite');
//   }
// },

subribed: computed(()=>
    AppState.favorites
),

activeRecipe: computed(()=> AppState.activeRecipe)
    }
  }
}
</script>
<style lang="scss" scoped>
.recipeImg{
    background-position: center;
    object-fit: contain;
    object-position: center;
}
.glassCard{
    background: rgba(177, 173, 173, 0.747);
border-radius: 6px;

backdrop-filter: blur(6.4px);
-webkit-backdrop-filter: blur(6.4px);


}
.glassCard5{
    background: rgba(21, 22, 41, 0.809);
border-radius: 6px;

backdrop-filter: blur(6.4px);
-webkit-backdrop-filter: blur(6.4px);


}
.glassCard3{
  background-image: url("https://images.unsplash.com/photo-1628006203055-b4aa5f6300f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80");
aspect-ratio: 1/0.5;
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


.glassCardHeart{
    background: rgba(171, 152, 152, 0.572);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(6.4px);
-webkit-backdrop-filter: blur(6.4px);
border: 1px solid rgba(94, 90, 90, 0.3);
border-color: #adabaa;

}
.glassCardHeart2{
    background: rgba(171, 152, 152, 0.572);
border-radius: 3px;
width: 3rem;
height: 2rem;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(6.4px);
-webkit-backdrop-filter: blur(6.4px);
border: 1px solid rgba(94, 90, 90, 0.3);
border-color: #adabaa;

}
.cardBoxing {
    max-width: 100%; /* Ensure the card doesn't exceed its parent's width */
    box-sizing: border-box; /* Include padding and border in the card's width */
}

.unFavorited {
    color: red;
}

.unfavorite-button {
    cursor: pointer;
    height: 2.5rem;
    aspect-ratio: 1/1;
    color: red;
}

.favorite-button {
    cursor: pointer;
    height: 2.5rem;
    aspect-ratio: 1/1;
}

.card > section {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 80px;
  padding: 10px; 
  color: white; 
}
.food-card-background {
    background-color: #F5E4D7;
}
 .custom-modal {
    max-width: 100rem
  
  }

.card {
  width: 380px; 
  height: 380px;
  background-size: cover;
}
.shortened-instructions {
  max-height: 2em; 
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px; 
  color: white; 
}

.shortened-instructions {
  max-height: 2em; 
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px; 
  color: white; 
}
</style>