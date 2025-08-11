import { ArrowDownSvg } from "@/assets/icons";
import useFilter from "@/hooks/useFilter";
import Link from "next/link";

export const languages = [
  { name: "English", code: "en" },
  { name: "Spanish", code: "es" },
  { name: "French", code: "fr" },
  { name: "German", code: "de" },
  { name: "Italian", code: "it" },
  { name: "Portuguese", code: "pt" },
  { name: "Russian", code: "ru" },
  { name: "Japanese", code: "ja" },
  { name: "Korean", code: "ko" },
  { name: "Chinese (Simplified)", code: "zh" },
  { name: "Chinese (Traditional)", code: "zh-Hant" },
  { name: "Arabic", code: "ar" },
  { name: "Hindi", code: "hi" },
  { name: "Bengali", code: "bn" },
  { name: "Turkish", code: "tr" },
  { name: "Dutch", code: "nl" },
  { name: "Polish", code: "pl" },
  { name: "Swedish", code: "sv" },
  { name: "Finnish", code: "fi" },
  { name: "Norwegian", code: "no" },
  { name: "Danish", code: "da" },
  { name: "Czech", code: "cs" },
  { name: "Hungarian", code: "hu" },
  { name: "Greek", code: "el" },
  { name: "Thai", code: "th" },
  { name: "Hebrew", code: "he" },
  { name: "Indonesian", code: "id" },
  { name: "Vietnamese", code: "vi" },
  { name: "Malay", code: "ms" },
  { name: "Romanian", code: "ro" },
  { name: "Ukrainian", code: "uk" },
  { name: "Persian (Farsi)", code: "fa" },
  { name: "Urdu", code: "ur" },
  { name: "Swahili", code: "sw" },
];

export default function LanguageFilter() {
  const handleFilter = useFilter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleFilter(e.currentTarget.href.split("?")[1] ?? "");
  };
  return (
    <div className='filter-group-container flex flex-col styled-scroll-bar absolute'>
      <h3 className='text-md text-center font-semibold dropdown-title'>
        Language
        <span>
          <ArrowDownSvg />
        </span>
      </h3>
      <Link
        onClick={handleClick}
        className='yearly-group-btn filter-btn transition-all'
        href={"/films/filter"}
      >
        All
      </Link>
      {languages.map(({ name, code }) => (
        <Link
          key={code}
          prefetch={false}
          onClick={handleClick}
          className='yearly-group-btn filter-btn transition-all'
          href={`/films/filter?language=${code}`}
        >
          {name}
        </Link>
      ))}
    </div>
  );
}
