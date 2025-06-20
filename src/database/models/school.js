//here we will define our schema

import { model, Schema } from "mongoose";

const schoolsSchema = Schema(
  {
    rank: Number,
    name: { type: String, required: true },
    type: { type: String, required: true },
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
    system: [{ type: String, required: true }],
    population: { type: String, required: true },
    level: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const School = new model("school-searcher", schoolsSchema);

export { School };
