// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// import { CreditCard, CheckCircle, XCircle, Clock } from "lucide-react";
// import { getBaseUrl } from "../../../utils/baseUrl";

// const PaymentHistory = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const token = Cookies.get("token");

//         const res = await axios.get(`${getBaseUrl()}/api/payment/my-payments`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setPayments(res.data.payments || []);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   const statusIcon = (status) => {
//     if (status === "paid") return <CheckCircle className="text-green-600" />;
//     if (status === "failed") return <XCircle className="text-red-600" />;
//     return <Clock className="text-yellow-600" />;
//   };

//   if (loading) {
//     return <p className="text-center py-10">Loading payments...</p>;
//   }

//   return (
//     <div className="p-4 sm:p-6">
//       <div className="bg-white rounded-3xl shadow p-6">
//         <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
//           <CreditCard className="text-indigo-600" />
//           My Payments
//         </h2>

//         {payments.length === 0 ? (
//           <p className="text-gray-500">No payment history found.</p>
//         ) : (
//           <div className="space-y-4">
//             {payments.map((payment) => (
//               <div
//                 key={payment._id}
//                 className="border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
//               >
//                 <div>
//                   <h3 className="font-bold text-gray-900">
//                     {payment.course?.title}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     Transaction ID: {payment.tran_id}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Amount: ৳{payment.amount}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-2 capitalize font-semibold">
//                   {statusIcon(payment.status)}
//                   {payment.status}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentHistory;



import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Search,
} from "lucide-react";
import { getBaseUrl } from "../../../utils/baseUrl";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = Cookies.get("token");

        const res = await axios.get(`${getBaseUrl()}/api/payment/my-payments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPayments(res.data.payments || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const statusIcon = (status) => {
    if (status === "paid" || status === "success") {
      return <CheckCircle className="text-green-600 w-5 h-5" />;
    }

    if (status === "failed") {
      return <XCircle className="text-red-600 w-5 h-5" />;
    }

    return <Clock className="text-yellow-600 w-5 h-5" />;
  };

  const statusClass = (status) => {
    if (status === "paid" || status === "success") {
      return "bg-green-100 text-green-700";
    }

    if (status === "failed") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  const filteredPayments = payments.filter((payment) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      payment?.tran_id?.toLowerCase().includes(searchText) ||
      payment?.course?.title?.toLowerCase().includes(searchText) ||
      payment?.val_id?.toLowerCase().includes(searchText);

    const matchesStatus = statusFilter
      ? payment.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  const totalAmount = payments.reduce(
    (sum, payment) =>
      payment.status === "paid" || payment.status === "success"
        ? sum + Number(payment.amount || 0)
        : sum,
    0
  );

  if (loading) {
    return <p className="text-center py-10">Loading payments...</p>;
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className=" mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="text-green-600" />
            Payment History
          </h2>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
            SSLCommerz Gateway
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Total Paid</p>
            <h3 className="text-2xl font-bold mt-1">৳ {totalAmount}</h3>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Total Transactions</p>
            <h3 className="text-2xl font-bold mt-1">{payments.length}</h3>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <p className="text-gray-500 text-sm">Gateway</p>
            <h3 className="text-2xl font-bold mt-1 text-green-600">
              SSLCommerz
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by transaction ID, validation ID or course"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Status</option>
            <option value="paid">Paid</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {filteredPayments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
            No payment history found.
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="text-left p-4">Course</th>
                  <th className="text-left p-4">Transaction ID</th>
                  <th className="text-left p-4">Gateway</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment._id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-semibold text-gray-900">
                      {payment.course?.title || "N/A"}
                    </td>

                    <td className="p-4 text-sm text-gray-600">
                      {payment.tran_id || "N/A"}
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-green-600">
                        SSLCommerz
                      </span>
                    </td>

                    <td className="p-4 font-bold">৳ {payment.amount}</td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusClass(
                          payment.status
                        )}`}
                      >
                        {statusIcon(payment.status)}
                        {payment.status}
                      </span>
                    </td>

                    <td className="p-4 text-sm text-gray-500">
                      {payment.createdAt
                        ? new Date(payment.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;