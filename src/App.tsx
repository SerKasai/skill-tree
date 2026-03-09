import { useState } from "react";
import "./App.css";
import "tailwindcss";
import { arraySkill } from "./components/Skills/Skills";
import { BubbleBackground } from "./components/animate-ui/components/backgrounds/bubble";
import GifText from "./components/gif-text";
import { TextShimmer } from "./components/text-shimmer";
import { BottomBarDetails } from "./components/BottomBarDetails/BottomBarDetails";

function App() {
  const [ActiveSkillId, setActiveSkillId] = useState<string | null>(null);

  const toggleSkill = (id: string) => {
    if (ActiveSkillId === id) {
      setActiveSkillId(null);
    } else {
      setActiveSkillId(id);
    }
  };
  return (
    <>
      <BubbleBackground>
        <div className="app-container w-screen drop-shadow-2xl content-center">
          <GifText />
          <div className="skills-container flex flex-col bg-[#00000038] w-1/5 place-self-center justify-center border-4 border-black border-double rounded-[50px]">
            <ul className="p-2.5">
              {arraySkill.map((skill) => (
                <li
                  onClick={() => toggleSkill(skill.id)}
                  className="flex flex-col items-center cursor-pointer p-1"
                  key={skill.id}
                >
                  <TextShimmer className="text-3xl">{skill.name}</TextShimmer>
                  <div
                    className={ActiveSkillId === skill.id ? "active" : "hidden"}
                  >
                    <BottomBarDetails activeSkillId={ActiveSkillId} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </BubbleBackground>
    </>
  );
}

export default App;
