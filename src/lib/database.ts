/**
 * Database Configuration
 * 
 * This file contains the database configuration for SQ Consulting.
 * Configured for Supabase.
 */

import { createClient } from '@supabase/supabase-js';

// ============================================
// DATABASE CONNECTION SETTINGS
// ============================================

// Supabase Configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://umnunkikjifldpcjfjkg.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// ============================================
// Database Client Initialization
// ============================================

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database connection status
export const isDatabaseConfigured = () => {
  return (
    SUPABASE_URL !== 'https://your-project.supabase.co' &&
    SUPABASE_ANON_KEY !== 'your-anon-key'
  );
};

// ============================================
// Database Schema (matches supabase-setup.sql)
// ============================================

/*
Tables:
1. profiles - Admin users
2. blog_posts - Blog articles
3. career_openings - Job listings
4. job_applications - Job applications
5. banners - Promotional banners
6. contact_submissions - Contact form data
7. booking_requests - Consultation bookings
8. site_settings - Site configuration
9. team_members - Team information
10. success_stories - Case studies
11. testimonials - Client reviews
12. services - Service offerings
*/

// ============================================
// API Functions
// ============================================

export const db = {
  // Blog Posts
  blog: {
    getAll: async () => {
      if (!isDatabaseConfigured()) {
        console.warn('Database not configured. Using mock data.');
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
    },
    getPublished: async () => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, category, author, cover_image, read_time, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false });
    },
    getBySlug: async (slug: string) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();
    },
    getById: async (id: string) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
    },
    create: async (post: any) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('blog_posts').insert(post).select().single();
    },
    update: async (id: string, post: any) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('blog_posts')
        .update(post)
        .eq('id', id)
        .select()
        .single();
    },
    delete: async (id: string) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('blog_posts').delete().eq('id', id);
    },
    count: async () => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('blog_posts').select('*', { count: 'exact', head: true });
    },
  },

  // Career Openings
  careers: {
    getAll: async () => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('career_openings')
        .select('*')
        .order('created_at', { ascending: false });
    },
    getActive: async () => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('career_openings')
        .select('id, title, department, type, location, description, requirements, salary_range')
        .eq('status', true)
        .order('created_at', { ascending: false });
    },
    getById: async (id: string) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('career_openings')
        .select('*')
        .eq('id', id)
        .single();
    },
    create: async (career: any) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('career_openings').insert(career).select().single();
    },
    update: async (id: string, career: any) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('career_openings')
        .update(career)
        .eq('id', id)
        .select()
        .single();
    },
    delete: async (id: string) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('career_openings').delete().eq('id', id);
    },
    count: async () => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('career_openings').select('*', { count: 'exact', head: true });
    },
  },

  // Contact Submissions
  contacts: {
    getAll: async () => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
    },
    getUnread: async () => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('contact_submissions')
        .select('*')
        .eq('is_read', false)
        .order('created_at', { ascending: false });
    },
    create: async (submission: any) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('contact_submissions').insert(submission).select().single();
    },
    markAsRead: async (id: string) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('contact_submissions')
        .update({ is_read: true })
        .eq('id', id)
        .select()
        .single();
    },
    updateStatus: async (id: string, status: string) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
    },
    delete: async (id: string) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('contact_submissions').delete().eq('id', id);
    },
    count: async () => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('contact_submissions').select('*', { count: 'exact', head: true });
    },
  },

  // Job Applications
  applications: {
    getAll: async () => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('job_applications')
        .select('*, career_openings(title, department)')
        .order('created_at', { ascending: false });
    },
    getById: async (id: string) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('job_applications')
        .select('*, career_openings(*)')
        .eq('id', id)
        .single();
    },
    create: async (application: any) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('job_applications').insert(application).select().single();
    },
    updateStatus: async (id: string, status: string) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
    },
    delete: async (id: string) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('job_applications').delete().eq('id', id);
    },
    count: async () => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('job_applications').select('*', { count: 'exact', head: true });
    },
  },

  // Booking Requests
  bookings: {
    getAll: async () => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('booking_requests')
        .select('*')
        .order('created_at', { ascending: false });
    },
    create: async (booking: any) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('booking_requests').insert(booking).select().single();
    },
    updateStatus: async (id: string, status: string) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('booking_requests')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
    },
    delete: async (id: string) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('booking_requests').delete().eq('id', id);
    },
    count: async () => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('booking_requests').select('*', { count: 'exact', head: true });
    },
  },

  // Banners
  banners: {
    getAll: async () => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('banners')
        .select('*')
        .order('created_at', { ascending: false });
    },
    getActive: async () => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      const now = new Date().toISOString();
      return await supabase
        .from('banners')
        .select('*')
        .eq('is_active', true)
        .lte('start_date', now)
        .gte('end_date', now)
        .order('display_order', { ascending: true });
    },
    create: async (banner: any) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('banners').insert(banner).select().single();
    },
    update: async (id: string, banner: any) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase
        .from('banners')
        .update(banner)
        .eq('id', id)
        .select()
        .single();
    },
    delete: async (id: string) => {
      if (!isDatabaseConfigured()) {
        return { data: null, error: new Error('Database not configured') };
      }
      return await supabase.from('banners').delete().eq('id', id);
    },
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    if (!isDatabaseConfigured()) {
      return { data: null, error: new Error('Database not configured') };
    }

    const [contactResult, applicationResult, blogResult, careerResult] = await Promise.all([
      supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
      supabase.from('job_applications').select('*', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
      supabase.from('career_openings').select('*', { count: 'exact', head: true }),
    ]);

    const unreadContacts = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false);

    return {
      data: {
        contact_submissions: contactResult.count || 0,
        job_applications: applicationResult.count || 0,
        blog_posts: blogResult.count || 0,
        career_openings: careerResult.count || 0,
        unread_submissions: unreadContacts.count || 0,
      },
      error: null,
    };
  },
};

export default db;
