"use client";

import { useContext, useState, useEffect } from "react";
import { ProfileContext } from "@/contexts/ProfileContext";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/useToast";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import {
  FaGithub,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa";
import {
  sendContactEmail,
  checkRateLimit,
  type ContactFormData,
} from "@/utils/emailService";
import Link from "next/link";

/**
 * ContactPage Component - Trang liên hệ
 * Hiển thị: Thông tin liên hệ, form gửi tin nhắn, mạng xã hội, bản đồ
 */
export default function ContactPage() {
  const profileContext = useContext(ProfileContext);
  const t = useTranslations();
  const toast = useToast();
  const { profileData, loading } = profileContext || {};
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  }); // State cho email sending
  const [isSubmitting, setIsSubmitting] = useState(false);
  // TODO: Implement form validation errors display
  // const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Smooth scroll to top when component mounts (user navigated here)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Header Loading */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl lg:rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4 mx-auto"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-6 mx-auto"></div>
        </div>

        {/* Content Loading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info Loading */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Loading */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-300 dark:bg-gray-700 rounded"
                ></div>
              ))}
              <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { email, phone, address, socialLinks } = profileData || {};

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra rate limit
    const rateLimitResult = checkRateLimit();
    if (!rateLimitResult.allowed) {
      toast.contact.rateLimit(rateLimitResult.timeLeft || 0);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(formData as ContactFormData);

      if (result.success) {
        toast.contact.messageSent();
        // Reset form on success
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // Hiển thị error message cụ thể từ server
        if (result.message.includes("cấu hình")) {
          toast.contact.configError();
        } else if (result.message.includes("kết nối")) {
          toast.contact.networkError();
        } else {
          toast.contact.validationError(result.message);
        }
      }
    } catch (error) {
      console.error("Error sending contact email:", error);
      toast.contact.unexpectedError();
    } finally {
      setIsSubmitting(false);
    }
  };
  const socialIcons = [
    {
      name: "Website",
      url: socialLinks?.website,
      icon: FaGlobe,
      color: "text-green-600 hover:text-green-800",
    },
    {
      name: "GitHub",
      url: socialLinks?.github,
      icon: FaGithub,
      color: "text-gray-700 hover:text-gray-900",
    },
    {
      name: "Facebook",
      url: socialLinks?.facebook,
      icon: FaFacebook,
      color: "text-blue-600 hover:text-blue-800",
    },
    {
      name: "LinkedIn",
      url: socialLinks?.linkedin,
      icon: FaLinkedin,
      color: "text-blue-700 hover:text-blue-900",
    },
    {
      name: "Twitter",
      url: socialLinks?.twitter,
      icon: FaTwitter,
      color: "text-blue-400 hover:text-blue-600",
    },
  ];

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 dark:from-blue-400/5 dark:to-purple-400/5"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/20 dark:bg-blue-400/10 rounded-full blur-3xl"></div>

        <div className="relative text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("pages.contact.title")}
              </span>
              <span className="block mt-2">
                {t("pages.contact.getInTouch")}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("pages.contact.responseTime")}
            </p>
          </div>

          {/* Quick Contact Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-500" />
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {t("pages.contact.fastResponse")}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                {t("pages.contact.fastResponseDesc")}
              </p>
            </div>

            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <UserIcon className="w-6 h-6 text-green-500" />
                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                  {t("pages.contact.personalSupport")}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                {t("pages.contact.personalSupportDesc")}
              </p>
            </div>

            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <SparklesIcon className="w-6 h-6 text-purple-500" />
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                  {t("pages.contact.creativeIdeas")}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                {t("pages.contact.creativeIdeasDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Contact Information */}
        <section className="lg:col-span-2 space-y-6 lg:space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                {t("pages.contact.contactInfo")}
              </h2>
            </div>

            <div className="space-y-6">
              <div className="group flex items-center space-x-4 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg lg:rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg lg:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <EnvelopeIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {t("pages.contact.email")}
                  </h3>
                  <Link
                    href={`mailto:${email}`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors truncate block"
                  >
                    {email}
                  </Link>
                </div>
              </div>

              <div className="group flex items-center space-x-4 p-4 bg-green-50/50 dark:bg-green-900/10 rounded-lg lg:rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg lg:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PhoneIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {t("pages.contact.phone")}
                  </h3>
                  <Link
                    href={`tel:${phone}`}
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                  >
                    {phone}
                  </Link>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-4 bg-red-50/50 dark:bg-red-900/10 rounded-lg lg:rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg lg:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPinIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {t("pages.contact.address")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {address?.short}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                {t("pages.contact.socialLinks")}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {socialIcons
                .filter((social) => social.url)
                .map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg lg:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105 ${social.color}`}
                    >
                      <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{social.name}</span>
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-6 lg:mb-8">
              <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                {t("pages.contact.sendMessage")}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("pages.contact.name")} {t("pages.contact.requiredField")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
                    placeholder={t("pages.contact.namePlaceholder")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("pages.contact.email")}
                    {t("pages.contact.requiredField")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
                    placeholder={t("pages.contact.emailPlaceholder")}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t("pages.contact.subject")}
                  {t("pages.contact.requiredField")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
                  placeholder={t("pages.contact.subjectPlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t("pages.contact.message")}
                  {t("pages.contact.requiredField")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
                  placeholder={t("pages.contact.messagePlaceholder")}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-semibold py-3 lg:py-4 px-6 rounded-lg lg:rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg focus-ring ${
                  isSubmitting
                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:-translate-y-0.5"
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t("pages.contact.sending")}</span>
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-5 h-5" />
                    <span>{t("pages.contact.send")}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* Google Maps */}
      {address?.mapUrl && (
        <section className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6 lg:mb-8">
            <div className="w-2 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
              {t("pages.contact.location")}
            </h2>
          </div>

          <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg lg:rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={address.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg lg:rounded-xl"
              title={t("pages.contact.mapTitle")}
            />
          </div>

          <div className="mt-6 p-4 lg:p-6 bg-red-50/50 dark:bg-red-900/10 rounded-lg lg:rounded-xl border border-red-100 dark:border-red-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-red-600 dark:text-red-400">
                {t("pages.contact.fullAddress")}&nbsp;
              </strong>
              {address.full}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
