import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Banknote,
  GraduationCap,
  ShieldCheck,
  X,
  Briefcase,
  UserCircle,
  Loader2,
  Mail,
  Phone,
  Globe,
  MapPin,
  ArrowLeft,
  Save,
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
    
    await new Promise((r) => setTimeout(r, 600));

    const allEmployees: Employee[] = JSON.parse(localStorage.getItem("employees") || "[]");
    const updated = allEmployees.map((emp) =>
      emp.id === id ? { ...formData, lastUpdated: new Date().toISOString() } : emp
    );

    localStorage.setItem("employees", JSON.stringify(updated));
    setIsSaving(false);
    toast.success("Changes saved successfully");
    navigate(-1);
  };

  if (!formData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc] text-slate-400 gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
        <span className="font-bold tracking-widest uppercase text-xs">Locating Record...</span>
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
    <div className="p-6 lg:p-12 bg-[#f8fafc] min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 font-bold text-xs uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={16} /> Back to Directory
            </button>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                Edit Profile
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                Update details for <span className="text-slate-900 font-bold">{formData.firstName} {formData.lastName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Employee ID</p>
                <p className="text-sm font-black text-slate-700">{formData.id}</p>
             </div>
             <div className="h-10 w-px bg-slate-200 mx-2 hidden sm:block" />
             <button 
                onClick={() => navigate(-1)}
                className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-rose-500 transition-all hover:border-rose-100 shadow-sm"
              >
                <X size={20} />
              </button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          
          {/* Navigation Tab Bar - Aligned Front (Left) */}
          <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-100">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabKey)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black transition-all duration-200 ${
                    isActive 
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 translate-y-px" 
                      : "text-slate-400 hover:text-slate-600 hover:bg-white"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Form Body */}
          <div className="p-8 lg:p-12 min-h-112.5">
            {activeTab === "personal" && (
              <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-300">
                <TabHeader title="Personal Information" subtitle="Primary contact and identity details" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <EditField label="First Name" value={formData.firstName} onChange={(v) => setFormData({...formData, firstName: v})} />
                  <EditField label="Middle Name" value={formData.middleName || ""} onChange={(v) => setFormData({...formData, middleName: v})} />
                  <EditField label="Last Name" value={formData.lastName} onChange={(v) => setFormData({...formData, lastName: v})} />
                  <EditField label="Email Address" icon={Mail} value={formData.email || ""} onChange={(v) => setFormData({...formData, email: v})} />
                  <EditField label="Contact Number" icon={Phone} value={formData.contactNumber || ""} onChange={(v) => setFormData({...formData, contactNumber: v})} />
                  <EditField label="Nationality" icon={Globe} value={formData.nationality || ""} onChange={(v) => setFormData({...formData, nationality: v})} />
                </div>
                <EditField label="Residential Address" icon={MapPin} value={formData.address || ""} onChange={(v) => setFormData({...formData, address: v})} />
              </div>
            )}

            {activeTab === "identity" && (
              <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-300">
                <TabHeader title="Identity Documents" subtitle="Government issued identifiers" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <EditField label="Citizenship Number" value={formData.citizenshipNumber || ""} onChange={(v) => setFormData({...formData, citizenshipNumber: v})} />
                  <EditField label="PAN Number" value={formData.panNumber || ""} onChange={(v) => setFormData({...formData, panNumber: v})} />
                  <EditField label="Passport Number" value={formData.passportNumber || ""} onChange={(v) => setFormData({...formData, passportNumber: v})} />
                </div>
              </div>
            )}

            {activeTab === "financial" && (
              <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-300">
                <TabHeader title="Financial Information" subtitle="Banking and compensation data" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <EditField label="Monthly Salary" icon={Banknote} value={formData.salary || ""} onChange={(v) => setFormData({...formData, salary: v})} />
                  <div className="hidden md:block"></div>
                  <EditField label="Bank Account Name" value={formData.bankAccountName || ""} onChange={(v) => setFormData({...formData, bankAccountName: v})} />
                  <EditField label="Bank Account Number" value={formData.bankAccountNo || ""} onChange={(v) => setFormData({...formData, bankAccountNo: v})} />
                </div>
              </div>
            )}

            {activeTab === "education" && (
              <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-300">
                <TabHeader title="Education Background" subtitle="Academic and certifications" />
                <div className="grid grid-cols-1 gap-8">
                  <EditField label="Highest Qualification" icon={GraduationCap} value={formData.education || ""} onChange={(v) => setFormData({...formData, education: v})} />
                  <EditField label="Key Training/Certifications" value={formData.training || ""} onChange={(v) => setFormData({...formData, training: v})} />
                </div>
              </div>
            )}

            {activeTab === "experience" && (
              <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-300">
                <TabHeader title="Work Experience" subtitle="Professional history and skills" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <EditField label="Current Role" value={formData.role || ""} onChange={(v) => setFormData({...formData, role: v})} />
                  <EditField label="Department" value={formData.department || ""} onChange={(v) => setFormData({...formData, department: v})} />
                  <EditField label="Total Years Experience" value={formData.totalExperience || ""} onChange={(v) => setFormData({...formData, totalExperience: v})} />
                  <EditField label="Previous Company" value={formData.previousCompany || ""} onChange={(v) => setFormData({...formData, previousCompany: v})} />
                </div>
                <EditField label="Area of Expertise" value={formData.expertise || ""} onChange={(v) => setFormData({...formData, expertise: v})} />
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Experience Details</label>
                  <textarea 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all min-h-35"
                    placeholder="Describe roles and responsibilities..."
                    value={formData.experienceDetails || ""}
                    onChange={(e) => setFormData({...formData, experienceDetails: e.target.value})}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Integrated Action Footer */}
          <div className="px-8 py-6 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Synchronization</span>
              <span className="text-xs text-slate-500 font-medium">
                Last updated: {formData.lastUpdated ? new Date(formData.lastUpdated).toLocaleDateString() : 'Initial Entry'}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate} 
                disabled={isSaving}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-emerald-100 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Save size={20} />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeForm;