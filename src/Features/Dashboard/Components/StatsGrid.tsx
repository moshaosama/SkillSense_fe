import { motion } from "framer-motion";
import { FileText, Layout, TrendingUp, Users } from "lucide-react";

const stats = [
  {
    label: "CVs Analyzed",
    value: "12",
    icon: FileText,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    label: "Portfolios Created",
    value: "4",
    icon: Layout,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    label: "Success Rate",
    value: "94%",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Profile Views",
    value: "842",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsGrid;
