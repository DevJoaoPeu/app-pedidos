import Link from "next/link";
import style from "./style.module.scss";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export function Header() {
  const { signOut } = useContext(AuthContext);

  return (
    <header className={style.headerContainer}>
      <div className={style.headerContent}>
        <Link href="/dashboard">
          <Image src="/logoImage.png" width={190} height={70} alt="logo" />
        </Link>

        <nav>
          <Link legacyBehavior href="/category">
            <a>Categorias</a>
          </Link>
          <Link legacyBehavior href="/product">
            <a>Cardapio</a>
          </Link>

          <button onClick={signOut}>
            <FiLogOut color="#fff" size={26} />
          </button>
        </nav>
      </div>
    </header>
  );
}
