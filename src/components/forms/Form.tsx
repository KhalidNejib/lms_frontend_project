import React from 'react';
import { Form as AntForm, type FormProps as AntFormProps, type FormItemProps } from 'antd';

export interface FormProps extends AntFormProps {
  children: React.ReactNode;
  layout?: 'horizontal' | 'vertical' | 'inline';
  size?: 'small' | 'middle' | 'large';
  labelAlign?: 'left' | 'right';
  labelCol?: { span: number };
  wrapperCol?: { span: number };
  className?: string;
  style?: React.CSSProperties;
}

export interface FormItemPropsExtended extends FormItemProps {
  label: string;
  name: string;
  rules?: any[];
  children: React.ReactNode;
  required?: boolean;
  help?: string;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
}

const Form: React.FC<FormProps> = ({
  children,
  layout = 'vertical',
  size = 'middle',
  labelAlign = 'left',
  labelCol,
  wrapperCol,
  className = '',
  style,
  ...restProps
}) => {
  return (
    <AntForm
      layout={layout}
      size={size}
      labelAlign={labelAlign}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      className={className}
      style={{
        ...style,
      }}
      {...restProps}
    >
      {children}
    </AntForm>
  );
};

// Create a compound component
const FormComponent = Form as typeof Form & {
  Item: typeof AntForm.Item;
};

FormComponent.Item = AntForm.Item;

export default FormComponent; 