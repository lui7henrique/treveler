import { useEffect } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export function TooltipField() {
  useEffect(() => {
    tippy("#myButton", {
      content: "I'm a Tippy tooltip!",
    });
  }, []);

  return <button id="myButton">My Button</button>;
}
