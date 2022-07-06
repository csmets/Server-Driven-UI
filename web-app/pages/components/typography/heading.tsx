import * as React from 'react';
import { HeadingData, HeadingType } from '../../models/heading-vm';
import styles from '../../../styles/heading.module.css';


export const Heading = (props: { data: HeadingData }) => {
  const { data } = props;

  if (!data || !data?.value) {
    return <></>;
  }

  switch(data.type) {
    case HeadingType.H1:
      return <h1 className={styles.heading_1}>{ data.value }</h1>;
    case HeadingType.H2:
      return <h2 className={styles.heading_2}>{ data.value }</h2>;
    case HeadingType.H3:
      return <h3 className={styles.heading_3}>{ data. value }</h3>;
  }
}
