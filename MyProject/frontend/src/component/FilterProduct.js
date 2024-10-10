import React from "react";
import { ImSpoonKnife } from "react-icons/im";

const FilterProduct = ({category,onClick,isActive}) => {
  return (
    <div onClick={onClick}>
      <div className={`text-3xl p-7 bg-yellow-500 rounded-full cursor-pointer ${isActive && 'bg-yellow-700'}`}>
        <ImSpoonKnife />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;
