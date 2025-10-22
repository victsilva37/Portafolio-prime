import { useState } from "react";

export function useHeader() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  return { menuActive, toggleMenu };
}
