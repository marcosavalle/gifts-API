import { types } from './types/collector'
import { querys } from './querys/collector'
import { inputs } from './inputs/collector'
import { mutations } from './mutations/collector'
import { subscriptions } from './subscriptions/collector'

const collectors = `
    ${types}
    ${querys}
    ${inputs}
    ${mutations}
    ${subscriptions}
`

export const typeDefs = collectors
