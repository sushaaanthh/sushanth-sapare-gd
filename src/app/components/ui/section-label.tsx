import React from "react";

export function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-14 lg:mb-20">
      <span className="text-[#FF5B3D] text-xs font-bold tracking-[0.2em] uppercase">{label}</span>
      <div className="h-px w-10 bg-[#FF5B3D]/50" />
    </div>
  );
}
