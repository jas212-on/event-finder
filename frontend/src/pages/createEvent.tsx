import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Image, Type, FileText, Tag, ArrowLeft, Loader } from 'lucide-react';
import { useNavigate } from 'react-router';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

interface Eventdata {
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  time: string;
  totalParticipants: string;
}

interface ImageFile {
  file: File | null;
  preview: string;
}

const AddEventForm: React.FC = () => {
  const [data, setdata] = useState<Eventdata>({
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    time: '',
    totalParticipants: '',
  });

  const [imageFile, setImageFile] = useState<ImageFile>({
    file: null,
    preview: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = ['Music', 'Technology', 'Art', 'Food', 'Sports', 'Business', 'Education', 'Entertainment'];

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setdata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImageFile({
        file: file,
        preview: previewUrl
      });
    }
  };

  const handleSubmit = async () => {
  
    try {
      setIsSubmitted(true)
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("location", data.location);
      formData.append("date", data.date);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("time", data.time);
      formData.append("maxParticipants", data.totalParticipants);
      formData.append("imageFile", imageFile.file as Blob);
      await axiosInstance.post("/add-event", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Event added successfully");
      setdata({
        title: '',
        description: '',
        category: '',
        location: '',
        date: '',
        time: '',
        totalParticipants: '',
      });
      // Clear image preview
      if (imageFile.preview) {
        URL.revokeObjectURL(imageFile.preview);
      }
      setImageFile({ file: null, preview: '' });
      navigate("/")
    } catch (error) {
      toast.error("Fill in all details");
      console.log("Error", error)
    } finally{
      setIsSubmitted(false)
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Navigation */}
        <button onClick={()=>navigate("/")} className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors duration-300 group mb-8">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-semibold">Back to Events</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Create New Event
          </h1>
          <p className="text-xl text-purple-200">
            Share your event with the community
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="space-y-6">
              {/* Title */}
              <div className="group">
                <label className="flex items-center gap-2 text-white font-semibold mb-3 text-lg">
                  <Type className="w-5 h-5 text-purple-300" />
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Category and Organizer Row */}
              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-3 text-lg">
                    <Tag className="w-5 h-5 text-purple-300" />
                    Category
                  </label>
                  <select
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" className="bg-purple-900">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-purple-900">{cat}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-3 text-lg">
                  <FileText className="w-5 h-5 text-purple-300" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe your event in detail..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>

              {/* Date and Time Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-3 text-lg">
                    <Calendar className="w-5 h-5 text-purple-300" />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={data.date}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-3 text-lg">
                    <Clock className="w-5 h-5 text-purple-300" />
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={data.time}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-3 text-lg">
                  <MapPin className="w-5 h-5 text-purple-300" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={data.location}
                  onChange={handleChange}
                  placeholder="Event venue or address"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Participants and Price Row */}
              <div className="grid md:grid-cols-1 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-3 text-lg">
                    <Users className="w-5 h-5 text-purple-300" />
                    Total Participants
                  </label>
                  <input
                    type="number"
                    name="totalParticipants"
                    value={data.totalParticipants}
                    onChange={handleChange}
                    min="1"
                    placeholder="Maximum capacity"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

              </div>

              {/* Image Upload */}
              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-3 text-lg">
                  <Image className="w-5 h-5 text-purple-300" />
                  Event Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="w-full bg-white/10 border-2 border-dashed border-white/30 rounded-xl px-5 py-8 text-white hover:border-purple-400 hover:bg-white/15 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-3"
                  >
                    {imageFile.preview ? (
                      <div className="relative w-full">
                        <img
                          src={imageFile.preview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                          <span className="text-white font-semibold">Click to change image</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="bg-purple-500/30 p-4 rounded-full">
                          <Image className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-center">
                          <p className="text-purple-200 font-semibold mb-1">Click to upload image</p>
                          <p className="text-purple-300 text-sm">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                  className="w-full py-5 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-purple-500/50 hover:shadow-purple-500/70"
                >
                  {isSubmitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader className="animate-spin w-6 h-6" />
                      Uploading Event
                    </span>
                  ) : (
                    'Create Event'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventForm;