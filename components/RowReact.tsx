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
import ModalComp from "./ModalComp";
import { ImCross } from "react-icons/im";

export default function Video() {
  const [videos, setVideos] = useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [introId, setIntroId] = React.useState("react18intro.mp4");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
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
        description,
       }`;
    client
      .fetch(query)
      .then((data) => {
        setVideos(data);
      })
      .catch(console.error);
  }, []);

  // useEffect(() => {
  //   setVideoPlayer(
  //     <video
  //       controls
  //       autoPlay
  //       style={{
  //         border: "1px solid grey",
  //         maxWidth: 1170,
  //         marginTop: "64px",
  //         width: "100%",
  //       }}
  //       src={`https://d3l6v5di84fd3f.cloudfront.net/${introId}`}
  //     ></video>
  //   );
  //   console.log(introId);
  // }, [introId]);

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
        {videos.map(
          (video, index) =>
            index < 3 && (
              <div
                className='w-[100%] m-2 cursor-pointer'
                onClick={() => {
                  setIntroId(video.intro);
                  setTitle(video.title);
                  setDescription(video.description);
                  setOpen(true);
                }}
                key={index}
              >
                <div className='bg-gradient-to-b from-transparent to-black'>
                  <img
                    className='opacity-80'
                    alt='banner'
                    src={video.imageUrl}
                  />
                </div>
              </div>
            )
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className='absolute w-[100%] max-w-[1000px] mx-auto left-0 right-0 text-center focus:outline-none shadow-none '>
          <div
            onClick={handleClose}
            className='static w-fit bg-red-600 p-2 rounded-full cursor-pointer mt-[32px] left-0 '
          >
            <ImCross />
          </div>
          <ModalComp
            description={description}
            title={title}
            introId={introId}
          />
        </Box>
      </Modal>
    </>
  );
}
