import { Icon } from "@iconify-icon/react";
import type { ReactNode } from "react"; // 1. Importiamo ReactNode per la tipizzazione delle icone

/**
 * 2. DEFINIZIONE DEI TIPI (Type Aliases e Interfaces)
 * Separare bene le interfacce aiuta a rendere il codice scalabile.
 * Ho rimosso 'any' (che in TypeScript va evitato il più possibile)
 * sostituendolo con ReactNode.
 */

export type SkillCategory =
  | "Core"
  | "Framework"
  | "Tool"
  | "Design/Marketing"
  | "SoftSkill";

export type SkillLevel = "Facile" | "Medio" | "Difficile";

export interface Project {
  name: string;
  techStack: string[];
}

export interface Skill {
  id: string;
  name: string;
  /** * 3. ADDIO ANY: icon è ora di tipo ReactNode.
   * Questo accetta JSX, stringhe, componenti o nulla, mantenendo il controllo sui tipi.
   */
  icon?: ReactNode;
  category: SkillCategory;
  description: string;
  dependencies: string[];
  projects?: Project[];
  certifications?: string[];
  level?: SkillLevel;
}

/**
 * 4. GESTIONE COSTANTI PER IL DESIGN
 * Invece di scrivere i codici colore a mano nel JSX,
 * in un progetto grande potresti centralizzarli.
 * Qui manteniamo la tua struttura ma miglioriamo la leggibilità.
 */

export const arraySkill: Skill[] = [
  {
    id: "javascript",
    name: "Javascript",
    icon: (
      <Icon
        icon="fa7-brands:node-js"
        width="50"
        height="50"
        style={{ color: "#F7CF00" }}
      />
    ),
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

  {
    id: "typescript",
    name: "Typescript",
    icon: (
      <Icon
        icon="cib:typescript"
        width="50"
        height="50"
        style={{ color: "#377CC8" }}
      />
    ),
    category: "Core",
    description:
      "Aggiunge tipizzazione statica a JavaScript, migliorando la manutenibilità e riducendo i bug.",
    dependencies: ["javascript"],
    level: "Medio",
  },

  {
    id: "react",
    name: "React",
    icon: (
      <Icon
        icon="cib:react"
        width="50"
        height="50"
        style={{ color: "#66DBFB" }}
      />
    ),
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

  {
    id: "vue",
    name: "Vue.js",
    icon: (
      <Icon
        icon="cib:vue-js"
        width="50"
        height="50"
        style={{ color: "#84C987" }}
      />
    ),
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

  {
    id: "liferay",
    name: "Liferay",
    // 5. ASSETS PATH: Assicurati che il percorso parta da / pubblico o sia importato correttamente.
    icon: (
      <img
        src="/public/icon_liferay.png"
        alt="Liferay Logo"
        className="w-[50px] h-[50px] object-contain"
      />
    ),
    category: "Tool",
    description:
      "Utilizzo intermedio per la gestione di temi, client extensions e interfacce personalizzate, acquisito durante l'esperienza lavorativa in Next Mind.",
    dependencies: ["javascript", "css"],
    level: "Medio",
  },

  {
    id: "ux-ui",
    name: "UX/UI Design",
    // 6. FALLBACK ICON: Se non c'è un'icona specifica, potresti aggiungerne una generica di design
    icon: (
      <Icon
        icon="hugeicons:web-design-01"
        width="50"
        height="50"
        style={{ color: "#FF61F6" }}
      />
    ),
    category: "Design/Marketing",
    description:
      "Competenze nella progettazione di interfacce utente centrate sull'esperienza, per creare prodotti non solo funzionali ma anche intuitivi.",
    dependencies: [],
    certifications: ["UX/UI Design Fundamentals Camp - Boolean"],
  },

  {
    id: "teamwork",
    name: "Lavoro in Team",
    icon: (
      <Icon
        icon="fluent:people-community-24-filled"
        width="50"
        height="50"
        style={{ color: "#4ade80" }}
      />
    ),
    category: "SoftSkill",
    description:
      "Ottima capacità di collaborazione con figure diverse, sviluppata lavorando su turni, come animatore e nell'allestimento di scenografie teatrali.",
    dependencies: [],
  },
];
