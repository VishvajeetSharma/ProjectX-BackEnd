import { masterplan } from "../../entities/masterplan";
import { createResponse } from "../../helpers/createResponse";

export const createmasterplan = async (req: any, res: any) => {
  try {
    const { name, desc, credit, price, offer, duration, is_rec, status } =   req.body;
    const isExist = await masterplan.findOne({ where: { name } });
    if(isExist){
      return createResponse(res, false, 400, "Plan already exists", [], true);
    }else{
      const result= await masterplan.save( { name, desc, credit, price, offer, duration, is_rec, status } )
       return createResponse(res, true, 200, "Plan created successfully",result, false);
    }
  } catch (error) {
    return createResponse(res, false, 500, "Internal Server Error", [], true);
  }
};
export const getmasterplan = async (req: any, res: any) => {
  try { 
    const result = await masterplan.find(); 
       return createResponse(res, true, 200, "Plan fetched successfully",result, false);
    } catch (error) {
    return createResponse(res, false, 500, "Internal Server Error", [], true);
  }
};