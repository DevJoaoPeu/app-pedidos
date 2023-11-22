import Head from "next/head";
import style from "./style.module.scss";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "@/components/Header";
import { FiUpload } from "react-icons/fi";
import { useState, ChangeEvent, FormEvent } from "react";
import { setUpApiClient } from "@/services/api";
import { toast } from "react-toastify";

type ItemProps = {
  id: string;
  name: string;
};

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [avatar, setAvatar] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const image = event.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatar(image);
      setAvatar(URL.createObjectURL(event.target.files[0]));
    }
  }

  const handleChangeCategory = (event) => {
    setCategorySelected(event.target.value);
  };

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    try {
      const data = new FormData();
      if (
        name === "" ||
        price === "" ||
        description === "" ||
        imageAvatar === null
      ) {
        toast.error("Preencha todos os campos!", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", categories[categorySelected].id);
      data.append("file", imageAvatar);

      const api = setUpApiClient()

      await api.post("/product", data)

      toast.success("Produto cadastrado com sucesso", {
        position: toast.POSITION.TOP_CENTER
      })
    } catch (error) {
      console.log(error);
      toast.error("Ops, erro ao cadastrar!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    setName('')
    setPrice('')
    setDescription('')
    setImageAvatar(null)
    setAvatar('')
  }

  return (
    <>
      <Head>
        <title>Novo produto - app</title>
      </Head>
      <div>
        <Header />

        <main className={style.container}>
          <h1>Novo produto</h1>
          <form onSubmit={handleRegister} className={style.form}>
            <label className={style.labelAvatar}>
              <span>
                <FiUpload size={30} color="#fff" />
              </span>

              <input
                onChange={handleFile}
                type="file"
                accept="image/png, image/jpg"
              />

              {avatar && (
                <img
                  className={style.preview}
                  src={avatar}
                  alt="foto do produto"
                  width={250}
                  height={190}
                />
              )}
            </label>

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              className={style.input}
              placeholder="Digite o nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className={style.input}
              placeholder="Preço do produto"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              className={style.input}
              placeholder="Descreva seu produto..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit" className={style.buttonAdd}>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const api = setUpApiClient(ctx);
  const response = await api.get("/category");

  return {
    props: {
      categoryList: response.data,
    },
  };
});
