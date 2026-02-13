import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/database';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  type: string;
  is_active: boolean;
  display_order: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

const AdminBanners = () => {
  const [bannerList, setBannerList] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('id, title, subtitle, description, image_url, button_text, button_link, type, is_active, display_order, start_date, end_date, created_at')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setBannerList(data || []);
    } catch (error) {
      console.error('Error fetching banners:', error);
      // Don't show error toast - may be RLS issue
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('banners')
        .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      setBannerList(bannerList.map(banner => 
        banner.id === id ? { ...banner, is_active: !currentStatus } : banner
      ));
      toast.success(`Banner ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      console.error('Error updating banner:', error);
      toast.error('Failed to update banner');
    }
  };

  const deleteBanner = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;

    try {
      const { error } = await supabase
        .from('banners')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBannerList(bannerList.filter(banner => banner.id !== id));
      toast.success('Banner deleted successfully');
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error('Failed to delete banner');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#F47B20] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Banners</h1>
          <p className="text-white/60">Manage homepage banners and promotional content</p>
        </div>
        <Link to="/admin/banners/new" className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Banner
        </Link>
      </div>

      {bannerList.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <ImageIcon className="w-12 h-12 text-white/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No banners yet</h3>
          <p className="text-white/60 mb-6">Create your first banner to showcase on the homepage</p>
          <Link to="/admin/banners/new" className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Banner
          </Link>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 font-medium">Order</th>
                <th className="text-left p-4 text-white/60 font-medium">Banner</th>
                <th className="text-left p-4 text-white/60 font-medium">Type</th>
                <th className="text-left p-4 text-white/60 font-medium">Status</th>
                <th className="text-right p-4 text-white/60 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bannerList.map((banner) => (
                <tr key={banner.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 text-white">{banner.display_order}</td>
                  <td className="p-4">
                    <div>
                      <h4 className="text-white font-medium">{banner.title}</h4>
                      {banner.subtitle && <p className="text-white/60 text-sm">{banner.subtitle}</p>}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-[#7B1F7B]/20 rounded text-[#F47B20] text-xs capitalize">
                      {banner.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(banner.id, banner.is_active)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        banner.is_active 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {banner.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/banners/${banner.id}`}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => deleteBanner(banner.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-white/60 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBanners;
