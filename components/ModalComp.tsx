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
import ReactPlayer from "react-player";

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

interface Props {
  ididid: string;
}

const ModalComp = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    setVideo(
      <ReactPlayer
        url={`https://d3l6v5di84fd3f.cloudfront.net/react18intro.mp4`}
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
    );
  }, []);

  return (
    <div>
      <ReactPlayer
        url={`https://d3l6v5di84fd3f.cloudfront.net/react18intro.mp4`}
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
      <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
    </div>
  );
};

export default ModalComp;
