'use client';

import { motion } from 'framer-motion';
import MeetingTypeList from '@/components/MeetingTypeList';
import Image from 'next/image';
import { useGetCalls } from '@/hooks/useGetCalls';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

const LoadingSpinner = () => (
  <div className="flex items-center gap-2 text-gray-400">
    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <span>Loading...</span>
  </div>
);

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);
  const { isLoaded: isUserLoaded, isSignedIn } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { upcomingMeetings, recentRecordings, loading, error } = useGetCalls();

  // Show loading state while user authentication is being checked
  if (!isClient || !isUserLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6 lg:p-8 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Show sign-in message if user is not authenticated
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to WISMeet</h2>
          <p className="text-gray-400">Please sign in to access your meetings and recordings.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0f1620] to-black text-white"
    >
      {/* Header Section */}
      <div className="px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-0.5">
              <div className="h-full w-full rounded-2xl bg-gray-900 flex items-center justify-center">
                <Image src="/icons/logo.svg" alt="Logo" width={28} height={28} className="text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                WISMeet Pro
              </h1>
              <p className="text-sm text-gray-400">Professional Video Conferencing</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gray-800/30 backdrop-blur-xl rounded-full px-5 py-2.5 border border-gray-700/30">
              <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-300">System Online</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl" />
          <div className="relative overflow-hidden rounded-3xl bg-gray-900/50 backdrop-blur-xl border border-gray-800/50">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full" />
            
            <div className="relative p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full px-5 py-2 border border-blue-500/10"
                    >
                      <Image src="/icons/Video.svg" alt="Video" width={18} height={18} className="opacity-70" />
                      <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Enterprise-Grade Video Conferencing
                      </span>
                    </motion.div>
                    
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl lg:text-5xl font-bold leading-tight"
                    >
                      Connect with Crystal Clear{' '}
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        HD Quality
                      </span>
                    </motion.h2>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg text-gray-400 leading-relaxed"
                    >
                      Experience seamless video meetings with enterprise-grade security, 
                      crystal clear audio, and advanced collaboration tools.
                    </motion.p>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-6"
                  >
                    {[
                      { icon: '🔒', label: 'End-to-End Encryption' },
                      { icon: '🎥', label: 'HD Video Quality' },
                      { icon: '🔊', label: 'Crystal Clear Audio' },
                      { icon: '📊', label: 'Screen Sharing' },
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="text-lg">{feature.icon}</span>
                        {feature.label}
                      </div>
                    ))}
                  </motion.div>
                </div>

                <div className="relative">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="space-y-1">
                        <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {time}
                        </div>
                        <div className="text-gray-400">{date}</div>
                      </div>
                      <div className="flex items-center gap-2 bg-green-500/10 text-green-400 rounded-full px-4 py-2">
                        <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium">Ready to Connect</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Active Users', value: '2.4k+' },
                        { label: 'Meetings Today', value: '186' },
                        { label: 'Uptime', value: '99.9%' },
                        { label: 'Bandwidth', value: 'Ultra' },
                      ].map((stat, index) => (
                        <div key={index} className="bg-gray-800/50 rounded-xl p-4">
                          <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Section */}
        <section className="px-6 lg:px-8 py-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Quick Actions
              </h3>
              <p className="text-sm text-gray-400">Start or join meetings with enterprise-grade quality</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-gray-400">Network: Excellent</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium 
                  hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300
                  flex items-center gap-2"
              >
                <span>View All</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
          
          <MeetingTypeList />

          {/* Upcoming Meetings Section */}
          <div className="mt-12 space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-lg font-semibold text-white">Upcoming Meetings</h4>
                <p className="text-sm text-gray-400">Your scheduled meetings</p>
              </div>
              <Link 
                href="/upcoming"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
              >
                View All
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                <div className="col-span-full flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : error ? (
                <div className="col-span-full text-center text-red-400 py-8">
                  {error}
                </div>
              ) : upcomingMeetings?.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
                  <div className="bg-gray-800/50 rounded-full p-4 mb-4">
                    <Image
                      src="/icons/schedule.svg"
                      alt="No meetings"
                      width={32}
                      height={32}
                      className="opacity-50"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Upcoming Meetings</h3>
                  <p className="text-gray-400 text-center mb-6">
                    You don't have any meetings scheduled. Would you like to schedule one now?
                  </p>
                  <button
                    onClick={() => setMeetingState('isScheduleMeeting')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Schedule a Meeting
                  </button>
                </div>
              ) : (
                upcomingMeetings?.map((meeting, index) => (
                  <motion.div
                    key={meeting.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-xl bg-gray-800/50 p-4 hover:bg-gray-800/70 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-1">
                        <h5 className="font-medium text-white">
                          {meeting.custom?.description || 'Scheduled Meeting'}
                        </h5>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                            />
                          </svg>
                          {meeting.starts_at && (
                            <span>
                              {format(new Date(meeting.starts_at), 'MMM d, yyyy')}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                          </svg>
                          {meeting.starts_at && (
                            <span>
                              {format(new Date(meeting.starts_at), 'h:mm a')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          Upcoming
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((_, i) => (
                          <div
                            key={i}
                            className="size-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center"
                          >
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">
                        {meeting.participants || 0} Participants
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link 
                        href={`/meeting/${meeting.id}`}
                        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                          />
                        </svg>
                        Join Meeting
                      </Link>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/meeting/${meeting.id}`);
                          // You might want to add a toast notification here
                        }}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" 
                          />
                        </svg>
                        Copy Link
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Recent Recordings Section */}
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 border border-gray-800/50">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h4 className="text-lg font-semibold text-white">Recent Recordings</h4>
                <p className="text-sm text-gray-400">Your latest meeting recordings</p>
              </div>
              <Link 
                href="/recordings"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
              >
                View All
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                <div className="col-span-full flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : error ? (
                <div className="col-span-full text-center text-red-400 py-8">
                  {error}
                </div>
              ) : recentRecordings?.length === 0 ? (
                <div className="col-span-full text-center text-gray-400 py-8">
                  No recordings available
                </div>
              ) : (
                recentRecordings?.map((recording, index) => (
                  <motion.div
                    key={recording.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-xl bg-gray-800/50 p-4 hover:bg-gray-800/70 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h5 className="font-medium text-white">
                          {recording.custom?.description || 'Recorded Meeting'}
                        </h5>
                        <p className="text-sm text-gray-400">
                          {recording.ended_at && formatDistanceToNow(new Date(recording.ended_at), { addSuffix: true })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                          Recording
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      {recording.recording_url && (
                        <a 
                          href={recording.recording_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Watch Recording
                        </a>
                      )}
                      <button className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                        Share
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Home;
