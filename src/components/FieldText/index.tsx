import {
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  HTMLProps,
} from "react";
import { FieldError } from "react-hook-form";

import * as S from "./styles";

type FieldTextProps = {
  label: string;
  error?: FieldError;
  containerProps?: typeof S.Container.defaultProps;
} & HTMLProps<HTMLInputElement>;

const BaseFieldText: ForwardRefRenderFunction<
  HTMLInputElement,
  FieldTextProps
> = (props, ref) => {
  const { label, error, containerProps, ...inputProps } = props;

  const [isTyping, setIsTyping] = useState(false);

  return (
    <>
      <S.Container {...containerProps} style={error && "error"}>
        <S.Label isTyping={isTyping}>{label}</S.Label>

        <S.Input
          type="text"
          onFocus={() => !isTyping && setIsTyping(true)}
          {...inputProps}
          onBlur={({ target: { value } }) =>
            !value.trim().length && setIsTyping(false)
          }
          ref={ref}
        />
      </S.Container>
    </>
  );
};

export const FieldText = forwardRef(BaseFieldText);
