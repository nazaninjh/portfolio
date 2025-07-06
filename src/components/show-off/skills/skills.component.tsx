import type { SVGProps } from "react";
import { MapMediaCreator } from "@/creators/mapMediaCreator";
import jsICon from "./assets/icons/js.icon";
import nextICon from "./assets/icons/next.icon";
import reactICon from "./assets/icons/react.icon";

import jsonInfo from "./assets/json/skills.json";
import SkillCardComponent from "./skillCard.component";

import styles from "./skills.module.scss";

type IJson = {
  title: string;
  icon: string;
  rating: number;
}[];
export default function SkillsComponent() {
  const media = new MapMediaCreator({
    jsICon,
    nextICon,
    reactICon,
  });

  const jsonMap: IJson = jsonInfo;

  return (
    <div className={styles.wrapper}>
      {jsonMap.map((card) => {
        const Icon = media.mapMedia(card.icon) as React.FC<
          SVGProps<SVGSVGElement>
        >;
        return (
          <SkillCardComponent
            title={card.title}
            Icon={Icon}
            rating={card.rating}
          />
        );
      })}
    </div>
  );
}
