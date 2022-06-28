import {CardData} from "../models/card-vm";

export const Card = (props: { data: CardData }): JSX.Element => {
  const { data } = props;
  const { primary, secondaries, action } = data;

  return (
    <div>
      <a href={action?.url}>
        <h3>{primary}</h3>
        <ul>
          { secondaries.map((s, index) => {
            return <li key={`card-secondaries-${index}`}>${s}</li>
          }) }
        </ul>
      </a>
    </div>
  );
}
