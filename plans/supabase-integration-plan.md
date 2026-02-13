# SQ Consulting - Supabase Integration Plan

## Overview
This document outlines the complete plan to connect the SQ Consulting website to Supabase for real-time data storage and management.

## Supabase Project Details
- **Project URL**: https://umnunkikjifldpcjfjkg.supabase.co
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtbnVua2lramlmbGRwY2pmamtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MjQ5MDcsImV4cCI6MjA4NjMwMDkwN30.SVGCfw31qQRbkbroyEKUGUQmZmV2u-CX8uZuWRriT2o`
- **Publishable Key**: `sb_publishable_Ek0ECnXuu_0_LPBStDFGNA_7YJpO8ln`

---

## Database Schema

### 1. Table: `profiles`
Stores admin user profiles for authentication.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. Table: `blog_posts`
Stores blog posts and articles.

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  read_time INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
```

### 3. Table: `career_openings`
Stores job openings.

```sql
CREATE TABLE career_openings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  salary_range TEXT,
  status BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_career_openings_status ON career_openings(status);
CREATE INDEX idx_career_openings_department ON career_openings(department);
```

### 4. Table: `job_applications`
Stores job applications from candidates.

```sql
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES career_openings(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_url TEXT NOT NULL,
  cover_letter TEXT,
  message TEXT,
  status TEXT DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Reviewed', 'Shortlisted', 'Rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_job_applications_email ON job_applications(email);
```

### 5. Table: `banners`
Stores promotional banners and popups.

```sql
CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link_url TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  delay_seconds INTEGER DEFAULT 5,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_banners_active ON banners(is_active);
CREATE INDEX idx_banners_order ON banners("order");
```

### 6. Table: `contact_submissions`
Stores contact form submissions.

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_submissions_read ON contact_submissions(is_read);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
```

### 7. Table: `booking_requests`
Stores consultation booking requests.

```sql
CREATE TABLE booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  service TEXT,
  preferred_date DATE,
  message TEXT,
  status TEXT DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Contacted', 'Scheduled', 'Completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_booking_requests_status ON booking_requests(status);
```

### 8. Table: `site_settings`
Stores site configuration settings.

```sql
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT 'default'::uuid,
  admin_email TEXT,
  company_name TEXT DEFAULT 'SQ Consulting',
  tagline TEXT,
  location TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_phone_secondary TEXT,
  sections_visible JSONB DEFAULT '{
    "hero": true,
    "services": true,
    "testimonials": true,
    "careers": true,
    "blog": true,
    "success_stories": true
  }',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO site_settings (id) VALUES ('default');
```

### 9. Table: `team_members`
Stores team member information.

```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  linkedin_url TEXT,
  email TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_team_members_active ON team_members(is_active);
CREATE INDEX idx_team_members_order ON team_members("order");
```

### 10. Table: `success_stories`
Stores case studies and success stories.

```sql
CREATE TABLE success_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  results TEXT NOT NULL,
  result_metrics TEXT,
  image_url TEXT,
  "order" INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false
);

CREATE INDEX idx_success_stories_featured ON success_stories(is_featured);
```

### 11. Table: `testimonials`
Stores client testimonials.

```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  rating INTEGER DEFAULT 5,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_testimonials_active ON testimonials(is_active);
```

### 12. Table: `services`
Stores service offerings.

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  color TEXT DEFAULT '#7B1F7B',
  image_url TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_services_active ON services(is_active);
```

---

## Row Level Security (RLS) Policies

### For Public Read Access (Read-only for public pages):
```sql
-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_openings ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read blog posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public can read career openings" ON career_openings FOR SELECT USING (status = true);
CREATE POLICY "Public can read active banners" ON banners FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read featured success stories" ON success_stories FOR SELECT USING (is_featured = true);
CREATE POLICY "Public can read active services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active team members" ON team_members FOR SELECT USING (is_active = true);
```

### For Authenticated Admin Write Access:
```sql
-- Blog posts admin access
CREATE POLICY "Admins can manage blog posts" ON blog_posts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Career openings admin access
CREATE POLICY "Admins can manage career openings" ON career_openings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Similar policies for other management tables...
```

### For Public Write Access (Submissions only):
```sql
-- Allow public to create submissions (no read/update/delete)
CREATE POLICY "Public can create job applications" ON job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create booking requests" ON booking_requests FOR INSERT WITH CHECK (true);
```

---

## Environment Configuration

### `.env` file update:
```env
VITE_SUPABASE_URL=https://umnunkikjifldpcjfjkg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtbnVua2lramlmbGRwY2pmamtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MjQ5MDcsImV4cCI6MjA4NjMwMDkwN30.SVGCfw31qQRbkbroyEKUGUQmZmV2u-CX8uZuWRriT2o
```

---

## Implementation Steps

