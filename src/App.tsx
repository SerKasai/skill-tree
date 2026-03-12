import { useState } from "react";
import "./App.css";
import "tailwindcss";
import { arraySkill } from "./components/Skills/skills";
import { BubbleBackground } from "./components/animate-ui/components/backgrounds/bubble";
import { TextShimmer } from "./components/text-shimmer";
import { SideBarDetails } from "./components/SideBarDetails/SideBarDetails";

function App() {
  // 1. STATO CON TYPESCRIPT: Ottima la definizione del tipo <string | null>.
  // È una best practice fondamentale in TS per indicare che lo stato può essere vuoto all'inizio.
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  // 2. FUNZIONE DI TOGGLE OTTIMIZZATA:
  // Invece di leggere direttamente 'activeSkillId', usiamo una "callback function" (prevId => ...).
  // In React, quando il nuovo stato dipende da quello vecchio, è più sicuro usare questa sintassi
  // per evitare bug se l'utente clicca molto velocemente.
  const toggleSkill = (id: string) => {
    setActiveSkillId((prevId) => (prevId === id ? null : id));
  };

  // 3. FRAGMENT RIMOSSO: Prima avevi un <> </> che avvolgeva <BubbleBackground>.
  // Dal momento che <BubbleBackground> è già un singolo elemento genitore,
  // il Fragment esterno era ridondante e l'ho rimosso per tenere il DOM più pulito.
  return (
    <BubbleBackground>
      <div className="app-container w-screen min-h-screen drop-shadow-2xl">
        <div className="flex flex-col items-center justify-center p-10">
          <h2 className="font-extrabold select-none text-center uppercase transition-colors duration-300 text-transparent bg-clip-text bg-cover bg-center bg-no-repeat text-shadow-[0_0_3px_#00e7ff] text-8xl">
            IL MIO SKILL TREE
          </h2>
        </div>
        {/* 4. LAYOUT A GRIGLIA: L'uso di grid-cols-2 è la scelta architettonica chiave qui.
            Previene i "layout shift" (i fastidiosi salti dell'interfaccia) perché forza 
            le due colonne ad occupare esattamente il 50% ciascuna, indipendentemente dal contenuto. */}
        <div className="skills-container grid grid-cols-2 bg-[#00000038] w-6/12 min-w-[750px] place-self-center justify-center items-center border-4 border-black border-double rounded-[50px]">
          <ul className="p-5 flex flex-col gap-y-5 h-full justify-center">
            {/* 5. METODO MAP: Perfetto l'utilizzo per renderizzare array dinamici */}
            {arraySkill.map((skill) => {
              // Memorizziamo il controllo in una variabile per rendere il codice più leggibile
              const isActive = activeSkillId === skill.id;

              return (
                <li
                  key={skill.id} // <-- Regola d'oro di React: la prop 'key' va SEMPRE sul primo elemento ritornato dal map
                  onClick={() => toggleSkill(skill.id)}
                  // 6. ACCESSIBILITÀ (a11y): Aggiungere role="button" dice agli screen reader
                  // che questo elemento di lista si comporta come un pulsante cliccabile.
                  role="button"
                  aria-pressed={isActive} // Informa gli screen reader se è attualmente "premuto"
                  // 7. CLASSI DINAMICHE: Uso eccellente dei template literal (`...`) per gli stili condizionali.
                  className={`flex flex-row items-center justify-center gap-3 cursor-pointer p-1 select-none transition-all duration-300 ease-in-out
                    ${
                      isActive
                        ? "text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] font-bold"
                        : "text-gray-400 opacity-60 hover:opacity-100 hover:scale-105"
                    }`}
                >
                  <div className="skill-name gap-x-1.5 flex items-center">
                    <TextShimmer className="text-3xl">{skill.name}</TextShimmer>
                    {/* Renderizza l'icona salvata nei dati */}
                    {skill.icon}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* 8. PASSAGGIO PROPS: Passiamo lo stato corrente al componente figlio.
              Sarà lui (SideBarDetails) a occuparsi di cercare i dettagli della skill e animarli. */}
          <div className="flex p-5 h-full items-center justify-center">
            <SideBarDetails activeSkillId={activeSkillId} />
          </div>
        </div>
      </div>
    </BubbleBackground>
  );
}

export default App;
