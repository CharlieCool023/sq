import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

const employmentTypes = ['Full-time', 'Contract', 'Internship', 'Part-time'];

const AdminCareerEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    type: 'Full-time',
    location: '',
    description: '',
    requirements: [''] as string[],
    salary_range: '',
    status: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      // Load job data (mock)
      setFormData({
        title: 'Senior Business Analyst',
        department: 'Strategy',
        type: 'Full-time',
        location: 'Lagos, Nigeria',
        description: 'We are looking for an experienced Business Analyst...',
        requirements: [
          '5+ years of experience in business analysis',
          'Strong analytical and problem-solving skills',
          'Experience with data visualization tools',
        ],
        salary_range: '₦500,000 - ₦800,000/month',
        status: true,
      });
    }
  }, [isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, ''],
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req),
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(isEditing ? 'Job updated successfully' : 'Job posted successfully');
      navigate('/admin/careers');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/careers"
          className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {isEditing ? 'Edit Job' : 'Post New Job'}
          </h1>
          <p className="text-white/60">
            {isEditing ? 'Update job posting details' : 'Create a new job posting'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass rounded-2xl p-6 space-y-6">
          {/* Title & Department */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                placeholder="e.g., Senior Business Analyst"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                placeholder="e.g., Strategy"
                required
              />
            </div>
          </div>

          {/* Type & Location */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Employment Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#7B1F7B] transition-all"
              >
                {employmentTypes.map(type => (
                  <option key={type} value={type} className="bg-[#2D2D3A]">{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                placeholder="e.g., Lagos, Nigeria"
                required
              />
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Salary Range (Optional)
            </label>
            <input
              type="text"
              name="salary_range"
              value={formData.salary_range}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
              placeholder="e.g., ₦500,000 - ₦800,000/month"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Job Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all resize-none"
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              required
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Requirements
            </label>
            <div className="space-y-3">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#7B1F7B] transition-all"
                    placeholder={`Requirement ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addRequirement}
              className="mt-3 flex items-center gap-2 text-[#F47B20] hover:underline"
            >
              <Plus className="w-4 h-4" />
              Add Requirement
            </button>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="status"
              id="status"
              checked={formData.status}
              onChange={handleChange}
              className="w-5 h-5 rounded border-white/20 bg-white/5 text-[#7B1F7B] focus:ring-[#7B1F7B]"
            />
            <label htmlFor="status" className="text-white/80">
              Job is active and accepting applications
            </label>
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
                {isEditing ? 'Update Job' : 'Post Job'}
              </>
            )}
          </button>
          <Link
            to="/admin/careers"
            className="px-8 py-4 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminCareerEdit;
