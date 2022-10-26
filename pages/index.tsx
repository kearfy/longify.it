import React, { createRef, useState } from 'react';
import longify from '../longify';
import styles from '../styles.module.scss';

export const grabLongified = (k: keyof typeof longify): string | void => {
  if (k in longify) {
    const item = longify[k];
    if (!item.startsWith('link:')) return item;
    return grabLongified(item.split(':')[1] as keyof typeof longify);
  }
}

export default function Home() {
  const ref = createRef<HTMLTextAreaElement>();
  const [result, setResult] = useState<string>("");
  let index = 0;

  const process = () => {
    if (ref.current) {
      let res = ref.current?.value;
      for (var k in longify) {
        const longified = grabLongified(k as keyof typeof longify);
        if (longified) res = res.replaceAll(new RegExp(k, 'ig'), longified)
      };
      setResult(res);
    }
  }

  return <div className={styles.container}>
    <div className={styles.intro}>
      <h1>Longify.it</h1>
      <p>Easily longify english essays and make them sound classy as hell while you&apos;re at it :D</p>
    </div>
    <textarea placeholder="Input" className={styles.textarea} ref={ref} onInput={process} cols={30} rows={10}></textarea>
    <div className={styles.line} />
    <textarea placeholder="Output (readonly)" className={styles.textarea} disabled value={result} cols={30} rows={10}></textarea>
  </div>;
}