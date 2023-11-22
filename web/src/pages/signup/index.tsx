import Head from "next/head";
import logoImg from "../../../public/logoImage.png";
import style from "../../styles/style.module.scss";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === "" || email === "" || password === "") {
      toast.error("Preencha todos os campos", {
        position: "top-center"
      });
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password,
    };

    await signUp(data);

    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>App - Faça seu cadastro agora!</title>
      </Head>
      <div className={style.containerCenter}>
        <Image src={logoImg} alt="logo" />
        <div className={style.login}>
          <form onSubmit={handleSignUp}>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Digite seu nome"
            />
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

            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>
          <Link legacyBehavior href="/">
            <div className={style.text}>
              <a>Já possui uma conta?</a>
              <span> Faça login!</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
