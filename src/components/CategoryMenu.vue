<template>
   <li><span class="dropdown-item text-warning elevation-5 rounded p-1 fw-bolder text-center" >{{recipe.category}}</span></li>
</template>

<script>

import { Recipe } from '../models/Recipe.js'



export default {
     props:{
        recipe: {type: Recipe, reqired: true}
    },
  setup() {

  }
}
</script>
