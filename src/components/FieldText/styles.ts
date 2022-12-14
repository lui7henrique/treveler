import { styled } from "styles";

export const Container = styled("div", {
  variants: {
    style: {
      primary: {
        background: "$shape",
        color: "$subtext",
        height: "$16",
      },
      secondary: {
        background: "$subShape",
        color: "$title",
        height: "$16",
      },
    },
  },
  defaultVariants: {
    style: "primary",
  },

  display: "flex",
  alignItems: "center",

  padding: "0 $6",

  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "$subShape",

  borderRadius: "$md",

  position: "relative",
});

export const Input = styled("input", {
  width: "100%",

  border: "none",
  outline: "none",

  transform: "translateY(30%)",
  zIndex: 1,
});

export const Label = styled("label", {
  variants: {
    isTyping: {
      true: { transform: "translateY(-70%)", fontSize: "$xs" },
      false: { transform: "translateY(-0%)" },
    },
  },

  transition: "all 0.2s ease-in-out",
  position: "absolute",

  left: "$6",
  pointerEvents: "none",

  zIndex: 2,
});
