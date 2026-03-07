import { motion } from "framer-motion";
import { CheckCircle2, Clock, Zap } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "CV_ANALYSIS",
    title: "CV Analysis Completed",
    description: "Your Software Engineer CV was analyzed with a score of 88/100.",
    time: "2 hours ago",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    id: 2,
    type: "PORTFOLIO_READY",
    title: "Portfolio Published",
    description: "Your personal portfolio is now live at mohamed-os-dev.skillsense.ai",
    time: "5 hours ago",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: 3,
    type: "PROFILE_UPDATE",
    title: "Experience Updated",
    description: "Added 'Senior AI Engineer' to your professional experience.",
    time: "Yesterday",
    icon: Clock,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50">
        <h3 className="text-xl font-black text-slate-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-slate-50">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="p-6 hover:bg-slate-50 transition-colors flex items-start gap-4"
          >
            <div className={`w-10 h-10 shrink-0 rounded-xl ${activity.bg} flex items-center justify-center ${activity.color}`}>
              <activity.icon size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-black text-slate-900">{activity.title}</h4>
                <span className="text-xs font-bold text-slate-400">{activity.time}</span>
              </div>
              <p className="text-slate-500 text-sm font-medium">{activity.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="p-4 bg-slate-50 text-center">
        <button className="text-sm font-black text-indigo-600 hover:text-indigo-700 transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
