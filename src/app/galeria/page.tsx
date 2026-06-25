import Link from "next/link";
import { galleryAlbums } from "@/lib/data";
import { ArrowUpRight, ImageIcon, Play } from "lucide-react";

export const metadata = {
  title: "Galería — OldFresco",
};

export default function GaleriaPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">

      {/* Header editorial */}
      <div className="mb-16">
        <h1
          className="font-display text-white leading-none"
          style={{ fontSize: "clamp(60px, 14vw, 180px)", letterSpacing: "-0.02em" }}
        >
          GALERÍA
        </h1>
        <div className="flex items-center gap-8 border-t border-[#141414] mt-6 pt-6">
          <div>
            <span className="font-display text-[#ffe600] text-2xl">{galleryAlbums.length}</span>
            <span className="text-[#444] text-xs ml-2 tracking-widest uppercase">álbumes</span>
          </div>
          <div className="w-px h-6 bg-[#1e1e1e]" />
          <div>
            <span className="font-display text-[#ffe600] text-2xl">
              {galleryAlbums.reduce((s, a) => s + a.photos.length, 0)}
            </span>
            <span className="text-[#444] text-xs ml-2 tracking-widest uppercase">fotos</span>
          </div>
          <div className="w-px h-6 bg-[#1e1e1e]" />
          <div>
            <span className="font-display text-[#ffe600] text-2xl">
              {galleryAlbums.reduce((s, a) => s + a.videos.length, 0)}
            </span>
            <span className="text-[#444] text-xs ml-2 tracking-widest uppercase">videos</span>
          </div>
        </div>
      </div>

      {/* Grid de álbumes — layout editorial con tamaños mixtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {galleryAlbums.map((album, i) => {
          const date = new Date(album.date + "T00:00:00");
          const isLarge = i === 0 || i === 3;

          return (
            <Link
              key={album.id}
              href={`/galeria/${album.slug}`}
              className={`group relative overflow-hidden border border-[#141414] hover:border-[#ffe600] transition-all duration-300 ${isLarge ? "sm:col-span-2 lg:col-span-2" : ""}`}
            >
              {/* Cover — placeholder con color de acento y letra del artista */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  backgroundColor: album.coverAccent,
                  aspectRatio: isLarge ? "16/7" : "4/3",
                }}
              >
                {/* Letra enorme como textura */}
                <div
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                >
                  <span
                    className="font-display leading-none"
                    style={{
                      fontSize: "clamp(100px, 20vw, 260px)",
                      color: "transparent",
                      WebkitTextStroke: `1px ${album.coverAccent}cc`,
                      filter: "brightness(1.6)",
                    }}
                  >
                    {album.artist[0]}
                  </span>
                </div>

                {/* Grid de fotos de muestra en el fondo */}
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-px opacity-20">
                  {Array.from({ length: 8 }).map((_, j) => (
                    <div
                      key={j}
                      className="w-full h-full"
                      style={{ backgroundColor: j % 2 === 0 ? album.coverAccent : `${album.coverAccent}88` }}
                    />
                  ))}
                </div>

                {/* Gradient overlay bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#08080855] to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#ffe600]/0 group-hover:bg-[#ffe600]/5 transition-colors duration-300" />

                {/* Icono ver */}
                <div className="absolute top-4 right-4 w-9 h-9 bg-[#080808]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={16} className="text-[#ffe600]" />
                </div>

                {/* Badges de fotos/videos */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="flex items-center gap-1.5 bg-[#080808]/70 text-[#f0ede8] font-display text-[10px] tracking-widest px-2.5 py-1">
                    <ImageIcon size={10} />
                    {album.photos.length}
                  </span>
                  {album.videos.length > 0 && (
                    <span className="flex items-center gap-1.5 bg-[#ff1f1f]/80 text-white font-display text-[10px] tracking-widest px-2.5 py-1">
                      <Play size={9} />
                      {album.videos.length}
                    </span>
                  )}
                </div>
              </div>

              {/* Info del evento */}
              <div className="p-5 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-display text-white text-xl leading-tight truncate group-hover:text-[#ffe600] transition-colors">
                    {album.artist}
                  </p>
                  <p className="text-[#555] text-xs mt-0.5 uppercase tracking-wide font-display truncate">
                    {album.eventTitle}
                  </p>
                  <p className="text-[#333] text-xs mt-1.5">
                    {album.venue} · {album.city}
                  </p>
                </div>

                {/* Fecha como elemento */}
                <div className="text-right flex-shrink-0">
                  <p className="font-display text-[#ffe600] text-3xl leading-none">
                    {String(date.getDate()).padStart(2, "0")}
                  </p>
                  <p className="font-display text-[#444] text-xs tracking-widest">
                    {date.toLocaleDateString("es-CR", { month: "short", year: "numeric" }).toUpperCase().replace(".", "")}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
