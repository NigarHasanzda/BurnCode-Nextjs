// @/components/LoadingSkeleton/CategoriesSkeleton.tsx
import React from "react";

// Tək bir kateqoriya düyməsinin skeletonu
const CategorySkeletonItem = () => {
  return (
    // 'animate-pulse' Tailwind-in hazır animasiyasıdır
    // Dizayndakı 'px-6 py-3 rounded-full' ölçülərinə uyğunlaşdırılıb
    <div className="animate-pulse">
      <div className="h-[48px] w-[100px] bg-gray-200 rounded-full"></div>
    </div>
  );
};

// 4 yan-yana düyməni saxlayan əsas skeleton komponenti
const CategoriesSkeleton = () => {
  return (
    // Sizin əsas kodunuzdakı 'mb-[50px]' və 'flex flex-wrap items-center justify-center gap-3' stilləri
    <div className="mb-[50px] mt-[20px]">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* İstədiyiniz 4 ədəd yan-yana skeleton */}
        <CategorySkeletonItem />
        <CategorySkeletonItem />
        <CategorySkeletonItem />
        <CategorySkeletonItem />
      </div>
    </div>
  );
};

export default CategoriesSkeleton;