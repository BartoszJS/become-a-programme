import MuxPlayer from "@mux/mux-player-react";
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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Video() {
  const [videos, setVideos] = useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [introId, setIntroId] = React.useState(null);
  const handleOpen = (id: any) => {
    setOpen(true);
    setIntroId(id);
    console.log(introId);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const query = `*[_type == "react"]{
        title,
        "imageUrl": image.asset->url,
        "playbackId": intro.asset->playbackId
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
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {introId && <MuxPlayer playbackId={introId} metadata={introId} />}

          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <div className='flex'>
        {videos.map(
          (video, index) =>
            index < 3 && (
              <div
                className='border'
                onClick={() => handleOpen(video.playbackId)}
                key={index}
              >
                {video && <img alt='banner' src={video.imageUrl} />}
                {console.log(video.imageUrl)}
              </div>
            )
        )}
      </div>
    </>
  );
}
