import { useGSAP } from "@gsap/react";
import DownloadIcon from "./assets/icons/download.icon";
import GithubIcon from "./assets/icons/github.icon";
import LinkedinIcon from "./assets/icons/linkedin.icon";
import me from "./assets/images/me-raw.png";
import styles from "./header.module.scss";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useRef } from "react";

export default function HeaderComponent() {
  const linksRef = useRef<null | HTMLDivElement>(null);
  useGSAP(() => {
    const titleSplit = new SplitText("#hero-title", { type: "chars" });
    const subTitleSplit = new SplitText("#hero-subtitle", { type: "lines" });
    const tl = gsap.timeline();

    tl.from(titleSplit.chars, {
      yPercent: 50,
      duration: 0.5,
      ease: "expo.inOut",
      stagger: 0.06,
    });

    tl.fromTo(
      "#hero-img",
      {
        opacity: 0,
        yPercent: 2,
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: 1,
      },
      0.2
    );

    tl.from(subTitleSplit.lines, {
      opacity: 0,
      duration: 0.2,
      ease: "power1.in",
    });

    if (linksRef.current) {
      const links = gsap.utils.toArray(linksRef.current.children);
      links.forEach((link) =>
        tl.fromTo(
          link as Element,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power1.out",
          }
        )
      );
    }
  });
  return (
    <header className={styles.wrapper}>
      <div className={styles["img-box"]}>
        <div className={styles["img-bg"]} />
        <img alt="" src={me} width={150} height={150} id="hero-img" />
      </div>
      <div className={styles["text-box"]}>
        <div>
          <h1 id="hero-title">Nazanin Hashemi</h1>
          <h4 id="hero-subtitle">Front End Web Developer</h4>
        </div>
        <div className={styles["icon-box"]} ref={linksRef}>
          <a
            href="https://www.linkedin.com/in/nazanin-hashemi-a141342a3/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon width={25} height={25} />
          </a>
          <a
            href="https://github.com/nazaninjh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <GithubIcon width={23} height={23} />
          </a>
        </div>
      </div>
      <div className={styles.btns}>
        <a
          href="/my-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="my-cv"
        >
          <span>My resume</span>
          <span className={styles.icon}>
            <DownloadIcon />
          </span>
        </a>
        <a href="mailto:nazanin.jh97@gmail.com">
          <span>Contact me</span>
        </a>
      </div>
    </header>
  );
}
