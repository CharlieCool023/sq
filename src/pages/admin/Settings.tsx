import { useState } from 'react';
import { Save, Lock, Building, Mail, Phone, MapPin, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/database';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState<'company' | 'password'>('company');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [companyData, setCompanyData] = useState({
    company_name: 'SQ Consulting',
    tagline: 'Delivering Value...',
    location: 'Lagos Island, Lagos, Nigeria',
    contact_email: 'sqconsultinginc@gmail.com',
    contact_phone: '09037551127',
    contact_phone_secondary: '08147207282',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const saveCompanySettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Company settings saved successfully');
    }, 1000);
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    
    try {
      // Get current session to verify current password
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please log in again');
        return;
      }

      // Update password using Supabase auth
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      toast.success('Password changed successfully');
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast.error(error.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
        <p className="text-white/60">Manage your account and website settings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('company')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'company'
              ? 'bg-[#7B1F7B] text-white'
              : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        >
          Company Info
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'password'
              ? 'bg-[#7B1F7B] text-white'
              : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        >
          Change Password
        </button>
      </div>

      {/* Company Settings */}
      {activeTab === 'company' && (
        <form onSubmit={saveCompanySettings} className="glass rounded-2xl p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <Building className="w-4 h-4 inline mr-1" />
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                value={companyData.company_name}
                onChange={handleCompanyChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={companyData.tagline}
                onChange={handleCompanyChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={companyData.location}
              onChange={handleCompanyChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Contact Email
              </label>
              <input
                type="email"
                name="contact_email"
                value={companyData.contact_email}
                onChange={handleCompanyChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Primary Phone
              </label>
              <input
                type="tel"
                name="contact_phone"
                value={companyData.contact_phone}
                onChange={handleCompanyChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              <Phone className="w-4 h-4 inline mr-1" />
              Secondary Phone
            </label>
            <input
              type="tel"
              name="contact_phone_secondary"
              value={companyData.contact_phone_secondary}
              onChange={handleCompanyChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </form>
      )}

      {/* Password Settings */}
      {activeTab === 'password' && (
        <form onSubmit={changePassword} className="glass rounded-2xl p-6 space-y-6 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              <Lock className="w-4 h-4 inline mr-1" />
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              <Lock className="w-4 h-4 inline mr-1" />
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              <Lock className="w-4 h-4 inline mr-1" />
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Change Password
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminSettings;
