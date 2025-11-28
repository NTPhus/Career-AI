import university from "../models/university.model.js";

export const getListUniversity = async (req, res) => {
  // const listUniversity = await university.find().skip(0).limit(25);
  const listUniversity = await university.find();

  res.json(listUniversity);
};

export const searchUniversity = async (req, res) => {
  try {
    const nameSchool = req.body.tenTruong;
    const scoreFrom = Number(req.body.diemtu);
    const scoreTo = Number(req.body.diemden);
    const isValidScoreRange = !isNaN(scoreFrom) && !isNaN(scoreTo);
    const location = Array.isArray(req.body.location) ? req.body.location : [];
    const majorName = Array.isArray(req.body.tenNganh) ? req.body.tenNganh : [];
    const combination = Array.isArray(req.body.combination)
      ? req.body.combination
      : [];

    const query = {};
    let majorConditions = {};
    let projection = {
      _id: 0,
      name: 1,
      location: 1,
      majors: 1,
      admission_reference: 1,
      tuition_fee_link: 1,
    };

    if (nameSchool) {
      const regex = new RegExp(nameSchool, "i");
      query.name = regex;
    }

    if (location.length > 0) {
      query.location = { $in: location };
    }

    const hasMajorParams =
      majorName.length > 0 || combination.length > 0 || isValidScoreRange;

    if (hasMajorParams) {
      if (majorName.length > 0) {
        // 2. Join all names using the pipe (|) operator
        const searchPattern = majorName.join("|");

        // 3. Create a single regex with the case-insensitive flag ('i')
        const caseInsensitiveRegex = new RegExp(searchPattern, "i");

        // 4. Assign the single regex to the 'name' field
        majorConditions.name = { $regex: caseInsensitiveRegex };
      }

      if (combination.length > 0) {
        majorConditions.combinations = { $in: combination };
      }

      if (isValidScoreRange) {
        majorConditions["admissions.thpt.score"] = {
          $gte: scoreFrom,
          $lte: scoreTo,
        };
      }

      query.majors = { $elemMatch: majorConditions };

      projection.majors = { $elemMatch: majorConditions };
    }

    const resultSearch = await university.find(query).select(projection).exec();

    res.status(200).json(resultSearch);
  } catch (error) {
    console.error("Lỗi trong quá trình tìm kiếm:", error);
    res.status(500).json({
      message: "Đã xảy ra lỗi trong quá trình xử lý yêu cầu tìm kiếm.",
      error: error.message,
    });
  }
};
