import { useEffect, useLayoutEffect, useRef, useState } from "react";
import media from "@/assets/json/projects.json";
import { clsx } from "clsx";
import styles from "./showOff.module.scss";
import { mapMedia, type IMediaKey, type serveKey } from "@/functions/mapMedia";
import { PlayIcon } from "./assets/icons/Play.icon";

type IMedia = {
  media: {
    name: string;
    description: string;
    mapCode: string;
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
  const [videoHeight, setVideoHeight] = useState(100);

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const changeTab = (tabName: "projects" | "skills") => {
    setTab(tabName);
  };

  const playPause = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    // if the video was paused and user clicks => play the video
    if (video.paused) {
      // Pause all other videos
      videoRefs.current.forEach((v, i) => {
        if (i !== index && v) v.pause();
      });
      video.playbackRate = 3;
      video.play();
      setActiveVideoIndex(index);
    } else {
      video.pause();
      setActiveVideoIndex(null);
    }
  };

  useEffect(() => {
    let count = 0;
    (media as IMedia[]).forEach((m) => {
      count += m.media.length;
    });
    videoRefs.current = Array(count).fill(null);
  }, []);

  useEffect(() => {
    if (!videoRefs.current) return;

    const handlers: { video: HTMLVideoElement; handler: () => void }[] = [];

    videoRefs.current.forEach((video) => {
      if (!video) return;

      const handler = () => {
        setActiveVideoIndex(null);
        video.currentTime = 0;
      };

      video.addEventListener("ended", handler);
      handlers.push({ video, handler });
    });

    return () => {
      handlers.forEach(({ video, handler }) => {
        video.removeEventListener("ended", handler);
      });
    };
  }, []);

  useLayoutEffect(() => {
    if (!videoRefs.current) return;
    videoRefs.current.forEach((video) => {
      if (!video) return;
      setVideoHeight(video.clientHeight);
    });
  });

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

      {tab === "projects" && (
        <div className={styles["media-container"]}>
          {(() => {
            return (media as IMedia[]).map((source) =>
              source.media.map((item, index) => {
                return (
                  <div className={styles.media} key={item.name + item.video}>
                    {item.toDisplayOnlyOne.video && (
                      <div className={styles["video-container"]}>
                        <video
                          height={200}
                          ref={(el) => {
                            videoRefs.current[index] = el!;
                          }}
                          key={item.name + item.toDisplayOnlyOne.video}
                          muted
                          onClick={() => playPause(index)}
                        >
                          <source
                            src={mapMedia(
                              item.mapCode as serveKey,
                              item.toDisplayOnlyOne.video as IMediaKey,
                              "video"
                            )}
                            type="video/webm"
                          />
                          Your browser does not support the video tag.
                        </video>
                        <div
                          className={clsx(
                            styles.overlay,
                            activeVideoIndex === index && styles.hide
                          )}
                        />
                        <button
                          title="play/pause"
                          type="button"
                          className={clsx(
                            styles.play,
                            activeVideoIndex === index && styles.hide
                          )}
                          onClick={() => playPause(index)}
                        >
                          <PlayIcon width={50} height={50} />
                        </button>
                      </div>
                    )}
                    <div
                      className={styles["img-container"]}
                      style={{ height: videoHeight }}
                      onMouseEnter={() => setActiveImageIndex(index)}
                      onMouseLeave={() => setActiveImageIndex(null)}
                    >
                      <img
                        key={item.name}
                        alt=""
                        src={mapMedia(
                          item.mapCode as serveKey,
                          item.toDisplayOnlyOne.img as IMediaKey,
                          "image"
                        )}
                        style={{ height: videoHeight }}
                      />
                      <div
                        className={clsx(
                          styles.overlay,
                          activeImageIndex === index && styles.show
                        )}
                      />
                      <div
                        className={clsx(
                          styles["text-container"],
                          activeImageIndex === index && styles.show
                        )}
                      >
                        <div>
                          <span className={styles.key}>Name: </span>
                          <span className={styles.value}>{item.name}</span>
                        </div>
                        <div>
                          <span className={styles.value}>
                            {item.description}
                          </span>
                        </div>
                        <button className={styles["img-btn"]} type="button">
                          More Info
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            );
          })()}
        </div>
      )}
    </section>
  );
}
