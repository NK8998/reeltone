import Image from "next/image";
import "./navbar.css";
import Link from "next/link";
import InputContainer from "./components/InputContainer";
export default function Navbar({}) {
  return (
    <div className='navbar'>
      <div className='navbar-inner'>
        <div className='nav-start nav-section'>
          <Image
            className='reel-icon'
            src={"/reel_favicon.png"}
            width={256}
            height={256}
            alt='alt logo'
          />
          <span>ReelTone</span>
        </div>
        <nav className='nav-middle nav-section'>
          <Link href={"/auth/signin"}>SIGN IN</Link>
          <Link href={"/auth/signup"}>CREATE ACCOUNT</Link>
          <Link href={"/me"}>ME</Link>
          <Link href={"/films"}>FILMS</Link>
          <Link href={"/members"}>MEMBERS</Link>
        </nav>
        <div className='nav-end nav-section'>
          <InputContainer />
        </div>
      </div>
    </div>
  );
}
