import sin1 from "@/assets/images/sin/sin-1.webp";
import sin2 from "@/assets/images/sin/sin-2.webp";
import sin3 from "@/assets/images/sin/sin-3.webp";
import sin4 from "@/assets/images/sin/sin-4.webp";

import sinVideo1 from "@/assets/videos/sin/sin-designer-video1.webm";
import sinVideo2 from "@/assets/videos/sin/sin-designer-video2.webm";
import sinVideo3 from "@/assets/videos/sin/sin-designer-video3.webm";

const sinVideos = {
  sinVideo1,
  sinVideo2,
  sinVideo3,
};

const sinImages = {
  sin1,
  sin2,
  sin3,
  sin4,
};

const serveMedia = {
  sinVideos,
  sinImages,
};

export type serveKey = keyof typeof serveMedia;
export type mediaKey = keyof (typeof serveMedia)[serveKey];

const mapMedia = (objKey: serveKey, mediaKey: mediaKey) => {
  const targetObj = serveMedia[objKey];
  return targetObj[mediaKey];
};

export { mapMedia };
