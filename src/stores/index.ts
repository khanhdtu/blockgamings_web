import { useContext, createContext } from 'react'
import { types, Instance, onSnapshot } from 'mobx-state-tree'
import { CurrentUser } from './user'
import { Customers } from './customers'
import { SystemUsers } from './system-users'
import { Affiliates } from './affiliates'
import { Brands } from './brands'
import { Platforms } from './platforms'
import { Currencies } from './currencies'
import { Players } from './players'
import { Registrations } from './registrations'
// import { PaymentManagement } from './payment'
import { Deposits } from './deposits'
import { Transfers } from './transfers'
import { Withdraws } from './withdraws'
import { Wallets } from './wallets'
import { Bets } from './bets'

const RootModel = types.model({
  user: CurrentUser,
  customers: Customers,
  systemUsers: SystemUsers,
  affiliates: Affiliates,
  brands: Brands,
  platforms: Platforms,
  currencies: Currencies,
  players: Players,
  registrations: Registrations,
  bets: Bets,
  deposits: Deposits,
  transfers: Transfers,
  withdraws: Withdraws,
  wallets: Wallets,
})

let initialState = RootModel.create({
  user: {},
  customers: {},
  systemUsers: {},
  affiliates: {},
  brands: {},
  platforms: {},
  currencies: {},
  players: {},
  registrations: {},
  bets: {},
  deposits: {},
  transfers: {},
  withdraws: {},
  wallets: {},
})

const ISSERVER = typeof window === 'undefined'
if (!ISSERVER) {
  // Access localStorage
  const data = localStorage.getItem('rootState')
  if (data) {
    const json = JSON.parse(data)
    if (RootModel.is(json)) {
      initialState = RootModel.create(json)
    }
  }

  onSnapshot(initialState, snapshot => {
    localStorage.setItem('rootState', JSON.stringify(snapshot))
  })
}

export const rootStore = initialState

export type RootInstance = Instance<typeof RootModel>
const RootStoreContext = createContext<null | RootInstance>(null)

export const Provider = RootStoreContext.Provider

export function useMst(): RootInstance {
  const store = useContext(RootStoreContext)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}

export * from './user'
export * from './system-users'
export * from './customers'
export * from './brands'
export * from './affiliates'
export * from './platforms'
export * from './currencies'
export * from './players'
export * from './registrations'
export * from './bets'
export * from './deposits'
export * from './transfers'
export * from './withdraws'
