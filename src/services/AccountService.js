import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { SubscriptionRecipe } from '../models/Recipe.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
SubscriptionRecipe

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async getMyFavorites() {
    const res = await api.get('/account/favorites')

    logger.log(res.data, 'RS, getMyFavorites res.data')

    AppState.favorites = res.data.map(r => new SubscriptionRecipe(r))
    logger.log(AppState.favorites, "RS, getMyFavorites appstate.favorites should i not be mapping this to the subscriptionRecipe?")
  }
}

export const accountService = new AccountService()
