import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { supabase } from '@/lib/database';

const categories = ['Finance', 'Data', 'Strategy', 'Operations', 'Technology', 'Design'];

const AdminBlogEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Finance',
    author: 'Oluwaseun Adeyemi',
    excerpt: '',
    content: '',
    coverImage: '',
    published: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Initialize Quill editor
  const { quill, quillRef: editorRef } = useQuill({
    theme: 'snow',
    placeholder: 'Write your blog post content here...',
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'image'],
        ['clean'],
      ],
    },
  });

  useEffect(() => {
    if (isEditing && id) {
      // Load post data from Supabase
      const fetchPost = async () => {
        try {
          const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single();
          
          if (error) throw error;
          
          if (data) {
            setFormData({
              title: data.title || '',
              slug: data.slug || '',
              category: data.category || 'Finance',
              author: data.author || 'Oluwaseun Adeyemi',
              excerpt: data.excerpt || '',
              content: data.content || '',
              coverImage: data.cover_image || '',
              published: data.published || false,
            });
          }
        } catch (error) {
          console.error('Error fetching post:', error);
          toast.error('Failed to load post');
        }
      };
      
      fetchPost();
    }
  }, [isEditing, id]);

  // Update Quill content when formData.content changes
  useEffect(() => {
    if (quill && formData.content && quill.root.innerHTML !== formData.content) {
      quill.root.innerHTML = formData.content;
    }
  }, [quill, formData.content]);

  // Listen for Quill text changes
  useEffect(() => {
    if (quill) {
      const handleTextChange = () => {
        setFormData(prev => ({
          ...prev,
          content: quill.root.innerHTML,
        }));
      };
      
      quill.on('text-change', handleTextChange);
      return () => {
        quill.off('text-change', handleTextChange);
      };
    }
  }, [quill]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleImageUpload = () => {
    // Mock image upload - in production, this would upload to a server
    const mockImages = [
      '/images/blog-finance.jpg',
      '/images/blog-tech.jpg',
      '/images/blog-leadership.jpg',
      '/images/success-story.jpg',
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setFormData(prev => ({ ...prev, coverImage: randomImage }));
    toast.success('Image selected successfully');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const postData = {
        title: formData.title,
        slug: formData.slug,
        category: formData.category,
        author: formData.author,
        excerpt: formData.excerpt,
        content: formData.content,
        cover_image: formData.coverImage,
        published: formData.published,
        updated_at: new Date().toISOString(),
      };

      if (isEditing && id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);
        
        if (error) throw error;
        toast.success('Post updated successfully');
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData])
          .select()
          .single();
        
        if (error) throw error;
        toast.success('Post created successfully');
      }
      
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/blog"
          className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {isEditing ? 'Edit Post' : 'New Post'}
          </h1>
          <p className="text-white/60">
            {isEditing ? 'Update your blog post' : 'Create a new blog post'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-2xl p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                  placeholder="Enter post title"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                  placeholder="post-url-slug"
                  required
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all resize-none"
                  placeholder="Brief summary of the post"
                  required
                />
              </div>

              {/* Rich Text Content */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Content
                </label>
                <div className="bg-white rounded-lg overflow-hidden">
                  <div ref={editorRef} className="min-h-[400px] text-gray-900" />
                </div>
                <style>{`
                  .ql-toolbar {
                    background-color: #f8f9fa;
                    border-color: #e2e8f0 !important;
                  }
                  .ql-container {
                    border-color: #e2e8f0 !important;
                    font-size: 16px;
                  }
                  .ql-editor {
                    min-height: 350px;
                  }
                  .ql-editor p {
                    margin-bottom: 0.75rem;
                  }
                  .ql-editor h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 1.5rem 0 1rem;
                  }
                  .ql-editor h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin: 1.25rem 0 0.75rem;
                  }
                  .ql-editor ul, .ql-editor ol {
                    margin: 1rem 0;
                    padding-left: 1.5rem;
                  }
                  .ql-editor li {
                    margin-bottom: 0.5rem;
                  }
                `}</style>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="glass rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white">Publish Settings</h3>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#7B1F7B] transition-all"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-[#2D2D3A]">{cat}</option>
                  ))}
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                  required
                />
              </div>

              {/* Published Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="published"
                  id="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-[#7B1F7B] focus:ring-[#7B1F7B]"
                />
                <label htmlFor="published" className="text-white/80">
                  Publish immediately
                </label>
              </div>
            </div>

            {/* Cover Image */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Cover Image</h3>
              {formData.coverImage ? (
                <div className="relative rounded-lg overflow-hidden mb-4">
                  <img
                    src={formData.coverImage}
                    alt="Cover"
                    className="w-full h-40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/80 text-white flex items-center justify-center hover:bg-red-500"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="w-full border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-[#7B1F7B] transition-colors"
                >
                  <ImageIcon className="w-8 h-8 text-white/40 mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Click to select image</p>
                  <p className="text-white/40 text-xs mt-1">Recommended: 1200x800px</p>
                </button>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {isEditing ? 'Update Post' : 'Create Post'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogEdit;
