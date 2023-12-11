import React, { useEffect, useState } from "react";
import {
  TextInput,
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../service/api";
import { ModalPicker } from "../../components/ModalPicker";

type RouterDetailParams = {
  Order: {
    number: string | number;
    order_id: string;
  };
};

export type CategoryProps = {
  id: string;
  name: string;
};

type ProductProps = {
  id: string;
  name: string;
};

type OrderRouteProps = RouteProp<RouterDetailParams, "Order">;

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation();

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelec, setCategorySelec] = useState<
    CategoryProps | undefined
  >();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  const [products, setProducts] = useState([]);
  const [productSelec, setProductSelec] = useState<ProductProps | undefined>();
  const [modalProductVisible, setModalProductVisible] = useState(false);

  const [amount, setAmount] = useState("1");

  useEffect(() => {
    async function loadInfo() {
      const response = await api.get("/category");
      setCategory(response.data);
      setCategorySelec(response.data[0]);
    }
    loadInfo();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("/category/product", {
        params: {
          category_id: categorySelec?.id,
        },
      });
      setProducts(response.data);
      setProductSelec(response.data[0]);
    }

    loadProducts();
  }, [categorySelec]);

  async function handleDelete() {
    try {
      await api.delete("/order", {
        params: {
          order_id: route.params?.order_id,
        },
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  function handleChangeCategory(item: CategoryProps) {
    setCategorySelec(item);
  }

  function handleChangeProduct(item: ProductProps){
    setProductSelec(item)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>
        <TouchableOpacity onPress={handleDelete}>
          <Feather name="trash-2" size={28} color="#ff3f4b" />
        </TouchableOpacity>
      </View>

      {category.length != 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalCategoryVisible(true)}
        >
          <Text style={{ color: "#FFF" }}>{categorySelec?.name}</Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalProductVisible(true)}
        >
          <Text style={{ color: "#FFF" }}>{productSelec?.name}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          style={[styles.input, { width: "60%", textAlign: "center" }]}
          placeholder="1"
          placeholderTextColor="#f0f0f0"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="slide"
      >
        <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={handleChangeCategory}
        />
      </Modal>
      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handleChangeProduct}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingEnd: "4%",
    paddingStart: "4%",
  },
  header: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 14,
  },
  input: {
    backgroundColor: "#101026",
    borderRadius: 4,
    width: "100%",
    height: 40,
    marginBottom: 12,
    justifyContent: "center",
    paddingHorizontal: 8,
    color: "#fff",
    fontSize: 24,
  },
  qtdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtdText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  actions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonAdd: {
    width: "20%",
    backgroundColor: "#3fd1ff",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#101026",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    height: 40,
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
});
