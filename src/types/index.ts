export type Language = "bn" | "en";

export interface LeadershipPerson {
  id: string;
  nameBn: string;
  nameEn: string;
  roleBn: string;
  roleEn: string;
  category: "central" | "division" | "campus";
  districtBn?: string;
  districtEn?: string;
  image: string;
  bioBn: string;
  bioEn: string;
  phone?: string;
  email?: string;
}

export interface NoticeItem {
  id: string;
  slug: string;
  titleBn: string;
  titleEn: string;
  category: "PRESS_RELEASE" | "STATEMENT" | "MOVEMENT_ACTION" | "ORGANIZATIONAL_MEMO";
  date: string;
  contentBn: string;
  contentEn: string;
  isPinned?: boolean;
  pdfUrl?: string;
}

export interface EventItem {
  id: string;
  slug: string;
  titleBn: string;
  titleEn: string;
  summaryBn: string;
  summaryEn: string;
  descriptionBn: string;
  descriptionEn: string;
  date: string;
  time: string;
  venueBn: string;
  venueEn: string;
  isUpcoming: boolean;
  registeredCount: number;
}

export interface GalleryMedia {
  id: string;
  titleBn: string;
  titleEn: string;
  type: "PHOTO" | "YOUTUBE_VIDEO";
  url: string;
  albumBn: string;
  albumEn: string;
}

export interface MemberApplication {
  id: string;
  memberCode: string; // e.g. NDM-Y-2026-0001
  nameBn: string;
  nameEn: string;
  phone: string;
  email: string;
  nidOrBirthCert: string;
  bloodGroup: string;
  division: string;
  district: string;
  presentAddress: string;
  institution: string;
  wingInterest: string;
  skills: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  appliedAt: string;
  verifiedAt?: string;
}

export interface CommitteeItem {
  id: string;
  nameBn: string;
  nameEn: string;
  chapterBn: string;
  chapterType: "CENTRAL" | "DISTRICT" | "CAMPUS" | "AD_HOC";
  convenerBn: string;
  convenerPhone: string;
  secretaryBn: string;
  membersCount: number;
  termDuration: string;
  expiryDate: string;
  status: "ACTIVE" | "AD_HOC" | "EXPIRED";
  resolutionNo: string;
}

export interface TaskWorkflowItem {
  id: string;
  titleBn: string;
  titleEn: string;
  assignedToBn: string;
  wing: string;
  priority: "URGENT" | "HIGH" | "MEDIUM";
  deadline: string;
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
  progress: number;
}

export interface FinanceItem {
  id: string;
  voucherNo: string;
  titleBn: string;
  type: "INCOME" | "EXPENSE";
  category: "MEMBERSHIP_DUES" | "DONATION" | "EVENT_EXPENSE" | "OFFICE_RENT" | "MEDIA_CAMPAIGN";
  amount: number;
  date: string;
  recordedBy: string;
  status: "VERIFIED" | "PENDING";
}

export interface TrainingItem {
  id: string;
  code: string;
  titleBn: string;
  titleEn: string;
  instructorBn: string;
  duration: string;
  enrolledCount: number;
  status: "OPEN" | "ONGOING" | "COMPLETED";
  modulesCount: number;
  certificateAvailable: boolean;
}

export interface VolunteerBloodItem {
  id: string;
  nameBn: string;
  bloodGroup: string;
  district: string;
  upazila: string;
  phone: string;
  lastDonationDate: string;
  isAvailable: boolean;
  disasterSquad: boolean;
}

export interface GrievanceItem {
  id: string;
  caseId: string;
  titleBn: string;
  againstBn: string;
  filedBy: string;
  chapterBn: string;
  date: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "OPEN" | "INVESTIGATION" | "HEARING" | "RESOLVED";
  summaryBn: string;
}

export interface DocumentArchiveItem {
  id: string;
  docCode: string;
  titleBn: string;
  titleEn: string;
  category: "CONSTITUTION" | "RESOLUTION" | "BRAND_ASSET" | "CIRCULAR_FORM";
  fileType: string;
  fileSize: string;
  version: string;
  publishedDate: string;
  downloadUrl: string;
}

