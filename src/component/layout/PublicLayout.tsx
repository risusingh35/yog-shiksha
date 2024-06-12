import { FC, ReactNode } from "react";
import styles from "./Layout.module.css";
interface PublicLayoutProps {
  children: ReactNode;
}
const PublicLayout: FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
export default PublicLayout;
