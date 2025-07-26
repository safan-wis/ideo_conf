'use client';

import { motion } from 'framer-motion';
import MeetingTypeList from '@/components/MeetingTypeList';
import Image from 'next/image';

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6 lg:p-8"
    >
      {/* Header Section */}
      <header className="mb-12">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Image src="/icons/logo.svg" alt="Logo" width={24} height={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Video Conference
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-full px-4 py-2">
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-gray-300">Online</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-1"
        >
          <div className="relative overflow-hidden rounded-[22px] bg-gray-900 p-8 lg:p-12">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-blue-500/20 to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="space-y-6 max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-xl">
                    <Image src="/icons/schedule.svg" alt="Schedule" width={16} height={16} />
                    <span className="text-sm">Next Meeting in 30 minutes</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                    Professional Video <br />
                    Conferencing Solution
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Host secure, HD quality video meetings with advanced features like screen sharing, 
                    recording, and real-time chat.
                  </p>
                </div>
                
                <div className="flex flex-col items-end gap-4">
                  <div className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {time}
                  </div>
                  <p className="text-lg text-gray-300">{date}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {[
                  { label: 'Active Users', value: '2,451', icon: '/icons/Video.svg' },
                  { label: 'Meetings Today', value: '186', icon: '/icons/schedule.svg' },
                  { label: 'Hours Saved', value: '1,240', icon: '/icons/previous.svg' },
                  { label: 'Satisfaction', value: '98%', icon: '/icons/checked.svg' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gray-700/50">
                        <Image src={stat.icon} alt={stat.label} width={16} height={16} />
                      </div>
                      <span className="text-sm text-gray-400">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Meeting Options */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Quick Actions</h3>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            View All
          </motion.button>
        </div>
        <MeetingTypeList />
      </section>
    </motion.div>
  );
};

export default Home;
