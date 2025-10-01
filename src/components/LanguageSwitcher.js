import React, { useEffect, useRef, useState } from "react";
import "./LanguageSwitcher.css";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  {
    code: "fr",
    label: "Français",
    flag: "🇫🇷",
    comingSoon: "Expérience française bientôt disponible."
  },
  {
    code: "es",
    label: "Español",
    flag: "🇪🇸",
    comingSoon: "La experiencia en español estará disponible pronto."
  },
  {
    code: "ru",
    label: "Русский",
    flag: "🇷🇺",
    comingSoon: "Русская версия скоро будет доступна."
  }
];

function LanguageSwitcher({
  buttonClassName = "btn btn-outline",
  menuAlignment = "right",
  compact = false
}) {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [announcement, setAnnouncement] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSelect = (language) => {
    setSelectedLanguage(language);
    setAnnouncement(language.comingSoon ?? "");
    setOpen(false);
  };

  return (
    <div
      className={`language-switcher ${
        open ? "language-switcher--open" : ""
      } ${compact ? "language-switcher--compact" : ""}`.trim()}
      ref={wrapperRef}
    >
      <button
        type="button"
        className={`${buttonClassName} language-switcher__toggle`}
        onClick={() => setOpen((previous) => !previous)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Change language. Current language ${selectedLanguage.label}`}
      >
        <span aria-hidden="true" className="language-switcher__flag">
          {selectedLanguage.flag}
        </span>
        <span className="language-switcher__label">
          {selectedLanguage.label}
        </span>
      </button>
      {open && (
        <div
          className={`language-switcher__menu language-switcher__menu--${menuAlignment}`}
          role="menu"
        >
          {languages
            .filter((language) => language.code !== selectedLanguage.code)
            .map((language) => (
            <button
              key={language.code}
              type="button"
              className={`language-switcher__option ${
                language.code === selectedLanguage.code
                  ? "language-switcher__option--active"
                  : ""
              }`.trim()}
              onClick={() => handleSelect(language)}
              role="menuitem"
            >
              <span aria-hidden="true" className="language-switcher__flag">
                {language.flag}
              </span>
              <span className="language-switcher__text">{language.label}</span>
            </button>
          ))}
        </div>
      )}
      {announcement && (
        <p className="language-switcher__announcement" role="status" aria-live="polite">
          {announcement}
        </p>
      )}
    </div>
  );
}

export default LanguageSwitcher;
