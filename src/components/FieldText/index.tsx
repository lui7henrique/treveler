import { useState } from "react";
import * as S from "./styles";

type FieldTextProps = { label: string } & typeof S.Container.defaultProps;

export const FieldText = (props: FieldTextProps) => {
  const { label, ...containerProps } = props;

  const [isTyping, setIsTyping] = useState(false);

  return (
    <S.Container {...containerProps}>
      <S.Label isTyping={isTyping}>{label}</S.Label>

      <S.Input
        type="text"
        onFocus={() => setIsTyping(true)}
        onBlur={({ target: { value } }) =>
          !value.trim().length && setIsTyping(false)
        }
      />
    </S.Container>
  );
};
