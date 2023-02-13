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
import loading from "../public/loading.svg";
import Loader from "./Loader";
import Link from "next/link";

export default function Video() {
  const [videos, setVideos] = useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [introId, setIntroId] = React.useState("react18intro.mp4");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [videoPlayer, setVideoPlayer] = useState<any>(null);
  const [load, setLoad] = useState(true);
  const handleOpen = (id: any) => {
    setIntroId(id);
    setOpen(true);
    console.log(introId);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const query = `*[_type == "vue"]{
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
        setLoad(false);
      })
      .catch(console.error);
  }, []);

  if (load)
    return (
      <div className='align-middle'>
        <h2 className='text-white text-4xl font-extralight flex justify-start cursor-pointer duration-300 items-center p-4'>
          Vue
        </h2>
        <div className='p-[100px]'>
          <Loader color='dark:fill-gray-300' />
        </div>
      </div>
    );

  return (
    <>
      <Link href='/vuejs'>
        <div className='group flex w-fit'>
          <h2 className='text-white text-4xl font-extralight flex justify-start cursor-pointer duration-300 items-center p-4'>
            Vue.js
          </h2>
          <h2 className='text-white text-4xl font-extralight flex justify-start cursor-pointer duration-500 items-center translate-x-[-600px] group-hover:translate-x-[0px]'>
            - check all courses
          </h2>
        </div>
      </Link>
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
                <img
                  className='opacity-80 w-screen'
                  alt='banner'
                  src={video.imageUrl}
                />
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
            className='static w-fit bg-black border p-2 rounded-full cursor-pointer mt-[32px] left-0 '
          >
            <ImCross />
          </div>
          <ModalComp
            linkTo='/vuejs'
            description={description}
            title={title}
            introId={introId}
          />
        </Box>
      </Modal>
    </>
  );
}
