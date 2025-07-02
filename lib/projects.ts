import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Collaborator, getAllCollaborators } from "./collaborators";
import { Place, getAllPlaces } from "./places"; // ✅ Importar lugares

const projectsRoot = path.join(process.cwd(), "content/projects");

// 🔹 Tipo actualizado para incluir múltiples categorías y lugar como objeto
export type Project = {
  slug: string;
  categories: string[];
  private: boolean;
  offline: boolean;
  title: string;
  textColor: string;
  specs: string;
  date: string;
  endDate: string;
  place: Place | null; // ✅ Ahora place es un objeto en lugar de string
  mainImage: string;
  mainImageCredit: string;
  images: string[];
  imageCredits: string[];
  description: string;
  collaborators: Collaborator[];
  customnamecollaborator: string;
  content: string;
  videoLink?: string;
  audioLink?: string;
};

// ✅ Función para formatear nombres de categorías
const formatCategory = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    "ensenanza": "Enseñanza",
    "obra-multimedia": "Producción de Obra",
    "produccion-tecnica": "Producción técnica",
    "obra-de-arte": "Obra"
  };
  return categoryMap[category] || category;
};

// 🔹 Función para obtener todos los proyectos
export function getAllProjects(includePrivate = false): Project[] {
  const collaborators = getAllCollaborators();
  const places = getAllPlaces();
  let allProjects: Project[] = [];

  const categories = ["produccion-tecnica", "obra-multimedia", "ensenanza", "obra-de-arte"];

// ✅ Función para formatear fechas en dd-mm-aaaa o aceptar solo el año
// ✅ Función mejorada para formatear fechas en dd-mm-aaaa o aceptar solo el año
const formatDate = (dateString: string | undefined, reverse = false): string => {
  if (!dateString || dateString.trim() === "") return ""; // ✅ Evita valores vacíos

  // ✅ Si la fecha solo tiene el año (ejemplo: "2025"), devolverla sin cambios
  if (/^\d{4}$/.test(dateString)) return dateString;

  // ✅ Si la fecha está en formato "dd-mm-aaaa" o "aaaa-mm-dd"
  const dateParts = dateString.split("-");
  if (dateParts.length === 3) {
    let year: number, month: number, day: number;

    if (reverse) {
      // 🔄 Convertir "aaaa-mm-dd" a "dd/mm/aaaa" (para mostrar en la interfaz)
      [year, month, day] = dateParts.map(Number);
    } else {
      // 🔄 Convertir "dd-mm-aaaa" a "aaaa-mm-dd" (para uso interno en JS)
      [day, month, year] = dateParts.map(Number);
    }

    // Validar que la fecha sea real
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return reverse
        ? `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`
        : `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    }
  }

  return ""; // ✅ Si la fecha es inválida, devolver cadena vacía
};









  categories.forEach((category) => {
    const categoryPath = path.join(projectsRoot, category);

    if (!fs.existsSync(categoryPath)) return;

    const fileNames = fs.readdirSync(categoryPath);
    const projects = fileNames
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const filePath = path.join(categoryPath, fileName);
        const fileContents = fs.readFileSync(filePath, "utf8");

        try {
          const { data, content } = matter(fileContents);

          const project: Project = {
            slug: data.slug || slug,
            categories: data.categories
              ? data.categories.map(formatCategory)
              : [formatCategory(data.category || category)],
            title: data.title || "",
            specs: data.specs || "",
            date: data.date ? formatDate(data.date, false) : "",  // Convierte "dd-mm-aaaa" → "aaaa-mm-dd"
            endDate: data.endDate && new Date(formatDate(data.endDate, false)) >= new Date(formatDate(data.date, false)) 
              ? formatDate(data.endDate, false) 
              : formatDate(data.date, false),
            
            place: places[data.place] || null,
            mainImage: data.mainImage ? data.mainImage.trim() : "/images/default.jpg",
            mainImageCredit: data.mainImageCredit || "",
            images: Array.isArray(data.images) ? data.images : [],
            imageCredits: Array.isArray(data.imageCredits) ? data.imageCredits : [],
            description: data.description || "",
            customnamecollaborator: data.customnamecollaborator || "",
            collaborators: (data.collaborators || [])
              .map((col: string) => collaborators[col] || null)
              .filter((c: Collaborator | null): c is Collaborator => c !== null),
            content,
            videoLink: data.videoLink || "",
            audioLink: data.audioLink || "",
            private: data.private === true,
            offline: data.offline === true,
            textColor: data.textColor || "#FFFFFF", // 👈 Se asegura de que haya un color por defecto

          };
          
          
          
          
          return project;
        } catch (error) {
          console.error(`❌ Error al procesar ${fileName}:`, error);
          return null;
        }
      })
      .filter((p): p is Project => p !== null);

    allProjects = [...allProjects, ...projects];
  });

  // ✅ Filtrar proyectos privados si `includePrivate` es `false`
 // ✅ Ordenar los proyectos por fecha de finalización más reciente primero
return includePrivate
? allProjects.sort((a, b) => {
    const dateA = new Date(a.endDate ? formatDate(a.endDate, false) : formatDate(a.date, false)).getTime();
    const dateB = new Date(b.endDate ? formatDate(b.endDate, false) : formatDate(b.date, false)).getTime();
    return dateB - dateA; // 🔄 Ordena de más reciente a más antiguo
  })
: allProjects
    .filter((p) => !p.private)
    .sort((a, b) => {
      const dateA = new Date(a.endDate ? formatDate(a.endDate, false) : formatDate(a.date, false)).getTime();
      const dateB = new Date(b.endDate ? formatDate(b.endDate, false) : formatDate(b.date, false)).getTime();
      return dateB - dateA; // 🔄 Ordena de más reciente a más antiguo
    });

}


