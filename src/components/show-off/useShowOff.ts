import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export type IProjectProps = {
  imageDimensions: {
    inline: number;
    block: number;
  };
  videoHeight: number;
  videoIsReady: boolean;
  activeImageIndex: number | null;
  setActiveImageIndex: React.Dispatch<React.SetStateAction<number | null>>;
  activeVideoIndex: number | null;
  videoRefs: React.RefObject<HTMLVideoElement[]>;
  imageRef: React.RefObject<HTMLImageElement | null>;
  playPause: (index: number) => void;
};

export default function useShowOff() {
  const [tab, setTab] = useState<"projects" | "skills">("projects");

  const [imageDimensions, setimageDimensions] = useState({
    inline: 376,
    block: 200,
  });
  const [videoHeight, setVideoHeight] = useState(200);

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [videoIsReady, setVideoIsReady] = useState(false);

  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const imageRef = useRef<null | HTMLImageElement>(null);

  const changeTab = (tabName: "projects" | "skills") => {
    setTab(tabName);
  };

  const playPause = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    if (video.paused) {
      videoRefs.current.forEach((v, i) => {
        if (i !== index && v) {
          v.pause();
          video.controls = false;
        }
      });
      video.playbackRate = 3.2;
      video.play();
      video.controls = true;

      setActiveVideoIndex(index);
    } else {
      video.pause();
      video.controls = false;
      setActiveVideoIndex(null);
    }
  };

  useLayoutEffect(() => {
    if (!videoRefs.current) return;
    videoRefs.current.forEach((video, index) => {
      if (!video || index > 0) return;
      setVideoHeight(video.clientHeight);
    });
  });

  useEffect(() => {
    if (!imageRef.current) return;
    setimageDimensions({
      inline: imageRef.current.clientWidth,
      block: imageRef.current.clientHeight,
    });
  }, []);

  //   set time back to zero when it ends
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

  useEffect(() => {
    const interval = setInterval(() => {
      const firstVideo = videoRefs.current.find((v) => v != null);

      if (firstVideo && firstVideo.readyState === 4) {
        setVideoIsReady(true);
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!videoRefs.current) return;
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      gsap.fromTo(
        video,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 2,
          scrollTrigger: {
            start: "end start",

            markers: true,
          },
        }
      );
    });
  }, []);

  return {
    tab,

    changeTab,
    projects: {
      imageDimensions,

      videoHeight,

      videoIsReady,

      activeImageIndex,
      setActiveImageIndex,
      activeVideoIndex,

      videoRefs,
      imageRef,

      playPause,
    },
  };
}
