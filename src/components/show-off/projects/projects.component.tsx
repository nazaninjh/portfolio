import MediaLoadingCardComponent from "../loading/mediaLoadingCard.component";
import media from "@/assets/json/projects.json";
import clsx from "clsx";
import styles from "./projects.module.scss";
import { mapMedia, type IMediaKey, type serveKey } from "@/functions/mapMedia";
import { PlayIcon } from "../assets/icons/Play.icon";
import type { IProjectProps } from "../useShowOff";

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
export default function ProjectsComponent({ props }: { props: IProjectProps }) {
  const {
    videoIsReady,
    imageDimensions,
    videoRefs,
    setActiveImageIndex,
    videoHeight,
    imageRef,
    activeImageIndex,
    activeVideoIndex,
    playPause,
  } = props;
  return (
    <div className={styles["media-container"]}>
      {(media as IMedia[]).flatMap((source) =>
        source.media.map((item, index) => (
          <article className={styles.media} key={item.name + item.video}>
            <div
              className={clsx(styles.placeholder, videoIsReady && styles.hide)}
            >
              <MediaLoadingCardComponent
                customStyle={{
                  blockSize: imageDimensions.block,
                  inlineSize: imageDimensions.inline,
                  display: `${videoIsReady ? "none" : "inline-flex"}`,
                }}
              />
            </div>

            <div
              className={clsx(
                styles["video-container"],
                videoIsReady && styles.show,
              )}
            >
              <video
                height={200}
                ref={(el) => {
                  videoRefs.current[index] = el!;
                }}
                key={item.name + item.toDisplayOnlyOne.video}
                muted
                controlsList="nodownload noplaybackrate"
                onClick={() => playPause(index)}
              >
                <source
                  src={mapMedia(
                    item.mapCode as serveKey,
                    item.toDisplayOnlyOne.video as IMediaKey,
                    "video",
                  )}
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
              <div
                className={clsx(
                  styles.overlay,
                  activeVideoIndex === index && styles.hide,
                )}
                style={{ height: videoHeight }}
              />
              <button
                title="play/pause"
                type="button"
                className={clsx(
                  styles.play,
                  activeVideoIndex === index && styles.hide,
                )}
                onClick={() => playPause(index)}
              >
                <PlayIcon width={50} height={50} />
              </button>
            </div>

            <div
              className={styles["img-container"]}
              style={{ height: videoHeight }}
              onMouseEnter={() => setActiveImageIndex(index)}
              onPointerDown={() => setActiveImageIndex(index)}
              onMouseLeave={() => setActiveImageIndex(null)}
              onPointerLeave={() => setActiveImageIndex(null)}
            >
              <img
                key={item.name}
                ref={imageRef}
                alt=""
                src={mapMedia(
                  item.mapCode as serveKey,
                  item.toDisplayOnlyOne.img as IMediaKey,
                  "image",
                )}
                style={{ height: videoHeight }}
              />
              <div
                className={clsx(
                  styles.overlay,
                  activeImageIndex === index && styles.show,
                )}
              />
              <div
                className={clsx(
                  styles["text-container"],
                  activeImageIndex === index && styles.show,
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
          </article>
        )),
      )}
    </div>
  );
}
