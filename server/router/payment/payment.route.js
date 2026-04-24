import express from "express";
import {
  initPayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  getMyPayments,
} from "../../controller/payment/payment.controller.js";
import { isAuthenticated } from "../../midelware/user.auth.js";


const router = express.Router();

router.post("/init/:courseId", isAuthenticated, initPayment);
router.post("/success/:tran_id", paymentSuccess);
router.post("/fail/:tran_id", paymentFail);
router.post("/cancel/:tran_id", paymentCancel);

router.get("/my-payments", isAuthenticated, getMyPayments);

export default router;