import { useState } from "react";
import "./App.css";
import "tailwindcss";
import { arraySkill } from "./components/Skills/Skills";
import { BubbleBackground } from "./components/animate-ui/components/backgrounds/bubble";
import GifText from "./components/gif-text";
import { TextShimmer } from "./components/text-shimmer";
import { SideBarDetails } from "./components/SideBarDetails/SideBarDetails";

function App() {
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  const toggleSkill = (id: string) => {
    if (activeSkillId === id) {
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
          <div className="skills-container grid grid-cols-2 bg-[#00000038] w-6/12 min-w-[750px] h-[560px] place-self-center justify-center items-center border-4 border-black border-double rounded-[50px]">
            <ul className="p-5 flex flex-col gap-y-5 h-full justify-center">
              {arraySkill.map((skill) => {
                const isActive = activeSkillId === skill.id;
                return (
                  <li
                    onClick={() => toggleSkill(skill.id)}
                    className={`flex flex-row items-center justify-center gap-3 cursor-pointer p-1 select-none transition-all duration-300 ease-in-out
                      ${isActive ? "text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] font-bold" : "text-gray-400 opacity-60 hover:opacity-100 hover:scale-105"}`}
                    key={skill.id}
                  >
                    <div className="skill-name gap-x-1.5 flex">
                      <TextShimmer className="text-3xl">
                        {skill.name}
                      </TextShimmer>
                      {skill.icon}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex p-5 h-full items-center justify-center">
              <SideBarDetails activeSkillId={activeSkillId} />
            </div>
          </div>
        </div>
      </BubbleBackground>
    </>
  );
}

export default App;
