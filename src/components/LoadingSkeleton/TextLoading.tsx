"use client";

export default function TextSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4 text-center">
      {/* 40px ölçüsündə Başlıq Skeletonu */}
      <div className="h-10 w-3/4 md:w-1/2 bg-gray-900 animate-pulse rounded-2xl" />
      
      {/* Altındakı kiçik yazı Skeletonu */}
      <div className="h-5 w-1/4 bg-gray-100 animate-pulse rounded-lg" />
    </div>
  );
}