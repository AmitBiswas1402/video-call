"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy } from "lucide-react";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

const CopyURL = () => {
  const [copied, setCopied] = useState(false);
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    // Get current page URL when component mounts
    setCurrentURL(window.location.href);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 bg-gray-800 text-white rounded-full cursor-pointer">
          <Plus size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[380px]">
          <DropdownMenuLabel>Meeting Link</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="whitespace-normal">
            Share this link with participants so they can join the meeting.
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0">
            <div className="flex items-center justify-between w-full bg-gray-900 text-white font-mono text-sm rounded-md overflow-hidden">
              <pre className="p-3 m-0 whitespace-pre-wrap break-all">
                {currentURL}
              </pre>
              <button
                onClick={handleCopy}
                className="px-3 py-2 hover:bg-gray-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <span className="text-green-500 font-medium">✅ Copied!</span>
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export default CopyURL;
