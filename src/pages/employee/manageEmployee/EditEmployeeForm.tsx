import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Banknote,
  GraduationCap,
  ShieldCheck,
  X,
  CheckCircle2,
  CreditCard,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  UserCircle,
} from "lucide-react";
import { toast } from "sonner";

const EditEmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState("identity");

  // Data State
  const [formData, setFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees") || "[]");
    const currentEmp = data.find((e) => e.id === id);
    if (currentEmp) {
      setFormData(currentEmp);
    }
  }, [id]);

  const handleUpdate = async () => {
    setIsSaving(true);

    // Simulate slight delay for professional feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    const allEmployees = JSON.parse(localStorage.getItem("employees") || "[]");

    // Update logic: find index and replace
    const updatedEmployees = allEmployees.map((emp) =>
      emp.id === id
        ? { ...formData, lastUpdated: new Date().toISOString() }
        : emp
    );

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setIsSaving(false);
    navigate(`/employee/details/${id}`);
    toast.success("Employee Updated Successfully")
  };

  if (!formData)
    return (
      <div className="p-10 text-center font-bold text-slate-400">
        Loading Data...
      </div>
    );

  const tabs = [
    { id: "personal", label: "Personal", icon: UserCircle },
    { id: "identity", label: "Identity", icon: ShieldCheck },
    { id: "financial", label: "Financial", icon: Banknote },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: Briefcase },
  ];

  return (
    <div className="p-6 lg:p-10 bg-[#f8fafc] min-h-screen">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Manage Employee
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Updating records for {formData.firstName} {formData.lastName}
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Form Content */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden mb-8 transition-all">
          <div className="p-10">

          {activeTab === "personal" && (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
    <TabHeader 
      title="Core Personal Profile" 
      subtitle="Primary identification and contact details" 
    />
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Name Fields */}
      <EditField 
        label="First Name" 
        value={formData.firstName || ""} 
        onChange={(v) => setFormData({...formData, firstName: v})} 
      />
      <EditField 
        label="Middle Name" 
        value={formData.middleName || ""} 
        onChange={(v) => setFormData({...formData, middleName: v})} 
      />
      <EditField 
        label="Last Name" 
        value={formData.lastName || ""} 
        onChange={(v) => setFormData({...formData, lastName: v})} 
      />

      {/* Contact Info */}
      <EditField 
        label="Email Address" 
        value={formData.email || ""} 
        onChange={(v) => setFormData({...formData, email: v})} 
        icon={Mail}
      />
      <EditField 
        label="Phone Number" 
        value={formData.contactNumber || ""} 
        onChange={(v) => setFormData({...formData, contactNumber: v})} 
        icon={Phone}
      />

      {/* Residence */}
      <div className="md:col-span-2">
        <EditField 
          label="Residential Address" 
          value={formData.address || ""} 
          onChange={(v) => setFormData({...formData, address: v})} 
          icon={MapPin}
        />
      </div>

      {/* Role & Status (Direct Edit) */}
      <EditField 
        label="Job Title / Role" 
        value={formData.role || ""} 
        onChange={(v) => setFormData({...formData, role: v})} 
      />
      <EditField 
        label="Department" 
        value={formData.department || ""} 
        onChange={(v) => setFormData({...formData, department: v})} 
      />
    </div>
  </div>
)}



            {activeTab === "identity" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <TabHeader
                  title="Identification Details"
                  subtitle="National IDs and Citizenship information"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EditField
                    label="Citizenship Number"
                    value={formData.citizenshipNumber || ""}
                    onChange={(v) =>
                      setFormData({ ...formData, citizenshipNumber: v })
                    }
                    icon={ShieldCheck}
                  />
                  <EditField
                    label="PAN Number"
                    value={formData.panNumber || ""}
                    onChange={(v) => setFormData({ ...formData, panNumber: v })}
                    icon={CreditCard}
                  />
                  <EditField
                    label="Nationality"
                    value={formData.nationality || ""}
                    onChange={(v) =>
                      setFormData({ ...formData, nationality: v })
                    }
                  />
                  <EditField
                    label="Passport Number (Optional)"
                    value={formData.passportNumber || ""}
                    onChange={(v) =>
                      setFormData({ ...formData, passportNumber: v })
                    }
                  />
                </div>
              </div>
            )}

            {activeTab === "financial" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <TabHeader
                  title="Payroll & Banking"
                  subtitle="Salary breakdown and disbursement details"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EditField
                    label="Monthly Basic Salary (NPR)"
                    placeholder="e.g. 50000"
                    value={formData.salary || ""}
                    onChange={(v) => setFormData({ ...formData, salary: v })}
                    icon={Banknote}
                  />
                  <EditField
                    label="Bank Account Name"
                    value={formData.bankAccountName || ""}
                    onChange={(v) =>
                      setFormData({ ...formData, bankAccountName: v })
                    }
                  />
                  <div className="md:col-span-2">
                    <EditField
                      label="Bank Account Number"
                      placeholder="001XXXXXXXXXXXXX"
                      value={formData.bankAccountNo || ""}
                      onChange={(v) =>
                        setFormData({ ...formData, bankAccountNo: v })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "education" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <TabHeader
                  title="Qualifications"
                  subtitle="Academic history and certifications"
                />
                <div className="space-y-6">
                  <EditField
                    label="Highest Education Level"
                    value={formData.education || ""}
                    onChange={(v) => setFormData({ ...formData, education: v })}
                  />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Training & Skills Summary
                    </label>
                    <textarea
                      className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      rows={5}
                      placeholder="Describe professional training..."
                      value={formData.training || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, training: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "experience" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <TabHeader
                  title="Professional Background"
                  subtitle="Past work history and industry expertise"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Total Experience */}
                  <EditField
                    label="Total Years of Experience"
                    placeholder="e.g. 5 Years"
                    value={formData.totalExperience || ""}
                    onChange={(v) =>
                      setFormData({ ...formData, totalExperience: v })
                    }
                    icon={Briefcase}
                  />

                  {/* Previous Company */}
                  <EditField
                    label="Last Organization"
                    placeholder="Company Name"
                    value={formData.previousCompany || ""}
                    onChange={(v) =>
                      setFormData({ ...formData, previousCompany: v })
                    }
                  />

                  {/* Expertise / Primary Skill */}
                  <div className="md:col-span-2">
                    <EditField
                      label="Primary Expertise"
                      placeholder="e.g. Full Stack Development, UI/UX Design"
                      value={formData.expertise || ""}
                      onChange={(v) =>
                        setFormData({ ...formData, expertise: v })
                      }
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Detailed Work History
                    </label>
                    <textarea
                      className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      rows={6}
                      placeholder="Describe previous roles, responsibilities, and achievements..."
                      value={formData.experienceDetails || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experienceDetails: e.target.value,
                        })
                      }
                    />
                    <p className="text-[10px] text-slate-400 italic ml-1">
                      Tip: Include company name, duration, and key projects.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
              Last modified:{" "}
              {formData.lastUpdated
                ? new Date(formData.lastUpdated).toLocaleDateString()
                : "Never"}
            </p>
            <button
              onClick={handleUpdate}
              disabled={isSaving}
              className="flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <CheckCircle2 size={20} />
              )}
              {isSaving ? "Saving..." : "Update Record"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Sub-components
const TabHeader = ({ title, subtitle }) => (
  <div>
    <h2 className="text-xl font-black text-slate-800 tracking-tight">
      {title}
    </h2>
    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
      {subtitle}
    </p>
  </div>
);

const EditField = ({ label, value, onChange, placeholder = "", icon: Icon = null }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative">
      {/* Only render the icon if it exists */}
      {Icon && <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />}
      <input 
        type="text" 
        value={value} 
        placeholder={placeholder} // Now defaults to "" if missing
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all ${Icon ? 'pl-12' : ''}`}
      />
    </div>
  </div>
);

export default EditEmployeeForm;
