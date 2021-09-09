import { types, flow } from 'mobx-state-tree'
import { IBetArgs, getBets, getWinners, getMonthlyProfits } from '../apis'

export const Bet = types.model({
  id: types.optional(types.string, ''),
  username: types.optional(types.string, ''),
  gameId: types.optional(types.string, ''),
  balance: types.optional(types.number, 0),
  amount: types.optional(types.number, 0),
  currency: types.optional(types.string, ''),
  type: types.optional(types.string, ''),
  system: types.optional(types.frozen(), ''),
  createdAt: types.optional(types.number, 0),
})

export const Winner = types.model({
  username: types.optional(types.string, ''),
  totalBet: types.optional(types.number, 0),
})

export const Profit = types.model({
  credit: types.optional(types.number, 0),
  debit: types.optional(types.number, 0),
  profit: types.optional(types.number, 0),
})

export const Bets = types
  .model({
    list: types.optional(types.array(Bet), []),
    profit: types.optional(Profit, {}),
    winners: types.optional(types.array(Winner), []),
    isLoading: types.optional(types.boolean, false),
    currentPage: types.optional(types.number, 0),
    currentRecord: types.optional(types.number, 20),
    currentSearch: types.optional(types.string, ''),
    totalPages: types.optional(types.number, 0),
  })
  //   .views(self => ({}))
  .actions(self => ({
    doFetch(args?: IBetArgs | any) {
      const makeFlow = flow(function* () {
        self.currentSearch = args
        self.isLoading = true
        const res = yield getBets({ limit: self.currentRecord, skip: self.currentPage * self.currentRecord }, args)
        if (res && res.data) {
          self.list = res.data.list
          self.totalPages = res.data.count
        }
        self.isLoading = false
      })
      makeFlow()
    },
    doFechWinners() {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield getWinners()
        if (res && res.data) {
          self.winners = res.data.list
        }
        self.isLoading = false
      })
      makeFlow()
    },
    doFetchProfits() {
      const makeFlow = flow(function* () {
        self.isLoading = true
        const res = yield getMonthlyProfits()
        if (res && res.data) {
          self.profit = res.data
        }
        self.isLoading = false
      })
      makeFlow()
    },
    doUpdateRecord(record: number) {
      self.currentRecord = record
      this.doFetch(self.currentSearch)
    },
    doReset() {
      self.isLoading = true
      self.currentSearch = ''
      self.currentPage = 0
      this.doFetch()
    },
    doNext() {
      self.currentPage++
      this.doFetch(self.currentSearch)
    },
    doPrev() {
      if (self.currentPage) {
        self.currentPage--
        this.doFetch(self.currentSearch)
      }
    },
  }))
