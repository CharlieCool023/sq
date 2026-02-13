import { createClient } from '@supabase/supabase-js';
import type {
  BlogPost,
  CareerOpening,
  JobApplication,
  Banner,
  ContactSubmission,
  BookingRequest,
  SiteSettings,
  TeamMember,
  CaseStudy,
  Testimonial,
  Service,
} from '@/types';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Calculate read time
export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// ==================== BLOG OPERATIONS ====================

export const getBlogPosts = async (options?: {
  published?: boolean;
  category?: string;
  limit?: number;
  search?: string;
}): Promise<BlogPost[]> => {
  let query = supabase.from('blogs').select('*');

  if (options?.published !== undefined) {
    query = query.eq('published', options.published);
  }

  if (options?.category) {
    query = query.eq('category', options.category);
  }

  if (options?.search) {
    query = query.or(`title.ilike.%${options.search}%,author.ilike.%${options.search}%`);
  }

  query = query.order('created_at', { ascending: false });

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) return null;
  return data;
};

export const createBlogPost = async (post: Partial<BlogPost>): Promise<BlogPost> => {
  const { data, error } = await supabase
    .from('blogs')
    .insert([post])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<BlogPost> => {
  const { data, error } = await supabase
    .from('blogs')
    .update(post)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  const { error } = await supabase.from('blogs').delete().eq('id', id);
  if (error) throw error;
};

// ==================== CAREER OPERATIONS ====================

export const getCareerOpenings = async (activeOnly = false): Promise<CareerOpening[]> => {
  let query = supabase.from('career_openings').select('*');
  
  if (activeOnly) {
    query = query.eq('status', true);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
};

export const getCareerOpeningById = async (id: string): Promise<CareerOpening | null> => {
  const { data, error } = await supabase
    .from('career_openings')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) return null;
  return data;
};

export const createCareerOpening = async (opening: Partial<CareerOpening>): Promise<CareerOpening> => {
  const { data, error } = await supabase
    .from('career_openings')
    .insert([opening])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateCareerOpening = async (id: string, opening: Partial<CareerOpening>): Promise<CareerOpening> => {
  const { data, error } = await supabase
    .from('career_openings')
    .update(opening)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteCareerOpening = async (id: string): Promise<void> => {
  const { error } = await supabase.from('career_openings').delete().eq('id', id);
  if (error) throw error;
};

// ==================== JOB APPLICATION OPERATIONS ====================

export const getJobApplications = async (jobId?: string): Promise<JobApplication[]> => {
  let query = supabase.from('job_applications').select('*, job:career_openings(*)');
  
  if (jobId) {
    query = query.eq('job_id', jobId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
};

export const createJobApplication = async (application: Partial<JobApplication>): Promise<JobApplication> => {
  const { data, error } = await supabase
    .from('job_applications')
    .insert([application])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateJobApplicationStatus = async (id: string, status: string): Promise<void> => {
  const { error } = await supabase
    .from('job_applications')
    .update({ status })
    .eq('id', id);
  
  if (error) throw error;
};

export const deleteJobApplication = async (id: string): Promise<void> => {
  const { error } = await supabase.from('job_applications').delete().eq('id', id);
  if (error) throw error;
};

// ==================== BANNER OPERATIONS ====================

export const getBanners = async (activeOnly = false): Promise<Banner[]> => {
  let query = supabase.from('banners').select('*');
  
  if (activeOnly) {
    query = query.eq('is_active', true);
  }
  
  const { data, error } = await query.order('order', { ascending: true });
  if (error) throw error;
  return data || [];
};

export const createBanner = async (banner: Partial<Banner>): Promise<Banner> => {
  const { data, error } = await supabase
    .from('banners')
    .insert([banner])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateBanner = async (id: string, banner: Partial<Banner>): Promise<Banner> => {
  const { data, error } = await supabase
    .from('banners')
    .update(banner)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteBanner = async (id: string): Promise<void> => {
  const { error } = await supabase.from('banners').delete().eq('id', id);
  if (error) throw error;
};

// ==================== CONTACT SUBMISSION OPERATIONS ====================

export const getContactSubmissions = async (unreadOnly = false): Promise<ContactSubmission[]> => {
  let query = supabase.from('contact_submissions').select('*');
  
  if (unreadOnly) {
    query = query.eq('is_read', false);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
};

export const createContactSubmission = async (submission: Partial<ContactSubmission>): Promise<ContactSubmission> => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([submission])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const markSubmissionAsRead = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('contact_submissions')
    .update({ is_read: true })
    .eq('id', id);
  
  if (error) throw error;
};

export const deleteContactSubmission = async (id: string): Promise<void> => {
  const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
  if (error) throw error;
};

// ==================== BOOKING REQUEST OPERATIONS ====================

export const getBookingRequests = async (): Promise<BookingRequest[]> => {
  const { data, error } = await supabase
    .from('booking_requests')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const createBookingRequest = async (request: Partial<BookingRequest>): Promise<BookingRequest> => {
  const { data, error } = await supabase
    .from('booking_requests')
    .insert([request])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateBookingStatus = async (id: string, status: string): Promise<void> => {
  const { error } = await supabase
    .from('booking_requests')
    .update({ status })
    .eq('id', id);
  
  if (error) throw error;
};

export const deleteBookingRequest = async (id: string): Promise<void> => {
  const { error } = await supabase.from('booking_requests').delete().eq('id', id);
  if (error) throw error;
};

// ==================== SITE SETTINGS OPERATIONS ====================

export const getSiteSettings = async (): Promise<SiteSettings | null> => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .single();
  
  if (error) return null;
  return data;
};

export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<SiteSettings> => {
  const { data, error } = await supabase
    .from('site_settings')
    .update(settings)
    .eq('id', settings.id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// ==================== TEAM MEMBER OPERATIONS ====================

export const getTeamMembers = async (activeOnly = false): Promise<TeamMember[]> => {
  let query = supabase.from('team_members').select('*');
  
  if (activeOnly) {
    query = query.eq('is_active', true);
  }
  
  const { data, error } = await query.order('order', { ascending: true });
  if (error) throw error;
  return data || [];
};

export const createTeamMember = async (member: Partial<TeamMember>): Promise<TeamMember> => {
  const { data, error } = await supabase
    .from('team_members')
    .insert([member])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateTeamMember = async (id: string, member: Partial<TeamMember>): Promise<TeamMember> => {
  const { data, error } = await supabase
    .from('team_members')
    .update(member)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteTeamMember = async (id: string): Promise<void> => {
  const { error } = await supabase.from('team_members').delete().eq('id', id);
  if (error) throw error;
};

// ==================== CASE STUDY OPERATIONS ====================

export const getCaseStudies = async (featuredOnly = false): Promise<CaseStudy[]> => {
  let query = supabase.from('case_studies').select('*');
  
  if (featuredOnly) {
    query = query.eq('is_featured', true);
  }
  
  const { data, error } = await query.order('order', { ascending: true });
  if (error) throw error;
  return data || [];
};

export const createCaseStudy = async (study: Partial<CaseStudy>): Promise<CaseStudy> => {
  const { data, error } = await supabase
    .from('case_studies')
    .insert([study])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateCaseStudy = async (id: string, study: Partial<CaseStudy>): Promise<CaseStudy> => {
  const { data, error } = await supabase
    .from('case_studies')
    .update(study)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteCaseStudy = async (id: string): Promise<void> => {
  const { error } = await supabase.from('case_studies').delete().eq('id', id);
  if (error) throw error;
};

// ==================== TESTIMONIAL OPERATIONS ====================

export const getTestimonials = async (activeOnly = false): Promise<Testimonial[]> => {
  let query = supabase.from('testimonials').select('*');
  
  if (activeOnly) {
    query = query.eq('is_active', true);
  }
  
  const { data, error } = await query.order('order', { ascending: true });
  if (error) throw error;
  return data || [];
};

export const createTestimonial = async (testimonial: Partial<Testimonial>): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonial])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateTestimonial = async (id: string, testimonial: Partial<Testimonial>): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from('testimonials')
    .update(testimonial)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw error;
};

// ==================== SERVICE OPERATIONS ====================

export const getServices = async (activeOnly = false): Promise<Service[]> => {
  let query = supabase.from('services').select('*');
  
  if (activeOnly) {
    query = query.eq('is_active', true);
  }
  
  const { data, error } = await query.order('order', { ascending: true });
  if (error) throw error;
  return data || [];
};

export const createService = async (service: Partial<Service>): Promise<Service> => {
  const { data, error } = await supabase
    .from('services')
    .insert([service])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateService = async (id: string, service: Partial<Service>): Promise<Service> => {
  const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteService = async (id: string): Promise<void> => {
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw error;
};

// ==================== FILE UPLOAD OPERATIONS ====================

export const uploadFile = async (bucket: string, path: string, file: File): Promise<string | null> => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    });
  
  if (error) {
    console.error('Upload error:', error);
    return null;
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);
  
  return publicUrl;
};

export const deleteFile = async (bucket: string, path: string): Promise<void> => {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
};

// ==================== AUTH OPERATIONS ====================

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};

export const changePassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  
  if (error) throw error;
};
