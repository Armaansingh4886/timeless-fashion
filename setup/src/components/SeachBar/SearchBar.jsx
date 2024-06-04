import { useState } from "react";
import "./searchbar.css";
import { products } from "../../utils/products";
// import useDebounce from "../../hooks/useDebounce";
const SearchBar = ({ setSearchItem }) => {
  // const debounceSearchWord = useDebounce(searchWord, 300);
  const[searchWord,setSearchWord] = useState("")
  const handelChange = (input) => {
    setSearchWord(input.target.value)
    
  };
  const handleClick =(e)=>{
    e.preventDefault()
    setSearchItem(searchWord);
    console.log("yes");
  }
  return (
    <div className="search-container">
      <form className="d-flex w-100 justify-content-between align-item-center h-100">
      <input type="text" placeholder="Search..." onChange={handelChange} />
      <button className="h-100"type="submit" onClick={handleClick}>
      <ion-icon name="search-outline" className="search-icon"></ion-icon></button></form>
    </div>
  );
};

export default SearchBar;
