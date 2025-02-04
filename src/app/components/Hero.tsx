import React from "react";
import WhiteShape from "@public/images/white_shape.svg";
import BlueShape from "@public/images/blue_shape.svg";
import OrangeShape from "@public/images/orange_shape.svg";
import Image from "next/image";
import ParticipantList from "../ticket/[[...id]]/ParticipantList";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-screen overflow-hidden relative">
        <p className="font-semibold z-10 text-center text-2xl lg:text-5xl lg:leading-[70px] 3xl:text-7xl 3xl:leading-[90px] 4xl:text-8xl 4xl:leading-[120px]">
          Split your ticket evenly <br />
          between participants.
        </p>
        {/* <Image
        src={WhiteShape}
        alt="Shape"
        className="w-[400px] lg:w-[60%] absolute translate-x-8 lg:translate-y-[10%] lg:translate-x-[10%] rotate-90"
        />
        <Image
        src={BlueShape}
        alt="Shape"
        className="w-[200px] lg:w-[30%] absolute translate-x-24 translate-y-20 lg:translate-y-[40%] lg:translate-x-[75%]"
        />
        <Image
        src={OrangeShape}
        alt="Shape"
        className="w-[200px] -translate-x-28 -translate-y-14 lg:w-[30%] absolute lg:translate-y-[-20%] lg:translate-x-[-65%]"
        /> */}
      </div>
      <div className="w-full flex flex-col">
        <h2 className="text-center title">Try it out</h2>
        <div className="w-full lg:w-1/2 bg-purple-400">
          <h3 className="text-center">Participants</h3>
        </div>
      </div>
    </>
  );
};

export default Hero;
