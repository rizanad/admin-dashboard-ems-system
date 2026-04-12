import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Banknote,
  GraduationCap,
  ShieldCheck,
  X,
  Briefcase,
  UserCircle,
} from "lucide-react";
import { toast } from "sonner";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email?: string;
  contactNumber?: string;
  address?: string;
  role?: string;
  department?: string;
  citizenshipNumber?: string;
  panNumber?: string;
  nationality?: string;
  passportNumber?: string;
  salary?: string;
  bankAccountName?: string;
  bankAccountNo?: string;
  education?: string;
  training?: string;
  totalExperience?: string;
  previousCompany?: string;
  expertise?: string;
  experienceDetails?: string;
  lastUpdated?: string;
}

type TabKey = "personal" | "identity" | "financial" | "education" | "experience";

type EditFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: React.ElementType;
};

type TabHeaderProps = {
  title: string;
  subtitle: string;
};

const TabHeader = ({ title, subtitle }: TabHeaderProps) => (
  <div>
    <h2 className="text-xl font-black text-slate-800 tracking-tight">{title}</h2>
    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{subtitle}</p>
  </div>
);

const EditField = ({
  label,
  value,
  onChange,
  placeholder = "",
  icon: Icon,
}: EditFieldProps) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
        />
      )}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all ${
          Icon ? "pl-12" : ""
        }`}
      />
    </div>
  </div>
);

const EditEmployeeForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabKey>("personal");
  const [formData, setFormData] = useState<Employee | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const data: Employee[] = JSON.parse(localStorage.getItem("employees") || "[]");
    const currentEmp = data.find((e) => e.id === id);
    if (currentEmp) setFormData(currentEmp);
  }, [id]);

  const handleUpdate = async () => {
    if (!formData) return;

    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));

    const allEmployees: Employee[] = JSON.parse(localStorage.getItem("employees") || "[]");

    const updated = allEmployees.map((emp) =>
      emp.id === id ? { ...formData, lastUpdated: new Date().toISOString() } : emp
    );

    localStorage.setItem("employees", JSON.stringify(updated));

    setIsSaving(false);
    toast.success("Employee Updated Successfully");
    navigate(`/employee/details/${id}`);
  };

  if (!formData) {
    return (
      <div className="p-10 text-center font-bold text-slate-400">
        Loading Data...
      </div>
    );
  }

  const tabs = [
    { id: "personal", label: "Personal", icon: UserCircle },
    { id: "identity", label: "Identity", icon: ShieldCheck },
    { id: "financial", label: "Financial", icon: Banknote },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: Briefcase },
  ] as const;

  return (
    <div className="p-6 lg:p-10 bg-[#f8fafc] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Manage Employee</h1>
          <p className="text-slate-500 text-sm font-medium">
            Updating records for {formData.firstName} {formData.lastName}
          </p>
        </div>
        <button onClick={() => navigate(-1)}>
          <X />
        </button>
      </div>

      <div className="flex gap-2 mb-8 bg-white p-2 rounded-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-10 rounded-2xl">
        {activeTab === "personal" && (
          <div>
            <TabHeader title="Core Personal Profile" subtitle="Details" />

            <EditField
              label="First Name"
              value={formData.firstName || ""}
              onChange={(v) => setFormData({ ...formData, firstName: v })}
            />

            <EditField
              label="Last Name"
              value={formData.lastName || ""}
              onChange={(v) => setFormData({ ...formData, lastName: v })}
            />
          </div>
        )}
      </div>

      <div className="p-8 flex justify-end">
        <button onClick={handleUpdate} disabled={isSaving}>
          {isSaving ? "Saving..." : "Update Record"}
        </button>
      </div>
    </div>
  );
};

export default EditEmployeeForm;