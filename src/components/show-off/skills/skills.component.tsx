import { useState, type SVGProps } from "react";

import jsICon from "./assets/icons/js.icon";
import nextICon from "./assets/icons/next.icon";
import reactICon from "./assets/icons/react.icon";

import jsonInfo from "./assets/json/skills.json";
import SkillCardComponent from "./skillCard.component";

import styles from "./skills.module.scss";
import { MapMediaCreator } from "@/creators/mapMediaCreator";

type IJson = {
  title: string;
  desc: string;
  icon: string;
  rating: number;
}[];
export default function SkillsComponent() {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const jsonMap: IJson = jsonInfo;
  const [skills, setSkills] = useState(jsonMap);

  const media = new MapMediaCreator({
    jsICon,
    nextICon,
    reactICon,
  });

  function handleDragStart(e: React.DragEvent, index: number) {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault(); // ✅ allows dropping
  }

  function handleDrop(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newSkills = [...skills];
    const [removedItem] = newSkills.splice(draggedIndex, 1);
    newSkills.splice(index, 0, removedItem);
    setSkills(newSkills);
    setDraggedIndex(null);
  }

  return (
    <div className={styles.wrapper} id="skill-wrapper">
      {skills.map((card, index) => {
        const Icon = media.mapMedia(card.icon) as React.FC<
          SVGProps<SVGSVGElement>
        >;
        return (
          <SkillCardComponent
            title={card.title}
            Icon={Icon}
            rating={card.rating}
            desc={card.desc}
            globalIndex={index}
            draggedIndex={draggedIndex}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        );
      })}
    </div>
  );
}
