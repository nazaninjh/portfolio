export class MapMediaCreator {
  serveMedia: Map<string, unknown>;

  constructor(initialMedia?: Record<string, unknown>) {
    this.serveMedia = new Map();
    if (initialMedia) {
      Object.entries(initialMedia).forEach(([key, value]) => {
        this.serveMedia.set(key, value);
      });
    }
  }

  setMediaObj(
    name: string,
    obj: { image: Record<string, unknown>; video: Record<string, unknown> },
  ) {
    this.serveMedia.set(name, obj);
  }

  mapMedia(targetKey: string): unknown {
    const media = this.serveMedia.get(targetKey);
    if (!media) {
      throw new Error(`Media group "${targetKey}" not found.`);
    }

    return media;
  }
}
