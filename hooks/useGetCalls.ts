'use client';

import { useEffect, useState } from 'react';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

interface Call {
  id: string;
  type: 'scheduled' | 'recording';
  title?: string;
  starts_at?: string;
  ended_at?: string;
  created_at?: string;
  custom?: {
    description?: string;
    participants?: number;
    host?: string;
  };
  participants?: number;
  recording_url?: string;
  status?: string;
  members?: string[];
  created_by_user_id?: string;
}

export const useGetCalls = () => {
  const client = useStreamVideoClient();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalls = async () => {
      if (!client || !isUserLoaded || !user) {
        setLoading(true);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch both scheduled calls and recordings
        const [scheduledCalls, recordedCalls] = await Promise.all([
          client.queryCalls({
            filter_conditions: {
              starts_at: { $gt: new Date().toISOString() },
              $or: [
                { created_by_user_id: user.id },
                { members: { $in: [user.id] } }
              ]
            },
            sort: [{ field: 'starts_at', direction: 1 }],
            limit: 10,
          }),
          client.queryCalls({
            filter_conditions: {
              ended_at: { $exists: true },
              recording: { $exists: true },
              $or: [
                { created_by_user_id: user.id },
                { members: { $in: [user.id] } }
              ]
            },
            sort: [{ field: 'ended_at', direction: -1 }],
            limit: 10,
          }),
        ]);

        // Process and combine the calls
        const processedCalls = [
          ...scheduledCalls.calls.map(call => ({
            ...call,
            type: 'scheduled' as const,
            participants: call.members?.length || 0,
            custom: {
              ...call.custom,
              host: call.created_by_user_id === user.id ? 'You' : 'Other',
              participants: call.members?.length || 0
            }
          })),
          ...recordedCalls.calls.map(call => ({
            ...call,
            type: 'recording' as const,
            participants: call.members?.length || 0,
            custom: {
              ...call.custom,
              host: call.created_by_user_id === user.id ? 'You' : 'Other',
              participants: call.members?.length || 0
            }
          })),
        ];

        setCalls(processedCalls);
        setError(null);
      } catch (err) {
        console.error('Error fetching calls:', err);
        setError('Failed to fetch meetings and recordings');
        setCalls([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, [client, user, isUserLoaded]);

  // Filter calls by type
  const upcomingMeetings = calls
    .filter(call => call.type === 'scheduled')
    .sort((a, b) => {
      if (!a.starts_at || !b.starts_at) return 0;
      return new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime();
    })
    .slice(0, 3); // Show only 3 on home screen

  const recentRecordings = calls
    .filter(call => call.type === 'recording')
    .sort((a, b) => {
      if (!a.ended_at || !b.ended_at) return 0;
      return new Date(b.ended_at).getTime() - new Date(a.ended_at).getTime();
    })
    .slice(0, 3); // Show only 3 on home screen

  return {
    upcomingMeetings,
    recentRecordings,
    loading: loading || !isUserLoaded,
    error,
    allCalls: calls,
  };
};