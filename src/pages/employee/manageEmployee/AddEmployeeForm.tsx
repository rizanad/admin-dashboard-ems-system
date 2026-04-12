
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  User, Briefcase, ShieldCheck, X, 
  CheckCircle2, MapPin, 
  Globe
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type EmployeeFormValues = z.infer<typeof employeeSchema>


const employeeSchema = z.object({
  // Personal Info
  firstName: z.string().min(2, "Required"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Required"),
  dob: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Required"),
  education: z.string().min(1, "Required"),
  
  // Contact & Address
  email: z.string().email("Invalid email"),
  contactNumber: z.string().min(10, "Invalid phone number"),
  address: z.string().min(5, "Address is required"),
  
  // Identification
  panNumber: z.string().min(5, "Required"),
  citizenshipNumber: z.string().min(5, "Required"),
  
  // Job Info
  role: z.string().min(2, "Required"),
  department: z.string().min(1, "Required"),
  joinDate: z.string().min(1, "Required"),
  status: z.enum(["Active", "On Leave", "Inactive"]),
});

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 pb-3 mb-6 border-b border-emerald-100/50">
    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
      <Icon size={18} />
    </div>
    <h2 className="text-lg font-bold text-slate-800">{title}</h2>
  </div>
);

const FormField = ({ label, error, children }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
      {label}
    </label>
    {children}
    {error && <p className="text-[11px] font-medium text-rose-500 mt-1 ml-1">{error.message}</p>}
  </div>
);

const inputStyles = (error:FieldError) => `
  w-full px-4 py-2.5 rounded-xl bg-slate-50 border transition-all outline-none text-sm
  ${error 
    ? "border-rose-200 focus:ring-4 focus:ring-rose-500/5 focus:border-rose-400" 
    : "border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white"
  }
`;

const AddEmployeeForm = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: { status: "Active" }
  });

  const onSubmit = async (data:EmployeeFormValues) => {
    const existingEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
  
    const newEmployee = {
      ...data,
      id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`, 
      createdAt: new Date().toISOString(),
    };
  
    const updatedList = [...existingEmployees, newEmployee];
    localStorage.setItem("employees", JSON.stringify(updatedList));
  
    navigate("/employees")
    toast.success("Employee created sucessfully")
    reset();
  };

  return (
    <div className="p-6 lg:p-10 bg-[#fcfdfc] min-h-screen">
     
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Onboard Employee</h1>
          <p className="text-slate-500 font-medium">Create a comprehensive profile for your new team member.</p>
        </div>
        <button 
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-slate-900 transition-all font-bold"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform" />
          Close
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 pb-20">
        
        {/* SECTION 1: Personal Details */}
        <section className="bg-white p-8 rounded-[2rem] border border-emerald-50 shadow-sm">
          <SectionHeader icon={User} title="Personal Information" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField label="First Name" error={errors.firstName}>
              <input {...register("firstName")} className={inputStyles(errors.firstName)} placeholder="John" />
            </FormField>
            <FormField label="Middle Name" error={errors.middleName}>
              <input {...register("middleName")} className={inputStyles(errors.middleName)} placeholder="Quincy" />
            </FormField>
            <FormField label="Last Name" error={errors.lastName}>
              <input {...register("lastName")} className={inputStyles(errors.lastName)} placeholder="Doe" />
            </FormField>
            <FormField label="Date of Birth" error={errors.dob}>
              <input type="date" {...register("dob")} className={inputStyles(errors.dob)} />
            </FormField>
            <FormField label="Nationality" error={errors.nationality}>
              <div className="relative">
                <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...register("nationality")} className={`${inputStyles(errors.nationality)} pl-9`} placeholder="e.g. Nepali" />
              </div>
            </FormField>
            <FormField label="Education Level" error={errors.education}>
              <select {...register("education")} className={inputStyles(errors.education)}>
                <option value="">Select Level</option>
                <option value="Bachelors">Bachelors Degree</option>
                <option value="Masters">Masters Degree</option>
                <option value="PHD">PHD</option>
                <option value="Other">Other</option>
              </select>
            </FormField>
          </div>
        </section>

        {/* SECTION 2: Contact & Identification */}
        <section className="bg-white p-8 rounded-[2rem] border border-emerald-50 shadow-sm">
          <SectionHeader icon={ShieldCheck} title="Contact & Identification" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2">
              <FormField label="Home Address" error={errors.address}>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input {...register("address")} className={`${inputStyles(errors.address)} pl-9`} placeholder="Street 12, Kathmandu" />
                </div>
              </FormField>
            </div>
            <FormField label="Email" error={errors.email}>
              <input {...register("email")} className={inputStyles(errors.email)} placeholder="john@company.com" />
            </FormField>
            <FormField label="Contact Number" error={errors.contactNumber}>
              <input {...register("contactNumber")} className={inputStyles(errors.contactNumber)} placeholder="+977 98XXXXXXXX" />
            </FormField>
            <FormField label="PAN Number" error={errors.panNumber}>
              <input {...register("panNumber")} className={inputStyles(errors.panNumber)} placeholder="123456789" />
            </FormField>
            <FormField label="Citizenship Number" error={errors.citizenshipNumber}>
              <input {...register("citizenshipNumber")} className={inputStyles(errors.citizenshipNumber)} placeholder="01-XX-XX-XXXXX" />
            </FormField>
          </div>
        </section>

        {/* SECTION 3: Employment Details */}
        <section className="bg-white p-8 rounded-[2rem] border border-emerald-50 shadow-sm">
          <SectionHeader icon={Briefcase} title="Employment Details" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormField label="Designation" error={errors.role}>
              <input {...register("role")} className={inputStyles(errors.role)} placeholder="Software Engineer" />
            </FormField>
            <FormField label="Department" error={errors.department}>
              <select {...register("department")} className={inputStyles(errors.department)}>
                <option value="">Select Department</option>
                <option value="IT">IT & Systems</option>
                <option value="HR">Human Resources</option>
                <option value="Accounts">Accounts</option>
              </select>
            </FormField>
            <FormField label="Joining Date" error={errors.joinDate}>
              <input type="date" {...register("joinDate")} className={inputStyles(errors.joinDate)} />
            </FormField>
            <FormField label="Status" error={errors.status}>
              <select {...register("status")} className={inputStyles(errors.status)}>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </FormField>
          </div>
        </section>

        {/* Floating Footer Actions */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 flex justify-center z-50">
          <div className="bg-white/80 backdrop-blur-xl border border-emerald-100 p-3 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[320px]">
            <button
              type="button"
              onClick={() => reset()}
              className="flex-1 px-6 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-all text-sm"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-2 flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <CheckCircle2 size={18} />
              )}
              {isSubmitting ? "Onboarding..." : "Confirm & Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;