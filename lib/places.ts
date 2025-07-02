import fs from "fs";
import path from "path";
import matter from "gray-matter";

const placesRoot = path.join(process.cwd(), "content/places");

// Definir el tipo Place
export type Place = {
  slug: string;
  name: string;
  location?: string; // ✅ Asegurar que existe
  description?: string;
  image?: string;
};


// Función para obtener todos los lugares
export function getAllPlaces(): { [key: string]: Place } {
  const fileNames = fs.readdirSync(placesRoot);
  let places: { [key: string]: Place } = {};

  fileNames.forEach((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const filePath = path.join(placesRoot, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    places[slug] = {
      slug,
      name: data.name || "",
      location: data.location || "",
      description: data.description || "",
      image: data.image || "",
    };
    
    
  });

  return places;
}

// ✅ Agregar esta función para obtener un lugar por su slug
export function getPlaceBySlug(slug: string): Place | null {
  const places = getAllPlaces();
  return places[slug] || null;
}
