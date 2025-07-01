import sin1 from "./assets/media/sindesigner/images/sin-1.webp";
import sin2 from "./assets/media/sindesigner/images/sin-2.webp";
import sin3 from "./assets/media/sindesigner/images/sin-3.webp";
import sin4 from "./assets/media/sindesigner/images/sin-4.webp";

import video1 from "./assets/media/sindesigner/videos/sin-designer-video1.webm";
import video2 from "./assets/media/sindesigner/videos/sin-designer-video2.webm";
import video3 from "./assets/media/sindesigner/videos/sin-designer-video3.webm";

const videos = {
  video1,
  video2,
  video3,
};

const images = {
  sin1,
  sin2,
  sin3,
  sin4,
};

const serveMedia = {
  videos,
  images,
};

export type serveKey = keyof typeof serveMedia;
export type mediaKey = keyof (typeof serveMedia)[serveKey];

const mapMedia = (objKey: serveKey, mediaKey: mediaKey) => {
  const targetObj = serveMedia[objKey];
  return targetObj[mediaKey];
};

export { mapMedia };
