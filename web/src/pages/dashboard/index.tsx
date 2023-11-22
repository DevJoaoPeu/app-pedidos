import { Header } from "@/components/Header";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import style from "./style.module.scss";
import { FiRefreshCcw } from "react-icons/fi";
import { setUpApiClient } from "@/services/api";
import { useState } from "react";
import Modal from "react-modal";
import { type } from "os";
import { ModalOrder } from "@/components/ModalOrders";

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};

interface HomeProps {
  orders: OrderProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    banner: string;
    price: string;
  };
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  };
};

export default function DashBoard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || []);

  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal() {
    setModalVisible(false);
  }

  async function handleOpenModal(id: string) {
    const api = setUpApiClient();
    const response = await api.get("/order/detail", {
      params: {
        order_id: id,
      },
    });
    console.log(response.data);
    setModalItem(response.data);
    setModalVisible(true);
  }

  async function handleFinishModal(id: string) {
    const api = setUpApiClient();
    await api.put("/order/finish", {
      order_id: id,
    });
    const response = await api.get("/orders");
    setOrderList(response.data);
    setModalVisible(false);
  }

  async function handleRefreshOrders() {
    const api = setUpApiClient();
    const response = await api.get("/orders");
    setOrderList(response.data);
  }

  Modal.setAppElement("#__next");

  return (
    <>
      <Head>
        <title>Painel - app</title>
      </Head>
      <div>
        <Header />
        <main className={style.container}>
          <div className={style.containerHeader}>
            <h1>Ultimos pedidos</h1>
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} color="var(--green-900)" />
            </button>
          </div>
          <article className={style.listOrders}>
            {orderList.length === 0 && (
              <span className={style.emptyList}>
                Nenhum pedido aberto foi encontrado!
              </span>
            )}

            {orderList.map((item) => (
              <section key={item.id} className={style.orderItem}>
                <button onClick={() => handleOpenModal(item.id)}>
                  <div className={style.tag}></div>
                  <span>Mesa {item.table}</span>
                </button>
              </section>
            ))}
          </article>
        </main>
        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishModal}
          />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const api = setUpApiClient(ctx);
  const response = await api.get("/orders");

  return {
    props: {
      orders: response.data,
    },
  };
});
