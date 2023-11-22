import { Header } from "@/components/Header";
import Head from "next/head";
import style from "./style.module.scss";
import { FormEvent, useState } from "react";
import { setUpApiClient } from "@/services/api";
import { toast } from "react-toastify";

import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Category() {
  const [name, setName] = useState("");

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();

    if (name === "") {
      return;
    }

    const apiClient = setUpApiClient();
    await apiClient.post("/category", {
      name,
    });

    toast.success("Categoria cadastrada com sucesso", {
      position: toast.POSITION.TOP_CENTER,
    });
    setName("");
  };

  return (
    <>
      <Head>
        <title>Nova categoria - app</title>
      </Head>
      <div>
        <Header />
        <main className={style.container}>
          <h1>Cadastrar categorias</h1>

          <form onSubmit={handleRegister} className={style.form}>
            <input
              placeholder="Digite o nome da categoria"
              className={style.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className={style.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
