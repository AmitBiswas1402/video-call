"use client";
import { useState } from "react";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useRouter, useSearchParams } from "next/navigation";
import { Users, LayoutList } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Loader from "./Loader";
import { cn } from "@/lib/utils";
import EndCallButton from "./EndCallButton";
import CopyURL from "./CopyURL";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const router = useRouter();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full bg-black text-white flex flex-col">
      {/* MAIN CALL AREA */}
      <div className="flex flex-1 items-center justify-center overflow-hidden">
        {/* Call Layout */}
        <div
          className={cn(
            "bg-black flex items-center justify-center aspect-video rounded-xl shadow-lg transition-all duration-300 ease-in-out",
            showParticipants ? "w-[80vw] h-[80vh]" : "w-[90vw] h-[90vh]"
          )}
        >
          <CallLayout />
        </div>

        {/* PARTICIPANTS LIST (side panel) */}
        {showParticipants && (
          <div className="h-full w-[300px] ml-4 bg-[#111] border-l border-gray-800 overflow-y-auto rounded-lg">
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>
        )}
      </div>

      {/* CONTROLS BAR */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-2xl bg-black/50 backdrop-blur px-4 py-2 shadow-lg">
        <CallControls onLeave={() => router.push(`/`)} />

        {/* Layout Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-xl bg-[#19232d] px-3 py-2 hover:bg-[#4c535b]">
            <LayoutList size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-gray-700 bg-[#1e1e1e] text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        {/* Participants Button */}
        <button
          onClick={() => setShowParticipants((prev) => !prev)}
          className="cursor-pointer rounded-full bg-[#19232d] px-3 py-2 hover:bg-[#4c535b] overflow-hidden"
        >
          <Users size={20} />
        </button>

        <CopyURL />

        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
