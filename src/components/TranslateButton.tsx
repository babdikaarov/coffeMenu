import React from "react";

type TranslateButtonProps = {
  targetLang?: string; // e.g. 'en', 'ru', 'ky'
  label?: string;
};

export const TranslateButton: React.FC<TranslateButtonProps> = ({
  targetLang = "en",
  label = "Translate this page",
}) => {
  const handleTranslate = () => {
    const currentUrl = window.location.href;
    const translateUrl = `https://translate.google.com/translate?hl=${targetLang}&sl=auto&u=${encodeURIComponent(
      currentUrl,
    )}`;
    window.open(translateUrl, "_blank"); // or "_self" to open in same tab
  };

  return (
    <button
      onClick={handleTranslate}
      style={{
        background: "#4285F4",
        color: "white",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      {label}
    </button>
  );
};
