<template>
  <!-- <button class="button-class rounded-circle d-flex align-items-center justify-content-center" data-bs-toggle="modal" data-bs-target="#recipeModal">
     
    </button> -->

<!-- Button trigger modal -->
<div class="d-flex justify-content-evenly p-2">
  <span v-if="user.isAuthenticated">
<button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
     <i class="mdi mdi-plus"></i>
</button>
     </span>

<router-link class="lighten-30 selectable" :to="{ name: 'Account' }">
  <div class="btn btn-dark text-light glassCard5  fw-bolder p-1">Account   <i class="m-1 mdi mdi-account"></i></div>
    </router-link>

  <span v-if="user.isAuthenticated">
      <button type="button" class="btn btn-dark" @click="toggleMyRecipesFilter">
        <i class="mdi mdi-silverware-fork-knife"></i>  {{ myRecipesButtonLabel }}
      </button>
    </span>



<!-- <div class="dropdown">
  <button class="btn btn-dark text-light glassCard5 lighten-30 selectable fw-bolder dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Category   <i class="mdi mdi-magnify"></i>
  </button>
  <ul   class="dropdown-menu dropMenu2 bg-dark" aria-labelledby="dropdownMenuButton1">
    <li>
     
          <option class="dropdown-item text-warning elevation-5 rounded p-1 fw-bolder text-center" value="Option 1">Asian</option>
          <option class="dropdown-item text-warning elevation-5 rounded p-1 fw-bolder text-center" value="Option 2">American</option>
          <option class="dropdown-item text-warning elevation-5 rounded p-1 fw-bolder text-center" value="Option 3">Italian</option>
          <option class="dropdown-item text-warning elevation-5 rounded p-1 fw-bolder text-center" value="Option 4" >French</option>
          <option class="dropdown-item text-warning elevation-5 rounded p-1 fw-bolder text-center" value="Option 5" >Mexican</option>
          <option class="dropdown-item text-warning elevation-5 rounded p-1 fw-bolder text-center" value="Option 6" >Fusian</option>
          <option class="dropdown-item text-warning elevation-5 rounded p-1 fw-bolder text-center" value="Option 7">Soup</option>
          <option class="dropdown-item text-warning elevation-5 rounded p-1 fw-bolder text-center" value="Option 8">Cheese</option>
        </li>
  <categoryMenu :recipe="r"/>
  </ul>
</div> -->
<div class="dropdown ">
  <button class="btn btn-dark text-light glassCard5 lighten-30 selectable fw-bolder dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
       Category   <i class="mdi mdi-magnify"></i>
  </button>
  <div class="dropdown-menu dropMenu rounded bg-dark p-2" aria-labelledby="dropdownMenuButton1">
    <searchBar/>
    <!-- <form @submit.prevent="searchRecipes()" >

        <div class="d-flex m-2">

          <input class="w-100 rounded text-danger fw-bold elevation-5 fs-4" type="text" v-model="search"
            placeholder="Search" />

        </div>
                    <div type="submit" class="btn bgGreen m-1">
 <i class="mdi mdi-magnify"></i>
</div>
      </form> -->
  </div>
</div>

           <!-- <div class="btn btn-dark text-light glassCard5 lighten-30 selectable fw-bolder">ABOUT<i class="m-1 mdi mdi-information-outline"></i></div>
           -->
</div>
<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content glassCard">
      
        <h3 class="modal-title text-center bgGreen text-light fw-bold elevation-5 rounded m-1" id="staticBackdropLabel">Create New Recipe</h3>
       
      
      <div class="modal-body">
        <RecipeModal/>
      </div>
    
    </div>
  </div>
</div>


<section>
  <div class="row d-flex ">
<div class="col-md-12 col-lg-4" v-for="r in filteredRecipes" :key="r.id">
<RecipeCard :recipe="r"/>
</div>
  </div>
</section>
</template>

<script>

import { recipesService } from '../services/RecipesService';
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js'
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import { ref } from 'vue';
import CategoryMenu from '../components/CategoryMenu.vue';

export default {

  setup() {
const search = ref('')
 const showSubscribedFilter = ref(false);


async function getMyFavorites(){
  try {
    await recipesService.getMyFavorites();
  } catch (error) {
    Pop.error(error, "AP, getMyFavorites")
  }
}
    async function getAllRecipes() {
      try {
        await recipesService.getAllRecipies();
} catch (error) {
        Pop.error(error, "HP, getAllRecipies");
      }

    }
  onMounted(()=>{
        getAllRecipes();
      
      });

      const toggleMyRecipesFilter = () => {
      showSubscribedFilter.value = !showSubscribedFilter.value;
    };

      const filteredRecipes = computed(() => {
      if (showSubscribedFilter.value) {
        return AppState.favorites;
      } else {
        return AppState.recipes;
      }
    });
     const myRecipesButtonLabel = computed(() => {
      return showSubscribedFilter.value ? "All Recipes" : "My Recipes";
    });


    return {
      search,
      myRecipesButtonLabel,
   user: computed(() => AppState.user),
    recipes: computed(()=> AppState.recipes),
    subscribed: computed(()=> AppState.favorites),
    toggleMyRecipesFilter,
      filteredRecipes,


    
     async searchRecipes() {
        try {
          const searchTerm = search.value
          logger.log('searching Recipes', searchTerm)
          await recipesService.searchRecipes(searchTerm)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
   
   
   
   }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}    .bgGreen{
  background-color: #46733ef7;
}
.dropMenu {
  min-width:400px;
}

.dropMenu2 {
  min-width:250px;
}


   .button-class {
        height: 4rem;
        aspect-ratio: 1/1;
        background-color: #4f7d6f;
        color: white;
        border: none;
    }

   

        .glassCard{
    background: rgba(225, 231, 217, 0.904);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(6.4px);
-webkit-backdrop-filter: blur(6.4px);
border: 7px solid rgba(146, 197, 83, 0.726);
border-color: #969aab;

}
</style>

//FIXME the delete method for deleating a recipe needs to be more reactive
//FIXME the favoriteRecipe method needs to work... gunna have to ask for help on this one.
//FIXME why cant i get all ingredients... ot should be right there... ask for help
