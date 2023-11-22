import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";

class ListOrderController {
  async handle(req: Request, res: Response) {
    const listOrderSevice = new ListOrderService();
    const order = await listOrderSevice.handle();
    return res.json(order);
  }
}

export { ListOrderController };
