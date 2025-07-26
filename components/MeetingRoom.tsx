'use client';
import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <Loader />
      </div>
    );
  }

  const CallLayout = () => {
    const layoutProps = {
      participantsBarPosition: layout === 'speaker-right' ? 'left' : 'right',
      aspectRatio: 16 / 9,
      participantViewOptions: {
        fit: 'contain',
        cornerRadius: '12px',
      },
    };

    switch (layout) {
      case 'grid':
        return (
          <div className="h-full w-full">
            <PaginatedGridLayout
              participantViewOptions={{
                ...layoutProps.participantViewOptions,
                aspectRatio: layoutProps.aspectRatio,
              }}
            />
          </div>
        );
      case 'speaker-right':
      case 'speaker-left':
        return (
          <div className="h-full w-full">
            <SpeakerLayout
              participantsBarPosition={layoutProps.participantsBarPosition}
              participantViewOptions={{
                ...layoutProps.participantViewOptions,
                aspectRatio: layoutProps.aspectRatio,
              }}
            />
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-900">
      {/* Main Content */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Video Layout */}
        <div className="relative flex flex-1 items-center justify-center p-4">
          <div className="relative h-full w-full max-w-[1440px]">
            <CallLayout />
          </div>
        </div>

        {/* Participants List */}
        <div
          className={cn(
            'w-80 transform border-l border-gray-800 bg-gray-900 transition-transform duration-300',
            showParticipants ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 bg-gray-900 p-4">
        <CallControls 
          onLeave={() => router.push('/')}
          className="bg-transparent"
        />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 transition-colors">
            <LayoutList size={20} />
            <span className="text-sm">Layout</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border-gray-700">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                className="text-white hover:bg-gray-700"
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        <button
          onClick={() => setShowParticipants((prev) => !prev)}
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2 transition-colors",
            showParticipants 
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-800 text-white hover:bg-gray-700"
          )}
        >
          <Users size={20} />
          <span className="text-sm">Participants</span>
        </button>

        {!isPersonalRoom && <EndCallButton />}
      </div>
    </div>
  );
};

export default MeetingRoom;
