import { AppState } from "../AppState.js"
import { Recipe, SubscriptionRecipe } from "../models/Recipe.js"
import { Subscriber } from "../models/Subscriber.js"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class RecipesService {
    async getAllRecipies() {
        const res = await api.get('api/recipes')
        logger.log(res.data, "RS, getAllRecipes")
        AppState.recipes = res.data.map(r => new Recipe(r))
        logger.log(AppState.recipes, "RS, getAllRecipes AppStateData")
        AppState.savedRecipes = AppState.recipes

    }

    async setActiveRecipe(recipeId) {
        const res = await api.get(`api/recipes/${recipeId}`)
        logger.log(res.data, 'this is the active recipe')
        AppState.activeRecipe = new Recipe(res.data)
    }

    async searchRecipes(searchTerm) {

        const res = await api.get('api/recipes/', {
            params: {
                query: searchTerm,

            }
        })
        logger.log('[SEARCHING Recipes]', res.data)

        AppState.query = searchTerm


        AppState.recipes = new Recipe(res.data)


    }

    async favoriteRecipe(recipeId) {
        const recipeBody = {
            recipeId: recipeId
        }
        const res = await api.post('api/favorites', recipeBody)

        logger.log(res.data, "RS, favoriteRecipe data")
        this.getMyFavorites()
    }
    async getMyFavorites() {
        const res = await api.get('/account/favorites')

        logger.log(res.data, 'RS, getMyFavorites res.data')

        AppState.favorites = res.data.map(r => new SubscriptionRecipe(r))
        logger.log(AppState.favorites, "RS, getMyFavorites appstate.favorites should i not be mapping this to the subscriptionRecipe?")
    }

    async createRecipe(recipeData) {
        const res = await api.post('api/recipes', recipeData)
        logger.log(res.data)

        AppState.recipes.unshift(new Recipe(res.data))
    }
    async deleteRecipe(recipeId) {
        const res = await api.delete(`api/recipes/${recipeId}`)
        logger.log('deleted', res.data)
        AppState.recipes = AppState.recipes.filter(r => r.id != recipeId)
    }



}

export const recipesService = new RecipesService()