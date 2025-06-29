import GithubIcon from "./assets/icons/github.icon";
import LinkedinIcon from "./assets/icons/linkedin.icon";
import me from "./assets/images/me-raw.png";
import styles from "./header.module.scss";

export default function HeaderComponent() {
  return (
    <header className={styles.wrapper}>
      <div className={styles["img-box"]}>
        <div className={styles["img-bg"]} />
        <img alt="" src={me} width={180} height={180} />
      </div>
      <div className={styles["text-box"]}>
        <h1>Nazanin Hashemi</h1>
        <h4>Front End Web Developer</h4>
      </div>
      <div className={styles["icon-box"]}>
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
    </header>
  );
}
