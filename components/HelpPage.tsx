"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Search, MessageCircle, Mail, Phone, Book, Video, Users, Settings, CreditCard, Shield, LucideIcon } from "lucide-react";
import { ThemeToggle } from "./ui/themeToggle";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, buttonVariants } from "@/components/ui/button";


// Interfaces
interface HelpCategory {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface FAQ {
  question: string;
  answer: string;
}

interface FAQData {
  [key: string]: FAQ[];
}

interface ContactMethod {
  icon: LucideIcon;
  title: string;
  description: string;
  action: string;
  available: string;
}

const HelpPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("getting-started");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const helpCategories: HelpCategory[] = [
    { id: "getting-started", label: "Getting Started", icon: Book },
    { id: "courses", label: "Courses & Learning", icon: Video },
    { id: "account", label: "Account Management", icon: Users },
    { id: "technical", label: "Technical Support", icon: Settings },
    { id: "billing", label: "Billing & Payments", icon: CreditCard },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
  ];

  const faqData: FAQData = {
    "getting-started": [
      {
        question: "How do I create an account?",
        answer:
          'Click the "Sign Up" button in the top right corner, fill in your details, and verify your email address.',
      },
      {
        question: "How do I navigate the platform?",
        answer:
          "Use the main navigation menu to access your dashboard, browse courses, and manage your profile.",
      },
    ],
    courses: [],
    account: [],
    technical: [],
    billing: [],
    privacy: [],
  };

  const contactMethods: ContactMethod[] = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "Available 24/7",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      available: "Response within 2 hours",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with a specialist",
      action: "Call Now",
      available: "Mon-Fri 9AM-6PM",
    },
  ];

  const filteredFAQs =
    faqData[activeCategory]?.filter(
      (faq: FAQ) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-gray-900">
      <Link
        href="/dashboard"
        className={buttonVariants({
          variant: "outline",
          className: "mb-6 flex items-center gap-2"
        })}
      >
        <ArrowLeft className="size-4" />
        <span>Go Back</span>
      </Link>

      {/* ================= HEADER WITH THEME TOGGLE ================= */}
      <div className="bg-white dark:bg-black shadow-sm border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="absolute top-6 right-6 z-50">
            <ThemeToggle />
          </div>

        </div>

        {/* CENTER TITLE */}
        <div className="text-center pb-8 px-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to your questions, learn how to use our platform, or get in touch with our support team
          </p>

          {/* SEARCH BAR */}
          <div className="max-w-2xl mx-auto mt-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-700 rounded-xl 
              bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-400 
              focus:ring-2 focus:ring-blue-500 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* ================= END HEADER ================= */}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-black rounded-xl shadow-sm p-6 sticky top-8 border dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Help Topics</h2>
              <nav className="space-y-2">
                {helpCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${activeCategory === category.id
                          ? "bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-400 border-l-4 border-blue-500"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{category.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-black rounded-xl shadow-sm p-8 border dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {helpCategories.find((c) => c.id === activeCategory)?.label}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Frequently asked questions and helpful information
              </p>

              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    >
                      <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                      {expandedFAQ === index ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT SECTION */}
            <div className="mt-8 bg-white dark:bg-black rounded-xl shadow-sm p-8 border dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Still need help?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index} className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-gray-800 rounded-full mb-4">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{method.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{method.description}</p>
                      <p className="text-xs text-gray-500 mb-4">{method.available}</p>
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        {method.action}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