### Step 1: Set up Supabase Database
1. Run all SQL statements to create tables
2. Set up RLS policies
3. Insert initial site settings

### Step 2: Update Application Code
1. Update `AuthContext.tsx` to use Supabase Auth
2. Update all admin pages to fetch data from Supabase
3. Update all public pages to fetch content from Supabase
4. Connect forms to submit data to Supabase

### Step 3: Real-time Features
1. Enable real-time subscriptions for dashboard stats
2. Add real-time updates for submissions and applications

### Step 4: File Storage (Optional)
1. Set up Supabase Storage bucket for:
   - Blog post cover images
   - Team member photos
   - Success story images
   - Resume uploads

---

## API Functions Mapping

| Feature | Supabase Function | Status |
|---------|------------------|--------|
| Get Dashboard Stats | Custom query aggregating counts | To implement |
| Blog CRUD | `getBlogPosts`, `createBlogPost`, `updateBlogPost`, `deleteBlogPost` | Exists, needs connection |
| Careers CRUD | `getCareerOpenings`, `createCareerOpening`, etc. | Exists, needs connection |
| Job Applications | `getJobApplications`, `createJobApplication`, etc. | Exists, needs connection |
| Banners CRUD | `getBanners`, `createBanner`, etc. | Exists, needs connection |
| Contact Submissions | `getContactSubmissions`, `createContactSubmission`, etc. | Exists, needs connection |
| Booking Requests | `getBookingRequests`, `createBookingRequest`, etc. | Exists, needs connection |
| Services | `getServices`, `createService`, etc. | Exists, needs connection |
| Team Members | `getTeamMembers`, `createTeamMember`, etc. | To add |
| Success Stories | `getCaseStudies`, `createCaseStudy`, etc. | Exists, needs connection |
| Testimonials | `getTestimonials`, `createTestimonial`, etc. | To add |

---

## Migration Strategy

### Phase 1: Backend Setup
1. Create all database tables in Supabase
2. Set up RLS policies
3. Create initial admin user
4. Seed with current data

### Phase 2: Core Integration
1. Update AuthContext for Supabase Auth
2. Connect Dashboard to real-time data
3. Connect Blog management
4. Connect Careers management
5. Connect Banners management

### Phase 3: Form Integration
1. Connect Contact form
2. Connect Job Application form
3. Connect Booking modal

### Phase 4: Public Pages
1. Update Home page to fetch dynamic content
2. Update Blog page
3. Update Careers page
4. Update About page (Team section)

### Phase 5: Polish & Testing
1. Test all CRUD operations
2. Verify real-time updates
3. Performance optimization
4. Error handling improvements

---

## Seed Data

Initial data to populate the database for production:

### Blog Posts (sample):
- Navigating the 2025 Nigerian Tax Landscape
- Why Data is the New Oil for Lagos Retailers
- Building Resilient Supply Chains in West Africa
- Digital Transformation for SMEs in Nigeria

### Career Openings:
- Senior Business Analyst (Strategy)
- Digital Transformation Consultant (Technology)
- Financial Analyst (Finance)
- Brand Designer (Design)
- Training Coordinator (Training)

### Services:
- Business Intelligence & Data Analytics
- Digital Transformation & Software Transition
- Accounting Operations & Financial Strategy
- Business Strategy & Operational Excellence
- Corporate Brand Design
- Training & Development

### Team Members (placeholder):
- CEO/Managing Partner
- Strategy Director
- Technology Lead
- Finance Director

---

## Admin User Setup

Create initial admin user in Supabase Auth:
1. Email: `admin@sqconsulting.com`
2. Password: (set during initial setup)
3. Create profile record with role='admin'

---

## Real-time Subscriptions

For live dashboard updates, subscribe to:

```typescript
// Example: Subscribe to new contact submissions
supabase
  .channel('public:contact_submissions')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'contact_submissions'
  }, (payload) => {
    // Update dashboard stats
  })
  .subscribe();
```

---

## Error Handling

All API calls should include proper error handling:
```typescript
try {
  const { data, error } = await supabase.from('table').select('*');
  if (error) throw error;
  return data;
} catch (error) {
  console.error('Error fetching data:', error);
  toast.error('Failed to load data');
  return [];
}
```

---

## Appendix: Complete SQL Setup Script

Copy and run this entire script in your Supabase SQL Editor:

