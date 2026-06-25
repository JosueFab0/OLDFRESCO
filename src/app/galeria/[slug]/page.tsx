import { notFound } from "next/navigation";
import { galleryAlbums } from "@/lib/data";
import { ChevronRight, ImageIcon, Play, ArrowLeft } from "lucide-react";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";

export async function generateStaticParams() {
  return galleryAlbums.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const album = galleryAlbums.find((a) => a.slug === slug);
  if (!album) return {};
  return { title: `${album.artist} — Galería | OldFresco` };
}

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const album = galleryAlbums.find((a) => a.slug === slug);
  if (!album) notFound();

  const date = new Date(album.date + "T00:00:00");
  const formattedDate = date.toLocaleDateString("es-CR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 pb-24">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[#333] text-xs font-display tracking-widest mb-10">
        <Link href="/" className="hover:text-[#888] transition-colors">INICIO</Link>
        <ChevronRight size={10} />
        <Link href="/galeria" className="hover:text-[#888] transition-colors">GALERÍA</Link>
        <ChevronRight size={10} />
        <span className="text-[#ffe600]">{album.artist.toUpperCase()}</span>
      </nav>

      {/* Header del álbum */}
      <div className="mb-14">
        {/* Fecha pequeña arriba */}
        <p className="text-[#444] text-xs tracking-[0.3em] uppercase mb-3 capitalize">{formattedDate}</p>

        {/* Nombre + tour */}
        <h1
          className="font-display text-white leading-none mb-2"
          style={{ fontSize: "clamp(48px, 10vw, 130px)", letterSpacing: "-0.02em" }}
        >
          {album.artist}
        </h1>
        <div className="inline-block bg-[#ffe600] px-4 py-1 -skew-x-1 mb-6">
          <span className="font-display text-[#080808] tracking-wider text-sm md:text-lg">
            {album.eventTitle}
          </span>
        </div>

        <div className="flex items-center gap-6 mt-4">
          <p className="text-[#555] text-sm">{album.venue}, {album.city}</p>
          <div className="w-px h-4 bg-[#1e1e1e]" />
          <span className="flex items-center gap-1.5 text-[#555] text-sm">
            <ImageIcon size={13} />
            {album.photos.length} fotos
          </span>
          {album.videos.length > 0 && (
            <>
              <div className="w-px h-4 bg-[#1e1e1e]" />
              <span className="flex items-center gap-1.5 text-[#555] text-sm">
                <Play size={13} />
                {album.videos.length} videos
              </span>
            </>
          )}
        </div>
      </div>

      {/* Foto grid — componente cliente para lightbox */}
      <GalleryGrid album={album} />

      {/* Videos */}
      {album.videos.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 bg-[#ff1f1f]" />
            <h2 className="font-display text-2xl md:text-4xl tracking-tight">VIDEOS</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {album.videos.map((video) => (
              <div
                key={video.id}
                className="group relative border border-[#141414] hover:border-[#ff1f1f] transition-colors overflow-hidden cursor-pointer"
              >
                {/* Thumbnail placeholder */}
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "16/9", backgroundColor: album.coverAccent }}
                >
                  {/* Letra de fondo */}
                  <div
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                  >
                    <span
                      className="font-display leading-none opacity-20"
                      style={{
                        fontSize: "120px",
                        color: "#fff",
                      }}
                    >
                      {album.artist[0]}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 to-transparent" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#ff1f1f] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={20} className="text-white ml-1" fill="white" />
                    </div>
                  </div>

                  {/* Duración */}
                  <span className="absolute bottom-3 right-3 font-display text-[10px] tracking-widest bg-[#080808]/80 text-[#f0ede8] px-2 py-1">
                    {video.duration}
                  </span>
                </div>

                {/* Info del video */}
                <div className="p-4">
                  <p className="text-sm text-[#f0ede8] leading-snug group-hover:text-white transition-colors line-clamp-2">
                    {video.title}
                  </p>
                  <p className="text-[#444] text-xs mt-1 font-display tracking-widest">
                    {album.artist.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nav entre álbumes */}
      <div className="mt-20 pt-8 border-t border-[#141414] flex items-center justify-between">
        <Link
          href="/galeria"
          className="flex items-center gap-2 text-[#555] hover:text-white transition-colors font-display text-xs tracking-widest"
        >
          <ArrowLeft size={14} /> TODOS LOS ÁLBUMES
        </Link>

        {/* Álbum siguiente */}
        {(() => {
          const idx = galleryAlbums.findIndex((a) => a.slug === slug);
          const next = galleryAlbums[idx + 1];
          if (!next) return null;
          return (
            <Link
              href={`/galeria/${next.slug}`}
              className="flex items-center gap-2 text-[#555] hover:text-[#ffe600] transition-colors font-display text-xs tracking-widest group"
            >
              {next.artist.toUpperCase()}
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          );
        })()}
      </div>
    </div>
  );
}
