<template>
  
    

      

    <form @submit.prevent="createRecipe()">
        <section class="row">
            <div class="col-12 d-flex flex-column my-3">
                <label class="mb-2 fs-5 fw-bold" for="">Title</label>
                <input type="text" placeholder="Recipe Title" v-model="editable.title" data-autofocus>
            </div>
              <div class="col-6 d-flex flex-column mb-2">
        <label class="mb-2 fs-5 fw-bold" for="category">Category</label>
        <select id="category" v-model="editable.category">
          <option value="Asian">Asian</option>
          <option value="American">American</option>
          <option value="Italian">Italian</option>
          <option value="French" >French</option>
          <option value="Mexican" >Mexican</option>
          <option value="Fusian" >Fusian</option>
          <option value="Soup">Soup</option>
          <option value="Cheese">Cheese</option>
          <!-- Add more options as needed -->
        </select>
      </div>
            <div class="col-6 d-flex flex-column mb-2">
                <label class="mb-2 fs-5 fw-bold" for="">Recipe Img Url</label>
                <input type="text" placeholder="Recipe Cover Image" v-model="editable.img">
            </div>
            <div class="col-12 d-flex flex-column">
                <label class="mb-2 fs-5 fw-bold" for="">Recipe Instructions</label>
                <textarea class="elevation-5" name="" id="" cols="30" rows="10" placeholder="Instructions..." v-model="editable.instructions"></textarea>
            </div>
        </section>
        <!-- <form @submit.prevent="createIngredient(recipe.id)">
            <section class="row">
                <div class="col-6 d-flex flex-column text-center">
                    <label class="mb-2" for="">Add Ingredients</label>
                    <input type="text" placeholder="carrots...">
                </div>
                <div class="col-6 text-center">
                    <p>Ingredients List</p>
                </div>
            </section>
        </form> -->
        
        <section class="row my-4">
            <div class="d-flex align-items-center gap-3 justify-content-between">
                <button type="button" data-bs-dismiss="modal" class="elevation-5 cancel-button btn btn-danger" aria-label="Close">Cancel</button>
                <button type="submit" class="elevation-5 submit-button btn btn-success" data-bs-dismiss="modal" data-bs-target="#recipeModal">Submit</button>
            </div>
        </section>
    </form>
        
   
</template>


<script>

import { recipesService } from '../services/RecipesService';
import Pop from '../utils/Pop';
import { ref } from 'vue';

export default {
    setup(){
        const editable = ref({})
          
        return {
            editable,

            async createRecipe() {
                try {
                    const formData = editable.value
              
                    await recipesService.createRecipe(formData)
                    editable.value = {}
                   
                } catch (error) {
                    Pop.error('error creating recipe', error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
    .cancel-button {
        border: none;
        background-color: #a04f4f;
    }

    .submit-button {
        margin: 0;
        padding: 5px;
    }

    p {
        margin: 0;
    }

    .modal-header {
        background-color: #4f7d6f;
    }



</style>