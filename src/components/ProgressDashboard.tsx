
import { motion } from "framer-motion";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const ProgressDashboard = () => {
  const recentSessions = [
    {
      id: 1,
      date: "March 15, 2024",
      topic: "Anxiety Management",
      duration: "45 min",
      progress: 85
    },
    {
      id: 2,
      date: "March 12, 2024",
      topic: "Stress Reduction",
      duration: "30 min",
      progress: 70
    }
  ];

  const recommendedContent = [
    {
      id: 1,
      title: "Understand Your Treatment",
      category: "Treatment Guide",
      duration: "12 min read"
    },
    {
      id: 2,
      title: "Managing Side Effects",
      category: "Health Management",
      duration: "8 min read"
    }
  ];

  const progressData = [
    { date: 'Week 1', progress: 30 },
    { date: 'Week 2', progress: 45 },
    { date: 'Week 3', progress: 65 },
    { date: 'Week 4', progress: 85 },
  ];

  const wellnessData = [
    { day: 'Mon', score: 75 },
    { day: 'Tue', score: 82 },
    { day: 'Wed', score: 78 },
    { day: 'Thu', score: 85 },
    { day: 'Fri', score: 80 },
    { day: 'Sat', score: 88 },
    { day: 'Sun', score: 85 },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={item} className="text-left">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Continue your healing journey</p>
      </motion.div>

      {/* Charts Section */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Treatment Progress Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Treatment Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="progressColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#14b8a6" 
                  fillOpacity={1} 
                  fill="url(#progressColor)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Wellness Score */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Wellness Score</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wellnessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#14b8a6" 
                  strokeWidth={2}
                  dot={{ fill: '#14b8a6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div variants={item} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Progress</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-teal-600">3</div>
            <div className="text-sm text-gray-600">Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-teal-600">85%</div>
            <div className="text-sm text-gray-600">Completion</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-teal-600">45m</div>
            <div className="text-sm text-gray-600">Avg. Time</div>
          </div>
        </div>
      </motion.div>

      {/* Recent Sessions */}
      <motion.section variants={item} className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Sessions</h3>
        <div className="space-y-4">
          {recentSessions.map((session) => (
            <motion.div
              key={session.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">{session.topic}</h4>
                  <p className="text-sm text-gray-600">{session.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-teal-600">
                    {session.duration}
                  </div>
                  <div className="text-sm text-gray-600">
                    {session.progress}% Complete
                  </div>
                </div>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-teal-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${session.progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Recommended Content */}
      <motion.section variants={item} className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Recommended for You</h3>
        <div className="grid grid-cols-1 gap-4">
          {recommendedContent.map((content) => (
            <motion.div
              key={content.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{content.title}</h4>
                  <p className="text-sm text-gray-600">{content.category}</p>
                </div>
                <span className="text-sm text-gray-500">{content.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};
