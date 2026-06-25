"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { GalleryAlbum } from "@/lib/types";

type Props = { album: GalleryAlbum };

export default function GalleryGrid({ album }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const open = (i: number) => setLightbox(i);
  const close = () => setLightbox(null);
  const prev = () => setLightbox((n) => (n !== null ? (n - 1 + album.photos.length) % album.photos.length : null));
  const next = () => setLightbox((n) => (n !== null ? (n + 1) % album.photos.length : null));

  const aspectClass = (aspect: string) => {
    if (aspect === "wide") return "col-span-2";
    if (aspect === "tall") return "row-span-2";
    return "";
  };

  return (
    <>
      {/* Masonry-ish grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] gap-2">
        {album.photos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => open(i)}
            className={`group relative overflow-hidden border border-[#141414] hover:border-[#ffe600] transition-all duration-200 ${aspectClass(photo.aspect)}`}
            style={{ backgroundColor: photo.accent }}
          >
            {/* Fondo generativo con la inicial del artista */}
            <div className="absolute inset-0 flex items-center justify-center select-none">
              <span
                className="font-display leading-none opacity-10 text-white"
                style={{ fontSize: "clamp(80px, 15vw, 160px)" }}
              >
                {album.artist[0]}
              </span>
            </div>

            {/* Número de foto como detalle */}
            <span
              className="absolute top-3 left-3 font-display text-[10px] tracking-widest opacity-30 text-white"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Hover overlay con zoom icon */}
            <div className="absolute inset-0 bg-[#ffe600]/0 group-hover:bg-[#ffe600]/8 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 bg-[#080808]/70 flex items-center justify-center">
                <ZoomIn size={16} className="text-[#ffe600]" />
              </div>
            </div>

            {/* Borde amarillo animado */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffe600] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-[#080808]/95 z-50 flex items-center justify-center backdrop-blur-sm"
          onClick={close}
        >
          {/* Cerrar */}
          <button
            onClick={close}
            className="absolute top-5 right-5 w-10 h-10 border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-white hover:border-white transition-colors"
          >
            <X size={18} />
          </button>

          {/* Contador */}
          <div className="absolute top-5 left-5 font-display text-xs tracking-widest text-[#444]">
            <span className="text-[#ffe600]">{String(lightbox + 1).padStart(2, "0")}</span>
            <span className="text-[#333]"> / {String(album.photos.length).padStart(2, "0")}</span>
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 w-12 h-12 border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-white hover:border-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Imagen */}
          <div
            className="relative max-w-3xl w-full mx-20 overflow-hidden border border-[#1e1e1e]"
            style={{
              backgroundColor: album.photos[lightbox].accent,
              aspectRatio: album.photos[lightbox].aspect === "wide" ? "16/9" : album.photos[lightbox].aspect === "tall" ? "3/4" : "1/1",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Placeholder visual */}
            <div className="absolute inset-0 flex items-center justify-center select-none">
              <span
                className="font-display leading-none text-white opacity-10"
                style={{ fontSize: "clamp(120px, 25vw, 280px)" }}
              >
                {album.artist[0]}
              </span>
            </div>

            {/* Info superpuesta */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#080808] to-transparent">
              <p className="font-display text-white text-lg tracking-wider">{album.artist}</p>
              <p className="text-[#888] text-xs mt-0.5">{album.eventTitle} · {album.city}</p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 w-12 h-12 border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-white hover:border-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          {/* Thumbnails strip */}
          <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-1.5 px-6 overflow-x-auto">
            {album.photos.map((p, i) => (
              <button
                key={p.id}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className={`flex-shrink-0 w-10 h-10 border-2 transition-all ${i === lightbox ? "border-[#ffe600]" : "border-[#2a2a2a] opacity-50 hover:opacity-80"}`}
                style={{ backgroundColor: p.accent }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
