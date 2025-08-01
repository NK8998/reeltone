import { CloseSvg } from "@/assets/icons";
import Logo from "../reusables/Logo";
import Image from "next/image";

interface TrailerContainerProps {
  trailer: string;
  viewTrailer: boolean;
  setViewTrailer: (view: boolean) => void;
}

export default function TrailerContainer({
  trailer,
  viewTrailer,
  setViewTrailer,
}: TrailerContainerProps) {
  return (
    <div className='film-trailer-container'>
      <div className='trailer-top-bar'>
        <Image
          className='reel-icon'
          src={"/images/reel_favicon.png"}
          width={256}
          height={256}
          alt='alt logo'
        />
        <button className='close-trailer' onClick={() => setViewTrailer(false)}>
          <CloseSvg />
          Close
        </button>
      </div>
      <iframe
        width='100%'
        height='100%'
        src={trailer}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
  );
}
