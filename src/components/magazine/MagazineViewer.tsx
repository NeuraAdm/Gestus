import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { PageFlip } from 'page-flip';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).href;

const RENDER_SCALE = 1.5;
const MOBILE_BREAKPOINT = 640;

type MagazineViewerProps = { pdfUrl: string };

const MagazineViewer = ({ pdfUrl }: MagazineViewerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const flipContainerRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<PageFlip | null>(null);

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [progress, setProgress] = useState(0);

  const isMobile = containerWidth > 0 && containerWidth < MOBILE_BREAKPOINT;

  // Measure container width, update on resize
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    setContainerWidth(wrapper.clientWidth);
    const ro = new ResizeObserver((entries) => {
      setContainerWidth(entries[0]?.contentRect.width ?? 0);
    });
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  // Load PDF → render pages to webp dataURLs
  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setProgress(0);
    setImageUrls([]);

    const load = async () => {
      try {
        const pdf = await pdfjsLib.getDocument({ url: pdfUrl }).promise;
        const numPages = pdf.numPages;
        const urls: string[] = [];

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          if (cancelled) return;
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: RENDER_SCALE });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Canvas 2D context unavailable');
          await page.render({ canvasContext: ctx, viewport }).promise;
          urls.push(canvas.toDataURL('image/webp', 0.85));
          setProgress(Math.round((pageNum / numPages) * 100));
        }

        if (!cancelled) {
          setImageUrls(urls);
          setStatus('ready');
        }
      } catch (err) {
        if (!cancelled) {
          console.error('MagazineViewer:', err);
          setStatus('error');
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  // Desktop only: initialize/destroy PageFlip
  useEffect(() => {
    if (status !== 'ready' || imageUrls.length === 0 || isMobile || !flipContainerRef.current) {
      flipRef.current?.destroy();
      flipRef.current = null;
      return;
    }

    flipRef.current?.destroy();
    flipRef.current = null;

    const flip = new PageFlip(flipContainerRef.current, {
      width: 550,
      height: 733,
      size: 'stretch',
      showCover: true,
      flippingTime: 800,
      mobileScrollSupport: false,
      usePortrait: false,
      drawShadow: true,
      maxShadowOpacity: 0.5,
    });

    flip.loadFromImages(imageUrls);

    const audio = new Audio('/page-turn.mp3');
    audio.volume = 0.4;
    flip.on('flip', () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    });

    flipRef.current = flip;

    return () => {
      flipRef.current?.destroy();
      flipRef.current = null;
    };
  }, [status, imageUrls, isMobile]);

  return (
    <div ref={wrapperRef} className="w-full bg-slate-100">
      {/* Loading state */}
      {status === 'loading' && (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
          <div className="h-1.5 w-48 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-slate-500">Preparando revista... {progress}%</p>
        </div>
      )}

      {/* Error state */}
      {status === 'error' && (
        <div className="flex min-h-[400px] items-center justify-center px-4">
          <p className="text-center text-sm text-rose-500">
            No se pudo cargar el PDF. Verifica que el archivo sea accesible (CORS).
          </p>
        </div>
      )}

      {status === 'ready' && (
        <>
          {/* Mobile: vertical scroll */}
          {isMobile && (
            <div className="divide-y divide-slate-200">
              {imageUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Página ${i + 1}`}
                  className="w-full"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
          )}

          {/* Desktop: PageFlip flipbook */}
          {!isMobile && (
            <div
              ref={flipContainerRef}
              className="w-full"
              style={{ minHeight: 600 }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MagazineViewer;
