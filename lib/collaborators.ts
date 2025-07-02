import fs from "fs";
import path from "path";
import matter from "gray-matter";

const collaboratorsRoot = path.join(process.cwd(), "content/collaborators");

// 🔹 Tipo para un colaborador
export type Collaborator = {
  slug: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  image: string;
};

// 🔹 Función para obtener todos los colaboradores
export function getAllCollaborators(): Record<string, Collaborator> {
  if (!fs.existsSync(collaboratorsRoot)) {
    console.warn(`⚠️ La carpeta de colaboradores no existe.`);
    return {};
  }

  const fileNames = fs.readdirSync(collaboratorsRoot);
  const collaborators: Record<string, Collaborator> = {};

  fileNames.forEach((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const filePath = path.join(collaboratorsRoot, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    collaborators[slug] = {
      slug,
      name: data.name || "",
      role: data.role || "",
      location: data.location || "",
      bio: data.bio || "",
      image: data.image || "",
    };
  });

  return collaborators;
}

// 🔹 Función para obtener un colaborador por su slug
export function getCollaboratorBySlug(slug: string): Collaborator | null {
  const collaborators = getAllCollaborators();

  return collaborators[slug] || null;
}
