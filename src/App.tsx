// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import "tailwindcss";
import { arraySkill } from "./components/Skills/Skills";
import { BubbleBackground } from "./components/animate-ui/components/backgrounds/bubble";

function App() {
  return (
    <>
      <BubbleBackground />
      <div className="app-container w-screen h-screen">
        <h1 className="text-emerald-800">Il mio Skill Tree</h1>
        <ul className="p-2.5">
          {arraySkill.map((skill) => (
            <li className="cursor-pointer" key={skill.id}>
              {skill.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
