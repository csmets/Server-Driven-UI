import { CardData } from "../models/card-vm";
import styles from "../../styles/card.module.css";

export const Card = (props: { data: CardData }): JSX.Element => {
  const { data } = props;
  const { primary, secondaries, action } = data;

  return (
    <div className={styles.card}>
      <a className={styles.link} href={action?.url}>
        <h3 className={styles.title}>{primary}</h3>
        <ul className={styles.secondaries}>
          { secondaries.map((s, index) => {
            return <li className={styles.secondaries_item} key={`card-secondaries-${index}`}>{s}</li>
          }) }
        </ul>
      </a>
    </div>
  );
}
