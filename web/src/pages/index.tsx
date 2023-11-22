import { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import logoImg from "../../public/logoImage.png";
import style from "../styles/style.module.scss";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRGuest } from "@/utils/canSSRGuest";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email == "" || password == "") {
      toast.error("Preencha todos os campos", {
        position: "top-center",
      });
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
    };

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>App - Faça seu login</title>
      </Head>
      <div className={style.containerCenter}>
        <Image src={logoImg} alt="logo" />
        <div className={style.login}>
          <form>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Digite seu email"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Sua senha"
            />

            <Button onClick={handleLogin} type="submit" loading={loading}>
              Acessar
            </Button>
          </form>
          <Link legacyBehavior href="/signup">
            <div className={style.text}>
              <a>Não possui uma conta?</a>
              <span> Cadastre-se</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) =>{
  return{
    props: {}
  }
})


