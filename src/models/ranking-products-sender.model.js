import mongoose from 'mongoose'
const Schema = mongoose.Schema

const rankingProductsSenderSchema = new Schema({
  meliId: {
    type: String,
    index: true
  },
  name: {
    type: String
  },
  image: {
    type: String
  },
  firstChosen: {
    type: Date,
    index: true
  },
  lastChosen: {
    type: Date,
    index: true
  },
  totalChosed: {
    type: Number,
    index: true
  },
  daysAcumulator: {
    type: Number
  },
  daysToChooseDelayAvg: {
    type: Number,
    index: true
  }
})

export const RankingProductsSender = mongoose.model(
  'rankingProductsSender',
  rankingProductsSenderSchema,
  'rankingProductsSenders'
)
