import { suspend } from "suspend-react";
import createClient from "@sanity/client";
import { useEffect, useState } from "react";
import { client } from "../client";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";
import ReactPlayer from "react-player/lazy";
import { width } from "@mui/system";

export default function Video() {
  const [videos, setVideos] = useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [introId, setIntroId] = React.useState(null);
  const [videoPlayer, setVideoPlayer] = useState<any>(null);
  const handleOpen = (id: any) => {
    setIntroId(id);
    setOpen(true);
    console.log(introId);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const query = `*[_type == "react"]{
        title,
        "imageUrl": image.asset->url,
        full,
        intro,
       }`;
    client
      .fetch(query)
      .then((data) => {
        setVideos(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    setVideoPlayer(
      <div>
        <ReactPlayer
          url={`https://d3l6v5di84fd3f.cloudfront.net/${introId}`}
          controls={true}
          playing={true}
          config={{
            file: { attributes: { controlsList: "nodownload" } },
          }}
          style={{
            border: "1px solid grey",
            maxWidth: 1170,
            marginTop: "64px",
          }}
          width={"100%"}
          height={"100%"}
        />
        <h3>{introId}</h3>
      </div>
    );
    console.log(introId);
  }, [open]);

  return (
    <>
      <div className='group flex w-fit'>
        <h2 className='text-white text-4xl font-extralight flex justify-start cursor-pointer duration-300 items-center p-4'>
          React
        </h2>
        <h2 className='text-white text-4xl font-extralight flex justify-start cursor-pointer duration-500 items-center translate-x-[-600px] group-hover:translate-x-[0px]'>
          - check all courses
        </h2>
      </div>
      <div className='flex'>
        {videos.map((video, index) =>
          index < 3 && video.intro !== null ? (
            <div
              className='w-[100%] m-2 cursor-pointer'
              onClick={() => {
                setIntroId(video.intro);
                setOpen(true);
              }}
              key={index}
            >
              <div className='bg-gradient-to-b from-transparent to-black'>
                <img className='opacity-80' alt='banner' src={video.imageUrl} />
              </div>
            </div>
          ) : (
            <div>loading</div>
          )
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className='absolute w-[100%] max-w-[1200px] mx-auto left-0 right-0 text-center '>
          {videoPlayer}
          {console.log(videoPlayer)}
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
