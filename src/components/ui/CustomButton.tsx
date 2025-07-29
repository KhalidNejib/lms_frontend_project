import React, { CSSProperties, useMemo } from 'react';
import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd';

type Variant = 'primary' | 'secondary' | 'login' | 'google';
type Size = 'sm' | 'md' | 'lg';

// ❗ OMIT 'variant' from AntButtonProps to avoid TS conflict
interface CustomButtonProps extends Omit<AntButtonProps, 'size' | 'type' | 'variant'> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
}

const sizeMap: Record<Size, 'small' | 'middle' | 'large'> = {
  sm: 'small',
  md: 'middle',
  lg: 'large',
};

const styleMap: Record<Variant, CSSProperties> = {
  primary: {
    backgroundColor: '#FF9500',
    color: 'white',
    border: 'none',
  },
  secondary: {
    backgroundColor: '#ffffff',
    color: '#000000',
    borderColor: '#ffffff',
  },
  login: {
    backgroundColor: '#FF9500',
    color: '#ffffff',
    border: 'none',
  },
  google: {
    backgroundColor: '#F7F7F8',
    color: '#000000',
    border: '#ccc',
  },
};

const hoverStyleMap: Record<Variant, CSSProperties> = {
  primary: { backgroundColor: '#e28300' },
  secondary: { backgroundColor: '#FF9500', color: '#ffffff', borderColor: '#FF9500' },
  login: { backgroundColor: '#e28300' },
  google: { backgroundColor: '#e5e5e5' },
};

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  size = 'md',
  block = false,
  style,
  className,
  ...rest
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const combinedStyle = useMemo(() => {
    return {
      ...styleMap[variant],
      ...(isHovered ? hoverStyleMap[variant] : {}),
      ...style,
    };
  }, [variant, isHovered, style]);

  return (
    <AntButton
      size={sizeMap[size]}
      block={block}
      type="default"
      className={className}
      style={combinedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    />
  );
};

export default CustomButton;
