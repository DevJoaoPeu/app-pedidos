import prisma from "../../prisma";

interface ProductsRequest {
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}

class CreateProductService {
  async execute({
    name,
    banner,
    price,
    description,
    category_id,
  }: ProductsRequest) {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        banner,
        category_id,
      },
    });
    return product;
  }
}

export { CreateProductService };
