import { useRouter } from "next/router";
import es from "../locales/es.json";
import en from "../locales/en.json";

type TranslationsKeys = 
  | "title"
  | "description"
  | "dateStart"
  | "dateEnd"
  | "location"
  | "category"
  | "collaborators"
  | "credits"
  | "notFound";

const useTranslation = () => {
  const router = useRouter(); // ✅ Obtiene la configuración de idioma desde Next.js
  const { locale, pathname, asPath, query } = router;

  const translations = locale === "en" ? en : es;

  const changeLanguage = (lang: "es" | "en") => {
    router.push({ pathname, query }, asPath, { locale: lang });
  };

  return {
    t: (key: TranslationsKeys) => translations[key] || key, // ✅ Acceso seguro
    changeLanguage,
    locale,
  };
};

export default useTranslation;
