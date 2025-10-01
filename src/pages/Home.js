import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LotteryCard from "../components/LotteryCard";
import { featuredWinners, landingBanners } from "../data/lotteryData";
import { useLotteryData } from "../context/LotteryDataContext";
import "./Home.css";

const initialScrollState = {
  canScrollLeft: false,
  canScrollRight: false
};

function formatWinnerDate(isoString) {
  if (!isoString) {
    return "";
  }
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return isoString;
  }
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}

function Home() {
  const navigate = useNavigate();
  const { lotteries, loading } = useLotteryData();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [isBannerAnimating, setIsBannerAnimating] = useState(true);
  const [drawScrollState, setDrawScrollState] = useState(initialScrollState);
  const [winnerScrollState, setWinnerScrollState] = useState(initialScrollState);
  const drawScrollerRef = useRef(null);
  const winnersScrollerRef = useRef(null);
  const bannerTrackRef = useRef(null);

  const draws = useMemo(() => lotteries, [lotteries]);
  const hasDraws = draws.length > 0;
  const winners = featuredWinners;
  const hasWinners = winners.length > 0;

  const banners = useMemo(() =>
    landingBanners.map((banner) => {
      const lottery = draws.find((draw) => draw.id === banner.lotteryId);

      return {
        ...banner,
        ticketText: lottery?.price ?? banner.ticketText,
        prizeText: lottery?.prize ?? banner.prizeText,
        frequencyText: lottery?.frequency ?? banner.frequencyText
      };
    }),
    [draws]
  );

  const slides = useMemo(() => {
    if (!banners.length) {
      return [];
    }

    if (banners.length === 1) {
      return banners.map((banner, index) => ({
        data: banner,
        originalIndex: index,
        slideKey: `${banner.id}-single`
      }));
    }

    const firstClone = {
      data: banners[0],
      originalIndex: 0,
      slideKey: `${banners[0].id}-clone-next`
    };
    const lastClone = {
      data: banners[banners.length - 1],
      originalIndex: banners.length - 1,
      slideKey: `${banners[banners.length - 1].id}-clone-prev`
    };

    return [
      lastClone,
      ...banners.map((banner, index) => ({
        data: banner,
        originalIndex: index,
        slideKey: `${banner.id}-${index}`
      })),
      firstClone
    ];
  }, [banners]);

  useEffect(() => {
    if (banners.length > 1) {
      setIsBannerAnimating(false);
      setActiveBannerIndex(1);
    } else if (banners.length === 1) {
      setIsBannerAnimating(false);
      setActiveBannerIndex(0);
    } else {
      setActiveBannerIndex(0);
    }
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1 || slides.length <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setIsBannerAnimating(true);
      setActiveBannerIndex((previous) => {
        const next = previous + 1;
        const maxIndex = slides.length - 1;
        return next > maxIndex ? maxIndex : next;
      });
    }, 8000);

    return () => {
      window.clearInterval(interval);
    };
  }, [banners.length, slides.length]);

  const effectiveActiveIndex = useMemo(() => {
    if (!banners.length) {
      return 0;
    }

    if (banners.length === 1) {
      return 0;
    }

    return activeBannerIndex;
  }, [activeBannerIndex, banners.length]);

  const resolvedActiveIndex = banners.length > 1 ? effectiveActiveIndex : 0;
  const realBannerIndex = banners.length
    ? (banners.length > 1
        ? (resolvedActiveIndex - 1 + banners.length) % banners.length
        : 0)
    : 0;

  useEffect(() => {
    if (!isBannerAnimating) {
      const frame = window.requestAnimationFrame(() => {
        setIsBannerAnimating(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }
  }, [isBannerAnimating]);

  useEffect(() => {
    const node = bannerTrackRef.current;
    if (!node || banners.length <= 1 || slides.length === 0) {
      return undefined;
    }

    const handleTransitionEnd = () => {
      if (activeBannerIndex === slides.length - 1) {
        setIsBannerAnimating(false);
        setActiveBannerIndex(1);
      } else if (activeBannerIndex === 0) {
        setIsBannerAnimating(false);
        setActiveBannerIndex(slides.length - 2);
      }
    };

    node.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      node.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [activeBannerIndex, banners.length, slides.length]);

  const updateDrawScrollState = useCallback(() => {
    const node = drawScrollerRef.current;
    if (!node) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = node;
    const maxScrollLeft = scrollWidth - clientWidth;
    const epsilon = 2;

    setDrawScrollState({
      canScrollLeft: scrollLeft > epsilon,
      canScrollRight: maxScrollLeft > 0 && scrollLeft < maxScrollLeft - epsilon
    });
  }, []);

  const updateWinnerScrollState = useCallback(() => {
    const node = winnersScrollerRef.current;
    if (!node) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = node;
    const maxScrollLeft = scrollWidth - clientWidth;
    const epsilon = 2;

    setWinnerScrollState({
      canScrollLeft: scrollLeft > epsilon,
      canScrollRight: maxScrollLeft > 0 && scrollLeft < maxScrollLeft - epsilon
    });
  }, []);

  useEffect(() => {
    const node = drawScrollerRef.current;
    if (!node) {
      return undefined;
    }

    updateDrawScrollState();
    node.addEventListener("scroll", updateDrawScrollState);

    const handleResize = () => updateDrawScrollState();
    window.addEventListener("resize", handleResize);

    return () => {
      node.removeEventListener("scroll", updateDrawScrollState);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateDrawScrollState, draws.length]);

  useEffect(() => {
    updateDrawScrollState();
  }, [draws.length, updateDrawScrollState]);

  useEffect(() => {
    const node = winnersScrollerRef.current;
    if (!node) {
      return undefined;
    }

    updateWinnerScrollState();
    node.addEventListener("scroll", updateWinnerScrollState);

    const handleResize = () => updateWinnerScrollState();
    window.addEventListener("resize", handleResize);

    return () => {
      node.removeEventListener("scroll", updateWinnerScrollState);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateWinnerScrollState, winners.length]);

  useEffect(() => {
    updateWinnerScrollState();
  }, [winners.length, updateWinnerScrollState]);

  const handleScroll = useCallback(
    (direction) => {
      const node = drawScrollerRef.current;
      if (!node) {
        return;
      }

      const scrollAmount = Math.max(node.clientWidth - 120, 280);
      node.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
      window.requestAnimationFrame(updateDrawScrollState);
    },
    [updateDrawScrollState]
  );

  const handleWinnerScroll = useCallback(
    (direction) => {
      const node = winnersScrollerRef.current;
      if (!node) {
        return;
      }

      const scrollAmount = Math.max(node.clientWidth - 120, 260);
      node.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
      window.requestAnimationFrame(updateWinnerScrollState);
    },
    [updateWinnerScrollState]
  );

  const handleBannerNav = useCallback(
    (direction) => {
      if (banners.length <= 1 || slides.length <= 1) {
        return;
      }

      setIsBannerAnimating(true);
      setActiveBannerIndex((previous) => {
        const next = previous + direction;
        if (next < 0) {
          return 0;
        }
        const maxIndex = slides.length - 1;
        if (next > maxIndex) {
          return maxIndex;
        }
        return next;
      });
    },
    [banners.length, slides.length]
  );

  const handleBannerSelect = useCallback((index) => {
    if (!banners.length) {
      return;
    }

    setIsBannerAnimating(true);
    if (banners.length > 1) {
      setActiveBannerIndex(index + 1);
    } else {
      setActiveBannerIndex(index);
    }
  }, [banners.length]);

  const handleBannerCta = (banner) => {
    navigate("/all-lotteries", { state: { highlight: banner.lotteryId } });
  };

  const handlePlayNow = () => {
    navigate("/all-lotteries", { state: { highlight: "featured" } });
  };

  return (
    <div className="home">
      <section className="banner">
        {banners.length ? (
          <div className="banner-inner">
            <div
              className="banner-track"
              ref={bannerTrackRef}
              style={{
                transform: `translateX(-${resolvedActiveIndex * 100}%)`,
                transition: isBannerAnimating ? "transform 0.6s ease" : "none"
              }}
            >
              {slides.map(({ data: banner, slideKey }) => (
                <article
                  key={slideKey}
                  className="banner-slide"
                  id={slideKey}
                  style={{ backgroundImage: banner.backgroundImage }}
                >
                  <div className="banner-content">
                    <p className="banner-kicker">{banner.kicker}</p>
                    <h1>{banner.headline}</h1>
                    <p className="banner-description">{banner.description}</p>
                    <div className="banner-meta">
                      <span>{banner.ticketText}</span>
                      <span>{banner.prizeText}</span>
                      <span>{banner.frequencyText}</span>
                    </div>
                    <div className="banner-actions">
                      <button
                        className="btn"
                        type="button"
                        onClick={() => handleBannerCta(banner)}
                      >
                        {banner.ctaLabel}
                      </button>
                      <Link className="btn btn-outline" to="/all-lotteries">
                        Explore Lotteries
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <button
              type="button"
              className="carousel-btn banner-nav banner-nav--prev"
              onClick={() => handleBannerNav(-1)}
              aria-label="Previous banner"
              disabled={banners.length <= 1}
            >
              ‹
            </button>
            <button
              type="button"
              className="carousel-btn banner-nav banner-nav--next"
              onClick={() => handleBannerNav(1)}
              aria-label="Next banner"
              disabled={banners.length <= 1}
            >
              ›
            </button>
            <div className="banner-dots" role="tablist" aria-label="Featured lotteries">
              {banners.map((banner, index) => {
                const slideForDot = banners.length > 1 ? slides[index + 1] : slides[index];
                const controlId = slideForDot?.slideKey ?? `${banner.id}-${index}`;

                return (
                <button
                  key={banner.id}
                  type="button"
                  role="tab"
                  aria-selected={realBannerIndex === index}
                  className={`banner-dot ${
                    realBannerIndex === index ? "banner-dot--active" : ""
                  }`.trim()}
                  onClick={() => handleBannerSelect(index)}
                  aria-controls={controlId}
                >
                  <span className="visually-hidden">{banner.kicker}</span>
                </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="banner-fallback">
            <h1>Every ticket sparks a new legend</h1>
            <p>We&apos;re loading today&apos;s featured jackpots. Hang tight!</p>
            <div className="banner-actions">
              <button className="btn" type="button" onClick={handlePlayNow}>
                View lotteries
              </button>
            </div>
          </div>
        )}
      </section>

      <section id="our-draws" className="our-draws page">
        <h2>Our Draws</h2>
        <p className="section-intro">Select your favourite draw, pick your lucky numbers, and we’ll handle the rest.</p>
        {loading && !hasDraws ? (
          <p className="loading-copy" role="status">
            Fetching the latest draws…
          </p>
        ) : hasDraws ? (
          <div className="draw-carousel">
            <button
              type="button"
              className="carousel-btn carousel-btn--prev"
              onClick={() => handleScroll(-1)}
              disabled={!drawScrollState.canScrollLeft}
              aria-label="Scroll draws left"
            >
              ‹
            </button>
            <div className="draw-grid" ref={drawScrollerRef}>
              {draws.map((draw) => (
                <LotteryCard key={draw.id} {...draw} />
              ))}
            </div>
            <button
              type="button"
              className="carousel-btn carousel-btn--next"
              onClick={() => handleScroll(1)}
              disabled={!drawScrollState.canScrollRight}
              aria-label="Scroll draws right"
            >
              ›
            </button>
          </div>
        ) : (
          <p className="loading-copy" role="status">
            Draws are being configured. Please check back shortly.
          </p>
        )}
      </section>

      <section className="winners page">
        <h2>Winners Spotlight</h2>
        <p className="section-intro">Congratulations to our recent champions from around the world.</p>
        {hasWinners ? (
          <div className="winners-carousel">
            <button
              type="button"
              className="carousel-btn carousel-btn--prev"
              onClick={() => handleWinnerScroll(-1)}
              disabled={!winnerScrollState.canScrollLeft}
              aria-label="Scroll winners left"
            >
              ‹
            </button>
            <div className="winners-grid" ref={winnersScrollerRef}>
              {winners.map((winner) => {
                const formattedDate = formatWinnerDate(winner.wonAt);
                return (
                  <article key={`${winner.name}-${winner.draw}`} className="winner-card">
                    <header className="winner-header">
                      <h3>{winner.name}</h3>
                      <span className="winner-draw">{winner.draw}</span>
                    </header>
                    <p className="winner-amount">{winner.amount}</p>
                    {Array.isArray(winner.numbers) && winner.numbers.length > 0 && (
                      <ul className="winner-numbers" aria-label={`Winning numbers for ${winner.draw}`}>
                        {winner.numbers.map((number) => (
                          <li key={`${winner.draw}-${number}`}>{number}</li>
                        ))}
                      </ul>
                    )}
                    {formattedDate && (
                      <p className="winner-timestamp">Won on {formattedDate}</p>
                    )}
                    <p className="winner-location">{winner.location}</p>
                  </article>
                );
              })}
            </div>
            <button
              type="button"
              className="carousel-btn carousel-btn--next"
              onClick={() => handleWinnerScroll(1)}
              disabled={!winnerScrollState.canScrollRight}
              aria-label="Scroll winners right"
            >
              ›
            </button>
          </div>
        ) : (
          <p className="loading-copy" role="status">
            We're gathering the latest winner stories.
          </p>
        )}
      </section>
    </div>
  );
}

export default Home;
