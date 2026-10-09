"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { bookingStore } from "@/lib/bookingStore";
import { BookingInquiry, InquiryStatus } from "@/types";
import {
  Shield,
  Lock,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  PhoneCall,
  XCircle,
  MessageCircle,
  Trash2,
  RefreshCw,
  Calendar,
  Users,
  Mail,
  Phone,
  AlertCircle,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [villaFilter, setVillaFilter] = useState<string>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check if admin is already authenticated in session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionAuth = sessionStorage.getItem("admin_auth_status");
      if (sessionAuth === "authenticated") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Load inquiries
  const loadInquiries = () => {
    setInquiries(bookingStore.getInquiries());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadInquiries();

      const handleStorageUpdate = () => {
        loadInquiries();
        showToast("Inquiries updated with latest submissions!");
      };

      window.addEventListener("storage_inquiries_updated", handleStorageUpdate);
      return () => {
        window.removeEventListener("storage_inquiries_updated", handleStorageUpdate);
      };
    }
  }, [isAuthenticated]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim() === siteConfig.admin.passcode) {
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("admin_auth_status", "authenticated");
      }
      setErrorMsg("");
    } else {
      setErrorMsg("Incorrect passcode. Please check siteConfig.ts or try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_auth_status");
    }
  };

  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    bookingStore.updateStatus(id, newStatus);
    loadInquiries();
    showToast(`Inquiry #${id} updated to ${newStatus.toUpperCase()}`);
  };

  const handleDelete = (id: string) => {
    if (confirm(`Are you sure you want to delete inquiry #${id}?`)) {
      bookingStore.deleteInquiry(id);
      loadInquiries();
      showToast(`Inquiry #${id} removed`);
    }
  };

  const handleResetSample = () => {
    if (confirm("Reset booking inquiries to initial sample data?")) {
      bookingStore.resetSampleData();
      loadInquiries();
      showToast("Reset to sample inquiries completed!");
    }
  };

  // KPIs
  const totalCount = inquiries.length;
  const pendingCount = inquiries.filter((i) => i.status === "pending").length;
  const contactedCount = inquiries.filter((i) => i.status === "contacted").length;
  const confirmedCount = inquiries.filter((i) => i.status === "confirmed").length;

  // Filtered List
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.villaName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : inq.status === statusFilter;

    const matchesVilla =
      villaFilter === "all" ? true : inq.villaId === villaFilter;

    return matchesSearch && matchesStatus && matchesVilla;
  });

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111315] text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#181B1E] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </Link>

          <div className="w-14 h-14 rounded-2xl bg-[#C2A476]/10 border border-[#C2A476]/30 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-7 h-7 text-[#C2A476]" />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-light text-center text-white mb-2">
            Host Administration
          </h1>
          <p className="text-xs text-neutral-400 text-center font-light mb-8">
            Enter your secret passcode to access booking logs and customer inquiries.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter passcode..."
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  className="w-full bg-[#111315] border border-white/15 rounded-xl px-4 py-3.5 pl-11 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C2A476] transition-colors"
                  required
                />
                <Lock className="w-4 h-4 text-neutral-500 absolute left-4 top-4" />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#C2A476] hover:bg-[#aa8c5b] text-white py-3.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-lg mt-2"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[11px] text-neutral-500">
              Default passcode configured: <span className="font-mono text-neutral-400">{siteConfig.admin.passcode}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#F8F6F2] text-neutral-900 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#14171A] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#C2A476]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Header */}
      <header className="bg-[#14171A] text-white border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
              title="Return to Public Site"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-xl font-bold tracking-wide">
                  {siteConfig.name}
                </h1>
                <span className="bg-[#C2A476]/20 text-[#C2A476] border border-[#C2A476]/40 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Admin Portal
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Live Guest Inquiry Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetSample}
              className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 transition-colors flex items-center gap-1.5"
              title="Reset Sample Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo Data</span>
            </button>
            <button
              onClick={handleLogout}
              className="text-xs bg-white/10 hover:bg-white/20 text-neutral-200 px-4 py-1.5 rounded-lg transition-colors font-medium"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 pt-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Total Inquiries
              </span>
              <Calendar className="w-4 h-4 text-neutral-400" />
            </div>
            <p className="text-3xl font-serif font-bold text-neutral-900">
              {totalCount}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
            <div className="flex items-center justify-between text-amber-700 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Pending Action
              </span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-3xl font-serif font-bold text-amber-600">
              {pendingCount}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500" />
            <div className="flex items-center justify-between text-blue-700 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Contacted
              </span>
              <PhoneCall className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-3xl font-serif font-bold text-blue-600">
              {contactedCount}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
            <div className="flex items-center justify-between text-emerald-700 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Confirmed
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-serif font-bold text-emerald-600">
              {confirmedCount}
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search guest, ID, villa, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#C2A476]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-600">
              <Filter className="w-3.5 h-3.5 text-neutral-400" />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#FAF8F5] border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-neutral-800 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Villa Filter */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-600">
              <span>Villa:</span>
              <select
                value={villaFilter}
                onChange={(e) => setVillaFilter(e.target.value)}
                className="bg-[#FAF8F5] border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-neutral-800 focus:outline-none"
              >
                <option value="all">All 4 Villas</option>
                {siteConfig.villas.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.code} ({v.district})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Inquiries Table / Cards */}
        {filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200">
            <p className="text-neutral-400 text-sm">
              No reservation inquiries match your current filters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInquiries.map((inq) => {
              const whatsappLink = `https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(inq.guestName)},%20thank%20you%20for%20inquiring%20about%20${encodeURIComponent(inq.villaName)}%20(Ref:%20${inq.id}).`;

              return (
                <div
                  key={inq.id}
                  className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="font-mono text-xs font-bold text-neutral-800 bg-neutral-100 px-2.5 py-1 rounded-md">
                        {inq.id}
                      </span>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-neutral-900">
                          {inq.guestName}
                        </h3>
                        <p className="text-xs text-neutral-500 font-medium">
                          Villa: <span className="text-[#C2A476] font-semibold">{inq.villaName}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* Status Selector */}
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                        className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border focus:outline-none cursor-pointer ${
                          inq.status === "pending"
                            ? "bg-amber-50 text-amber-700 border-amber-300"
                            : inq.status === "contacted"
                            ? "bg-blue-50 text-blue-700 border-blue-300"
                            : inq.status === "confirmed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : "bg-neutral-100 text-neutral-500 border-neutral-200"
                        }`}
                      >
                        <option value="pending">● Pending</option>
                        <option value="contacted">● Contacted</option>
                        <option value="confirmed">● Confirmed</option>
                        <option value="cancelled">● Cancelled</option>
                      </select>

                      {/* Direct WhatsApp Contact */}
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1fb355] text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors shadow-sm"
                        title="Chat with Guest on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Booking Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">
                        Stay Dates
                      </span>
                      <p className="font-semibold text-neutral-800 mt-0.5">
                        {inq.checkIn} → {inq.checkOut}
                      </p>
                    </div>

                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">
                        Guest Count
                      </span>
                      <p className="font-semibold text-neutral-800 mt-0.5">
                        {inq.adults} Adults {inq.children > 0 ? `, ${inq.children} Children` : ""}
                      </p>
                    </div>

                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">
                        Guest Phone / WhatsApp
                      </span>
                      <a
                        href={`tel:${inq.phone}`}
                        className="font-medium text-neutral-800 hover:text-[#C2A476] mt-0.5 flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-[#C2A476]" />
                        <span>{inq.phone}</span>
                      </a>
                    </div>

                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">
                        Guest Email
                      </span>
                      <a
                        href={`mailto:${inq.email}`}
                        className="font-medium text-neutral-800 hover:text-[#C2A476] mt-0.5 flex items-center gap-1 truncate"
                      >
                        <Mail className="w-3 h-3 text-[#C2A476]" />
                        <span className="truncate">{inq.email}</span>
                      </a>
                    </div>
                  </div>

                  {/* Special Requests */}
                  {inq.specialRequests && (
                    <div className="mt-3 p-3 bg-[#FAF8F5] rounded-xl text-xs text-neutral-700 border border-neutral-100">
                      <span className="font-semibold text-neutral-900 block mb-0.5">
                        Guest Special Notes:
                      </span>
                      <p className="italic">{inq.specialRequests}</p>
                    </div>
                  )}

                  <div className="mt-3 text-[10px] text-neutral-400 text-right">
                    Received on: {new Date(inq.createdAt).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
