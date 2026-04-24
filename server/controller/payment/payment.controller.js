import SSLCommerzPayment from "sslcommerz-lts";
import mongoose from "mongoose";
import { Course } from "../../model/course/course.model.js";
import { User } from "../../model/user/user.model.js";
import { Payment } from "../../model/payment/payment.model.js";

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;

export const initPayment = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const course = await Course.findById(courseId);
    const student = await User.findById(studentId);

    if (!course) return res.status(404).json({ message: "Course not found" });
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (course.enrolledStudents.includes(studentId)) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const tran_id = `COURSE_${courseId}_${studentId}_${Date.now()}`;
    const amount = Number(course.price || 0);

    if (amount <= 0) {
      course.enrolledStudents.push(studentId);
      await course.save();

      student.enrolmentCourse.push(courseId);
      await student.save();

      return res.status(200).json({
        message: "Free course enrolled successfully",
        free: true,
      });
    }

    await Payment.create({
      student: studentId,
      course: courseId,
      tran_id,
      amount,
      status: "pending",
    });

    const data = {
      total_amount: amount,
      currency: "BDT",
      tran_id,

      success_url: `${process.env.SERVER_URL}/api/payment/success/${tran_id}`,
      fail_url: `${process.env.SERVER_URL}/api/payment/fail/${tran_id}`,
      cancel_url: `${process.env.SERVER_URL}/api/payment/cancel/${tran_id}`,
      ipn_url: `${process.env.SERVER_URL}/api/payment/ipn`,

      shipping_method: "No",
      product_name: course.title,
      product_category: "Online Course",
      product_profile: "non-physical-goods",

      cus_name: student.fullname,
      cus_email: student.email,
      cus_add1: "Dhaka",
      cus_add2: "Bangladesh",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01700000000",

      ship_name: student.fullname,
      ship_add1: "Dhaka",
      ship_city: "Dhaka",
      ship_postcode: "1000",
      ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);

    return res.status(200).json({
      paymentUrl: apiResponse.GatewayPageURL,
      tran_id,
    });
  } catch (error) {
    console.error("Payment init error:", error);
    return res.status(500).json({
      message: "Payment initialization failed",
      error: error.message,
    });
  }
};

export const paymentSuccess = async (req, res) => {
  try {
    const { tran_id } = req.params;

    const payment = await Payment.findOne({ tran_id });
    if (!payment) {
      return res.redirect(`${process.env.CLIENT_URL}/dashboard/payment-failed`);
    }

    payment.status = "paid";
    payment.bank_tran_id = req.body?.bank_tran_id || "";
    payment.card_type = req.body?.card_type || "";
    await payment.save();

    const course = await Course.findById(payment.course);
    const user = await User.findById(payment.student);

    if (course && !course.enrolledStudents.includes(payment.student)) {
      course.enrolledStudents.push(payment.student);
      await course.save();
    }

    if (user && !user.enrolmentCourse.includes(payment.course)) {
      user.enrolmentCourse.push(payment.course);
      await user.save();
    }

    return res.redirect(`${process.env.CLIENT_URL}/dashboard/payment-success`);
  } catch (error) {
    console.error("Payment success error:", error);
    return res.redirect(`${process.env.CLIENT_URL}/dashboard/payment-failed`);
  }
};

export const paymentFail = async (req, res) => {
  const { tran_id } = req.params;
  await Payment.findOneAndUpdate({ tran_id }, { status: "failed" });
  return res.redirect(`${process.env.CLIENT_URL}/dashboard/payment-failed`);
};

export const paymentCancel = async (req, res) => {
  const { tran_id } = req.params;
  await Payment.findOneAndUpdate({ tran_id }, { status: "cancelled" });
  return res.redirect(`${process.env.CLIENT_URL}/dashboard/payment-cancel`);
};

export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ student: req.user.id })
      .populate("course", "title images price")
      .sort({ createdAt: -1 });

    return res.status(200).json({ payments });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
};