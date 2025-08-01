import { PlaySvg } from "@/assets/icons";
import RegularImage from "../reusables/RegularImage";
import { useState } from "react";
import TrailerContainer from "./TrailerContainer";
import Modal from "../reusables/Modals";

interface LeftContentProps {
  posterPath?: string;
  voteAverage?: number;
  voteCount?: number;
  trailer: string;
}

export default function LeftContent({ posterPath, trailer }: LeftContentProps) {
  const [viewTrailer, setViewTrailer] = useState(false);
  return (
    <section className='film-left-content'>
      <img className='film-poster' src={posterPath} alt='film poster' />
      <div className='where-to-watch'>
        <div className='where-top'>
          <h3>Where to Watch</h3>
          <button
            className='trailer-btn'
            onClick={() => setViewTrailer(!viewTrailer)}
          >
            <PlaySvg />
            <span>Trailer</span>
          </button>
        </div>
        <div className='watch-links'>
          <span>Services</span>
          <a
            href='https://www.justwatch.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <RegularImage
              src='/images/JustWatch_Logo.png'
              alt='JustWatch Logo'
            />
          </a>
        </div>
      </div>
      <Modal isOpen={viewTrailer}>
        <TrailerContainer
          trailer={trailer}
          viewTrailer={viewTrailer}
          setViewTrailer={setViewTrailer}
        />
      </Modal>
    </section>
  );
}
