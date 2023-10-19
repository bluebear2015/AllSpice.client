<template>
<section class="container-fluid">
  <form @submit.prevent="createIngredient()">
  <div class="glassCardHeart p-1 m-1 col-6 d-flex flex-column">
                <label class="m-1 " > <span class="bgGreen text-light elevation-5 rounded fw-bold p-2">name</span></label>
                <input class="elevation-5 rounded m-1" type="text" placeholder="Ingredients" data-autofocus v-model="editable.name" required>
            </div>
            <div class="glassCardHeart m-1 p1 d-flex justify-content-between col-6">
              <div class="">
           
                <label class="text-center bgGreen text-light elevation-5 rounded fw-bold m-1" >Quantity</label>
                <input class="elevation-5 rounded m-1" type="text" placeholder="Quantity" v-model="editable.quantity" required>
           
           <div>
            </div>
</div>
            </div>
            
            <button type="submit" class="elevation-5  bgGreen rounded text-light fw-bolder"><i class="mdi mdi-plus"></i></button>
  </form>
  </section>
</template>

<script>
import { ingredientsService } from '../services/IngredientsService.js'
import Pop from '../utils/Pop.js'
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';


export default {


  setup() {

   const editable = ref({})

    return {
      editable,
ingredients: computed(()=> 
  AppState.ingredients
),

    async createIngredient() {
                try {
                  const recipeId = AppState.activeRecipe.id
                    const formData = editable.value
                    await ingredientsService.createIngredient(formData, recipeId)
                    editable.value = {}
                } catch (error) {
                    Pop.error('Error creating ingredient')
                }
            },


    }
  }
}
</script>
<style>
.bgGreen{
  background-color: #527360;
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
</style>
