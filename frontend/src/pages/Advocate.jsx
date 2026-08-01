import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import {
  FaUserCircle,
  FaSearch,
  FaCalendarAlt,
  FaBalanceScale,
  FaCommentDots,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import Background from "../components/Background/Background";
import Navbar from "../components/Navbar-Advocate/Navbar-Advocate";
import Footer from "../components/Footer-Advocate/Footer-Advocate";
import API from "../api";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const location = useLocation();


  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    fetchRequests();
  }, []);

  async function rejectCase(id) {

    if (!window.confirm("Reject this case?")) return;

    try {

      const res = await fetch(`${API}/api/hire/reject/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {

        setRequests(prev =>
          prev.map(item =>
            item._id === id
              ? { ...item, status: "rejected" }
              : item
          )
        );

      }

    } catch (err) {

      console.log(err);

    }

  }
  async function deleteRequest(id) {

    if (!window.confirm("Delete this request?")) return;

    try {

      const res = await fetch(`${API}/api/hire/hide/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setRequests((prev) =>
          prev.filter((item) => item._id !== id)
        );
      }

    } catch (err) {
      console.log(err);
    }
  }
  async function acceptCase(request) {

    try {

      const res = await fetch(
        `${API}/api/hire/approve/${request._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (!data.success) {
        return alert(data.message);
      }

      // update UI instantly
      setRequests(prev =>
        prev.map(r =>
          r._id === request._id ? data.booking : r
        )
      );

      // go to chat
      navigate("/chat", {
        state: {
          bookingId: request._id
        }
      });
    }
    catch (err) {
      console.log(err);
    }

  }
  async function fetchRequests() {
    try {
      setLoading(true);

      const res = await fetch(`${API}/api/hire/advocate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {

        // Latest first
        const sorted = [...data.bookings].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Keep only latest request of each user
        const uniqueLatest = [];

        const userSet = new Set();

        sorted.forEach((booking) => {
          const userId = booking.user?._id?.toString();

          if (!userSet.has(userId)) {
            userSet.add(userId);
            uniqueLatest.push(booking);
          }
        });

        setRequests(uniqueLatest);
        setFilteredRequests(uniqueLatest);

      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let list = [...requests];

    if (statusFilter !== "All") {
      list = list.filter(
        (item) =>
          item.status.toLowerCase() ===
          statusFilter.toLowerCase()
      );
    }

    if (search.trim()) {
      list = list.filter((item) => {
        const userName = item.user?.name || "";

        const caseType =
          item.caseType || "";

        return (
          userName.toLowerCase().includes(search.toLowerCase()) ||
          caseType.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    setFilteredRequests(list);
  }, [requests, statusFilter, search]);

  if (location.state?.booking) {

    const booking = location.state.booking;

    setSelectedBooking(booking._id);

    setChatUser(
      booking.user?.name ||
      booking.advocate?.name
    );

  }

  const totalPending = useMemo(
    () =>
      requests.filter(
        (r) => r.status === "pending"
      ).length,
    [requests]
  );

  const totalApproved = useMemo(
    () =>
      requests.filter(
        (r) => r.status === "approved"
      ).length,
    [requests]
  );

  const totalRejected = useMemo(
    () =>
      requests.filter(
        (r) => r.status === "rejected"
      ).length,
    [requests]
  );

  return (
    <div className="relative min-h-screen bg-[#030712] overflow-hidden pb-12">
      <Background />
      <div className="absolute inset-0 bg-black/60"></div>

    <Navbar />


      {/* ================= HERO ================= */}
      <section className="relative z-10 pt-36 pb-14">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-6xl font-bold text-white"
          >
            My

            <span className="text-cyan-400">
              {" "}Requests
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-slate-300 mt-6 text-xl"
          >
            Track every consultation request you've sent to advocates.
            View approval status, request details and manage your legal consultations.
          </motion.p>

        </div>
        {/* STATS */}

        <div className="w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">

          <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 text-center">
            <h3 className="text-slate-400 text-lg">
              Total Requests
            </h3>

            <p className="text-2xl font-bold text-white mt-1">
              {requests.length}
            </p>

          </div>

          <div className="rounded-3xl border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-xl p-6">

            <h3 className="text-yellow-300 text-lg">
              Pending
            </h3>

            <p className="text-2xl font-bold text-white mt-1">
              {totalPending}
            </p>

          </div>

          <div className="rounded-3xl border border-green-500/30 bg-green-500/10 backdrop-blur-xl p-6">

            <h3 className="text-green-300 text-lg">
              Approved
            </h3>

            <p className="text-2xl font-bold text-white mt-1">
              {totalApproved}
            </p>

          </div>

          <div className="rounded-3xl border border-red-500/30 bg-red-500/10 backdrop-blur-xl p-6">

            <h3 className="text-red-300 text-lg">
              Rejected
            </h3>

            <p className="text-2xl font-bold text-white mt-1">
              {totalRejected}
            </p>

          </div>

        </div>

        {/* SEARCH + FILTER */}
        <div className="max-w-7xl mx-auto mt-12 flex flex-col lg:flex-row items-center justify-between gap-6 px-4">

          {/* Search */}

          <div className="relative w-full lg:max-w-md">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search by client or case type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
            />

          </div>

          {/* Status Buttons */}

          <div className="flex flex-wrap justify-center lg:justify-end gap-4">
            {[
              "All",
              "Pending",
              "Approved",
              "Rejected",
            ].map((status) => (

              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${statusFilter === status
                  ? "bg-cyan-500 text-black"
                  : "bg-white/5 border border-white/10 text-white hover:border-cyan-400"
                  }`}
              >
                {status}
              </button>

            ))}

          </div>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12 px-4">

            {[1, 2, 3, 4, 5, 6].map((i) => (

              <div
                key={i}
                className="rounded-3xl bg-white/5 border border-white/10 p-6 animate-pulse"
              >

                <div className="w-20 h-20 rounded-full bg-slate-700 mx-auto"></div>

                <div className="h-6 bg-slate-700 rounded mt-6"></div>

                <div className="h-4 bg-slate-700 rounded mt-3"></div>

                <div className="h-4 bg-slate-700 rounded mt-3"></div>

                <div className="h-10 bg-slate-700 rounded mt-6"></div>

              </div>

            ))}

          </div>

        ) : filteredRequests.length === 0 ? (

          <div className="text-center py-24">

            <FaBalanceScale className="text-7xl text-cyan-400 mx-auto" />

            <h2 className="text-3xl font-bold text-white mt-8">
              No Requests Found
            </h2>

            <p className="text-slate-400 mt-4 max-w-lg mx-auto">
              You haven't sent any consultation requests yet,
              or nothing matches your search.
            </p>

          </div>

        ) : (

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12 px-4">
            {filteredRequests.map((request) => (

              <motion.div
                key={request._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
              >

                {/* Card Header */}

                <div className="flex items-center justify-between p-5 border-b border-white/10">

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-400 flex items-center justify-center">
                      <FaUserCircle className="text-cyan-400 text-4xl" />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {request.user?.name || "User"}
                      </h2>

                      <p className="text-cyan-400 text-sm">
                        {request.user?.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteRequest(request._id)}
                    className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-600 transition flex items-center justify-center"
                  >
                    <FaTrash className="text-red-400" />
                  </button>

                </div>

                <div className="p-6">
                 


                  {/* Description */}

                  <div className="flex items-start gap-3 text-slate-300 text-sm mt-4">

                    <FaCommentDots className="text-cyan-400 mt-1" />

                    <span className="text-left">
                      <b>Message:</b>{" "}
                      {request.description || "No message added"}
                    </span>

                  </div>

                  {/* Date */}

                  <div className="flex items-center gap-3 text-slate-300 text-sm mt-4">
                    <FaCalendarAlt className="text-cyan-400" />

                    <span>
                      <b>Requested:</b>{" "}
                      {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-slate-300 text-sm">
                    <p>
                      <b>Mobile:</b> {request.user?.mobile}
                    </p>

                    <p>
                      <b>City:</b> {request.user?.city}
                    </p>

                    <p>
                      <b>State:</b> {request.user?.state}
                    </p>

                    <p>
                      <b>Pincode:</b> {request.user?.pincode}
                    </p>
                  </div>


                </div>

                {/* Status */}

                <div className="mt-6">

                  {request.status === "pending" && (

                    <div className="flex justify-center gap-4 mt-6">

                      <button
                        onClick={() => acceptCase(request)}
                        className="w-32 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => rejectCase(request._id)}
                        className="w-32 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold"
                      >
                        Reject
                      </button>

                    </div>

                  )}

                </div>

                {/* Chat Button */}

                {request.status === "approved" && (

                  <button
                    onClick={() =>
                      navigate("/chat", {
                        state: {
                          booking: request
                        }
                      })
                    }
                    className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition text-white font-semibold"
                  >
                    Start Chat
                  </button>
                )}

                {/* Waiting Message */}

                {request.status === "pending" && (
                  <div className="mt-6 rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3">
                    <p className="text-yellow-300 text-sm">
                      Your request is awaiting advocate approval.
                    </p>
                  </div>
                )}

                {/* Rejected Message */}

                {request.status === "rejected" && (
                  <div className="mt-6 rounded-xl bg-red-500/10 border border-red-500/20 p-3">
                    <p className="text-red-300 text-sm">
                      This request was rejected by the advocate.
                    </p>
                  </div>
                )}

              </motion.div>


            ))}

          </div>

        )}

      </section>

<Footer />
    </div>
  );
}