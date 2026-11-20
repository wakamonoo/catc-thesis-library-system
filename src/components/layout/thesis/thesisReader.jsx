"use client";
import PrimaryButton from "@/components/buttons/primaryButton";
import SecondaryButton from "@/components/buttons/secondaryButton";
import { useEffect, useRef, useState } from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdErrorOutline,
  MdLock,
  MdLockOpen,
  MdPictureAsPdf,
  MdViewSidebar,
} from "react-icons/md";

export default function ThesisReader({ thesisId }) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pageRefs = useRef({});
  const scrollRefContainer = useRef(null);
  const thumbnailContainerRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPages = async () => {
      try {
        setLoading(true);
        setErrorMessage("");
        setPages([]);

        const response = await fetch(
          `/api/theses/${encodeURIComponent(thesisId)}/pages`,
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Faile to load thesis.");
        }

        setPages(data.pages || []);
        setActivePage(data.pages?.[0]?.pageNumber || 1);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch thesis pages:", err);
          setErrorMessage(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (thesisId) fetchPages();

    return () => controller.abort();
  }, [thesisId]);

  useEffect(() => {
    if (!pages.length || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visiblePages = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visiblePages.length > 0) {
          const pageNumber = Number(visiblePages[0].target.dataset.page);
          setActivePage(pageNumber);
        }
      },
      {
        root: scrollRefContainer.current,
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-5px 0px -5% 0px",
      },
    );

    Object.values(pageRefs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pages, loading]);

  useEffect(() => {
    const activeThumbnail = thumbnailContainerRef.current?.querySelector(
      `[data-thumbnail="${activePage}"]`,
    );

    activeThumbnail?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [activePage]);

  const navigateToPage = (pageNumber) => {
    const targetPage = pageRefs.current[pageNumber];

    if (!targetPage) return;

    setActivePage(pageNumber);

    targetPage.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const navigateToPreviousPage = () => {
    if (activePage > 1) {
      navigateToPage(activePage - 1);
    }
  };

  const navigateToNextPage = () => {
    if (activePage < pages.length) {
      navigateToPage(activePage + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p>loading...</p>
      </div>
    );
  }

  if (errorMessage)
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-2">
        <MdErrorOutline className="text-4xl text-error shrink-0" />
        <p className="text-sm text-normal">{errorMessage}</p>
      </div>
    );

  if (!pages.length)
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-2">
        <MdPictureAsPdf className="text-4xl text-muted shrink-0" />
        <p className="text-sm text-muted">No document pages available.</p>
      </div>
    );

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-panel">
      <div className="flex items-center justify-between gap-2 px-4 py-2 bg-accent">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="cursor-pointer p-2 rounded-lg shrink-0 transition-all duration-200 hover:bg-(--color-secondary) active:bg-(--color-secondary)"
          title={sidebarOpen ? "Hide thumbnails" : "Show thumbnails"}
        >
          {sidebarOpen ? (
            <MdClose className="text-xl text-panel shrink-0" />
          ) : (
            <MdViewSidebar className="text-xl text-panel shrink-0" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={navigateToPreviousPage}
            disabled={activePage <= 1}
            className="cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-(--color-secondary) active:bg-(--color-secondary) disabled:opacity-20"
          >
            <MdChevronLeft className="text-xl text-panel shrink-0" />
          </button>
          <div className="flex items-center gap-2">
            <p className="text-xs text-panel font-bold">{activePage}</p>
            <p className="text-muted text-xs">/</p>
            <p className="text-muted text-xs">{pages.length}</p>
          </div>
          <button
            onClick={navigateToNextPage}
            disabled={activePage >= pages.length}
            className="cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-(--color-secondary) active:bg-(--color-secondary) disabled:opacity-20"
          >
            <MdChevronRight className="text-xl text-panel shrink-0" />
          </button>
        </div>
      </div>

      <div className="flex h-screen">
        {sidebarOpen && (
          <aside className="w-24 sm:w-32 md:w-40 shrink-0 border-r border-border bg-second flex flex-col min-h-0">
            <div
              ref={thumbnailContainerRef}
              className="my-4 flex-1 overflow-y-auto custom-scroll p-2 space-y-4"
            >
              {pages.map((page) => (
                <button
                  key={page.pageNumber}
                  data-thumbnail={page.pageNumber}
                  onClick={() => navigateToPage(page.pageNumber)}
                  className="cursor-pointer w-full flex flex-col items-center gap-2 group"
                >
                  <div
                    className={`relative w-full overflow-hidden rounded-md bg-panel border-2 shadow-sm transition-all duration-200 ${activePage === page.pageNumber ? "border-yellow ring-2 ring-(--color-yellow)/20" : "border-transparent group-hover:border-(--color-border) group-active:border-(--color-border)"}`}
                  >
                    <img
                      src={page.url}
                      alt={`Page ${page.pageNumber}`}
                      loading={page.pageNumber <= 2 ? "eager" : "lazy"}
                      draggable="false"
                      className="block w-full h-auto aspect-3/4 object-contain select-none"
                    />
                    {page.blurred && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <MdLock className="text-accent text-lg shrink-0" />
                      </div>
                    )}
                  </div>
                  <p
                    className={`text-xs font-semibold transition-all duration-200 ${activePage === page.pageNumber ? "text-accent" : "text-normal group-hover:text-(--color-accent) group-active:text-(--color-accent)"}`}
                  >
                    {page.pageNumber}
                  </p>
                </button>
              ))}
            </div>
          </aside>
        )}

        <div
          ref={scrollRefContainer}
          className="flex-1 min-w-0 overflow-y-auto scroll-smooth"
        >
          <div className="flex flex-col items-center gap-4 p-2">
            {pages.map((page) => (
              <div
                key={page.pageNumber}
                ref={(e) => (pageRefs.current[page.pageNumber] = e)}
                data-page={page.pageNumber}
                className="w-full max-w-4xl scroll-mt-2"
              >
                <div className="flex items-center justify-between mb-2 px-2">
                  <p className="text-xs font-semibold text-normal">
                    Page {page.pageNumber}
                  </p>

                  {page.blurred && (
                    <div className="flex items-center gap-2">
                      <MdLock className="text-sm text-muted shrink-0" />
                      <p className="hidden sm:block text-xs text-muted">
                        Restricted preview
                      </p>
                    </div>
                  )}
                </div>

                <div className="relative w-full overflow-hidden rounded-md bg-panel shadow-md">
                  <img
                    src={page.url}
                    alt={`Page ${page.pageNumber}`}
                    loading={page.pageNumber <= 2 ? "eager" : "lazy"}
                    draggable="false"
                    className="block w-full h-auto select-none"
                  />
                  {page.blurred && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-fite">
                        <SecondaryButton>
                          <p className="text-sm text-panel font-bold">
                            Request Access
                          </p>
                          <MdLockOpen className="text-base text-panel shrink-0" />
                        </SecondaryButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="py-8">
              <p className="text-xs text-muted text-center">
                End of document preview
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
