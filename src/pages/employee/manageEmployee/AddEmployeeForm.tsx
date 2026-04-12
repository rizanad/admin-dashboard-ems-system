import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User,
  X,
  CheckCircle2,
  Globe,
  Fingerprint,
  MapPin,
  Phone,
  Mail,
  PhoneIcon,
  Calendar,
  Briefcase
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const employeeSchema = z.object({
  firstName: z.string().min(2, "Required"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Required"),
  dob: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Required"),
  education: z.string().min(1, "Required"),

  email: z.string().email("Invalid email"),
  contactNumber: z.string().min(10, "Invalid phone number"),
  address: z.string().min(5, "Address is required"),

  panNumber: z.string().min(5, "Required"),
  citizenshipNumber: z.string().min(5, "Required"),

  role: z.string().min(2, "Required"),
  department: z.string().min(1, "Required"),
  joinDate: z.string().min(1, "Required"),
  status: z.enum(["Active", "On Leave", "Inactive"]),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

const SectionHeader = ({
  icon: Icon,
  title
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <div className="flex items-center gap-2 pb-3 mb-6 border-b border-emerald-100/50">
    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
      <Icon size={18} />
    </div>
    <h2 className="text-lg font-bold text-slate-800">{title}</h2>
  </div>
);

const FormField = ({
  label,
  error,
  children
}: {
  label: string;
  error?: FieldError;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
      {label}
    </label>
    {children}
    {error && (
      <p className="text-[11px] font-medium text-rose-500 mt-1 ml-1">
        {error.message}
      </p>
    )}
  </div>
);

const inputStyles = (error?: FieldError) => `
  w-full px-4 py-2.5 rounded-xl bg-slate-50 border transition-all outline-none text-sm
  ${
    error
      ? "border-rose-200 focus:ring-4 focus:ring-rose-500/5 focus:border-rose-400"
      : "border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white"
  }
`;

const AddEmployeeForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      status: "Active"
    }
  });

  const onSubmit = async (data: EmployeeFormValues) => {
    const existingEmployees = JSON.parse(
      localStorage.getItem("employees") || "[]"
    );

    const newEmployee = {
      ...data,
      id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(
      "employees",
      JSON.stringify([...existingEmployees, newEmployee])
    );

    toast.success("Employee created successfully");
    navigate("/employee");
    reset();
  };

  return (
    <div className="p-6 lg:p-10 bg-[#fcfdfc] min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Onboard Employee
          </h1>
          <p className="text-slate-500 font-medium">
            Create a comprehensive profile for your new team member.
          </p>
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
        <section className="bg-white p-8 rounded-[2rem] border border-emerald-50 shadow-sm">
          <SectionHeader icon={User} title="Personal Information" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField label="First Name" error={errors.firstName}>
              <input {...register("firstName")} className={inputStyles(errors.firstName)} />
            </FormField>

            <FormField label="Middle Name" error={errors.middleName}>
              <input {...register("middleName")} className={inputStyles(errors.middleName)} />
            </FormField>

            <FormField label="Last Name" error={errors.lastName}>
              <input {...register("lastName")} className={inputStyles(errors.lastName)} />
            </FormField>

            <FormField label="Date of Birth" error={errors.dob}>
              <input type="date" {...register("dob")} className={inputStyles(errors.dob)} />
            </FormField>

            <FormField label="Nationality" error={errors.nationality}>
              <div className="relative">
                <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  {...register("nationality")}
                  className={`${inputStyles(errors.nationality)} pl-9`}
                />
              </div>
            </FormField>

            <FormField label="Education Level" error={errors.education}>
              <select {...register("education")} className={inputStyles(errors.education)}>
                <option value="">Select</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PHD">PHD</option>
              </select>
            </FormField>
          </div>
        </section>

        {/* Section 2: Contact Details */}
        <section className="bg-white p-8 rounded-[2rem] border border-emerald-50 shadow-sm">
          <SectionHeader icon={PhoneIcon} title="Contact Details" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Email Address" error={errors.email}>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" {...register("email")} className={`${inputStyles(errors.email)} pl-9`} placeholder="john.doe@company.com" />
              </div>
            </FormField>
            <FormField label="Contact Number" error={errors.contactNumber}>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...register("contactNumber")} className={`${inputStyles(errors.contactNumber)} pl-9`} placeholder="+1 234 567 890" />
              </div>
            </FormField>
            <div className="md:col-span-2">
              <FormField label="Residential Address" error={errors.address}>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-3 text-slate-400" />
                  <textarea {...register("address")} className={`${inputStyles(errors.address)} pl-9 min-h-20 pt-2`} placeholder="Street, City, State, Zip Code" />
                </div>
              </FormField>
            </div>
          </div>
        </section>

        {/* Section 3: Identity & Documents */}
        <section className="bg-white p-8 rounded-[2rem] border border-emerald-50 shadow-sm">
          <SectionHeader icon={Fingerprint} title="Identity & Documents" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="PAN Number" error={errors.panNumber}>
              <input {...register("panNumber")} className={inputStyles(errors.panNumber)} placeholder="ABCDE1234F" />
            </FormField>
            <FormField label="Citizenship Number" error={errors.citizenshipNumber}>
              <input {...register("citizenshipNumber")} className={inputStyles(errors.citizenshipNumber)} placeholder="12-34-56-7890" />
            </FormField>
          </div>
        </section>

        {/* Section 4: Professional Details */}
        <section className="bg-white p-8 rounded-[2rem] border border-emerald-50 shadow-sm">
          <SectionHeader icon={Briefcase} title="Professional Details" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormField label="Job Role" error={errors.role}>
              <input {...register("role")} className={inputStyles(errors.role)} placeholder="Software Engineer" />
            </FormField>
            <FormField label="Department" error={errors.department}>
              <select {...register("department")} className={inputStyles(errors.department)}>
                <option value="">Select Dept</option>
                <option value="Engineering">Engineering</option>
                <option value="HR">HR</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
            </FormField>
            <FormField label="Joining Date" error={errors.joinDate}>
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="date" {...register("joinDate")} className={`${inputStyles(errors.joinDate)} pl-9`} />
              </div>
            </FormField>
            <FormField label="Current Status" error={errors.status}>
              <select {...register("status")} className={inputStyles(errors.status)}>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </FormField>
          </div>
        </section>

        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 flex justify-center z-50">
          <div className="bg-white/80 backdrop-blur-xl border border-emerald-100 p-3 rounded-2xl shadow-2xl flex items-center gap-4">
            <button
              type="button"
              onClick={() => reset()}
              className="flex-1 px-6 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-50"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <CheckCircle2 size={18} />
              )}
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;