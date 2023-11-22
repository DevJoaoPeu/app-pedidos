import prisma from "../../prisma";

class ListOrderService {
  async handle() {
    const order = await prisma.order.findMany({
      where: {
        draft: false,
        status: false,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return order;
  }
}

export { ListOrderService };
