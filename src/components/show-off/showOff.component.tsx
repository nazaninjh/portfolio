import { useRef, useState } from "react";
import media from "@/assets/json/projects.json";
import { clsx } from "clsx";
import styles from "./showOff.module.scss";
import { mapMedia, type mediaKey } from "@/functions/mapMedia";

type IMedia = {
  media: {
    name: string;
    toDisplayOnlyOne: {
      img: string;
      video: string;
    };

    images: [];
    video: [];
  }[];
};

export default function ShowOffComponent() {
  const [tab, setTab] = useState<"projects" | "skills">("projects");
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const changeTab = (tabName: "projects" | "skills") => {
    setTab(tabName);
  };

  const playVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = 3;
    videoRef.current.play();
  };
  const pauseVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.btns}>
        <button
          type="button"
          className={clsx(tab === "projects" && styles.active, styles.btn)}
          onClick={() => changeTab("projects")}
        >
          Projcts
        </button>
        <button
          type="button"
          className={clsx(tab === "skills" && styles.active, styles.btn)}
          onClick={() => changeTab("skills")}
        >
          Skills
        </button>
      </div>

      {tab === "projects" && (
        <div className={styles["media-container"]}>
          {(media as IMedia[]).map((source) => {
            return source.media.map((item) => {
              return (
                <div className={styles.media} key={item.name + item.video}>
                  {item.toDisplayOnlyOne.video && (
                    <video
                      ref={videoRef}
                      key={item.name + item.toDisplayOnlyOne.video}
                      onMouseEnter={playVideo}
                      onMouseLeave={pauseVideo}
                      muted
                    >
                      <source
                        src={mapMedia(
                          "sinVideos",
                          item.toDisplayOnlyOne.video as mediaKey
                        )}
                        type="video/webm"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <img
                    key={item.name}
                    alt=""
                    src={mapMedia(
                      "sinImages",
                      item.toDisplayOnlyOne.img as mediaKey
                    )}
                    height={videoRef.current?.height}
                  />
                  <p>{}</p>
                </div>
              );
            });
          })}
        </div>
      )}
    </section>
  );
}
