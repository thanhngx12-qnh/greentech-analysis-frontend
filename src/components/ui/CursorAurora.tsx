// File: src/components/ui/CursorAurora.tsx
"use client";

import { useEffect, useState } from "react";

export default function CursorAurora() {
  const [position, setPosition] = useState({ x: "50%", y: "50%" });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: `${e.clientX}px`, y: `${e.clientY}px` });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="cursor-aurora"
      style={
        {
          "--mouse-x": position.x,
          "--mouse-y": position.y,
        } as React.CSSProperties
      }
    />
  );
}
