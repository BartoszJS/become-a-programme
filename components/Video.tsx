import MuxPlayer from "@mux/mux-player-react";
import { suspend } from "suspend-react";
import createClient from "@sanity/client";
import { useEffect, useState } from "react";
import { client } from "../client";

export default function Video() {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const query = `*[_type == "videos"]{
        title,
        "playbackId": video.asset->playbackId
       }`;
    client
      .fetch(query)
      .then((data) => {
        setVideos(data);
      })
      .catch(console.error);
  }, []);

  return (
    //<MuxPlayer playbackId={video.video?.asset?._ref} metadata={video.title} />
    <>
      {videos.map((video, index) => (
        <div key={index}>
          {video.playbackId && (
            <div>
              <>
                <h1>{video.title}</h1>
                {console.log(video)}
                <MuxPlayer
                  playbackId={video.playbackId}
                  metadata={video.title}
                />
                {console.log(video.playbackId)}
              </>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
