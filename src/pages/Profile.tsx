import React, { useState, useRef } from 'react';
import { User, Camera, Upload, X, AlertTriangle } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  studentId: string;
  department: string;
  semester: number;
  profilePicture?: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Team Avengers',
    email: 'AsyncAvenger@gmail.com',
    studentId: '2023001',
    department: 'Computer Science',
    semester: 3,
    profilePicture: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should not exceed 5MB');
        return;
      }

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.[0]) return;

    try {
      setLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('profilePicture', fileInputRef.current.files[0]);

      const response = await fetch('http://localhost:5000/api/profile/upload-picture', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload profile picture');
      }

      const data = await response.json();
      
      // Update profile with new picture URL
      setProfile(prev => ({
        ...prev,
        profilePicture: data.filePath
      }));

      // Clear file input and preview
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setPreviewUrl('');
    } catch (err: any) {
      setError(err.message || 'Failed to upload profile picture');
    } finally {
      setLoading(false);
    }
  };

  const removeProfilePicture = async () => {
    try {
      if (profile.profilePicture) {
        // If you want to delete the file from the server, you would need to make another API call here
        // For now, we'll just update the UI
        setProfile(prev => ({
          ...prev,
          profilePicture: ''
        }));
      }
      setPreviewUrl('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      setError(err.message || 'Failed to remove profile picture');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 dark:bg-blue-700 px-6 py-8 text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white dark:bg-gray-800 border-4 border-white dark:border-gray-800 shadow-lg">
                {profile.profilePicture || previewUrl ? (
                  <img
                    src={profile.profilePicture ? `http://localhost:5000${profile.profilePicture}` : previewUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <User className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-blue-500 dark:bg-blue-600 text-white rounded-full p-2 shadow-lg hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8">
            {error && (
              <div className="mb-6 p-4 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}

            {/* Upload Controls */}
            {(previewUrl || profile.profilePicture) && (
              <div className="mb-6 flex space-x-4">
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? (
                    'Uploading...'
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Picture
                    </>
                  )}
                </button>
                <button
                  onClick={removeProfilePicture}
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </button>
              </div>
            )}

            {/* Profile Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">{profile.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">{profile.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Student ID</label>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">{profile.studentId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">{profile.department}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Semester</label>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">{profile.semester}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 