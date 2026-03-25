import { mastercourse } from "../../entities/mastercourse";
import { masterplan } from "../../entities/masterplan";
import { users } from "../../entities/user";
import { createResponse } from "../../helpers/createResponse";
import { uploadFile } from "../../helpers/fileUpload";


// Master Plans 
export const createmasterplan = async (req: any, res: any) => {
  try {
    const { name, desc, credit, price, offer, duration, is_rec, status } = req.body;
    const isExist = await masterplan.findOne({ where: { name } });
    if (isExist) {
      return createResponse(res, false, 400, "Plan already exists", [], true);
    }
    const result = await masterplan.save({ name, desc, credit, price, offer, duration, is_rec, status });
    return createResponse(res, true, 200, "Plan created successfully", result, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};

export const getmasterplan = async (req: any, res: any) => {
  try {
    const result = await masterplan.find({ order: {created_at: "DESC", } });
    return createResponse(res, true, 200, "Plans fetched successfully", result, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};

export const getmasterplanbyid = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const result = await masterplan.findOne({ where: { id } });
    if (!result) {
      return createResponse(res, false, 404, "Plan not found", [], true);
    }
    return createResponse(res, true, 200, "Plan fetched successfully", result, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};

export const updatemasterplan = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, desc, credit, price, offer, duration, is_rec, status } = req.body;
    const result = await masterplan.findOne({ where: { id } });
    if (!result) {
      return createResponse(res, false, 404, "Plan not found", [], true);
    }
    await masterplan.update({ id }, { name, desc, credit, price, offer, duration, is_rec, status });
    const updatedResult = await masterplan.findOne({ where: { id } });
    return createResponse(res, true, 200, "Plan updated successfully", updatedResult, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};

export const deletemasterplan = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const result = await masterplan.findOne({ where: { id } });
    if (!result) {
      return createResponse(res, false, 404, "Plan not found", [], true);
    }
    await masterplan.delete({ id });
    return createResponse(res, true, 200, "Plan deleted successfully", result, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};




// Master Course 
export const createmastercourse = async (req: any, res: any) => {
  try {
    const { title, desc, level, rating, duration, type, status } = req.body;

    if (!req.files || !req.files.thumbnail || !req.files.content) {
      return createResponse(res, false, 400, "Thumbnail and Content required", [], true);
    }

    const thumbnail = req.files.thumbnail;
    const content = req.files.content;
     
    uploadFile(thumbnail, "uploads", (err, thumbName) => {
      if (err) {
        return createResponse(res, false, 500, err, [], true);
      }

      uploadFile(content, "uploads", async (err2, contentName) => {
        if (err2) {
          return createResponse(res, false, 500, err2, [], true);
        }

      try {
        const isExist = await mastercourse.findOne({ where: { title } });

        if (isExist) {
          return createResponse(res, false, 400, "Course already exists", [], true);
        }

        const result = await mastercourse.save({ title, desc, level, rating, duration,  type, status, thumbnail: thumbName, content: contentName, });

        return createResponse(res, true, 200, "Course created successfully", result, false);
      } catch (error: any) {
        return createResponse(res, false, 500, error.message, [], true);
      }
      });
    });

  } catch (error: any) {
    return createResponse(res, false, 500, error.message, [], true);
  }
};

export const getmastercourse = async (req: any, res: any) => {
  try {
    const result = await mastercourse.find({ order: {created_at: "DESC", } });
    return createResponse(res, true, 200, "Courses fetched successfully", result, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};

export const getmastercoursebyid = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const result = await mastercourse.findOne({ where: { id } });
    if (!result) {
      return createResponse(res, false, 404, "Course not found", [], true);
    }
    return createResponse(res, true, 200, "Course fetched successfully", result, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};

export const updatemastercourse = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { title, desc, level, rating, duration, type, status } = req.body;
    const result = await mastercourse.findOne({ where: { id } });
    if (!result) {
      return createResponse(res, false, 404, "Course not found", [], true);
    }
    await mastercourse.update({ id }, { title, desc, level, rating, duration, type, status });
    const updatedResult = await mastercourse.findOne({ where: { id } });
    return createResponse(res, true, 200, "Course updated successfully", updatedResult, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};

export const deletemastercourse = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const result = await mastercourse.findOne({ where: { id } });
    if (!result) {
      return createResponse(res, false, 404, "Course not found", [], true);
    }
    await mastercourse.delete({ id });
    return createResponse(res, true, 200, "Course deleted successfully", result, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};



// Users 
export const getUsers = async (req: any, res: any) => {
  try {
    const result = await users.find({ order: { created_at: "DESC" } });
    return createResponse(res, true, 200, "Users fetched successfully", result, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};