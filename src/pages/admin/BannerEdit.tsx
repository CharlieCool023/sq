import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Image as ImageIcon, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/database';

const AdminBannerEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image_url: '',
    button_text: '',
    button_link: '',
    type: 'promo',
    is_active: true,
    display_order: 1,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && id) {
      // Load banner data from Supabase
      const fetchBanner = async () => {
        try {
          const { data, error } = await supabase
            .from('banners')
            .select('*')
            .eq('id', id)
            .single();
          
          if (error) throw error;
          
          if (data) {
            setFormData({
              title: data.title || '',
              subtitle: data.subtitle || '',
              description: data.description || '',
              image_url: data.image_url || '',
              button_text: data.button_text || '',
              button_link: data.button_link || '',
              type: data.type || 'promo',
              is_active: data.is_active ?? true,
              display_order: data.display_order ?? 1,
            });
            if (data.image_url) {
              setImagePreview(data.image_url);
            }
          }
        } catch (error) {
          console.error('Error fetching banner:', error);
          toast.error('Failed to load banner');
        }
      };
      
      fetchBanner();
    }
  }, [isEditing, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file only');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setFormData(prev => ({ ...prev, image_url: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData(prev => ({ ...prev, image_url: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const bannerData = {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        image_url: formData.image_url,
        button_text: formData.button_text,
        button_link: formData.button_link,
        type: formData.type,
        is_active: formData.is_active,
        display_order: formData.display_order,
        updated_at: new Date().toISOString(),
      };

      if (isEditing && id) {
        const { error } = await supabase
          .from('banners')
          .update(bannerData)
          .eq('id', id);
        
        if (error) throw error;
        toast.success('Banner updated successfully');
      } else {
        const { error } = await supabase
          .from('banners')
          .insert([bannerData])
          .select()
          .single();
        
        if (error) throw error;
        toast.success('Banner created successfully');
      }
      
      navigate('/admin/banners');
    } catch (error) {
      console.error('Error saving banner:', error);
      toast.error('Failed to save banner. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/banners"
          className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {isEditing ? 'Edit Banner' : 'New Banner'}
          </h1>
          <p className="text-white/60">
            {isEditing ? 'Update banner details' : 'Create a new promotional banner'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Banner Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                  placeholder="Enter banner title"
                  required
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                  placeholder="Enter subtitle"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all resize-none"
                  placeholder="Brief description of the promotion"
                />
              </div>

              {/* Button Text */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  name="button_text"
                  value={formData.button_text}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                  placeholder="e.g., Get Started"
                />
              </div>

              {/* Button Link */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Button Link
                </label>
                <input
                  type="text"
                  name="button_link"
                  value={formData.button_link}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                  placeholder="e.g., /contact or https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <div className="glass rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white">Display Settings</h3>

              {/* Display Order */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="display_order"
                  value={formData.display_order}
                  onChange={handleChange}
                  min={1}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Banner Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#7B1F7B] transition-all"
                >
                  <option value="promo" className="bg-[#2D2D3A]">Promotion</option>
                  <option value="announcement" className="bg-[#2D2D3A]">Announcement</option>
                  <option value="cta" className="bg-[#2D2D3A]">Call to Action</option>
                </select>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="is_active"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-[#7B1F7B] focus:ring-[#7B1F7B]"
                />
                <label htmlFor="is_active" className="text-white/80">
                  Banner is active
                </label>
              </div>
            </div>

            {/* Image */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Banner Image</h3>
              
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragging 
                      ? 'border-[#7B1F7B] bg-[#7B1F7B]/10' 
                      : 'border-white/20 hover:border-[#7B1F7B]'
                  }`}
                >
                  <Upload className="w-8 h-8 text-white/40 mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Click to upload or drag and drop</p>
                  <p className="text-white/40 text-xs mt-1">Images only • Recommended: 400x300px</p>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary py-4 px-8 flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {isEditing ? 'Update Banner' : 'Create Banner'}
              </>
            )}
          </button>
          <Link
            to="/admin/banners"
            className="px-8 py-4 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminBannerEdit;
