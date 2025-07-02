import { useEffect, useRef, useState } from "react";
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
  const [hidePlayBtn, sethidePlayBtn] = useState(false);
  const [showImgInfo, setShowImgInfo] = useState(false);

  const videoRef = useRef<null | HTMLVideoElement>(null);
  const changeTab = (tabName: "projects" | "skills") => {
    setTab(tabName);
  };

  const playPause = () => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = 3;
    const isPaused = videoRef.current.paused;

    if (isPaused) {
      videoRef.current.play();
      sethidePlayBtn(true);
    } else {
      videoRef.current.pause();
      sethidePlayBtn(false);
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;
    const parent = videoRef.current.parentElement;

    if (parent && parent.clientHeight) {
      setVideoHeight(parent.clientHeight);
    }
  }, [videoRef]);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const reset = () => {
      sethidePlayBtn(false);

      if (video && video.currentTime) {
        video.currentTime = 0;
      }
    };
    video.addEventListener("ended", reset);

    return () => {
      video.removeEventListener("ended", reset);
    };
  }, [hidePlayBtn]);

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
                    <div className={styles["video-container"]}>
                      <video
                        onClick={playPause}
                        ref={videoRef}
                        key={item.name + item.toDisplayOnlyOne.video}
                        muted
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
                          hidePlayBtn && styles.hide
                        )}
                      />
                      <button
                        title="play/pause"
                        type="button"
                        className={clsx(
                          styles.play,
                          hidePlayBtn && styles.hide
                        )}
                        onClick={playPause}
                      >
                        <PlayIcon width={50} height={50} />
                      </button>
                    </div>
                  )}
                  <div
                    className={styles["img-container"]}
                    style={{ height: videoHeight }}
                    onMouseEnter={() => setShowImgInfo(true)}
                    onPointerDown={() => setShowImgInfo(true)}
                    onMouseLeave={() => setShowImgInfo(false)}
                    onPointerLeave={() => setShowImgInfo(false)}
                  >
                    {/* make a route changing btn here to gallary */}
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
                        showImgInfo && styles.show
                      )}
                    />
                    <div
                      className={clsx(
                        styles["text-container"],
                        showImgInfo && styles.show
                      )}
                    >
                      <div>
                        <span className={styles.key}>Name: </span>
                        <span className={styles.value}>{item.name}</span>
                      </div>
                      <div>
                        <span className={styles.value}>{item.description}</span>
                      </div>
                      <button className={styles["img-btn"]} type="button">
                        More Info
                      </button>
                    </div>
                  </div>
                </div>
              );
            });
          })}
        </div>
      )}
    </section>
  );
}
