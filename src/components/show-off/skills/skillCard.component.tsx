import type { SVGProps } from "react";
import { StarIcon } from "./assets/icons/star.icon";
import styles from "./skills.module.scss";
import clsx from "clsx";
type IProps = {
  Icon: React.FC<SVGProps<SVGSVGElement>>;
  title: string;
  rating: number;
  desc: string;
  globalIndex: number;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  draggedIndex: number | null;
};
export default function SkillCardComponent({
  title,
  Icon,
  rating,
  desc,
  globalIndex,
  onDragStart,
  onDragOver,
  onDrop,
  draggedIndex,
}: IProps) {
  return (
    <div
      className={clsx(
        styles.card,
        globalIndex === draggedIndex && styles.dragging,
      )}
      draggable
      onDragStart={(e) => onDragStart(e, globalIndex)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, globalIndex)}
    >
      <div className={styles.icon}>
        {" "}
        <Icon width={100} height={100} />
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.desc}>{desc}</p>
      <div className={styles.stars}>
        {new Array(5).fill(null).map((_, index) => {
          return (
            <div className={clsx(styles.star, index < rating && styles.fill)}>
              <StarIcon />
            </div>
          );
        })}
      </div>
    </div>
  );
}
