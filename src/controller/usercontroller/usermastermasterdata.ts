import { mastercourse } from "../../entities/mastercourse";
import { masterplan } from "../../entities/masterplan";
import { plan } from "../../entities/plan";
import { users } from "../../entities/user";
import { createResponse } from "../../helpers/createResponse";
 
 

export const usergetmasterplan = async (req: any, res: any) => {
  try {
    const result = await masterplan.find({  where:{status:1}});
    return createResponse(res, true, 200, "Plans fetched successfully", result, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
}; 

export const userPurchaseplan = async (req: any, res: any) => {
  try {
    const {user_id,plan_id}=req.body 
    await  plan.save({user_id,plan_id})
   const masterplanRes = await masterplan.findOne({  where:{id:plan_id}});
   const userRes=await users.findOne({where:{id:user_id}})
   const finalCredit:any=parseInt(masterplanRes?.credit)+parseInt(userRes?.credit);
    await users.update({id:user_id},{credit:finalCredit})
    return createResponse(res, true, 200, "Plans fetched successfully", finalCredit, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
  
}; 
// Master Course 
  
export const getmastercourse = async (req: any, res: any) => {
  try {
    const result = await mastercourse.find({ order: {created_at: "DESC", } });
    return createResponse(res, true, 200, "Courses fetched successfully", result, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
}; 
export const getDashboardStats = async (req: any, res: any) => {
  try {
    const totalUsers = await users.count();
    const activeUsers = await users.count({ where: { status: 1 } });

    const totalPlans = await masterplan.count();
    const activePlans = await masterplan.count({ where: { status: 1 } });

    const totalCourses = await mastercourse.count();
    const activeCourses = await mastercourse.count({ where: { status: 1 } });

    // Mocking monthly data for the graph (can be improved with actual query)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const graphData = months.map((month) => ({
      name: month,
      users: Math.floor(Math.random() * 100),
      courses: Math.floor(Math.random() * 20),
    }));

    return createResponse(res, true, 200, "Dashboard stats fetched successfully", {
      users: { total: totalUsers, active: activeUsers },
      plans: { total: totalPlans, active: activePlans },
      courses: { total: totalCourses, active: activeCourses },
      graphData
    }, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};