import mongoose from "mongoose"

export const dataPlotSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
  title: String,
})

export const DataPlotModel = mongoose.model("dataplots", dataPlotSchema)
