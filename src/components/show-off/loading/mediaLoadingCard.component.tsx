import type { CSSProperties } from "react";
import styles from "./mediaLoadingCard.module.scss";
export default function MediaLoadingCardComponent({
  customStyle,
}: {
  customStyle?: CSSProperties;
}) {
  return (
    <div style={customStyle ? customStyle : {}} className={styles.card}>
      <div className={styles.dots}>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );
}
