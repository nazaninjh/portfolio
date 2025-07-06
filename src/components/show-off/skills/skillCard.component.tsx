import type { SVGProps } from "react";
import { StarIcon } from "./assets/icons/star.icon";
import styles from "./skills.module.scss";
import clsx from "clsx";
type IProps = {
  Icon: React.FC<SVGProps<SVGSVGElement>>;
  title: string;
  rating: number;
};
export default function SkillCardComponent({ title, Icon, rating }: IProps) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        {" "}
        <Icon width={100} height={100} />
      </div>
      <p className={styles.title}>{title}</p>
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
