import { types, flow } from 'mobx-state-tree'
import { getPlatforms } from '../apis'

export const Platform = types.model({
  id: types.optional(types.string, ''),
  name: types.optional(types.string, ''),
  updatedAt: types.optional(types.number, 0),
})

export const Platforms = types
  .model({
    list: types.optional(types.array(Platform), []),
    currentId: types.optional(types.string, ''),
  })
  .views(self => ({
    get currenPlatform() {
      const index = self.list.findIndex(e => e.id === self.currentId)
      return self.list[index]
    },
    get currentPlatformName() {
      return this.currenPlatform?.name
    },
  }))
  .actions(self => ({
    doFetch() {
      const makeFlow = flow(function* () {
        const res = yield getPlatforms()
        if (res && res.data) {
          self.list = res.data
        }
      })
      makeFlow()
    },
  }))
