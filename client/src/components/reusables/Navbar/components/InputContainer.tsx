import { SearchIcon } from "@/assets/icons";

export default function InputContainer({}) {
  return (
    <div className='nav-input-container'>
      <input
        type='text'
        placeholder='Search...'
        className='nav-input'
        autoComplete='off'
      />
      <button className='nav-input-button'>
        <SearchIcon />
      </button>
    </div>
  );
}
