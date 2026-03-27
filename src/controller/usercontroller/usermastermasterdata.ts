import { mastercourse } from "../../entities/mastercourse";
import { masterplan } from "../../entities/masterplan";
import { plan } from "../../entities/plan";
import { users } from "../../entities/user";
import { createResponse } from "../../helpers/createResponse";
 

// Dashboard States
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

// Plan
export const userPurchasePlan = async (req: any, res: any) => {
  try {
    const {plan_id}=req.body 
    const user_id=req.user.id 
    await  plan.save({user_id,plan_id})
    const masterplanRes = await masterplan.findOne({  where:{id:plan_id}});
    const userRes=await users.findOne({where:{id:user_id}})
    const finalCredit:any=parseInt(masterplanRes?.credit)+parseInt(userRes?.credit);
    await users.update({id:user_id},{credit:finalCredit})
    return createResponse(res, true, 200, "Plans created  successfully", finalCredit, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
  
}; 
  
export const userPurchasedPlan = async (req: any, res: any) => {
  try {
    const user_id = req.user.id;

    const data = await plan.createQueryBuilder('plan')
      .leftJoinAndSelect(masterplan, "mp", "mp.id = plan.plan_id")
      .where("plan.user_id = :user_id", { user_id })
      .getRawMany();

    return createResponse(res, true, 200, "Plans fetched successfully", data, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};

// Master Course
export const getMasterCourse = async (req: any, res: any) => {
  try {
    const result = await mastercourse.find({ order: {created_at: "DESC", } });
    return createResponse(res, true, 200, "Courses fetched successfully", result, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
}; 

export const userViewCourse = async (req: any, res: any) => {
  try {
    const user_id = req.user.id;
   const user=await users.findOne({where:{id:user_id}});
   const remaingCredit=parseInt(user?.credit);
   if(remaingCredit>0){
    const final:any=remaingCredit-1
   await users.update({id:user_id},{credit:final})
   return createResponse(res, true, 200, "success", [], false);
   }else{
 return createResponse(res, false, 400, "You have insufficient credit please purschase", [], true);
   } 
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};