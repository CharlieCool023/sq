// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Finance' | 'Data' | 'Strategy' | 'Operations' | 'Design' | 'Technology';
  author: string;
  published: boolean;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
  readTime?: number;
}

// Career Types
export interface CareerOpening {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Contract' | 'Internship' | 'Part-time';
  location: string;
  description: string;
  requirements: string[];
  salary_range?: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  applications_count?: number;
}

// Job Application Types
export interface JobApplication {
  id: string;
  job_id: string;
  applicant_name: string;
  email: string;
  phone: string;
  resume_url: string;
  cover_letter?: string;
  message?: string;
  status: 'Submitted' | 'Reviewed' | 'Shortlisted' | 'Rejected';
  created_at: string;
  job?: CareerOpening;
}

// Banner Types
export interface Banner {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  link_url?: string;
  order: number;
  is_active: boolean;
  delay_seconds: number;
  created_at: string;
  updated_at: string;
}

// Contact Submission Types
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// Booking Request Types
export interface BookingRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  preferred_date?: string;
  message?: string;
  status: 'Submitted' | 'Contacted' | 'Scheduled' | 'Completed';
  created_at: string;
}

// Site Settings Types
export interface SiteSettings {
  id: string;
  admin_email?: string;
  company_name: string;
  tagline: string;
  location: string;
  contact_email: string;
  contact_phone: string;
  contact_phone_secondary?: string;
  sections_visible: {
    hero: boolean;
    services: boolean;
    testimonials: boolean;
    careers: boolean;
    blog: boolean;
    success_stories: boolean;
  };
  updated_at: string;
}

// Team Member Types
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image_url?: string;
  linkedin_url?: string;
  email?: string;
  order: number;
  is_active: boolean;
}

// Case Study Types
export interface CaseStudy {
  id: string;
  client_name: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  result_metrics: string;
  image_url?: string;
  order: number;
  is_featured: boolean;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  image_url?: string;
  rating: number;
  order: number;
  is_active: boolean;
}

// Service Types
export interface Service {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  icon: string;
  features: string[];
  color: string;
  image_url?: string;
  order: number;
  is_active: boolean;
}

// Admin User Types
export interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

// Navigation Types
export interface NavLink {
  label: string;
  href: string;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  preferred_date: string;
  message: string;
}

export interface JobApplicationFormData {
  applicant_name: string;
  email: string;
  phone: string;
  cover_letter: string;
  message: string;
  resume: File | null;
}

// Stats Types
export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

// Social Link Types
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
