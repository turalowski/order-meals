import React, { ReactNode } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ViewProps } from 'react-native';
import { DefaultTheme } from 'styled-components/native/dist/types';

type SizeVariant = 'small' | 'medium' | 'large';
type PositionVariant = 'top' | 'left' | 'right' | 'bottom';

const sizeVariant: Record<SizeVariant, number> = {
  small: 1,
  medium: 2,
  large: 3,
};

const positionVariant: Record<PositionVariant, string> = {
  top: 'marginTop',
  left: 'marginLeft',
  right: 'marginRight',
  bottom: 'marginBottom',
};

const getVariant = (
  position: PositionVariant,
  size: SizeVariant,
  theme: DefaultTheme
): string => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];

  return `${property}:${value}`;
};

interface SpacerViewProps extends ViewProps {
  variant: string;
}

const SpacerView = styled.View<SpacerViewProps>`
  ${({ variant }) => variant};
`;

interface SpacerProps {
  position?: PositionVariant;
  size?: SizeVariant;
  children?: ReactNode;
}

export const Spacing = ({
  position = 'top',
  size = 'small',
  children,
}: SpacerProps) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>;
};