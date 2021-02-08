import mongoose from 'mongoose'
const Schema = mongoose.Schema

const rankingCategoriesSenderSchema = new Schema({
  meliId: {
    type: String,
    index: true
  },
  name: {
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

export const RankingCategoriesSender = mongoose.model(
  'rankingCategoriesSender',
  rankingCategoriesSenderSchema,
  'rankingCategoriesSenders'
)
