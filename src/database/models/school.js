//here we will define our schema

import { model, Schema } from "mongoose";

const schoolsSchema = Schema(
  {
    rank: Number,
    name: { type: String, required: true },
    type: { type: String },
    fee: {
      min: Number,
      max: Number,
    },
    location: {
      adress: String,
      city: String,
      county: String,
    },
    description: String,
    images: [String],
    system: [{ type: String }],
    population: { type: String },
    level: { type: String },
    category: { type: String },
  },
  {
    timestamps: true,
  }
);

const School = new model("school-searcher", schoolsSchema);

export { School };
