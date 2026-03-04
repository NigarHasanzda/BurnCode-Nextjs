import React from "react";

const CategorySkeletonItem = () => {
  return (
    <div className="animate-pulse">
      <div className="h-[48px] w-[100px] bg-gray-200 rounded-full"></div>
    </div>
  );
};


const CategoriesSkeleton = () => {
  return (
    <div className="mb-[50px] mt-[20px]">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <CategorySkeletonItem />
        <CategorySkeletonItem />
        <CategorySkeletonItem />
        <CategorySkeletonItem />
      </div>
    </div>
  );
};

export default CategoriesSkeleton;