import { useState } from "react";
import { arraySkill } from "../Skills/Skills";
import { GlassMorphCard } from "../glass-morph-card";
import { Icon } from "@iconify-icon/react";
import "animate.css";

interface SideBarDetailsProps {
  activeSkillId: string | null;
}

export function SideBarDetails({ activeSkillId }: SideBarDetailsProps) {
  const [prevSkillId, setPrevSkillId] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cachedSkill, setCashedSkill] = useState<any>(null);

  const [isExiting, setItExiting] = useState(false);

  if (activeSkillId !== prevSkillId) {
    setPrevSkillId(activeSkillId);

    if (activeSkillId) {
      const newSkill =
        arraySkill.find((skill) => skill.id === activeSkillId) || null;
      setCashedSkill(newSkill);
      setItExiting(false);
    } else {
      setItExiting(true);
    }
  }

  const handleAnimationEnd = () => {
    if (isExiting) {
      setCashedSkill(null);
    }
  };
  if (!cachedSkill) {
    return (
      <div className="text-white text-center opacity-70 italic font-light animate__animated animate__fadeIn flex items-center">
        <Icon
          className="animate__animated animate__infinite animate__slow 2s animate__slideOutLeft"
          icon="line-md:arrow-small-left"
          width="24"
          height="24"
        />{" "}
        <h1>Clicca su una skill per scoprirne i dettagli</h1>
      </div>
    );
  }

  const animationClass = isExiting
    ? "animate__fadeOutLeft"
    : "animate__fadeInLeft";

  return (
    <div
      className={`animate__animated ${animationClass}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <GlassMorphCard>
        <ul className="p-2.5 select-none">
          <li className="info text-start">
            <ul>
              <li className="p-5 text-center">
                Categoria: <br /> {cachedSkill.category}
              </li>
              <li className="p-5">
                Descrizione: <br /> {cachedSkill.description}
              </li>
              <li className="p-5">
                Certificazioni ottenute:
                <ul className="mt-2 space-y-1">
                  {cachedSkill.certifications &&
                  Array.isArray(cachedSkill.certifications) ? (
                    cachedSkill.certifications.map(
                      (cert: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="text-purple-300">•</span>
                          <span>{cert}</span>
                        </li>
                      ),
                    )
                  ) : (
                    <li className="text-sm italic opacity-50 text-gray-300">
                      Nessuna certificazione specifica registrata
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </GlassMorphCard>
    </div>
  );
}
