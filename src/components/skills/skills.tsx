export type SkillCategory =
  | "Core"
  | "Framework"
  | "Tool"
  | "Design/Marketing"
  | "SoftSkill";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  dependencies: string[];
  projects?: {
    name: string;
    techStack: string[];
  }[];
  certifications?: string[];
  level?: "Facile" | "Medio" | "Difficile";
}

export const arraySkill: Skill[] = [
  // NODO BASE
  {
    id: "javascript",
    name: "Javascript",
    category: "Core",
    description:
      "Il linguaggio fondamentale per il web. Lo utilizzo per gestire la logica complessa delle interfacce.",
    dependencies: [],
    certifications: [
      "Corso Front End - Boolean",
      "Corso Front End - FormaTemp / Synergie",
      "Sviluppo Web - Sololearn",
    ],
    level: "Difficile",
  },

  // NODO DERIVATO: TYPESCRIPT
  {
    id: "typescript",
    name: "Typescript",
    category: "Core",
    description:
      "Aggiunge tipizzazione statica a JavaScript, migliorando la manutenibilità e riducendo i bug.",
    dependencies: ["javascript"],
    level: "Medio",
  },

  // NODO DERIVATO: REACT
  {
    id: "react",
    name: "React",
    category: "Framework",
    description:
      "Libreria principale per la creazione di interfacce utente dinamiche e single-page applications.",
    dependencies: ["javascript", "typescript"],
    projects: [
      {
        name: "Clone Interfaccia Netflix con API esterna",
        techStack: [
          "React",
          "Vite",
          "Typescript",
          "Tailwind",
          "Postman",
          "Redux",
          "Firebase",
        ],
      },
      {
        name: "Homepage DC Comics con json custom",
        techStack: ["React", "Vite", "Typescript", "Tailwind", "Postman"],
      },
    ],
    level: "Difficile",
  },

  // NODO DERIVATO: VUE
  {
    id: "vue",
    name: "Vue.js",
    category: "Framework",
    description:
      "Framework progressivo utilizzato per costruire interfacce utente fluide.",
    dependencies: ["javascript"],
    projects: [
      {
        name: "Interfaccia stile Spotify con select filtri",
        techStack: ["Vue", "Javascript"],
      },
    ],
    level: "Difficile",
  },

  // NODO STRUMENTI: LIFERAY
  {
    id: "liferay",
    name: "Liferay",
    category: "Tool",
    description:
      "Utilizzo intermedio per la gestione di temi, client extensions e interfacce personalizzate, acquisito durante l'esperienza lavorativa in Next Mind.",
    dependencies: ["javascript", "css"],
    level: "Medio",
  },

  // NODO EXTRA: UX/UI DESIGN
  {
    id: "ux-ui",
    name: "UX/UI Design",
    category: "Design/Marketing",
    description:
      "Competenze nella progettazione di interfacce utente centrate sull'esperienza, per creare prodotti non solo funzionali ma anche intuitivi.",
    dependencies: [],
    certifications: ["UX/UI Design Fundamentals Camp - Boolean"],
  },

  // NODO SOFT SKILLS
  {
    id: "teamwork",
    name: "Lavoro in Team",
    category: "SoftSkill",
    description:
      "Ottima capacità di collaborazione con figure diverse, sviluppata lavorando su turni, come animatore e nell'allestimento di scenografie teatrali.",
    dependencies: [],
  },
];
