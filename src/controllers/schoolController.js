import { School } from "../database/models/school.js";

//for getting all the schools

export const getSchools = async (req, res) => {
  try {
    // const { name, type, location, population, fees, system } = req.body;
    const { name } = req.query;

    // If search query exists
    if (name) {
      const schools = await School.findOne({
        name: { $regex: name, $options: "i" },
      });
      return res.json({ success: true, data: schools });
    }

    //else it would return all the schools
    const schoolsData = await School.find();
    res.status(200).json({
      success: true,
      data: schoolsData,
    });
  } catch (error) {
    console.log("There was an error with getting the schools", error.message);
    res.status(500).json({
      success: false,
      data: "Could not get the data",
      error,
    });
  }
};
//for getting school by the id
export const getSChoolByid = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const indivSChool = await School.findById(id);
    if (!indivSChool) {
      throw new Error("School not found");
    }

    res.status(200).json({
      success: true,
      data: indivSChool,
    });
  } catch (error) {
    console.log("Error finding school by id ", error.message);

    res.status(500).json({
      success: false,
      data: "error fetching users",
      error,
    });
  }
};
// finding by search
export const findSchool = async (req, res) => {
  try {
    const { name } = req.query;
    const searchedSchool = await School.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    }).exec();
    console.log("School was found ater searching");
    if (!searchedSchool) {
      return res.status(404).json({
        sucess: false,
        message: "Searched School not found",
        suggestions: await getSearchSuggestions(name),
      });
    }

    return res.status(200).json({
      sucess: true,
      data: searchedSchool,
    });
  } catch (error) {
    console.log("Error finding searched school ", error.message);

    res.status(404).json({
      success: false,
      data: "error fetching users",
      error,
    });
  }
};

//for finding exact search

export const findSchoolExact = async (req, res) => {
  try {
    // Exact match only
    // const searchedArticle = await Blog.find({
    //   name: { $regex: req.query.name, $options: "i" },
    // });

    const school = await School.find({
      name: { $regex: req.query.name, $options: "i" },
    });

    if (!school) {
      throw new Error("Unable to finde searched school");
    }

    res.status(200).json({
      success: true,
      data: school,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
};
//helper for search suggestions

async function getSearchSuggestions(partialName) {
  return await School.find({
    name: { $regex: partialName, $options: "i" },
  })
    .limit(5)
    .select("name -_id"); //only returns names
}

//for filtering the schools so as to show the top 10 schools on the home page rather than all og them
export const rankSchools = async (req, res) => {
  //now to start the ranking process
  try {
    const { name, type, location, population, fee, system } = req.body;

    const rankedSchools = await School.find({
      name,
      type,
      location,
      population,
      fee,
      system,
      rank: { $gte: "1", $lte: "10" },
    });
    res.status(200).json({
      sucess: true,
      message: "Found",
      data: rankedSchools,
    });
  } catch (error) {
    console.log("An error ocurred", error);
    res.status(404).json({
      sucess: false,
      message: "An error occured could not find schools ranked",
    });
  }
};

//for getting all the school categories

export const getCategories = async (req, res) => {
  const { category } = req.params;
  try {
    const categoriedSchools = await School.find({ category: category });

    if (categoriedSchools.length === 0) {
      return res.status(404).json({
        sucess: false,
        message: "Could not find the schools of that category",
      });
    }
    res.status(200).json({
      success: true,
      message: "Here are the categories",
      data: categoriedSchools,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });

    console.log(error.message);
  }
};

//for creating a new school for the admins

export const createSchool = async (req, res) => {
  const { name, location, system, contacts, category, fee } = req.body;

  // Basic validation
  if (!name || !location) {
    return res.status(400).json({
      success: false,
      message: "Name and location are required fields!",
    });
  }

  try {
    // Check if school exists
    const exists = await School.findOne({ name: name });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "School already exists!",
      });
    }

    // Create the school
    const school = await School.create({
      name,
      location,
      system,
      contacts,
      category,
      fee,
    });

    res.status(201).json({
      success: true,
      message: "School created successfully",
      data: school,
    });
  } catch (error) {
    console.error("Error creating school:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create school",
    });
  }
};
