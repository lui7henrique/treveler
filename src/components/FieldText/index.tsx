import { TooltipField } from "components/Tooltip";
import {
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  HTMLProps,
} from "react";
import { FieldError } from "react-hook-form";

import * as S from "./styles";

export type FieldTextProps = {
  label: string;
  error?: FieldError;
  containerProps?: typeof S.Container.defaultProps;
  rightIcon?: JSX.Element;
} & HTMLProps<HTMLInputElement>;

const BaseFieldText: ForwardRefRenderFunction<
  HTMLInputElement,
  FieldTextProps
> = (props, ref) => {
  const { label, error, rightIcon, containerProps, ...inputProps } = props;

  const [isTyping, setIsTyping] = useState(false);

  return (
    <S.Container style={error && "error"} {...containerProps}>
      <S.Label isTyping={isTyping}>
        {label} <TooltipField />
      </S.Label>

      <S.Input
        onFocus={() => !isTyping && setIsTyping(true)}
        {...inputProps}
        onBlur={({ target: { value } }) =>
          !value.trim().length && setIsTyping(false)
        }
        autoComplete="off"
        ref={ref}
      />

      {rightIcon}
    </S.Container>
  );
};

export const FieldText = forwardRef(BaseFieldText);
