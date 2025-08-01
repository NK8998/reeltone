import Image from "next/image";

interface HeroProps {
  backgroundImage: string;
}
export default function Hero({ backgroundImage }: HeroProps) {
  return (
    <section className='hero-section'>
      <div className='overlay'></div>
      <img src={backgroundImage} alt='Hero Background' />
    </section>
  );
}
