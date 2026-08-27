import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ReadingTheme = "light" | "dark" | "sepia";
export type FontSize = "sm" | "md" | "lg" | "xl";

interface ReadingPrefs {
  theme: ReadingTheme;
  fontSize: FontSize;
}

interface ReadingPreferencesValue extends ReadingPrefs {
  setTheme: (t: ReadingTheme) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const FONT_ORDER: FontSize[] = ["sm", "md", "lg", "xl"];
const STORAGE_KEY = "monument-reading-prefs";

const ReadingPreferencesContext = createContext<ReadingPreferencesValue | undefined>(undefined);

function loadPrefs(): ReadingPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { theme: "light", fontSize: "md" };
}

export function ReadingPreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<ReadingPrefs>(loadPrefs);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // ignore
    }
  }, [prefs]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", prefs.theme === "dark");
    root.setAttribute("data-reading-theme", prefs.theme);
  }, [prefs.theme]);

  const setTheme = (theme: ReadingTheme) => setPrefs((p) => ({ ...p, theme }));
  const increaseFontSize = () =>
    setPrefs((p) => {
      const idx = FONT_ORDER.indexOf(p.fontSize);
      return { ...p, fontSize: FONT_ORDER[Math.min(idx + 1, FONT_ORDER.length - 1)] };
    });
  const decreaseFontSize = () =>
    setPrefs((p) => {
      const idx = FONT_ORDER.indexOf(p.fontSize);
      return { ...p, fontSize: FONT_ORDER[Math.max(idx - 1, 0)] };
    });

  return (
    <ReadingPreferencesContext.Provider value={{ ...prefs, setTheme, increaseFontSize, decreaseFontSize }}>
      {children}
    </ReadingPreferencesContext.Provider>
  );
}

export function useReadingPreferences() {
  const ctx = useContext(ReadingPreferencesContext);
  if (!ctx) throw new Error("useReadingPreferences must be used within ReadingPreferencesProvider");
  return ctx;
}

export const FONT_SIZE_CLASS: Record<FontSize, string> = {
  sm: "text-[17px] leading-[1.75]",
  md: "text-[19px] leading-[1.8]",
  lg: "text-[21px] leading-[1.85]",
  xl: "text-[23px] leading-[1.9]",
};
