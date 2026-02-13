import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/lib/database';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  published: boolean;
  created_at: string;
}

const AdminBlog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, author, category, published, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      setPosts(posts.map(post => 
        post.id === id ? { ...post, published: !currentStatus } : post
      ));
      toast.success(`Post ${!currentStatus ? 'published' : 'unpublished'} successfully`);
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post status');
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPosts(posts.filter(post => post.id !== id));
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Blog Posts</h1>
          <p className="text-white/60">Manage your blog content</p>
        </div>
        <Link
          to="/admin/blog/new"
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Post
        </Link>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-white/60 font-medium">Title</th>
                <th className="text-left px-6 py-4 text-white/60 font-medium">Author</th>
                <th className="text-left px-6 py-4 text-white/60 font-medium">Category</th>
                <th className="text-left px-6 py-4 text-white/60 font-medium">Status</th>
                <th className="text-left px-6 py-4 text-white/60 font-medium">Date</th>
                <th className="text-right px-6 py-4 text-white/60 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{post.title}</span>
                  </td>
                  <td className="px-6 py-4 text-white/70">{post.author}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#7B1F7B]/20 rounded text-[#F47B20] text-xs">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(post.id, post.published)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        post.published
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-yellow-500/20 text-yellow-500'
                      }`}
                    >
                      {post.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {post.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-white/60 text-sm">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/blog/edit/${post.id}`}
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#7B1F7B] hover:text-white transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-red-500 hover:text-white transition-colors"
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

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/40">No posts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;
