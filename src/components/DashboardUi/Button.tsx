import React from 'react';
import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd';

export interface ButtonProps extends Omit<AntButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'middle' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  htmlType?: 'button' | 'submit' | 'reset';
  block?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'middle',
  loading = false,
  disabled = false,
  icon,
  children,
  onClick,
  htmlType = 'button',
  block = false,
  className = '',
  style,
  ...restProps
}) => {
  const getButtonType = () => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'default';
      case 'danger':
        return 'primary';
      case 'ghost':
        return 'text';
      default:
        return 'primary';
    }
  };

  const getButtonStyle = () => {
    const baseStyle: React.CSSProperties = {
      borderRadius: '6px',
      fontWeight: 500,
      ...style,
    };

    if (variant === 'danger') {
      baseStyle.backgroundColor = '#ff4d4f';
      baseStyle.borderColor = '#ff4d4f';
      baseStyle.color = '#fff';
    }

    return baseStyle;
  };

  return (
    <AntButton
      type={getButtonType()}
      size={size}
      loading={loading}
      disabled={disabled}
      icon={icon}
      onClick={onClick}
      htmlType={htmlType}
      block={block}
      className={className}
      style={getButtonStyle()}
      danger={variant === 'danger'}
      {...restProps}
    >
      {children}
    </AntButton>
  );
};

export default Button; 