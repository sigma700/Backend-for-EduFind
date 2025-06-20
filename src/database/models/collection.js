import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    school: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "school-searcher",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

collectionSchema.index({ user: 1, school: 1 }, { unique: true });

export const Collection = mongoose.model("Collection", collectionSchema);
if (Collection) {
  console.log("A new  Collection was successfully created");
} else {
  console.log("Failed to create a new collection");
}
