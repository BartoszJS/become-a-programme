import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Plans from "@/components/Plans";
import useAuth from "@/hooks/useAuth";
import useSubscriptionAngular from "@/hooks/useSubscriptionAngular";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { client } from "../client";

const angular = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState<any[]>([]);
  const [full, setFull] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const angularAccess = useSubscriptionAngular(user);

  useEffect(() => {
    const query = `*[_type == "angular"]{
        id,
        title,
        "imageUrl": image.asset->url,
        full,
        intro,
        description,
       }`;
    client
      .fetch(query)
      .then((data) => {
        let tmp;
        for (let i = 0; i < data.length - 1; i++) {
          if (data[i].id >= data[i + 1].id) {
            tmp = data[i];
            data[i] = data[i + 1];
            data[i + 1] = tmp;
          }
        }
        setVideos(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      setFull(videos[0].full);
      setDescription(videos[0].description);
    }
  }, [videos]);

  const handleContextMenu = (e: any) => {
    e.preventDefault();
  };

  if (!angularAccess && !videos) {
    return (
      <div>
        <div className='w-screen h-screen flex justify-center align-middle'>
          <Loader color='dark:fill-gray-300' />
        </div>
      </div>
    );
  } else if (!angularAccess) {
    return <Plans />;
  }

  return (
    <div>
      <Head>
        <title>Become A Programmer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='mt-[60px] grid-container grid grid-cols-5'>
        <div className='item2 col-span-4 bg-black '>
          <video
            onContextMenu={handleContextMenu}
            controls
            controlsList='nodownload'
            aria-disabled='true'
            autoPlay
            style={{
              outline: "none",
              boxShadow: "none",
              maxHeight: "80vh",
              marginTop: "0px",
              width: "100%",
              zIndex: 50,
            }}
            src={`https://d3l6v5di84fd3f.cloudfront.net/${full}`}
          ></video>
          <div className='flex mt-[2vh] mx-[10%]'>
            <p>{description}</p>
          </div>
        </div>
        <div className='item1 col-span-1 mx-1'>
          <div className='flex flex-col'>
            {videos.map((video, index) => (
              <div
                className='w-[100%] cursor-pointer'
                onClick={() => {
                  setFull(video.full);
                  setTitle(video.title);
                  setDescription(video.description);
                }}
                key={index}
              >
                <span>{video.id + " " + video.title}</span>
                <img
                  className='opacity-100 h-full'
                  alt='banner'
                  src={video.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default angular;
