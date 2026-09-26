"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  getStoredMembers, 
  updateMemberStatus, 
  exportMembersToExcel, 
  exportMembersToCsv 
} from "@/lib/store";
import { initialNotices, initialEvents, initialLeadership } from "@/lib/mockData";
import { MemberApplication, NoticeItem, EventItem } from "@/types";
import QRCode from "qrcode";
import * as XLSX from "xlsx";
import {
  BarChart3,
  Users,
  UserCheck,
  Clock,
  Building2,
  FileText,
  Calendar,
  Activity,
  Download,
  FileSpreadsheet,
  Search,
  Filter,
  Check,
  X,
  Plus,
  Printer,
  Eye,
  LogOut,
  Bell,
  Globe,
  MapPin,
  Ticket,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  SlidersHorizontal,
  Trash2,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  HeartHandshake,
  DollarSign,
  FolderArchive,
  CheckSquare,
  Server,
  Key
} from "lucide-react";
import Module01Auth from "@/components/admin/Module01Auth";
import Module02OrgStructure from "@/components/admin/Module02OrgStructure";
import Module04Verification from "@/components/admin/Module04Verification";
import Module05Committees from "@/components/admin/Module05Committees";
import Module07Tasks from "@/components/admin/Module07Tasks";
import Module09Documents from "@/components/admin/Module09Documents";
import Module10Finance from "@/components/admin/Module10Finance";
import Module11Training from "@/components/admin/Module11Training";
import Module12Volunteers from "@/components/admin/Module12Volunteers";
import Module13Grievance from "@/components/admin/Module13Grievance";
import Module15Reports from "@/components/admin/Module15Reports";
import Module17SysAdmin from "@/components/admin/Module17SysAdmin";
import {
  initialCommittees,
  initialTasks,
  initialFinance,
  initialTraining,
  initialVolunteers,
  initialGrievances,
  initialDocuments
} from "@/lib/mockData";
import {
  CommitteeItem,
  TaskWorkflowItem,
  FinanceItem,
  TrainingItem,
  VolunteerBloodItem,
  GrievanceItem,
  DocumentArchiveItem
} from "@/types";

type ActiveModule =
  | "overview"
  | "auth"
  | "org"
  | "chapters"
  | "members"
  | "verification"
  | "committees"
  | "events"
  | "tasks"
  | "notices"
  | "documents"
  | "finance"
  | "training"
  | "volunteers"
  | "grievance"
  | "reports"
  | "audit"
  | "sysadmin";

interface AuditEntry {
  id: string;
  action: string;
  admin: string;
  target: string;
  timestamp: string;
  type: "success" | "warning" | "info";
}

interface ChapterEntry {
  id: string;
  nameBn: string;
  nameEn: string;
  type: "DISTRICT" | "CAMPUS";
  convener: string;
  phone: string;
  membersCount: number;
  status: "ACTIVE" | "AD_HOC";
}

