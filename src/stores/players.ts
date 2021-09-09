import { types, flow } from 'mobx-state-tree'
import { User } from './user'
import { getPlayers, getPlayerDetails } from '../apis'

export const PlayerDetails = types.model({
  walletId: types.optional(types.string, ''),
  balance: types.optional(types.number, 0),
  walletCreatedAt: types.optional(types.string, ''),
  address: types.optional(types.string, ''),
  payment: types.optional(types.string, ''),
  coinCode: types.optional(types.string, ''),
  tokenCode: types.optional(types.string, ''),
})

export const PlayerUserDetails = types.compose(User, PlayerDetails)

export const Players = types
  .model({
    list: types.optional(types.array(PlayerUserDetails), []),
    currentId: types.optional(types.string, ''),
    isLoading: types.optional(types.boolean, true),
    openDetailsPopup: types.optional(types.boolean, false),
  })
  .views(self => ({
    get currentPlayerDetails() {
      const index = self.list.findIndex(player => player.id === self.currentId)
      return self.list[index]
    },
  }))
  .actions(self => ({
    doFetch() {
      const makeFlow = flow(function* () {
        const res = yield getPlayers()
        if (res && res.data) {
          self.list = res.data
        }
      })
      makeFlow()
    },
    doFetchDetails() {
      const makeFlow = flow(function* () {
        const res = yield getPlayerDetails(self.currentId)
        if (res && res.data) {
          const index = self.list.findIndex(player => player.id === res.data.id)
          const playerDetails = self.list[index]
          if (res.data.address) {
            playerDetails.address = res.data.address.address
            playerDetails.coinCode = res.data.address.coinCode
            playerDetails.tokenCode = res.data.address.tokenCode
            playerDetails.payment = res.data.address.payment
          }
          if (res.data.wallets.length) {
            playerDetails.walletId = res.data.wallets[0].id
            playerDetails.balance = res.data.wallets[0].balance
            playerDetails.walletCreatedAt = res.data.wallets[0].createdAt
          }
        }
      })
      makeFlow()
    },
    doSearch(filter?: string) {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield getPlayers(filter)
        self.isLoading = false
        if (res && res.data) {
          self.list = res.data
        }
      })
      makeFlow()
    },
    doSetCurrentPlayerId(id: string) {
      self.currentId = id
    },
    doOpenDetailsPopup() {
      self.openDetailsPopup = true
    },
    doCloseDetailsPopup() {
      self.openDetailsPopup = false
    },
    doCloseLoading() {
      self.isLoading = false
    },
  }))
