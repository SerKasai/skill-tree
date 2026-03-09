import { arraySkill } from "../Skills/Skills";

interface BottomBarDetailsProps {
  activeSkillId: string | null;
}

export function BottomBarDetails({ activeSkillId }: BottomBarDetailsProps) {
  const selectedSkill = arraySkill.find((skill) => skill.id === activeSkillId);
  if (!selectedSkill) return null;

  return (
    <div className="container-details bg-[#57018054]">
      <ul className="p-2.5">
        <li className="info">
          <ul>
            <li className="p-5">
              Categoria: <br /> {selectedSkill.category}
            </li>
            <li className="p-5">
              Descrizione: <br /> {selectedSkill.description}
            </li>
            <li className="p-5">
              Certificazioni ottenute: <br /> {selectedSkill.certifications}
            </li>
            <li className="p-5">
              Livello di difficoltà: <br /> {selectedSkill.level}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