export default function EnterpriseAdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { language, toggleLanguage, t } = useLanguage();

  // Active Navigation Module
  const [activeModule, setActiveModule] = useState<ActiveModule>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 17 Modules Data States
  const [members, setMembers] = useState<MemberApplication[]>([]);
  const [notices, setNotices] = useState<NoticeItem[]>(initialNotices);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [committees, setCommittees] = useState<CommitteeItem[]>(initialCommittees);
  const [tasks, setTasks] = useState<TaskWorkflowItem[]>(initialTasks);
  const [finance, setFinance] = useState<FinanceItem[]>(initialFinance);
  const [training, setTraining] = useState<TrainingItem[]>(initialTraining);
  const [volunteers, setVolunteers] = useState<VolunteerBloodItem[]>(initialVolunteers);
  const [grievances, setGrievances] = useState<GrievanceItem[]>(initialGrievances);
  const [documents, setDocuments] = useState<DocumentArchiveItem[]>(initialDocuments);

  const [selectedMember, setSelectedMember] = useState<MemberApplication | null>(null);
  const [memberQrUrl, setMemberQrUrl] = useState<string>("");

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>([
    {
      id: "log-1",
      action: "মেম্বারশিপ অনুমোদন",
      admin: "admin@ndmyouth.org",
      target: "হাসিবুল ইসলাম শাওন (NDM-Y-2026-0001)",
      timestamp: "আজ, সকাল ১০:১৫",
      type: "success",
    },
    {
      id: "log-2",
      action: "এক্সেল ডাটা এক্সপোর্ট",
      admin: "admin@ndmyouth.org",
      target: "৬৪ জেলার সদস্য তালিকা",
      timestamp: "আজ, সকাল ০৯:৩০",
      type: "info",
    },
    {
      id: "log-3",
      action: "প্রেস বিজ্ঞপ্তি প্রকাশ",
      admin: "admin@ndmyouth.org",
      target: "বেকারত্ব নিরসনে জরুরি নীতি সংস্কার",
      timestamp: "গতকাল, বিকাল ০৪:০০",
      type: "success",
    },
  ]);

  // Chapters Mock State
  const [chapters, setChapters] = useState<ChapterEntry[]>([
    { id: "c-1", nameBn: "ঢাকা মহানগর উত্তর", nameEn: "Dhaka North", type: "DISTRICT", convener: "আরিফুল ইসলাম", phone: "01711000111", membersCount: 1420, status: "ACTIVE" },
    { id: "c-2", nameBn: "ঢাকা মহানগর দক্ষিণ", nameEn: "Dhaka South", type: "DISTRICT", convener: "তানভীর হাসান", phone: "01711000222", membersCount: 1180, status: "ACTIVE" },
    { id: "c-3", nameBn: "চট্টগ্রাম জেলা শাখা", nameEn: "Chittagong District", type: "DISTRICT", convener: "কাজী রাকিবুল করিম", phone: "01811000333", membersCount: 950, status: "ACTIVE" },
    { id: "c-4", nameBn: "ঢাকা বিশ্ববিদ্যালয় শাখা", nameEn: "Dhaka University Wing", type: "CAMPUS", convener: "মাহমুদুর রহমান", phone: "01911000444", membersCount: 420, status: "ACTIVE" },
    { id: "c-5", nameBn: "রাজশাহী জেলা শাখা", nameEn: "Rajshahi District", type: "DISTRICT", convener: "শামীম রেজা", phone: "01711000555", membersCount: 560, status: "AD_HOC" },
    { id: "c-6", nameBn: "সিলেট জেলা শাখা", nameEn: "Sylhet District", type: "DISTRICT", convener: "মাহিন চৌধুরী", phone: "01711000666", membersCount: 680, status: "ACTIVE" },
    { id: "c-7", nameBn: "বগুড়া জেলা শাখা", nameEn: "Bogra District", type: "DISTRICT", convener: "রাকিব হাসান", phone: "01911000777", membersCount: 390, status: "AD_HOC" },
  ]);

  // Filter States for Member CRM
  const [searchQuery, setSearchQuery] = useState("");
  const [districtFilter, setDistrictFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [wingFilter, setWingFilter] = useState("ALL");
  const [bloodFilter, setBloodFilter] = useState("ALL");


  // Publishing form state for Notices
  const [noticeTitleBn, setNoticeTitleBn] = useState("");
  const [noticeTitleEn, setNoticeTitleEn] = useState("");
  const [noticeCat, setNoticeCat] = useState<NoticeItem["category"]>("PRESS_RELEASE");
  const [noticeBodyBn, setNoticeBodyBn] = useState("");
  const [noticeBodyEn, setNoticeBodyEn] = useState("");
  const [noticeSuccess, setNoticeSuccess] = useState(false);

  // New Chapter modal state
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [newChapName, setNewChapName] = useState("");
  const [newChapConvener, setNewChapConvener] = useState("");
  const [newChapPhone, setNewChapPhone] = useState("");
  const [newChapType, setNewChapType] = useState<"DISTRICT" | "CAMPUS">("DISTRICT");

  // Load members on mount
  useEffect(() => {
    setMembers(getStoredMembers());
  }, []);

  // Generate QR code when a member is selected
  useEffect(() => {
    if (selectedMember) {
      const verifyUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/verify/${selectedMember.memberCode}`;
      QRCode.toDataURL(verifyUrl, {
        width: 140,
        margin: 1,
        color: { dark: "#0D6938", light: "#FFFFFF" },
      }).then(setMemberQrUrl);
    }
  }, [selectedMember]);

  // Member Status Update
  const handleStatusChange = (id: string, newStatus: "APPROVED" | "REJECTED" | "PENDING") => {
    const updated = updateMemberStatus(id, newStatus);
    setMembers(updated);

    const mem = updated.find((m) => m.id === id);
    if (mem) {
      const actionName = newStatus === "APPROVED" ? "মেম্বারশিপ অনুমোদন" : newStatus === "REJECTED" ? "আবেদন বাতিল" : "যাচাইাধীন ঘোষণা";
      const newLog: AuditEntry = {
        id: `log-${Date.now()}`,
        action: actionName,
        admin: session?.user?.email || "admin@ndmyouth.org",
        target: `${mem.nameBn} (${mem.memberCode})`,
        timestamp: "এখন মাত্র",
        type: newStatus === "APPROVED" ? "success" : "warning",
      };
      setAuditLogs((prev) => [newLog, ...prev]);
    }
  };

  // 1-Click Excel Export
  const handleExcelExport = (dataset: MemberApplication[]) => {
    exportMembersToExcel(dataset);
    const newLog: AuditEntry = {
      id: `log-${Date.now()}`,
      action: "এক্সেল ডাটা এক্সপোর্ট",
      admin: session?.user?.email || "admin@ndmyouth.org",
      target: `${dataset.length} জন সদস্যের তালিকা`,
      timestamp: "এখন মাত্র",
      type: "info",
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Add Notice
  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitleBn || !noticeBodyBn) return;

    const newN: NoticeItem = {
      id: `not-${Date.now()}`,
      slug: `notice-${Date.now()}`,
      titleBn: noticeTitleBn,
      titleEn: noticeTitleEn || noticeTitleBn,
      category: noticeCat,
      date: new Date().toISOString().split("T")[0],
      contentBn: noticeBodyBn,
      contentEn: noticeBodyEn || noticeBodyBn,
      isPinned: false,
    };

    setNotices([newN, ...notices]);
    setNoticeSuccess(true);

    const newLog: AuditEntry = {
      id: `log-${Date.now()}`,
      action: "প্রেস বিজ্ঞপ্তি প্রকাশ",
      admin: session?.user?.email || "admin@ndmyouth.org",
      target: noticeTitleBn,
      timestamp: "এখন মাত্র",
      type: "success",
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    setTimeout(() => {
      setNoticeSuccess(false);
      setNoticeTitleBn("");
      setNoticeTitleEn("");
      setNoticeBodyBn("");
      setNoticeBodyEn("");
    }, 2500);
  };

  // Add Chapter
  const handleCreateChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapName || !newChapConvener) return;

    const chap: ChapterEntry = {
      id: `c-${Date.now()}`,
      nameBn: newChapName,
      nameEn: newChapName,
      type: newChapType,
      convener: newChapConvener,
      phone: newChapPhone || "01700000000",
      membersCount: 0,
      status: "AD_HOC",
    };

    setChapters([chap, ...chapters]);
    setShowAddChapter(false);
    setNewChapName("");
    setNewChapConvener("");
    setNewChapPhone("");

    const newLog: AuditEntry = {
      id: `log-${Date.now()}`,
      action: "নতুন চ্যাপ্টার সংযোজন",
      admin: session?.user?.email || "admin@ndmyouth.org",
      target: `${chap.nameBn} (${chap.type})`,
      timestamp: "এখন মাত্র",
      type: "info",
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // 17 Modules State Handlers
  const handleAddChapterDirect = (chapData: Omit<ChapterEntry, "id" | "membersCount">) => {
    const chap: ChapterEntry = {
      id: `c-${Date.now()}`,
      ...chapData,
      membersCount: 0,
    };
    setChapters((prev) => [chap, ...prev]);
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        action: "নতুন চ্যাপ্টার অনুমোদন",
        admin: session?.user?.email || "admin@ndmyouth.org",
        target: `${chap.nameBn} (${chap.type})`,
        timestamp: "এখন মাত্র",
        type: "info",
      },
      ...prev,
    ]);
  };

  const handleAddCommittee = (com: CommitteeItem) => {
    setCommittees((prev) => [com, ...prev]);
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        action: "কমিটি অনুমোদন জারি",
        admin: session?.user?.email || "admin@ndmyouth.org",
        target: `${com.nameBn} (${com.resolutionNo})`,
        timestamp: "এখন মাত্র",
        type: "success",
      },
      ...prev,
    ]);
  };

  const handleAddTask = (task: TaskWorkflowItem) => {
    setTasks((prev) => [task, ...prev]);
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        action: "সাংগঠনিক দায়িত্ব অর্পণ",
        admin: session?.user?.email || "admin@ndmyouth.org",
        target: task.titleBn,
        timestamp: "এখন মাত্র",
        type: "info",
      },
      ...prev,
    ]);
  };

  const handleUpdateTaskStatus = (id: string, newStatus: TaskWorkflowItem["status"], progress: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus, progress } : t))
    );
  };

  const handleAddFinance = (rec: FinanceItem) => {
    setFinance((prev) => [rec, ...prev]);
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        action: "আর্থিক ভাউচার দাখিল",
        admin: session?.user?.email || "admin@ndmyouth.org",
        target: `${rec.titleBn} (৳${rec.amount})`,
        timestamp: "এখন মাত্র",
        type: rec.type === "INCOME" ? "success" : "warning",
      },
      ...prev,
    ]);
  };

  const handleAddCourse = (course: TrainingItem) => {
    setTraining((prev) => [course, ...prev]);
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        action: "নতুন একাডেমি কোর্স চালু",
        admin: session?.user?.email || "admin@ndmyouth.org",
        target: course.titleBn,
        timestamp: "এখন মাত্র",
        type: "info",
      },
      ...prev,
    ]);
  };

  const handleAddVolunteer = (vol: VolunteerBloodItem) => {
    setVolunteers((prev) => [vol, ...prev]);
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        action: "রক্তদাতা / স্বেচ্ছাসেবক ভুক্তি",
        admin: session?.user?.email || "admin@ndmyouth.org",
        target: `${vol.nameBn} (${vol.bloodGroup}, ${vol.district})`,
        timestamp: "এখন মাত্র",
        type: "info",
      },
      ...prev,
    ]);
  };

  const handleAddGrievance = (grv: GrievanceItem) => {
    setGrievances((prev) => [grv, ...prev]);
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        action: "শৃঙ্খলা কেস দাখিল",
        admin: session?.user?.email || "admin@ndmyouth.org",
        target: `${grv.caseId}: ${grv.titleBn}`,
        timestamp: "এখন মাত্র",
        type: "warning",
      },
      ...prev,
    ]);
  };

  const handleUpdateGrievanceStatus = (id: string, newStatus: GrievanceItem["status"]) => {
    setGrievances((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: newStatus } : g))
    );
  };

  const handleAddDocument = (doc: DocumentArchiveItem) => {
    setDocuments((prev) => [doc, ...prev]);
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        action: "নথি সংরক্ষণ",
        admin: session?.user?.email || "admin@ndmyouth.org",
        target: `${doc.titleBn} (${doc.docCode})`,
        timestamp: "এখন মাত্র",
        type: "info",
      },
      ...prev,
    ]);
  };


  // Computed KPIs
  const totalCount = members.length;
  const approvedCount = members.filter((m) => m.status === "APPROVED").length;
  const pendingCount = members.filter((m) => m.status === "PENDING").length;
  const rejectedCount = members.filter((m) => m.status === "REJECTED").length;

  const districtsList = useMemo(() => Array.from(new Set(members.map((m) => m.district))), [members]);

  // Filtered members for CRM
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchDistrict = districtFilter === "ALL" || m.district === districtFilter;
      const matchStatus = statusFilter === "ALL" || m.status === statusFilter;
      const matchWing = wingFilter === "ALL" || m.wingInterest?.includes(wingFilter);
      const matchBlood = bloodFilter === "ALL" || m.bloodGroup === bloodFilter;
      const q = searchQuery.toLowerCase();
      const matchQuery =
        m.nameBn.toLowerCase().includes(q) ||
        m.nameEn.toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        m.memberCode.toLowerCase().includes(q) ||
        m.nidOrBirthCert.includes(q);
      return matchDistrict && matchStatus && matchWing && matchBlood && matchQuery;
    });
  }, [members, districtFilter, statusFilter, wingFilter, bloodFilter, searchQuery]);

  // Divisional distribution calculation
  const divisionsStats = [
    { name: "ঢাকা", percent: 45, count: 5625 },
    { name: "চট্টগ্রাম", percent: 22, count: 2750 },
    { name: "রাজশাহী", percent: 12, count: 1500 },
    { name: "সিলেট", percent: 8, count: 1000 },
    { name: "খুলনা", percent: 5, count: 625 },
    { name: "বরিশাল", percent: 3, count: 375 },
    { name: "রংপুর", percent: 3, count: 375 },
    { name: "ময়মনসিংহ", percent: 2, count: 250 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
      
      {/* 1. Master Layout: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* COLLAPSIBLE ENTERPRISE SIDEBAR */}
        <aside
          className={`${
            sidebarCollapsed ? "w-20" : "w-72"
          } transition-all duration-300 bg-slate-900 border-r border-slate-800 flex flex-col justify-between z-30 flex-shrink-0 select-none`}
        >
          {/* Sidebar Header & Brand */}
          <div className="p-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-ndm-green p-0.5 bg-white flex-shrink-0 shadow-lg shadow-emerald-950/50">
                <Image
                  src="/logo.png"
                  alt="NDM Lion"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              {!sidebarCollapsed && (
                <div className="overflow-hidden">
                  <h2 className="font-extrabold text-sm text-white leading-tight truncate">
                    {t.site.name}
                  </h2>
                  <p className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase mt-0.5 truncate">
                    {t.site.motto}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 17 ENTERPRISE MODULES NAVIGATION */}
          <nav className="p-3 space-y-3 flex-1 overflow-y-auto">
            
            {/* GROUP 1: CORE FOUNDATION & IDENTITY */}
            <div className="space-y-1">
              {!sidebarCollapsed && (
                <div className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest px-3 mb-1">
                  ১. মূলভিত্তি ও প্রশাসন
                </div>
              )}

              {/* 01. Foundation & Auth */}
              <button
                onClick={() => setActiveModule("auth")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "auth"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="০১. Foundation & Authentication"
              >
                <div className="flex items-center gap-2.5">
                  <Key className="w-3.5 h-3.5 text-emerald-400" />
                  {!sidebarCollapsed && <span>০১. অথেন্টিকেশন ও RBAC</span>}
                </div>
              </button>

              {/* 02. Organization Structure */}
              <button
                onClick={() => setActiveModule("org")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "org"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="০২. Organization Structure"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  {!sidebarCollapsed && <span>০২. সাংগঠনিক স্তরবিন্যাস</span>}
                </div>
                {!sidebarCollapsed && (
                  <span className="text-[10px] text-slate-400 font-mono">
                    {chapters.length}টি
                  </span>
                )}
              </button>

              {/* 16. Audit & Security */}
              <button
                onClick={() => setActiveModule("audit")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "audit"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="১৬. Audit & Security Trail"
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-3.5 h-3.5 text-teal-400" />
                  {!sidebarCollapsed && <span>১৬. অডিট ট্রেইল ও লগ</span>}
                </div>
              </button>

              {/* 17. System Administration */}
              <button
                onClick={() => setActiveModule("sysadmin")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "sysadmin"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="১৭. System Administration"
              >
                <div className="flex items-center gap-2.5">
                  <Server className="w-3.5 h-3.5 text-purple-400" />
                  {!sidebarCollapsed && <span>১৭. সিস্টেম প্রশাসন</span>}
                </div>
              </button>
            </div>

            {/* GROUP 2: PEOPLE & GOVERNANCE */}
            <div className="space-y-1 pt-2 border-t border-slate-800/60">
              {!sidebarCollapsed && (
                <div className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest px-3 mb-1">
                  ২. জনবল ও নেতৃত্ব
                </div>
              )}

              {/* 03. Member CRM */}
              <button
                onClick={() => setActiveModule("members")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "members"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="০৩. Member Management CRM"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  {!sidebarCollapsed && <span>০৩. সদস্য ডাটাবেস (CRM)</span>}
                </div>
                {!sidebarCollapsed && (
                  <span className="text-[10px] text-slate-400 font-mono">
                    {members.length}
                  </span>
                )}
              </button>

              {/* 04. Member Verification */}
              <button
                onClick={() => setActiveModule("verification")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "verification"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="০৪. Member Verification & Digital ID"
              >
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {!sidebarCollapsed && <span>০৪. যাচাই ও ডিজিটাল আইডি</span>}
                </div>
                {!sidebarCollapsed && pendingCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {pendingCount}
                  </span>
                )}
              </button>

              {/* 05. Committee Management */}
              <button
                onClick={() => setActiveModule("committees")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "committees"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="০৫. Committee Management"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  {!sidebarCollapsed && <span>০৫. কমিটি ও মেয়াদকাল</span>}
                </div>
                {!sidebarCollapsed && (
                  <span className="text-[10px] text-slate-400 font-mono">
                    {committees.length}
                  </span>
                )}
              </button>

              {/* 11. Training & Academy */}
              <button
                onClick={() => setActiveModule("training")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "training"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="১১. Training & Future Leaders Academy"
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
                  {!sidebarCollapsed && <span>১১. লিডার্স একাডেমি</span>}
                </div>
              </button>

              {/* 12. Volunteers & Blood Bank */}
              <button
                onClick={() => setActiveModule("volunteers")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "volunteers"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="১২. Volunteers & Emergency Blood Bank"
              >
                <div className="flex items-center gap-2.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-red-400" />
                  {!sidebarCollapsed && <span>১২. স্বেচ্ছাসেবক ও রক্তদান</span>}
                </div>
              </button>

              {/* 13. Grievance & Issue Cell */}
              <button
                onClick={() => setActiveModule("grievance")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "grievance"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="১৩. Issue & Complaint Management"
              >
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  {!sidebarCollapsed && <span>১৩. শৃঙ্খলা ও অভিযোগ</span>}
                </div>
              </button>
            </div>

            {/* GROUP 3: OPERATIONS & PROGRAMS */}
            <div className="space-y-1 pt-2 border-t border-slate-800/60">
              {!sidebarCollapsed && (
                <div className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest px-3 mb-1">
                  ৩. মাঠপর্যায় ও কর্মসূচি
                </div>
              )}

              {/* 06. Event & Meeting Ops */}
              <button
                onClick={() => setActiveModule("events")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "events"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="০৬. Event & Meeting Ops"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-3.5 h-3.5 text-red-400" />
                  {!sidebarCollapsed && <span>০৬. কর্মসূচি ও সমাবেশ</span>}
                </div>
              </button>

              {/* 07. Task & Workflow */}
              <button
                onClick={() => setActiveModule("tasks")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "tasks"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="০৭. Task & Workflow"
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                  {!sidebarCollapsed && <span>০৭. দায়িত্ব ও প্রগ্রেস</span>}
                </div>
                {!sidebarCollapsed && (
                  <span className="text-[10px] text-slate-400 font-mono">
                    {tasks.length}
                  </span>
                )}
              </button>

              {/* 08. Notice & Media Studio */}
              <button
                onClick={() => setActiveModule("notices")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "notices"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="০৮. Notice & Communication"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  {!sidebarCollapsed && <span>০৮. প্রেস বিজ্ঞপ্তি ও নোটিশ</span>}
                </div>
              </button>

              {/* 09. Document Management */}
              <button
                onClick={() => setActiveModule("documents")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "documents"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="০৯. Document Management"
              >
                <div className="flex items-center gap-2.5">
                  <FolderArchive className="w-3.5 h-3.5 text-amber-400" />
                  {!sidebarCollapsed && <span>০৯. গঠনতন্ত্র ও আর্কাইভ</span>}
                </div>
              </button>

              {/* 10. Finance & Treasury */}
              <button
                onClick={() => setActiveModule("finance")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "finance"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="১০. Finance & Budgeting"
              >
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  {!sidebarCollapsed && <span>১০. তহবিল ও আর্থিক স্বচ্ছতা</span>}
                </div>
              </button>
            </div>

            {/* GROUP 4: INTELLIGENCE & REPORTS */}
            <div className="space-y-1 pt-2 border-t border-slate-800/60">
              {!sidebarCollapsed && (
                <div className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest px-3 mb-1">
                  ৪. বিশ্লেষণ ও প্রতিবেদন
                </div>
              )}

              {/* 14. Executive Dashboard */}
              <button
                onClick={() => setActiveModule("overview")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "overview"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="১৪. Executive Dashboard & Analytics"
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                  {!sidebarCollapsed && <span>১৪. ড্যাশবোর্ড ওভারভিউ</span>}
                </div>
              </button>

              {/* 15. Reports & Excel Export */}
              <button
                onClick={() => setActiveModule("reports")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeModule === "reports"
                    ? "bg-ndm-green text-white shadow-md shadow-emerald-950"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
                title="১৫. Reports & Excel Export"
              >
                <div className="flex items-center gap-2.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-blue-400" />
                  {!sidebarCollapsed && <span>১৫. এক্সেল ও ডাটা রিপোর্ট</span>}
                </div>
              </button>
            </div>

          </nav>

          {/* Sidebar Footer: Collapse Toggle & Admin Details */}
          <div className="p-3 border-t border-slate-800 bg-slate-900/50 space-y-2">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full text-center py-1.5 text-[11px] text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {sidebarCollapsed ? ">>" : "<< সংকুচিত করুন"}
            </button>

            {!sidebarCollapsed && (
              <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center justify-between">
                <div className="truncate">
                  <div className="text-xs font-bold text-white truncate">
                    {session?.user?.name || "কেন্দ্রীয় অ্যাডমিন"}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono truncate">
                    {(session?.user as any)?.role || "SUPER_ADMIN"}
                  </div>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                  title="লগআউট"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* 2. MAIN WORKSPACE AREA */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-slate-950">
          
          {/* Top Enterprise Header Bar */}
          <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between gap-4">
            
            {/* Breadcrumb path */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">অ্যাডমিন সচিবালয়</span>
              <span className="text-slate-600">/</span>
              <span className="text-emerald-400 font-bold uppercase tracking-wider">
                {activeModule === "overview" && "১৪. ড্যাশবোর্ড ওভারভিউ ও অ্যানালিটিক্স"}
                {activeModule === "auth" && "০১. ফাউন্ডেশন ও অথেন্টিকেশন (RBAC)"}
                {activeModule === "org" && "০২. সাংগঠনিক কাঠামো ও ৫-স্তরের পিরামিড"}
                {activeModule === "members" && "০৩. সদস্য ডাটাবেস ও স্ক্রুটিনি (CRM)"}
                {activeModule === "verification" && "০৪. সদস্য যাচাই ও ডিজিটাল আইডি কার্ড"}
                {activeModule === "committees" && "০৫. কমিটি ও মেয়াদকাল ব্যবস্থাপনা"}
                {activeModule === "events" && "০৬. কর্মসূচি ও সমাবেশ RSVP"}
                {activeModule === "tasks" && "০৭. সাংগঠনিক দায়িত্ব ও প্রগ্রেস"}
                {activeModule === "notices" && "০৮. প্রেস বিজ্ঞপ্তি ও নোটিশ পাবলিশার"}
                {activeModule === "documents" && "০৯. গঠনতন্ত্র ও ডিজিটাল আর্কাইভ"}
                {activeModule === "finance" && "১০. তহবিল ও আর্থিক স্বচ্ছতা"}
                {activeModule === "training" && "১১. ফিউচার লিডার্স একাডেমি"}
                {activeModule === "volunteers" && "১২. স্বেচ্ছাসেবক ও জরুরি ব্লাড ব্যাংক"}
                {activeModule === "grievance" && "১৩. শৃঙ্খলা ও অভিযোগ প্রতিকার সেল"}
                {activeModule === "reports" && "১৫. প্রতিবেদন ও ১-ক্লিক এক্সেল এক্সপোর্ট"}
                {activeModule === "audit" && "১৬. অডিট ট্রেইল ও অ্যাক্টিভিটি হিস্ট্রি"}
                {activeModule === "sysadmin" && "১৭. সিস্টেম প্রশাসন ও কনফিগারেশন"}
              </span>
            </div>

            {/* Quick Actions & Profile Bar */}
            <div className="flex items-center gap-3">
              {/* Public Portal Link */}
              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors border border-slate-700/60"
              >
                <span>ওয়েবসাইট ভিউ</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {/* 1-Click Excel Export Shortcut */}
              <button
                onClick={() => handleExcelExport(members)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-950 transition-colors"
                title="সম্পূর্ণ ডাটাবেস এক্সেল ডাউনলোড"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span className="hidden md:inline">এক্সেল এক্সপোর্ট</span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors relative">
                  <Bell className="w-4 h-4" />
                  {pendingCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  )}
                </button>
              </div>

              {/* Language Switch */}
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors border border-slate-700/60 flex items-center gap-1"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === "bn" ? "EN" : "বাং"}</span>
              </button>
            </div>
          </header>

          {/* Module Content View */}
          <div className="p-6 sm:p-8 space-y-8 flex-1">

            {/* ========================================================= */}
            {/* MODULE 1: EXECUTIVE OVERVIEW & KPI DASHBOARD             */}
            {/* ========================================================= */}
            {activeModule === "overview" && (
              <div className="space-y-8 animate-in fade-in duration-200">
                
                {/* Executive Welcome & Live Badge */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 shadow-xl">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                      লাইভ কমান্ড সেন্টার
                    </span>
                    <h1 className="text-xl sm:text-2xl font-black text-white">
                      জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন — কেন্দ্রীয় প্রশাসন
                    </h1>
                    <p className="text-xs text-slate-400">
                      সারাদেশের তৃণমূল ও ক্যাম্পাস পর্যায়ে তরুণদের নেতৃত্ব প্রতিষ্ঠার গতিপ্রকৃতি পর্যবেক্ষণ
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveModule("members")}
                      className="px-4 py-2.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white text-xs font-bold transition-all shadow"
                    >
                      আবেদন যাচাই করুন ({pendingCount})
                    </button>
                    <button
                      onClick={() => setActiveModule("notices")}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                    >
                      নতুন নোটিশ লিখুন
                    </button>
                  </div>
                </div>

                {/* 4 Core Stat Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Total Members */}
                  <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-3">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-xs font-bold uppercase tracking-wider">মোট নিবন্ধিত সদস্য</span>
                      <Users className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-3xl font-black text-white tracking-tight">
                      {totalCount} <span className="text-xs text-emerald-400 font-semibold font-mono">+১৪% এই মাসে</span>
                    </div>
                    <div className="text-[11px] text-slate-500">অনলাইন পোর্টাল ও মাঠপর্যায়ের যৌথ সংখ্যা</div>
                  </div>

                  {/* Approved Active */}
                  <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-3">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-xs font-bold uppercase tracking-wider">অনুমোদিত সক্রিয় সদস্য</span>
                      <UserCheck className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-black text-white tracking-tight">
                      {approvedCount}
                    </div>
                    <div className="text-[11px] text-slate-500">ডিজিটাল আইডি কার্ড ইস্যু সম্পন্ন</div>
                  </div>

                  {/* Pending Scrutiny */}
                  <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-3">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-xs font-bold uppercase tracking-wider">যাচাই প্রক্রিয়াধীন</span>
                      <Clock className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="text-3xl font-black text-amber-400 tracking-tight">
                      {pendingCount}
                    </div>
                    <div className="text-[11px] text-slate-500">স্ক্রুটিনি কমিটির সিদ্ধান্তের অপেক্ষায়</div>
                  </div>

                  {/* Active Chapters */}
                  <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-3">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-xs font-bold uppercase tracking-wider">সক্রিয় জেলা ও শাখা</span>
                      <Building2 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-3xl font-black text-white tracking-tight">
                      {chapters.length} <span className="text-xs text-purple-400 font-semibold">/ ৬৪ জেলা</span>
                    </div>
                    <div className="text-[11px] text-slate-500">আহ্বায়ক কমিটি গঠিত ও দায়িত্বপ্রাপ্ত</div>
                  </div>

                </div>

                {/* Divisional Distribution & Wing Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left: 8 Administrative Divisions Progress */}
                  <div className="lg:col-span-7 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">বিভাগীয় সদস্য বিস্তার (Divisional Reach)</h3>
                        <p className="text-xs text-slate-400">৮টি প্রশাসনিক বিভাগের সদস্য সংখ্যার শতাংশ</p>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                        জাতীয় লক্ষ্যমাত্রা: ১০০%
                      </span>
                    </div>

                    <div className="space-y-4">
                      {divisionsStats.map((div) => (
                        <div key={div.name} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-300">{div.name} বিভাগ</span>
                            <span className="text-slate-400">{div.count} জন ({div.percent}%)</span>
                          </div>
                          <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-ndm-green to-emerald-400 rounded-full transition-all duration-500"
                              style={{ width: `${div.percent}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Functional Wings & Quick Audit Feed */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Functional Wing Breakdown */}
                    <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-sm space-y-4">
                      <h3 className="text-base font-bold text-white">কার্যউইং পছন্দসমূহ (Wing Demographics)</h3>
                      
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
                          <span className="text-slate-400 block font-semibold">পলিসি ও থিংক-ট্যাঙ্ক</span>
                          <span className="text-lg font-bold text-emerald-400">৩৫%</span>
                        </div>
                        <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
                          <span className="text-slate-400 block font-semibold">ক্যাম্পাস ও ছাত্র নেতৃত্ব</span>
                          <span className="text-lg font-bold text-blue-400">২৮%</span>
                        </div>
                        <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
                          <span className="text-slate-400 block font-semibold">স্বেচ্ছাসেবক স্কোয়াড</span>
                          <span className="text-lg font-bold text-amber-400">২৪%</span>
                        </div>
                        <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
                          <span className="text-slate-400 block font-semibold">মিডিয়া, আইটি ও প্রচার</span>
                          <span className="text-lg font-bold text-purple-400">১৩%</span>
                        </div>
                      </div>
                    </div>

                    {/* Recent Audit Stream */}
                    <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white">সাম্প্রতিক প্রশাসনিক পদক্ষেপ</h3>
                        <button
                          onClick={() => setActiveModule("audit")}
                          className="text-xs text-emerald-400 hover:underline"
                        >
                          সব দেখুন
                        </button>
                      </div>

                      <div className="space-y-3">
                        {auditLogs.slice(0, 3).map((log) => (
                          <div key={log.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-xs space-y-1">
                            <div className="flex items-center justify-between font-bold text-slate-300">
                              <span>{log.action}</span>
                              <span className="text-[10px] text-slate-500 font-normal">{log.timestamp}</span>
                            </div>
                            <p className="text-slate-400 truncate">{log.target}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* ========================================================= */}
            {/* MODULE 2: MEMBER CRM, SCRUTINY & EXCEL EXPORT             */}
            {/* ========================================================= */}
            {activeModule === "members" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Header and Quick Stats */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      সদস্য ডাটাবেস ও আবেদন স্ক্রুটিনি (Member CRM)
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      অনলাইন আবেদন যাচাই-বাছাই, অনুমোদন এবং কাস্টমাইজড এক্সেল রিপোর্টিং
                    </p>
                  </div>

                  {/* Export Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleExcelExport(filteredMembers)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg transition-colors flex items-center gap-1.5"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>এক্সেল ডাউনলোড ({filteredMembers.length})</span>
                    </button>

                    <button
                      onClick={() => exportMembersToCsv(filteredMembers)}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>CSV</span>
                    </button>
                  </div>
                </div>

                {/* Advanced Multi-Faceted Filter Bar */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm">
                  
                  {/* Search and Primary Filters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    
                    {/* Search */}
                    <div className="relative lg:col-span-2">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="নাম, মোবাইল, NID অথবা মেম্বার কোড খুঁজুন..."
                        className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>

                    {/* District Filter */}
                    <div>
                      <select
                        value={districtFilter}
                        onChange={(e) => setDistrictFilter(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800/80 border border-slate-700/80 text-white focus:outline-none font-medium"
                      >
                        <option value="ALL">সকল জেলা (৬৪টি)</option>
                        {districtsList.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800/80 border border-slate-700/80 text-white focus:outline-none font-medium"
                      >
                        <option value="ALL">সকল স্ট্যাটাস</option>
                        <option value="PENDING">যাচাইাধীন (PENDING)</option>
                        <option value="APPROVED">অনুমোদিত (APPROVED)</option>
                        <option value="REJECTED">বাতিল (REJECTED)</option>
                      </select>
                    </div>

                    {/* Blood Group Filter */}
                    <div>
                      <select
                        value={bloodFilter}
                        onChange={(e) => setBloodFilter(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800/80 border border-slate-700/80 text-white focus:outline-none font-medium"
                      >
                        <option value="ALL">রক্তের গ্রুপ (সব)</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>

                  </div>

                </div>

                {/* Member CRM Data Table */}
                <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider bg-slate-900/90">
                          <th className="py-3.5 px-4">আইডি কোড</th>
                          <th className="py-3.5 px-4">আবেদনকারী ও NID</th>
                          <th className="py-3.5 px-4">যোগাযোগ</th>
                          <th className="py-3.5 px-4">জেলা ও শিক্ষাপ্রতিষ্ঠান</th>
                          <th className="py-3.5 px-4">কার্যউইং</th>
                          <th className="py-3.5 px-4">স্ট্যাটাস</th>
                          <th className="py-3.5 px-4 text-right">পদক্ষেপ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/70 text-slate-300 font-medium">
                        {filteredMembers.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-16 text-center text-slate-500">
                              কোনো আবেদনকারীর রেকর্ড পাওয়া যায়নি।
                            </td>
                          </tr>
                        ) : (
                          filteredMembers.map((m) => (
                            <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                              
                              {/* Member Code */}
                              <td className="py-4 px-4 font-mono font-bold text-emerald-400">
                                <button
                                  onClick={() => setSelectedMember(m)}
                                  className="hover:underline flex items-center gap-1 text-left"
                                >
                                  <span>{m.memberCode}</span>
                                  <Eye className="w-3 h-3 text-slate-500" />
                                </button>
                              </td>

                              {/* Name & NID */}
                              <td className="py-4 px-4">
                                <div className="font-bold text-white text-sm">{m.nameBn}</div>
                                <div className="text-[11px] text-slate-400">{m.nameEn} • NID: {m.nidOrBirthCert}</div>
                              </td>

                              {/* Contact */}
                              <td className="py-4 px-4">
                                <div>{m.phone}</div>
                                <div className="text-[11px] text-slate-500">{m.email}</div>
                              </td>

                              {/* District & Institution */}
                              <td className="py-4 px-4 max-w-xs truncate">
                                <span className="font-semibold text-slate-200">{m.district}</span>
                                <div className="text-[11px] text-slate-500 truncate">{m.institution}</div>
                              </td>

                              {/* Wing */}
                              <td className="py-4 px-4">
                                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-900/60">
                                  {m.wingInterest}
                                </span>
                              </td>

                              {/* Status Badge */}
                              <td className="py-4 px-4">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  m.status === "APPROVED"
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : m.status === "PENDING"
                                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                                }`}>
                                  {m.status === "APPROVED" ? "অনুমোদিত" : m.status === "PENDING" ? "যাচাইাধীন" : "বাতিল"}
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="py-4 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* View Profile */}
                                  <button
                                    onClick={() => setSelectedMember(m)}
                                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                                    title="পূর্ণাঙ্গ প্রোফাইল ও আইডি কার্ড"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>

                                  {/* Approve */}
                                  {m.status !== "APPROVED" && (
                                    <button
                                      onClick={() => handleStatusChange(m.id, "APPROVED")}
                                      className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors border border-emerald-800"
                                      title="আবেদন অনুমোদন করুন"
                                    >
                                      <Check className="w-4 h-4" />
                                    </button>
                                  )}

                                  {/* Reject */}
                                  {m.status !== "REJECTED" && (
                                    <button
                                      onClick={() => handleStatusChange(m.id, "REJECTED")}
                                      className="p-1.5 rounded-lg bg-red-950 text-red-400 hover:bg-red-600 hover:text-white transition-colors border border-red-900"
                                      title="আবেদন বাতিল করুন"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </td>

                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================= */}
            {/* MODULE 3: CHAPTER & UNIT MANAGEMENT                       */}
            {/* ========================================================= */}
            {activeModule === "chapters" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      ৬৪ জেলা ও বিশ্ববিদ্যালয় ক্যাম্পাস শাখা (Chapter Registry)
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      আঞ্চলিক আহ্বায়ক কমিটি ও সদস্য বিস্তার কার্যক্রম মনিটরিং
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddChapter(true)}
                    className="px-4 py-2.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>নতুন চ্যাপ্টার যোগ করুন</span>
                  </button>
                </div>

                {/* Chapter Directory Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {chapters.map((c) => (
                    <div
                      key={c.id}
                      className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-sm space-y-4 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          c.type === "DISTRICT" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        }`}>
                          {c.type === "DISTRICT" ? "জেলা শাখা" : "বিশ্ববিদ্যালয় শাখা"}
                        </span>
                        <span className={`text-[10px] font-bold ${
                          c.status === "ACTIVE" ? "text-emerald-400" : "text-amber-400"
                        }`}>
                          {c.status === "ACTIVE" ? "● সক্রিয় কমিটি" : "● গঠন প্রক্রিয়াধীন"}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white">{c.nameBn}</h3>
                        <p className="text-xs text-slate-400">{c.nameEn}</p>
                      </div>

                      <div className="p-3 bg-slate-800/60 rounded-xl space-y-1.5 text-xs text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-500">আহ্বায়ক / সভাপতি:</span>
                          <span className="font-bold text-white">{c.convener}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">যোগাযোগ:</span>
                          <span className="font-mono">{c.phone}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-slate-700/60">
                          <span className="text-slate-500">নিবন্ধিত সদস্য:</span>
                          <span className="font-bold text-emerald-400">{c.membersCount} জন</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODULE 4: NOTICES & PRESS RELEASE PUBLISHER                */}
            {/* ========================================================= */}
            {activeModule === "notices" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      প্রেস বিজ্ঞপ্তি ও সাংগঠনিক সার্কুলার স্টুডিও
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      অফিশিয়াল প্রেস রিলিজ ও দিকনির্দেশনামূলক সার্কুলার প্রকাশনা
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Publisher Form */}
                  <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
                    <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                      নতুন বিজ্ঞপ্তি ড্রাফট করুন
                    </h3>

                    {noticeSuccess ? (
                      <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-center space-y-2 text-emerald-300">
                        <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                        <h4 className="text-base font-bold">বিজ্ঞপ্তি সফলভাবে প্রকাশিত হয়েছে!</h4>
                        <p className="text-xs">ওয়েবসাইটের নিউজ রুমে এটি এখনই লাইভ রয়েছে।</p>
                      </div>
                    ) : (
                      <form onSubmit={handlePublishNotice} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-300">শিরোনাম (বাংলায়) *</label>
                          <input
                            type="text"
                            required
                            value={noticeTitleBn}
                            onChange={(e) => setNoticeTitleBn(e.target.value)}
                            placeholder="উদা: বেকারত্ব নিরসনে জরুরি নীতি সংস্কারের দাবি"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-300">Title in English</label>
                          <input
                            type="text"
                            value={noticeTitleEn}
                            onChange={(e) => setNoticeTitleEn(e.target.value)}
                            placeholder="e.g. Urgent Demands for Youth Employment Reforms"
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-300">ক্যাটাগরি *</label>
                          <select
                            value={noticeCat}
                            onChange={(e) => setNoticeCat(e.target.value as any)}
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                          >
                            <option value="PRESS_RELEASE">প্রেস বিজ্ঞপ্তি (PRESS RELEASE)</option>
                            <option value="STATEMENT">শীর্ষ নেতৃত্বের বক্তব্য (STATEMENT)</option>
                            <option value="ORGANIZATIONAL_MEMO">সাংগঠনিক সার্কুলার (CIRCULAR)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-300">বিজ্ঞপ্তির পূর্ণাঙ্গ বক্তব্য *</label>
                          <textarea
                            rows={5}
                            required
                            value={noticeBodyBn}
                            onChange={(e) => setNoticeBodyBn(e.target.value)}
                            placeholder="বিজ্ঞপ্তির মূল বিষয়বস্তু এখানে লিখুন..."
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none resize-none"
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white font-bold text-xs shadow-lg transition-colors"
                        >
                          পাবলিশ করুন (Publish)
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Existing Notices List */}
                  <div className="lg:col-span-5 space-y-3">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      সাম্প্রতিক প্রকাশিত নোটিশ ({notices.length})
                    </h3>
                    <div className="space-y-3">
                      {notices.map((n) => (
                        <div key={n.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between text-[10px] text-slate-500">
                            <span className="font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                              {n.category}
                            </span>
                            <span>{n.date}</span>
                          </div>
                          <h4 className="text-xs font-bold text-white line-clamp-2">{n.titleBn}</h4>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODULE 5: EVENTS & RALLIES OPERATIONS                     */}
            {/* ========================================================= */}
            {activeModule === "events" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    মাঠপর্যায়ের কর্মসূচি ও সমাবেশ পরিচালনা
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    আসন্ন সমাবেশের শিডিউল, আসন সক্ষমতা এবং অংশগ্রহণকারীদের RSVP ট্র্যাকিং
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {events.map((ev) => (
                    <div key={ev.id} className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          ev.isUpcoming ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-slate-800 text-slate-400"
                        }`}>
                          {ev.isUpcoming ? "আসন্ন সমাবেশ" : "সম্পন্ন সমাবেশ"}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {ev.registeredCount} জন নিবন্ধিত
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white">{ev.titleBn}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{ev.descriptionBn}</p>

                      <div className="p-3 rounded-xl bg-slate-800/60 space-y-1.5 text-xs text-slate-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{ev.date} • {ev.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-red-400" />
                          <span>{ev.venueBn}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => alert(`ইভেন্ট '${ev.titleBn}'-এর উপস্থিতির তালিকা ডাউনলোড হচ্ছে...`)}
                          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Ticket className="w-3.5 h-3.5 text-amber-400" />
                          <span>উপস্থিতি তালিকা এক্সপোর্ট (Excel)</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODULE 6: SYSTEM AUDIT LOGS                               */}
            {/* ========================================================= */}
            {activeModule === "audit" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    সিস্টেম অডিট ট্রেইল ও নিরাপত্তা লগ
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    প্রশাসনিক পদক্ষেপসমূহ, সদস্য অনুমোদন এবং ডাটা এক্সপোর্টের অপরিবর্তনীয় রেকর্ড
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
                  <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>মোট অডিট রেকর্ড: {auditLogs.length}টি</span>
                    <span className="text-emerald-400 font-mono">256-bit TLS Protected</span>
                  </div>

                  <div className="divide-y divide-slate-800 text-xs">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/40 transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.type === "success"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : log.type === "warning"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            }`}>
                              {log.action}
                            </span>
                            <span className="font-mono text-slate-500 text-[11px]">{log.admin}</span>
                          </div>
                          <p className="text-white font-medium">{log.target}</p>
                        </div>

                        <span className="text-[11px] text-slate-500 flex-shrink-0 font-mono">
                          {log.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 01: FOUNDATION & AUTHENTICATION */}
            {activeModule === "auth" && <Module01Auth />}

            {/* MODULE 02: ORGANIZATION STRUCTURE */}
            {activeModule === "org" && (
              <Module02OrgStructure
                chapters={chapters}
                onAddChapter={handleAddChapterDirect}
              />
            )}

            {/* MODULE 04: MEMBER VERIFICATION & DIGITAL ID */}
            {activeModule === "verification" && (
              <Module04Verification
                members={members}
                onStatusChange={handleStatusChange}
              />
            )}

            {/* MODULE 05: COMMITTEE MANAGEMENT */}
            {activeModule === "committees" && (
              <Module05Committees
                committees={committees}
                onAddCommittee={handleAddCommittee}
              />
            )}

            {/* MODULE 07: TASK & WORKFLOW */}
            {activeModule === "tasks" && (
              <Module07Tasks
                tasks={tasks}
                onAddTask={handleAddTask}
                onUpdateStatus={handleUpdateTaskStatus}
              />
            )}

            {/* MODULE 09: DOCUMENT MANAGEMENT & ARCHIVE */}
            {activeModule === "documents" && (
              <Module09Documents
                documents={documents}
                onAddDocument={handleAddDocument}
              />
            )}

            {/* MODULE 10: FINANCE & BUDGETING */}
            {activeModule === "finance" && (
              <Module10Finance
                financeRecords={finance}
                onAddRecord={handleAddFinance}
              />
            )}

            {/* MODULE 11: TRAINING & LEADERSHIP ACADEMY */}
            {activeModule === "training" && (
              <Module11Training
                courses={training}
                onAddCourse={handleAddCourse}
              />
            )}

            {/* MODULE 12: VOLUNTEERS & BLOOD BANK */}
            {activeModule === "volunteers" && (
              <Module12Volunteers
                volunteers={volunteers}
                onAddVolunteer={handleAddVolunteer}
              />
            )}

            {/* MODULE 13: GRIEVANCE & DISCIPLINARY CELL */}
            {activeModule === "grievance" && (
              <Module13Grievance
                grievances={grievances}
                onAddGrievance={handleAddGrievance}
                onUpdateStatus={handleUpdateGrievanceStatus}
              />
            )}

            {/* MODULE 15: REPORTS & EXCEL EXPORT ENGINE */}
            {activeModule === "reports" && (
              <Module15Reports
                members={members}
                committees={committees}
                financeRecords={finance}
                events={events}
              />
            )}

            {/* MODULE 17: SYSTEM ADMINISTRATION */}
            {activeModule === "sysadmin" && <Module17SysAdmin />}

          </div>
        </main>

      </div>

      {/* ========================================================= */}
      {/* MEMBER DETAIL DRAWER / MODAL WITH DIGITAL ID CARD PRINT    */}
      {/* ========================================================= */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-200">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                  {selectedMember.memberCode}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  selectedMember.status === "APPROVED" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-300"
                }`}>
                  {selectedMember.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-slate-400 hover:text-white font-bold p-1 text-sm"
              >
                ✕ বন্ধ করুন
              </button>
            </div>

            {/* Applicant Core Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-700 border-2 border-emerald-500 flex items-center justify-center font-bold text-2xl text-emerald-400">
                  {selectedMember.nameBn[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedMember.nameBn}</h3>
                  <p className="text-xs text-slate-400">{selectedMember.nameEn}</p>
                  <p className="text-xs text-emerald-400 font-semibold mt-0.5">রক্তের গ্রুপ: {selectedMember.bloodGroup}</p>
                </div>
              </div>

              {/* QR Code */}
              {memberQrUrl && (
                <div className="flex flex-col items-center">
                  <div className="p-1 bg-white rounded-lg">
                    <img src={memberQrUrl} alt="QR" className="w-16 h-16" />
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5 font-mono">ভেরিফাই স্ক্যান</span>
                </div>
              )}
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-800/40 rounded-xl space-y-1">
                <span className="text-slate-500 block">মোবাইল নম্বর:</span>
                <span className="font-bold text-white font-mono">{selectedMember.phone}</span>
              </div>

              <div className="p-3 bg-slate-800/40 rounded-xl space-y-1">
                <span className="text-slate-500 block">ইমেইল ঠিকানা:</span>
                <span className="font-bold text-white">{selectedMember.email}</span>
              </div>

              <div className="p-3 bg-slate-800/40 rounded-xl space-y-1">
                <span className="text-slate-500 block">NID / জন্মনিবন্ধন:</span>
                <span className="font-bold text-white font-mono">{selectedMember.nidOrBirthCert}</span>
              </div>

              <div className="p-3 bg-slate-800/40 rounded-xl space-y-1">
                <span className="text-slate-500 block">জেলা ও বিভাগ:</span>
                <span className="font-bold text-white">{selectedMember.district}, {selectedMember.division}</span>
              </div>

              <div className="sm:col-span-2 p-3 bg-slate-800/40 rounded-xl space-y-1">
                <span className="text-slate-500 block">বর্তমান ঠিকানা:</span>
                <span className="font-bold text-white">{selectedMember.presentAddress || "প্রযোজ্য নয়"}</span>
              </div>

              <div className="sm:col-span-2 p-3 bg-slate-800/40 rounded-xl space-y-1">
                <span className="text-slate-500 block">শিক্ষাপ্রতিষ্ঠান / কর্মক্ষেত্র:</span>
                <span className="font-bold text-white">{selectedMember.institution}</span>
              </div>

              <div className="p-3 bg-slate-800/40 rounded-xl space-y-1">
                <span className="text-slate-500 block">পছন্দের কার্যউইং:</span>
                <span className="font-bold text-emerald-400">{selectedMember.wingInterest}</span>
              </div>

              <div className="p-3 bg-slate-800/40 rounded-xl space-y-1">
                <span className="text-slate-500 block">ঘোষিত বিশেষ দক্ষতা:</span>
                <span className="font-bold text-white">{selectedMember.skills || "সাধারণ"}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="border-t border-slate-800 pt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedMember.status !== "APPROVED" && (
                  <button
                    onClick={() => {
                      handleStatusChange(selectedMember.id, "APPROVED");
                      setSelectedMember({ ...selectedMember, status: "APPROVED" });
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>অনুমোদন করুন</span>
                  </button>
                )}

                {selectedMember.status !== "REJECTED" && (
                  <button
                    onClick={() => {
                      handleStatusChange(selectedMember.id, "REJECTED");
                      setSelectedMember({ ...selectedMember, status: "REJECTED" });
                    }}
                    className="px-4 py-2 rounded-xl bg-red-950 hover:bg-red-800 text-red-300 font-bold text-xs transition-colors border border-red-800 flex items-center gap-1.5"
                  >
                    <X className="w-4 h-4" />
                    <span>আবেদন বাতিল</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>প্রিন্ট আইডি</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CREATE NEW CHAPTER                                 */}
      {/* ========================================================= */}
      {showAddChapter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">নতুন শাখা / চ্যাপ্টার সনদ প্রদান</h3>
              <button onClick={() => setShowAddChapter(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateChapter} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">শাখার নাম (বাংলায়) *</label>
                <input
                  type="text"
                  required
                  value={newChapName}
                  onChange={(e) => setNewChapName(e.target.value)}
                  placeholder="উদা: ময়মনসিংহ জেলা শাখা"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">শাখার ধরন *</label>
                <select
                  value={newChapType}
                  onChange={(e) => setNewChapType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                >
                  <option value="DISTRICT">জেলা শাখা</option>
                  <option value="CAMPUS">বিশ্ববিদ্যালয় ক্যাম্পাস শাখা</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">আহ্বায়ক / সভাপতির নাম *</label>
                <input
                  type="text"
                  required
                  value={newChapConvener}
                  onChange={(e) => setNewChapConvener(e.target.value)}
                  placeholder="উদা: মোঃ শফিকুল ইসলাম"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">যোগাযোগ মোবাইল নম্বর</label>
                <input
                  type="tel"
                  value={newChapPhone}
                  onChange={(e) => setNewChapPhone(e.target.value)}
                  placeholder="017xxxxxxxx"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white font-bold text-xs shadow transition-colors"
              >
                শাখা সনদ অনুমোদন করুন
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
