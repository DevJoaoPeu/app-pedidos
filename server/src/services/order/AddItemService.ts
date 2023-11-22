import prisma from "../../prisma";

interface ItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemService {
  async execute({ amount, order_id, product_id }: ItemRequest) {
    const order = await prisma.item.create({
      data: {
        order_id,
        product_id,
        amount,
      },
    });

    return order;
  }
}

export { AddItemService };
