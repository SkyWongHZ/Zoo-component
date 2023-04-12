import { useState, useEffect } from 'react';
import { Input } from 'antd';
import styles from './index.less';
type HoverInputProps = {
  value: string;
  onBlur: Function;
  placeholder?: string;
  inputProps?: any;
};

export default function HoverInput(props: HoverInputProps) {
  const { value, onBlur, inputProps = {}, placeholder = '' } = props;
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  let inputRef: any = null;

  const TextClick = () => {
    setShowInput(true);
    setInputValue(value);
  };

  const InputBlur = () => {
    onBlur(inputValue);
    setShowInput(false);
  };

  useEffect(() => {
    if (inputRef) {
      inputRef.focus();
    }
  }, [showInput]);

  return (
    <div className={styles.wrap}>
      {showInput ? (
        <Input
          ref={(ref: any) => {
            inputRef = ref;
          }}
          size="small"
          value={inputValue}
          onBlur={InputBlur}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          {...inputProps}
        ></Input>
      ) : (
        <div
          className={styles.text}
          onClick={TextClick}
          style={{ color: value ? undefined : '#aaa' }}
        >
          {value || placeholder}
        </div>
      )}
    </div>
  );
}