```sql
-- ============================================
-- SQ Consulting - Supabase Database Setup Script
-- ============================================

-- ============================================
-- 1. Create Profiles Table (for Auth users)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. Create Blog Posts Table
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  read_time INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- ============================================
-- 3. Create Career Openings Table
-- ============================================
CREATE TABLE IF NOT EXISTS career_openings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  salary_range TEXT,
  status BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_career_openings_status ON career_openings(status);
CREATE INDEX IF NOT EXISTS idx_career_openings_department ON career_openings(department);

-- ============================================
-- 4. Create Job Applications Table
-- ============================================
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES career_openings(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_url TEXT NOT NULL,
  cover_letter TEXT,
  message TEXT,
  status TEXT DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Reviewed', 'Shortlisted', 'Rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);

-- ============================================
-- 5. Create Banners Table
-- ============================================
CREATE TABLE IF NOT EXISTS banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  link_url TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  delay_seconds INTEGER DEFAULT 5,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_banners_active ON banners(is_active);
CREATE INDEX IF NOT EXISTS idx_banners_order ON banners("order");

-- ============================================
-- 6. Create Contact Submissions Table
-- ============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_read ON contact_submissions(is_read);

-- ============================================
-- 7. Create Booking Requests Table
-- ============================================
CREATE TABLE IF NOT EXISTS booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  service TEXT,
  preferred_date DATE,
  message TEXT,
  status TEXT DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Contacted', 'Scheduled', 'Completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. Create Site Settings Table
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT 'default'::uuid,
  admin_email TEXT,
  company_name TEXT DEFAULT 'SQ Consulting',
  tagline TEXT,
  location TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_phone_secondary TEXT,
  sections_visible JSONB DEFAULT '{"hero": true, "services": true, "testimonials": true, "careers": true, "blog": true, "success_stories": true}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO site_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 9. Create Team Members Table
-- ============================================
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  linkedin_url TEXT,
  email TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- ============================================
-- 10. Create Success Stories Table
-- ============================================
CREATE TABLE IF NOT EXISTS success_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  results TEXT NOT NULL,
  result_metrics TEXT,
  image_url TEXT,
  "order" INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false
);

-- ============================================
-- 11. Create Testimonials Table
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  rating INTEGER DEFAULT 5,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- ============================================
-- 12. Create Services Table
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  color TEXT DEFAULT '#7B1F7B',
  image_url TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- ============================================
-- 13. Set Up Row Level Security (RLS)
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_openings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 14. Create RLS Policies
-- ============================================

-- Public Read Policies
CREATE POLICY "Public can read published blog posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public can read active career openings" ON career_openings FOR SELECT USING (status = true);
CREATE POLICY "Public can read active banners" ON banners FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read featured success stories" ON success_stories FOR SELECT USING (is_featured = true);
CREATE POLICY "Public can read active services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active team members" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read site settings" ON site_settings FOR SELECT USING (true);

-- Public Insert Policies (form submissions)
CREATE POLICY "Anyone can create job applications" ON job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create booking requests" ON booking_requests FOR INSERT WITH CHECK (true);

-- ============================================
-- 15. Seed Initial Data
-- ============================================

INSERT INTO blog_posts (title, slug, excerpt, content, category, author, published, read_time) VALUES
('Navigating the 2025 Nigerian Tax Landscape', 'navigating-2025-nigerian-tax-landscape', 'A comprehensive guide to understanding the latest tax regulations.', '<h2>Understanding the Nigerian Tax Landscape</h2><p>The Nigerian tax system has undergone significant changes...</p>', 'Finance', 'Oluwaseun Adeyemi', true, 5),
('Why Data is the New Oil for Lagos Retailers', 'data-is-new-oil-lagos-retailers', 'Discover how leveraging customer data can transform your retail business.', '<h2>Data-Driven Retail</h2><p>In today competitive Lagos market...</p>', 'Data', 'Chioma Nwosu', true, 4);

INSERT INTO career_openings (title, department, type, location, description, requirements, salary_range, status) VALUES
('Senior Business Analyst', 'Strategy', 'Full-time', 'Lagos, Nigeria', 'We are looking for an experienced Business Analyst.', ARRAY['5+ years experience', 'Strong analytical skills'], '₦500,000 - ₦800,000/month', true),
('Digital Transformation Consultant', 'Technology', 'Full-time', 'Lagos, Nigeria', 'Join our digital transformation team.', ARRAY['4+ years experience', 'Knowledge of ERP systems'], '₦600,000 - ₦1,000,000/month', true);

INSERT INTO services (title, short_description, full_description, icon, features, color, "order") VALUES
('Business Intelligence & Data Analytics', 'Transform your data into actionable insights', 'Our BI services help you make data-driven decisions.', 'BarChart', ARRAY['Data visualization', 'Dashboards'], '#22C55E', 1),
('Digital Transformation', 'Modernize your technology infrastructure', 'End-to-end digital transformation consulting.', 'Monitor', ARRAY['Cloud migration', 'Automation'], '#7B1F7B', 2);

PRINT 'SQ Consulting Database Setup Complete!';
```

---

## Next Steps

1. **Run the SQL script** in Supabase SQL Editor
2. **Create your admin user** in Supabase Authentication
3. **Switch to Code mode** to implement the frontend changes
