"use client";
import { AccountSvg, LogoutSvg } from "@/assets/icons";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSignOut from "@/hooks/useSignOut";

export default function UserButton() {
  const { user, isSignedIn } = useUser();
  const [optionsOpen, setOptionsOpen] = useState(false);
  const router = useRouter();
  const { handleSignOut } = useSignOut();

  useEffect(() => {
    document.addEventListener("click", (e: any) => {
      const target = e.target;
      if (
        !target.classList.contains("options-container") &&
        !target.closest(".options-container") &&
        !e.target.classList.contains("pfp")
      ) {
        setOptionsOpen(false);
      }
    });
  }, []);

  const handleImageLoadingError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = "/default-user-icon.svg";
  };

  const handleClick = () => {
    router.push("/settings");
  };

  if (!isSignedIn) return null;

  return (
    <div className='pfp-container'>
      <img
        onClick={() => setOptionsOpen(!optionsOpen)}
        className='pfp'
        src={user?.imageUrl ? user.imageUrl : "/svgs/default-user-icon.svg"}
        alt='profile picture'
        onError={handleImageLoadingError}
      />

      <div className={`options-container ${optionsOpen ? "open" : ""}`}>
        <button onClick={handleClick}>
          <AccountSvg />
          <span>Profile</span>
        </button>
        <button className='logout-nav' onClick={handleSignOut}>
          <LogoutSvg />
          <span>logout</span>
        </button>
      </div>
    </div>
  );
}
