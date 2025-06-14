"use client";
import { SearchIcon } from "@/assets/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InputContainer({}) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      return;
    }
    const query = encodeURIComponent(searchQuery.trim());
    const url = `/film/${query}`;
    router.push(url);
    setSearchQuery("");
  };
  return (
    <div className='nav-input-container'>
      <input
        type='text'
        placeholder='Search...'
        className='nav-input'
        autoComplete='off'
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className='nav-input-button' onClick={handleSearch}>
        <SearchIcon />
      </button>
    </div>
  );
}
