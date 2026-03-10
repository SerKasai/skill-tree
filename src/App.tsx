import { useState } from "react";
import "./App.css";
import "tailwindcss";
import { arraySkill } from "./components/Skills/Skills";
import { BubbleBackground } from "./components/animate-ui/components/backgrounds/bubble";
import GifText from "./components/gif-text";
import { TextShimmer } from "./components/text-shimmer";
import { SideBarDetails } from "./components/SideBarDetails/SideBarDetails";

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
        <div className="app-container w-screen min-h-screen drop-shadow-2xl content-center">
          <GifText />
          <div className="skills-container flex flex-row bg-[#00000038] w-4/12 h-[500px] place-self-center justify-center items-center border-4 border-black border-double rounded-[50px]">
            <ul className="p-5 flex flex-col gap-y-5">
              {arraySkill.map((skill) => (
                <li
                  onClick={() => toggleSkill(skill.id)}
                  className="flex flex-col items-center cursor-pointer p-1 select-none"
                  key={skill.id}
                >
                  <TextShimmer className="text-3xl">{skill.name}</TextShimmer>
                </li>
              ))}
            </ul>
            <div className="flex p-5 w-1/2">
              <SideBarDetails activeSkillId={ActiveSkillId} />
            </div>
          </div>
        </div>
      </BubbleBackground>
    </>
  );
}

export default App;
