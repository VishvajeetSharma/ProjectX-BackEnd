import ResetPasswordForm from "../../components/common/ResetPasswordForm";
import { adminForgetPasswordService } from "../../services";
import { showALert } from "../../utils";
import DashboardLayout from "../../layout/DashboardLayout";

const AdminResetPassword = () => {
  const handleFormData = async (data: any) => {
    try {
      const res = await adminForgetPasswordService({ email: data.email });
      if (res.success) {
        showALert("Reset Password", res.message, "success");
      } else {
        showALert("Reset Password", res.message, "error");
      }
    } catch (err: any) {
      showALert("Reset Password", err?.response?.data?.message || "Internal Server Error", "error");
    }
  };

  return (
    <DashboardLayout>
      <div className="container-fluid py-3 px-4 overflow-hidden">
        <div className="row">
          <div className="col-lg-12 mx-auto">
            <h2 className="fw-bold">Reset Password</h2>
            <ResetPasswordForm onSubmit={handleFormData} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminResetPassword;
