import { useInsightsContext } from "../../hooks/InsightsContext.tsx";
import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
// @ts-types="../../types/css.d.ts"
import styles from "./add-insight.module.css";

type AddInsightProps = ModalProps;

export const AddInsight = (props: AddInsightProps) => {
  const FORM_FIELDS = {
    BRAND_ID: 'brandId',
    INSIGHT_TEXT: 'insightText'
  }
  const { setNeedsRefresh } = useInsightsContext();

  const addInsight = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //TODO: For simplicity, data is being pulled from submitted form fields via Reatc.FormEvent. In future, we should use either useState or a form library to enable validation and error handling
    const formData = new FormData(event.currentTarget);
    fetch(`api/insights`, {
       method: "POST",
       body: JSON.stringify({brand: formData.get(FORM_FIELDS.BRAND_ID), text: formData.get(FORM_FIELDS.INSIGHT_TEXT)})
     }).then(response => {
      if (response.ok) {
        setNeedsRefresh(true);
      } //TODO: handle POST error
      props.onClose();
     })
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={addInsight}>
        <label className={styles.field}>
          <select
            name={FORM_FIELDS.BRAND_ID}
            className={styles["field-input"]}
          >
            {BRANDS.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            name={FORM_FIELDS.INSIGHT_TEXT}
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
          />
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
