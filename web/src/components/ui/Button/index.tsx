import { ReactNode, ButtonHTMLAttributes } from "react";
import style from "./style.module.scss";

import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

export function Button({ children, loading, ...rest }: ButtonProps) {
  return (
    <button className={style.button} disabled={loading} {...rest}>
      {loading ? (
        <FaSpinner color="var(--white)" />
      ) : (
        <a className={style.buttonText}>{children}</a>
      )}
    </button>
  );
}
