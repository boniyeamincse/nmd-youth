import { MemberApplication, NoticeItem, EventItem, LeadershipPerson, GalleryMedia } from "@/types";
import { initialMembers, initialNotices, initialEvents, initialLeadership, initialGallery } from "./mockData";
import * as XLSX from "xlsx";

const MEMBERS_KEY = "ndm_members_db";

export function getStoredMembers(): MemberApplication[] {
  if (typeof window === "undefined") {
    return initialMembers;
  }
  try {
    const raw = localStorage.getItem(MEMBERS_KEY);
    if (!raw) {
      localStorage.setItem(MEMBERS_KEY, JSON.stringify(initialMembers));
      return initialMembers;
    }
    return JSON.parse(raw);
  } catch (e) {
    return initialMembers;
  }
}

export function saveMemberApplication(data: Omit<MemberApplication, "id" | "memberCode" | "status" | "appliedAt">): MemberApplication {
  const current = getStoredMembers();
  const nextNum = current.length + 1;
  const pad = String(nextNum).padStart(4, "0");
  const year = new Date().getFullYear();
  const memberCode = `NDM-Y-${year}-${pad}`;
  
  const newMember: MemberApplication = {
    ...data,
    id: `mem-${Date.now()}`,
    memberCode,
    status: "PENDING",
    appliedAt: new Date().toISOString().split("T")[0],
  };

  const updated = [newMember, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(updated));
  }
  return newMember;
}

export function updateMemberStatus(id: string, status: "APPROVED" | "REJECTED" | "PENDING"): MemberApplication[] {
  const current = getStoredMembers();
  const updated = current.map((m) => {
    if (m.id === id) {
      return {
        ...m,
        status,
        verifiedAt: status === "APPROVED" ? new Date().toISOString().split("T")[0] : m.verifiedAt,
      };
    }
    return m;
  });

  if (typeof window !== "undefined") {
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function exportMembersToExcel(members: MemberApplication[]) {
  const rows = members.map((m, index) => ({
    "ক্রমিক নং": index + 1,
    "সদস্য আইডি": m.memberCode,
    "নাম (বাংলা)": m.nameBn,
    "Name (English)": m.nameEn,
    "মোবাইল নম্বর": m.phone,
    "ইমেইল": m.email,
    "জাতীয় পরিচয়পত্র / জন্মনিবন্ধন": m.nidOrBirthCert,
    "রক্তের গ্রুপ": m.bloodGroup,
    "বিভাগ": m.division,
    "জেলা": m.district,
    "বর্তমান ঠিকানা": m.presentAddress,
    "শিক্ষাপ্রতিষ্ঠান / কর্মক্ষেত্র": m.institution,
    "পছন্দের উইং": m.wingInterest,
    "দক্ষতা": m.skills,
    "আবেদনের তারিখ": m.appliedAt,
    "স্ট্যাটাস": m.status === "APPROVED" ? "অনুমোদিত" : m.status === "PENDING" ? "যাচাইাধীন" : "বাতিল",
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "সদস্য তালিকা");
  
  XLSX.writeFile(workbook, `NDM_Youth_Members_${new Date().toISOString().split("T")[0]}.xlsx`);
}

export function exportMembersToCsv(members: MemberApplication[]) {
  const headers = [
    "ID,Code,NameBn,NameEn,Phone,Email,NID,BloodGroup,Division,District,Institution,Wing,Status,AppliedAt"
  ];
  const rows = members.map((m) =>
    `"${m.id}","${m.memberCode}","${m.nameBn}","${m.nameEn}","${m.phone}","${m.email}","${m.nidOrBirthCert}","${m.bloodGroup}","${m.division}","${m.district}","${m.institution}","${m.wingInterest}","${m.status}","${m.appliedAt}"`
  );
  const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `NDM_Youth_Members_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
