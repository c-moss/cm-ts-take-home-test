import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";
import { useState } from "react";

type AddInsightProps = ModalProps;

export const AddInsight = (props: AddInsightProps) => {
  const [brand, setBrand] = useState(0);
  const [text, setText] = useState("");

  const addInsight = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`api/insights`, {
       method: "POST",
       body: JSON.stringify({brand: brand, text: text})
     })
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={addInsight}>
        <label className={styles.field}>
          <select
            className={styles["field-input"]}
            onChange={(event) => setBrand(Number(event.target.value))}
          >
            {BRANDS.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
