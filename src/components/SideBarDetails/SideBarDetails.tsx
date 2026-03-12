import { useState, useEffect } from "react";
import { arraySkill, type Skill } from "../Skills/skills"; // Importiamo anche il tipo Skill
import { GlassMorphCard } from "../glass-morph-card";
import { Icon } from "@iconify-icon/react";
import "animate.css";

interface SideBarDetailsProps {
  activeSkillId: string | null;
}

export function SideBarDetails({ activeSkillId }: SideBarDetailsProps) {
  // 1. STATI PER LA CACHE E L'ANIMAZIONE
  // cachedSkill mantiene i dati visibili anche quando activeSkillId diventa null,
  // permettendo alla card di "uscire di scena" con i dati ancora dentro.
  const [cachedSkill, setCachedSkill] = useState<Skill | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  // 2. USEEFFECT PER LA LOGICA DI TRANSIZIONE
  // Questo hook reagisce ogni volta che cambia activeSkillId.
  useEffect(() => {
    if (activeSkillId) {
      // Se viene selezionata una nuova skill:
      const newSkill = arraySkill.find((s) => s.id === activeSkillId) || null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCachedSkill(newSkill);
      setIsExiting(false);
    } else {
      // Se viene deselezionata (null): attiviamo solo lo stato di uscita.
      // Non puliamo subito cachedSkill, altrimenti la card si svuoterebbe a metà animazione.
      setIsExiting(true);
    }
  }, [activeSkillId]);

  // 3. GESTORE FINE ANIMAZIONE
  // Questa funzione viene chiamata da onAnimationEnd del div di Animate.css
  const handleAnimationEnd = () => {
    if (isExiting) {
      // Solo ora che l'animazione di uscita è finita, svuotiamo la cache.
      // Questo farà scattare il return del messaggio "Clicca su una skill".
      setCachedSkill(null);
    }
  };

  // track media query so icon updates when viewport crosses the breakpoint
  const [isMd, setIsMd] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsMd(e.matches);
    // modern browsers support addEventListener, but fallback to addListener for older ones
    if (mql.addEventListener) {
      mql.addEventListener("change", handler);
    } else {
      // @ts-ignore
      mql.addListener(handler);
    }
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handler);
      } else {
        // @ts-ignore
        mql.removeListener(handler);
      }
    };
  }, []);

  // 4. RENDERING CONDIZIONALE (Stato Vuoto)
  if (!cachedSkill) {
    return (
      <div className="text-white text-center opacity-70 italic font-light animate__animated animate__fadeIn flex flex-col-reverse md:flex-row items-center gap-2">
        <Icon
          className="animate__animated animate__infinite animate__pulse"
          icon={isMd ? "line-md:arrow-small-left" : "line-md:arrow-small-down"}
          width="24"
          height="24"
        />
        <h1>Clicca su una skill per scoprirne i dettagli</h1>
      </div>
    );
  }

  // Scegliamo la classe in base allo stato di uscita e al breakpoint
  const animationClass = isExiting
    ? isMd
      ? "animate__fadeOutLeft"
      : "animate__fadeOutUp"
    : isMd
      ? "animate__fadeInLeft"
      : "animate__fadeInDown";

  return (
    <div
      className={`animate__animated ${animationClass} w-full`}
      onAnimationEnd={handleAnimationEnd}
    >
      <GlassMorphCard>
        {/* 5. OTTIMIZZAZIONE SEMANTICA: Usiamo div e span invece di troppe <ul> annidate
            per rendere il codice più leggibile e facile da debuggare con i CSS. */}
        <div className="p-4 select-none text-white">
          {/* Categoria */}
          <div className="mb-6 text-center border-b border-white/10 pb-4">
            <span className="text-cyan-400 font-bold uppercase text-xs tracking-widest">
              Categoria
            </span>
            <p className="text-xl">{cachedSkill.category}</p>
          </div>

          {/* Descrizione */}
          <div className="mb-6 text-start">
            <span className="text-cyan-400 font-bold uppercase text-xs tracking-widest">
              Descrizione
            </span>
            <p className="mt-1 leading-relaxed opacity-90">
              {cachedSkill.description}
            </p>
          </div>

          {/* Certificazioni */}
          <div className="text-start">
            <span className="text-cyan-400 font-bold uppercase text-xs tracking-widest block mb-2">
              Certificazioni ottenute
            </span>
            <ul className="space-y-2">
              {cachedSkill.certifications &&
              Array.isArray(cachedSkill.certifications) &&
              cachedSkill.certifications.length > 0 ? (
                cachedSkill.certifications.map((cert, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm bg-white/5 p-2 rounded-lg border border-white/5"
                  >
                    <span className="text-cyan-400">•</span>
                    <span>{cert}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm italic opacity-50 text-gray-400">
                  Nessuna certificazione specifica registrata
                </li>
              )}
            </ul>
          </div>
        </div>
      </GlassMorphCard>
    </div>
  );
}
