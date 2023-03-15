import React from "react";
import ReactPlayer from "react-player";

interface Props {
  introId: string;
  title: string;
  description: string;
  linkTo: string;
}

const ModalComp = ({ linkTo, introId, title, description }: Props) => {
  return (
    <div className='bg-black '>
      <video
        controls
        autoPlay
        controlsList='nodownload'
        style={{
          outline: "none",
          boxShadow: "none",
          border: "1px solid grey",
          maxWidth: 1200,
          marginTop: "0px",
          width: "100%",
          zIndex: 50,
        }}
        src={`https://h1114051.domeny.host/${introId}`}
      ></video>
      <div className='flex border border-gray-400'>
        <div className='flex justify-center items-start'>
          <a
            href={linkTo}
            className='whitespace-nowrap bg-gray-700 p-3 m-6 font-bold rounded'
          >
            Full course
          </a>
        </div>
        <div className='text-left mt-5 mb-5'>
          <h2 className='text-2xl font-bold'>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalComp;
