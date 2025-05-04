import WhiteShape from "@public/images/white_shape.svg";
import BlueShape from "@public/images/blue_shape.svg";
import OrangeShape from "@public/images/orange_shape.svg";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-full overflow-hidden relative">
        <Image
          src={WhiteShape}
          alt="Shape"
          className="w-[400px] lg:w-[60%] absolute translate-x-8 lg:translate-y-[10%] lg:translate-x-[10%] rotate-90 opacity-20"
        />
        <Image
          src={BlueShape}
          alt="Shape"
          className="w-[200px] lg:w-[30%] absolute translate-x-24 translate-y-20 lg:translate-y-[40%] lg:translate-x-[75%] opacity-30"
        />
        <Image
          src={OrangeShape}
          alt="Shape"
          className="w-[200px] -translate-x-28 -translate-y-14 lg:w-[30%] absolute lg:translate-y-[-20%] lg:translate-x-[-65%] opacity-30"
        />

        <div className="z-10 flex flex-col items-center space-y-8">
          <h1 className="font-semibold z-10 text-center text-3xl lg:text-5xl lg:leading-[70px] 3xl:text-7xl 3xl:leading-[90px] 4xl:text-8xl 4xl:leading-[120px] whitespace-pre-wrap">
            {t("homepage.heroTitle")}
          </h1>

          <p className="text-base 2xl:text-lg text-center max-w-md">
            {t("homepage.heroSubtitle")}
          </p>

          <Link href="/ticket">
            <Button
              text={t("homepage.createANewTicket")}
              styles="px-8 py-3 text-lg"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
