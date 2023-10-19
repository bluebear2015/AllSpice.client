<template>
<div class="d-flex">
<router-link class="lighten-30 selectable" :to="{ name: 'Home' }">
  <div class="btn btn-dark text-light glassCard5  fw-bolder p-1">HOME<i class="m-1 mdi mdi-home"></i></div>
    </router-link>

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Edit Account
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog ">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Account</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <accountForm/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

    </div>
    <section class="d-flex">
    <div class=" col-6">
  <div class="c">
      <div class="card-body">
        <div class="profile-card mb-2 text-center">
          <p class="text-center mb-0">
            <img :src="account.picture" alt="account.name"
              class=" border border-3 border-warning rounded-circle account-picture img-fluid">
            <!-- <img :src="account.coverImg" alt="account.name"
            class="border border-3 border-warning cImage img-fluid rounded-circle"> -->
          </p>
        </div>
        <h5 class="p-2 text-center border border-bottom border-warning bg-dark text-light fw-bolder border-3 rounded-pill">{{ account.name
        }}</h5>
        <p class="border border-bottom border-warning bg-dark text-light border-3 rounded">
          <span class="fs-5 text-bold text-danger ">Bio:</span>
        <h4> {{ account.bio }} </h4>
        </p>
        <!-- FIXME missing github and resume DOUBLE check the readme for this checkpoint, it has a link the account model with everything in it. IT ALL needs to be here. -->

        <p class="border border-bottom border-warning bg-dark text-light border-3 rounded">
          <span class="fs-5 text-bold text-danger">Email:</span> <u class="fw-bolder"> {{ account.email }}</u>
        </p>
        <p class="border border-bottom border-warning bg-dark text-light border-3 rounded">
          <span class="fs-5 text-bold text-danger">Class:</span> <u class="fw-bolder"> {{ account.class }} late Summer 2023</u>
        </p>
        <p class="border border-bottom border-warning bg-dark text-light border-3 rounded">
          <span class="fs-5 text-bold text-danger">Graduated:</span> <u class="fw-bolder"> {{ account.graduated }}</u>
        </p>
        <p class="border border-bottom border-warning bg-dark text-light border-3 rounded">
          <span class="fs-5 text-bold text-danger">Github:</span> <u class="fw-bolder"> {{ account.github }}
            http//github.com/bluebear2015</u>
        </p>

        <!-- <li>
       
    <span class="fs-5 text-bold">Alumni:</span>    <u>  {{ account.alumni }} </u>
       </li> -->
      </div>
  </div>
  </div>
  <div>
   <div class="">
    <div  class=" m-1 p-2 favsHeight" v-for="myFavs in subscription" :key="myFavs.id">
      <div type="button"  @click="setActiveRecipe(myFavs.id)" data-bs-toggle="modal" data-bs-target="#activeRecipeModal" class="favsHeight card" :style="{ backgroundImage: `url(${myFavs.img})` }">
    <div class="text p-1"> <span class="glassCard5 fw-bolder text-light fs-5 fst-italic">
                  <span class="text-warning"> # </span>{{ myFavs.category }}</span></div>
                 

<div class="glassCard5 col-6 p-1 fw-bolder text-light fs-5 fst-italic"> <span class="text-danger"> ♥️ </span> {{myFavs.title}} 
    </div>
<!-- <div class="card elevation-5">
  {{MyFaves.title}}
</div> -->
    
  </div>
  </div>
</div>
</div>
</section>
<div class="modal fade" id="activeRecipeModal" data-bs-backdrop="static" 
data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" 
aria-hidden="true">

  <div class="modal-dialog modal-xl ">
   <div class="modal-content glassCard3">
      <div class="d-flex justify-content-between">
        
            <div class="glassCardHeart2 p-1">
              <i class="heart mdi mdi-heart bg-warning" style="display: flex; justify-content: center; align-items: center;"></i>
           
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
import { AppState } from '../AppState';
import Pop from '../utils/Pop.js';
import { recipesService } from '../services/RecipesService.js';
import FavoritesCard from '../components/FavoritesCard.vue';
import { ingredientsService } from '../services/IngredientsService.js';
import AccountForm from '../components/AccountForm.vue';

// import { accountService } from '../services/AccountService.js';


export default {
  components: { AccountForm },
 
  setup() {

async function getMyFavorites(){
  try {
    await recipesService.getMyFavorites();
  } catch (error) {
    Pop.error(error, "AP, getMyFavorites")
  }
}

    return {
      getMyFavorites,
      subscription: computed(()=> AppState.favorites),
      account: computed(() => AppState.account),
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
activeRecipe: computed(()=> AppState.activeRecipe),
    }
    }
  }

</script>

<style scoped>
img {
  max-width: 100px;
}
.glassCard5{
    background: rgba(21, 22, 41, 0.809);
border-radius: 6px;

backdrop-filter: blur(6.4px);
-webkit-backdrop-filter: blur(6.4px);


}
.favsHeight{
  min-height: 400px;
}


</style>
