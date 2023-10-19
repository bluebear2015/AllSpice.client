<template>
<div class="card">
{{favoriteRecipes}}
</div>
</template>
<script>
import { SubscriptionRecipe } from '../models/Recipe.js'
import { Subscriber } from '../models/Subscriber.js'
export default {
    props:{ favoriteRecipes: {type: Subscriber, required: true}},
    
  setup() {
    return {

    }
  }
}
</script>