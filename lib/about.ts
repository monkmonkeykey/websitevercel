import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Definir el tipo de contenido para la página "About"
export type AboutContent = {
  title: string;
  bio: string;
  artistStatement: string; // ✅ Nuevo campo para Artist Statement
  cv: string; // ✅ Enlace al CV (PDF o similar)
  image: string;
  creditImage: string; 
  social: {
    ig?: string;
    github?: string;
    soundcloud?: string;
    youtube?: string;
    vimeo?: string;
  };
};

// Ruta del archivo que almacena la información del About
const aboutPath = path.join(process.cwd(), "content/about.md");

// Función para obtener el contenido de About
export function getAboutContent(): AboutContent {
  const fileContents = fs.readFileSync(aboutPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title || "Sobre mí",
    bio: data.bio || content || "Sin biografía disponible.",
    artistStatement: data.artistStatement || "Sin Artist Statement disponible.",
    cv: data.cv || "", // Ruta al CV
    image: data.image || "/images/default-profile.jpg",
    creditImage: data.creditImage || "",
    social: {
      ig: data.ig || "",
      github: data.github || "",
      soundcloud: data.soundcloud || "",
      youtube: data.youtube || "",
      vimeo: data.vimeo || "",
    },
  };
}
