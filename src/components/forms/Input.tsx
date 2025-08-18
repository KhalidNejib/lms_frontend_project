import React from 'react';
import { Input as AntInput, type InputProps as AntInputProps } from 'antd';

export interface InputProps extends AntInputProps {
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  showCount?: boolean;
  allowClear?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({
  placeholder = '',
  size = 'middle',
  disabled = false,
  readOnly = false,
  maxLength,
  showCount = false,
  allowClear = true,
  prefix,
  suffix,
  addonBefore,
  addonAfter,
  className = '',
  style,
  ...restProps
}) => {
  return (
    <AntInput
      placeholder={placeholder}
      size={size}
      disabled={disabled}
      readOnly={readOnly}
      maxLength={maxLength}
      showCount={showCount}
      allowClear={allowClear}
      prefix={prefix}
      suffix={suffix}
      addonBefore={addonBefore}
      addonAfter={addonAfter}
      className={className}
      style={{
        borderRadius: '6px',
        ...style,
      }}
      {...restProps}
    />
  );
};

// Create a compound component
const InputComponent = Input as typeof Input & {
  Password: typeof AntInput.Password;
  TextArea: typeof AntInput.TextArea;
  Search: typeof AntInput.Search;
};

InputComponent.Password = AntInput.Password;
InputComponent.TextArea = AntInput.TextArea;
InputComponent.Search = AntInput.Search;

export default InputComponent; 