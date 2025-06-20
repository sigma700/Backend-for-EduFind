// import Collection from "../../../client/new-app/app/routes/collection.js";

import { Collection } from "../database/models/collection.js";
import { School } from "../database/models/school.js";
// import { schoolRouter } from "../routes/v1/schoolRouter.js";

//adding to collection
//HELPER FUNCTION TO ALLOW ADDING TO THE COLLECTION

export const addToCollection = async (req, res) => {
  //finding the user id from the request body
  const { userId } = req.user._id;
  console.log(userId);

  const { schoolId } = req.body;
  console.log(schoolId);

  const newCollection = await Collection.create({
    user: userId,
    school: schoolId,
  });
  if (!newCollection) {
    throw new Error("Failed to create a new collection");
  } else {
  }
};
//logic for getting the user collection

export const getCollection = async (req, res) => {
  try {
    const userId = req.user._id;
    const collection = await Collection.find({ user: userId }) //nice
      .populate({
        path: "school",
        select: "name  description  images  type",
      });

    //debugging
    // const rawData = await Collection.find({ user: userId }).lean();
    // if (rawData) {
    //   console.log(rawData);
    // } else {
    //   console.log("Could not find the rawdata");
    // }

    res.status(200).json({
      success: true,
      data: collection,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Failed to fetch collections",
    });
  }
};

//logic for removing from the collection

export const removeFromCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const deletedItem = await Collection.findOneAndDelete({
      //filter the school field to return an Array without the given id
      //findone and then filter using the id // eg deletedItem.filter(id){
      //}
      _id: id,
      user: userId,
    });
    if (!deletedItem) {
      //TODO:CLEAN UP THE ERRORS
      throw Error("Could not remove collection");
    }
    res.status(200).json({
      success: true,
      data: deletedItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove from collection",
    });
  }
};
