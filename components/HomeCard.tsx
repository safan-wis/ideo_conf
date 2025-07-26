'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
  features?: string[];
  stats?: { label: string; value: string }[];
}

const HomeCard = ({ 
  className, 
  img, 
  title, 
  description, 
  handleClick, 
  features,
  stats 
}: HomeCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl p-6',
        'bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl',
        'border border-gray-700/50 hover:border-gray-600/50 transition-colors duration-300',
        'cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10',
        className
      )}
      onClick={handleClick}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div className="p-3 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 group-hover:from-blue-600 group-hover:to-purple-600 transition-colors duration-300">
            <Image 
              src={img} 
              alt={title} 
              width={24} 
              height={24} 
              className="transform transition-transform duration-300 group-hover:scale-110" 
            />
          </div>
          
          {stats && (
            <div className="flex gap-3">
              {stats.map((stat, index) => (
                <div key={index} className="text-right">
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3 mb-6">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {features && features.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 text-sm text-gray-400"
              >
                <div className="size-1.5 rounded-full bg-blue-500 group-hover:bg-purple-500 transition-colors duration-300" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Hover Effect Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </div>
    </motion.div>
  );
};

export default HomeCard;
