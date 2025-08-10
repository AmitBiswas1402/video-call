import { useUser } from "@clerk/nextjs";
import {
  StreamVideoClient,
  StreamVideo,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = () => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!API_KEY) throw new Error('Stream API key is missing');

    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
    //   tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);
  
  return (
    <StreamVideo client={videoClient}>
      
    </StreamVideo>
  );
};

export default StreamVideoProvider;