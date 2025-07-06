import { clsx } from "clsx";
import styles from "./showOff.module.scss";

import useShowOff from "./useShowOff";
import ProjectsComponent from "./projects/projects.component";

import SkillsComponent from "./skills/skills.component";

export default function ShowOffComponent() {
  const { tab, changeTab } = useShowOff();

  const {
    imageDimensions,
    videoHeight,
    videoIsReady,
    activeImageIndex,
    setActiveImageIndex,
    activeVideoIndex,
    playPause,
    videoRefs,
    imageRef,
  } = useShowOff().projects;

  return (
    <section className={styles.wrapper}>
      <div className={styles.btns}>
        <button
          type="button"
          className={clsx(tab === "projects" && styles.active, styles.btn)}
          onClick={() => changeTab("projects")}
        >
          Projects
        </button>
        <button
          type="button"
          className={clsx(tab === "skills" && styles.active, styles.btn)}
          onClick={() => changeTab("skills")}
        >
          Skills
        </button>
      </div>

      {tab === "projects" ? (
        <ProjectsComponent
          props={{
            imageDimensions,
            videoHeight,
            videoIsReady,
            activeImageIndex,
            setActiveImageIndex,
            activeVideoIndex,
            playPause,
            videoRefs,
            imageRef,
          }}
        />
      ) : (
        <SkillsComponent />
      )}
    </section>
  );
}
