import React, { createRef, useCallback, useEffect, useState } from 'react';
const longify = require('../longify.json');
import styles from '../styles.module.scss';

export type mode = 'weak' | 'normal' | 'extreme';

export const grabLongified = (k: string, mode: mode = 'normal'): string | void => {
  console.log(k);
  k = longify.keywords[k] ?? k;
  console.log(k);
  
  return longify[mode][k];
}

export default function Home() {
  const inputRef = createRef<HTMLTextAreaElement>();
  const selectRef = createRef<HTMLSelectElement>();
  const [result, setResult] = useState<string>("");
  const [mode, setMode] = useState<mode>("normal");

  const process = useCallback(() => {
    if (inputRef.current) {
      let res = inputRef.current?.value;
      for (var k in longify.weak) {
        const longified = grabLongified(k, mode);
        if (longified) res = res.replaceAll(new RegExp(k, 'ig'), longified)
        console.log(longified);
      };
      setResult(res);
    }
  }, [inputRef, mode])

  const setModeHandler = () => {
    if (selectRef.current) {
      setMode(selectRef.current.value as mode);
    }
  }

  useEffect(() => {
    process();
  }, [mode, process]);

  return <div className={styles.container}>
    <div className={styles.intro}>
      <h1>Longify.it</h1>
      <p>Easily longify english essays and make them sound classy as hell while you&apos;re at it :D</p>
      <div className={styles.modeSelectionContainer}>
        <b>
          Select mode: 
        </b>
        <select defaultValue="normal" ref={selectRef} onInput={setModeHandler}>
          <option value="weak">Weak mode</option>
          <option value="normal">Normal mode</option>
          <option value="extreme">Extreme mode</option>
        </select>
      </div>
    </div>
    <textarea placeholder="Input" className={styles.textarea} ref={inputRef} onInput={process} cols={30} rows={10}></textarea>
    <div className={styles.line} />
    <textarea placeholder="Output (readonly)" className={styles.textarea} disabled value={result} cols={30} rows={10}></textarea>
  </div>;
}