/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useId } from 'react';
import {
  Code,
  FileText,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Sparkles,
  User,
  Heart,
  BookOpen,
  Send,
  Eye,
  Settings2,
  Check,
  Laptop,
  GraduationCap,
  Info,
  Layers,
  Share2,
  RotateCcw,
  Plus,
  Trash2,
} from 'lucide-react';
import {
  defaultProfile,
  assignmentCriteria,
  generateIndexHtmlCode,
  StudentProfile,
} from './homeworkData';

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'editor' | 'submission'>('preview');
  const [previewMode, setPreviewMode] = useState<'classic' | 'modern'>('classic');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedDescription, setCopiedDescription] = useState(false);
  const [copiedName, setCopiedName] = useState(false);
  const [newHobby, setNewHobby] = useState('');
  const [showTagBadges, setShowTagBadges] = useState(true);

  const newHobbyInputId = useId();
  const indexHtmlCode = generateIndexHtmlCode(profile);
  const liveUrl = window.location.href;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(indexHtmlCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch {
      // fallback
      const textArea = document.createElement('textarea');
      textArea.value = indexHtmlCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleDownloadIndexHtml = () => {
    const blob = new Blob([indexHtmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(liveUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyText = async (text: string, setCopiedState: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2500);
    } catch {
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2500);
    }
  };

  const handleResetProfile = () => {
    setProfile(defaultProfile);
  };

  const handleAddHobby = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHobby.trim()) return;
    setProfile((prev) => ({
      ...prev,
      hobbies: [...prev.hobbies, newHobby.trim()],
    }));
    setNewHobby('');
  };

  const handleRemoveHobby = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((_, i) => i !== index),
    }));
  };

  const submissionDescription = `Bu web projesi "İlk Web Sayfamızı Oluşturmak" ödevi kapsamında HTML5 standartlarına uygun olarak tasarlanmıştır.

1. Ad ve Soyad Başlığı: Sayfa açıldığında ana başlık olarak <h1>${profile.fullName}</h1> etiketi kullanılmıştır.
2. 'Hakkımda' Alt Başlığı: İsim başlığının hemen altına <h2>Hakkımda</h2> alt başlığı eklenmiştir.
3. Neler Yaptığı ve Hoşlandıkları: <p> etiketleri içerisinde neler yaptığım, hedeflerim ve <ul>, <li> etiketleri ile ilgi alanlarım ve hobilerim listelenmiştir.
4. Dosya Adı: Proje standart web kuralına uygun biçimde 'index.html' olarak isimlendirilmiş ve kodlanmıştır.
5. Yorum Satırları: Kodların her bir adımı ve kullanılan HTML etiketlerinin amacı açıklayıcı <!-- Yorum --> satırlarıyla belgelenmiştir.`;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Banner & Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
              &lt;/&gt;
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  İlk Web Sayfamızı Oluşturmak
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ödev Tamamlandı
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Geliştirici: <span className="text-indigo-400 font-medium">{profile.fullName}</span> • Dosya: <span className="font-mono text-amber-300">index.html</span>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadIndexHtml}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
              title="index.html dosyasını bilgisayarına indir"
            >
              <Download className="w-3.5 h-3.5" />
              <span>index.html İndir</span>
            </button>

            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
              title="Tüm HTML kodunu kopyala"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>

            <button
              onClick={() => setActiveTab('submission')}
              className="px-3 py-1.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ödev Teslim Formu</span>
              <span className="sm:hidden">Teslim</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 flex items-center justify-between overflow-x-auto">
          <nav className="flex space-x-1 sm:space-x-3 py-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Eye className="w-4 h-4 text-indigo-400" />
              <span>Canlı Web Sayfası (Önizleme)</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Code className="w-4 h-4 text-emerald-400" />
              <span>index.html Kodu & Yorumlar</span>
            </button>

            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Settings2 className="w-4 h-4 text-amber-400" />
              <span>Bilgileri Düzenle</span>
            </button>

            <button
              onClick={() => setActiveTab('submission')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition cursor-pointer ${
                activeTab === 'submission'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-violet-400" />
              <span>Ödev Teslim Paneli</span>
            </button>
          </nav>

          {/* Criteria Checklist Mini Pill */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>5/5 Kriter Karşılandı</span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6">
        {/* Assignment Checklist Ribbon */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="font-semibold text-slate-200 text-sm">
                Ödev Yönergeleri & Kriter Doğrulaması
              </h2>
            </div>
            <div className="text-xs text-slate-400">
              Tüm kurallar eksiksiz şekilde uygulandı.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {assignmentCriteria.map((item, idx) => (
              <div
                key={item.id}
                className="bg-slate-900/70 border border-slate-700/50 rounded-lg p-2.5 flex items-start gap-2 text-xs"
              >
                <div className="mt-0.5 p-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <div className="font-semibold text-slate-200 flex items-center gap-1">
                    <span>{idx + 1}. {item.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                    {item.description}
                  </div>
                  <span className="inline-block mt-1 font-mono text-[10px] text-indigo-400 bg-indigo-950/60 px-1.5 py-0.2 rounded border border-indigo-800/40">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TAB 1: PREVIEW */}
        {activeTab === 'preview' && (
          <div className="space-y-4">
            {/* View Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/40 p-2 rounded-lg border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Görünüm Modu:</span>
                <div className="inline-flex rounded-lg bg-slate-900 p-1 border border-slate-700">
                  <button
                    onClick={() => setPreviewMode('classic')}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      previewMode === 'classic'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Klasik HTML (Ödev İncelemesi)</span>
                  </button>
                  <button
                    onClick={() => setPreviewMode('modern')}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      previewMode === 'modern'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Modern Portfolyo</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTagBadges}
                    onChange={(e) => setShowTagBadges(e.target.checked)}
                    className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-900"
                  />
                  <span>HTML Etiket Rozetlerini Göster</span>
                </label>
              </div>
            </div>

            {/* CLASSIC HTML MODE */}
            {previewMode === 'classic' ? (
              <div className="bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-300 overflow-hidden">
                {/* Browser Window Chrome */}
                <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                  </div>
                  <div className="bg-white border border-slate-300 rounded-md px-4 py-1 text-xs font-mono text-slate-600 flex items-center gap-2 max-w-md w-full justify-center shadow-xs">
                    <span className="text-slate-400">file:///</span>
                    <span className="font-semibold text-slate-800">index.html</span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">HTML5</div>
                </div>

                {/* Classic Clean Semantic HTML Page */}
                <div className="p-8 sm:p-12 max-w-3xl mx-auto space-y-6 font-serif">
                  {/* Explanatory comment tag simulation */}
                  {showTagBadges && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 p-2.5 rounded text-xs font-mono mb-4 flex items-center gap-2">
                      <Info className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        Ödev Şartı: Aşağıdaki sayfa standart <strong>index.html</strong> dosyasının saf HTML halini simüle eder. Başlıkta ad-soyad, altında 'Hakkımda' alt başlığı, devamında paragraflar ve listeler yer alır.
                      </span>
                    </div>
                  )}

                  {/* 1. Header (Name & Surname) */}
                  <div className="relative group">
                    {showTagBadges && (
                      <span className="absolute -top-3 right-0 text-[10px] font-mono bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200">
                        &lt;h1&gt; (Adınız ve Soyadınız)
                      </span>
                    )}
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight border-b-2 border-slate-200 pb-3">
                      {profile.fullName}
                    </h1>
                  </div>

                  {/* 2. Subheading (Hakkımda) */}
                  <div className="relative group pt-2">
                    {showTagBadges && (
                      <span className="absolute -top-1 right-0 text-[10px] font-mono bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded border border-violet-200">
                        &lt;h2&gt; (Zorunlu Alt Başlık: Hakkımda)
                      </span>
                    )}
                    <h2 className="text-2xl font-semibold text-slate-800">
                      Hakkımda
                    </h2>
                  </div>

                  {/* 3. About Paragraph */}
                  <div className="relative group">
                    {showTagBadges && (
                      <span className="absolute -top-3 right-0 text-[10px] font-mono bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">
                        &lt;p&gt; (Neler Yaptığımı Anlatan Paragraf)
                      </span>
                    )}
                    <p className="text-base text-slate-700 leading-relaxed font-sans">
                      {profile.aboutText}
                    </p>
                  </div>

                  {/* 4. Interests Paragraph */}
                  <div className="relative group">
                    {showTagBadges && (
                      <span className="absolute -top-3 right-0 text-[10px] font-mono bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">
                        &lt;p&gt; (Nelerden Hoşlandığımı Anlatan Paragraf)
                      </span>
                    )}
                    <p className="text-base text-slate-700 leading-relaxed font-sans">
                      {profile.interestsText}
                    </p>
                  </div>

                  {/* 5. Subheading for Hobbies (H3) */}
                  <div className="relative group pt-4">
                    {showTagBadges && (
                      <span className="absolute -top-1 right-0 text-[10px] font-mono bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                        &lt;h3&gt; (İlgi Alanları & Sevdiğim Şeyler)
                      </span>
                    )}
                    <h3 className="text-xl font-medium text-slate-800">
                      Nelerden Hoşlanırım?
                    </h3>
                  </div>

                  {/* 6. Unordered List of Hobbies (UL / LI) */}
                  <div className="relative group">
                    {showTagBadges && (
                      <span className="absolute -top-3 right-0 text-[10px] font-mono bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200">
                        &lt;ul&gt; & &lt;li&gt; (Sırasız Liste)
                      </span>
                    )}
                    <ul className="list-disc list-inside space-y-1.5 text-slate-700 font-sans text-sm sm:text-base pl-2">
                      {profile.hobbies.map((hobby, index) => (
                        <li key={index} className="leading-relaxed">
                          {hobby}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 7. Quote & Footer */}
                  <div className="pt-6 border-t border-slate-200 text-slate-600 font-sans space-y-2">
                    <p className="italic text-slate-600 text-sm">
                      &ldquo;{profile.quote}&rdquo;
                    </p>
                    <p className="text-xs text-slate-500">
                      E-posta: <a href={`mailto:${profile.email}`} className="text-indigo-600 underline">{profile.email}</a>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* MODERN STYLED PORTFOLIO MODE */
              <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 sm:p-10 shadow-xl space-y-8">
                {/* Header profile banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-slate-700/80">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-xl shadow-indigo-500/20 shrink-0">
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-2xl font-bold text-white tracking-wider">
                      {profile.fullName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 3)}
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {profile.fullName}
                      </h1>
                      <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {profile.profession}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">
                      HTML, CSS ve Web Teknolojileri Öğrencisi • İlk Web Sayfam Ödevi
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1 text-xs">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 font-mono">
                        📧 {profile.email}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                        ✓ HTML5 Onaylı
                      </span>
                    </div>
                  </div>
                </div>

                {/* About section card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-700/60 space-y-3">
                      <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
                        <User className="w-4 h-4" />
                        <h2>Hakkımda</h2>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-sm">
                        {profile.aboutText}
                      </p>
                      <p className="text-slate-300 leading-relaxed text-sm pt-2">
                        {profile.interestsText}
                      </p>
                    </div>

                    <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-700/60 space-y-3">
                      <div className="flex items-center gap-2 text-pink-400 font-bold text-base">
                        <Heart className="w-4 h-4" />
                        <h3>Nelerden Hoşlanırım & Hobilerim</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {profile.hobbies.map((h, i) => (
                          <div
                            key={i}
                            className="bg-slate-800/70 border border-slate-700/50 rounded-lg p-3 text-xs text-slate-200 flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0"></span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar card */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-indigo-950/50 to-slate-900/80 rounded-xl p-5 border border-indigo-500/30 space-y-3">
                      <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs tracking-wide uppercase">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Günün Mottosu</span>
                      </div>
                      <blockquote className="text-slate-200 italic text-sm border-l-2 border-indigo-400 pl-3">
                        &ldquo;{profile.quote}&rdquo;
                      </blockquote>
                    </div>

                    <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-700/60 space-y-3">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Ödev Çıktısı
                      </div>
                      <div className="space-y-2 text-xs text-slate-300">
                        <div className="flex justify-between py-1 border-b border-slate-800">
                          <span className="text-slate-400">Dosya:</span>
                          <span className="font-mono text-amber-300 font-semibold">index.html</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800">
                          <span className="text-slate-400">Format:</span>
                          <span className="font-semibold text-slate-200">HTML5</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-400">Kod Yorumları:</span>
                          <span className="text-emerald-400 font-medium">Mevcut (Açıklamalı)</span>
                        </div>
                      </div>
                      <button
                        onClick={handleDownloadIndexHtml}
                        className="w-full mt-2 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>index.html İndir</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CODE VIEW & ANNOTATIONS */}
        {activeTab === 'code' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Code Box */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between bg-slate-800/80 px-4 py-2.5 rounded-t-xl border border-slate-700 border-b-0">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-xs text-slate-200 font-semibold">index.html</span>
                  <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    UTF-8 • Açıklayıcı Yorum Satırları Dahil
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-xs text-slate-200 flex items-center gap-1 transition cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Kopyala</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownloadIndexHtml}
                    className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-xs text-white flex items-center gap-1 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>İndir</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 rounded-b-xl border border-slate-700 p-4 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed shadow-inner max-h-[650px] overflow-y-auto">
                <pre>
                  {indexHtmlCode.split('\n').map((line, idx) => {
                    const isComment = line.trim().startsWith('&lt;!--') || line.trim().startsWith('<!--') || line.includes('-->');
                    const isTag = line.includes('<') && line.includes('>') && !isComment;
                    return (
                      <div key={idx} className="table-row">
                        <span className="table-cell pr-4 text-slate-600 select-none text-right w-8 text-[11px]">
                          {idx + 1}
                        </span>
                        <span
                          className={`table-cell whitespace-pre ${
                            isComment
                              ? 'text-emerald-400 font-sans italic'
                              : isTag
                              ? 'text-sky-300 font-mono'
                              : 'text-slate-200'
                          }`}
                        >
                          {line}
                        </span>
                      </div>
                    );
                  })}
                </pre>
              </div>
            </div>

            {/* Educational HTML Tags Guide */}
            <div className="space-y-4">
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                  <BookOpen className="w-4 h-4" />
                  <h3>Kullanılan HTML Etiketleri Rehberi</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Ödevde kullandığımız her bir etiketin tarayıcıdaki görevi:
                </p>

                <div className="space-y-3 pt-2">
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60 text-xs space-y-1">
                    <div className="font-mono font-bold text-amber-300">&lt;!-- Yorum --&gt;</div>
                    <p className="text-slate-400 text-[11px]">
                      Kodun içerisine açıklama yazmak içindir. Tarayıcıda görünmez, kodları okuyan geliştiricilere rehberlik eder.
                    </p>
                  </div>

                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60 text-xs space-y-1">
                    <div className="font-mono font-bold text-sky-300">&lt;h1&gt;...&lt;/h1&gt;</div>
                    <p className="text-slate-400 text-[11px]">
                      Sayfanın en önemli ana başlığıdır. Ödev kuralı gereği Ad ve Soyad burada yer almalıdır.
                    </p>
                  </div>

                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60 text-xs space-y-1">
                    <div className="font-mono font-bold text-violet-300">&lt;h2&gt;...&lt;/h2&gt;</div>
                    <p className="text-slate-400 text-[11px]">
                      İkinci derece alt başlıktır. Ödev kuralı gereği tam olarak &ldquo;Hakkımda&rdquo; metnini barındırır.
                    </p>
                  </div>

                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60 text-xs space-y-1">
                    <div className="font-mono font-bold text-emerald-300">&lt;p&gt;...&lt;/p&gt;</div>
                    <p className="text-slate-400 text-[11px]">
                      Paragraf etiketidir. Neler yaptığınızı ve nelerden hoşlandığınızı metin olarak aktarmak için kullanılır.
                    </p>
                  </div>

                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60 text-xs space-y-1">
                    <div className="font-mono font-bold text-pink-300">&lt;ul&gt; & &lt;li&gt;</div>
                    <p className="text-slate-400 text-[11px]">
                      Sırasız liste (Unordered List) ve liste elemanları (List Item). Hobilerinizi madde imleri halinde göstermek için en temiz yöntemdir.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-indigo-950/40 border border-indigo-700/40 rounded-xl p-4 text-xs text-indigo-200 space-y-2">
                <div className="font-semibold flex items-center gap-1.5 text-indigo-300">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Öğretmen / Eğitmen Notu</span>
                </div>
                <p className="text-[11px] leading-relaxed text-indigo-300/90">
                  Dosyanızı bilgisayarınızda kaydederken uzantısının <span className="font-mono bg-indigo-900/60 px-1 py-0.5 rounded">.html</span> olduğundan (örneğin <span className="font-mono">index.html.txt</span> şeklinde olmadığından) emin olun. Yukarıdaki <strong>index.html İndir</strong> butonuna bastığınızda doğru formatta doğrudan indirilecektir!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMIZE / EDIT PROFILE */}
        {activeTab === 'editor' && (
          <div className="max-w-3xl mx-auto bg-slate-800/80 rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-amber-400" />
                  Sayfa Bilgilerini Özelleştir
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Burada yapacağınız tüm değişiklikler hem canlı sayfayı hem de oluşturulan <span className="font-mono text-amber-300">index.html</span> kodunu anında günceller.
                </p>
              </div>
              <button
                onClick={handleResetProfile}
                className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                title="Varsayılan ödev bilgilerine geri dön"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sıfırla</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Adınız ve Soyadınız (h1 Ana Başlığı)
                </label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Adınız ve Soyadınız"
                />
              </div>

              {/* Title / Profession */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Unvan / Rol
                </label>
                <input
                  type="text"
                  value={profile.profession}
                  onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Örn: Web Geliştirme Öğrencisi"
                />
              </div>

              {/* About Paragraph */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Hakkımda Paragrafı (Neler Yaptığınız)
                </label>
                <textarea
                  rows={3}
                  value={profile.aboutText}
                  onChange={(e) => setProfile({ ...profile, aboutText: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Kendinizi, hedeflerinizi ve yaptıklarınızı tanıtın..."
                />
              </div>

              {/* Interests Paragraph */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  İlgi Alanları Paragrafı (Nelerden Hoşlandığınız)
                </label>
                <textarea
                  rows={2}
                  value={profile.interestsText}
                  onChange={(e) => setProfile({ ...profile, interestsText: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Nelerden hoşlandığınızı anlatın..."
                />
              </div>

              {/* Hobbies list */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Sevdiğim Şeyler & Hobiler Listesi (ul / li etiketleri)
                </label>
                <div className="space-y-2 mb-3">
                  {profile.hobbies.map((hobby, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs"
                    >
                      <span className="text-slate-400 font-mono w-4">{index + 1}.</span>
                      <span className="flex-1 text-slate-200">{hobby}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHobby(index)}
                        className="text-slate-500 hover:text-rose-400 transition cursor-pointer p-1"
                        title="Hobiyi kaldır"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new hobby */}
                <form onSubmit={handleAddHobby} className="flex gap-2">
                  <label htmlFor={newHobbyInputId} className="sr-only">
                    Yeni bir hobi veya ilgi alanı yazın
                  </label>
                  <input
                    id={newHobbyInputId}
                    type="text"
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                    placeholder="Yeni bir hobi veya ilgi alanı ekleyin..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ekle</span>
                  </button>
                </form>
              </div>

              {/* Quote & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Günün Sözü / İlham Verici Cümle
                  </label>
                  <input
                    type="text"
                    value={profile.quote}
                    onChange={(e) => setProfile({ ...profile, quote: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    İletişim E-Postası
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition cursor-pointer shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>Önizlemeyi Gör</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadIndexHtml}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Güncel index.html İndir</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SUBMISSION HELPER */}
        {activeTab === 'submission' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Ödev Teslim Formu & Bilgileri
                  </h2>
                  <p className="text-xs text-slate-400">
                    Eğitim platformunuza göndereceğiniz proje adı, canlı linki ve açıklama metni aşağıda hazırdır.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* 1. Project Name */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-200">
                      Project name (Proje Adı)
                    </label>
                    <button
                      onClick={() => handleCopyText(`İlk Web Sayfamızı Oluşturmak - ${profile.fullName}`, setCopiedName)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedName ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Kopyalandı</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Kopyala</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white font-mono flex items-center justify-between">
                    <span>İlk Web Sayfamızı Oluşturmak - {profile.fullName}</span>
                  </div>
                </div>

                {/* 2. Project Link */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-200">
                      Project link (Proje Canlı Bağlantısı)
                    </label>
                    <button
                      onClick={handleCopyLink}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Kopyalandı</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Bağlantıyı Kopyala</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-indigo-300 font-mono break-all flex items-center justify-between gap-2">
                    <span className="truncate">{liveUrl}</span>
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* 3. Project Description */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-200">
                      Project description (Proje Açıklaması)
                    </label>
                    <button
                      onClick={() => handleCopyText(submissionDescription, setCopiedDescription)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedDescription ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Açıklama Kopyalandı</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Metni Kopyala</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans max-h-56 overflow-y-auto">
                    {submissionDescription}
                  </div>
                </div>

                {/* 4. Public project status */}
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Make project public:</strong> Projeniz canlı bağlantı üzerinden incelenmeye ve diğer öğrencilerin görüntülemesine açıktır.
                  </span>
                </div>

                {/* Download index.html reminder */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-700/80">
                  <span className="text-xs text-slate-400">
                    Ödev dosyanızı doğrudan yüklemek isterseniz:
                  </span>
                  <button
                    onClick={handleDownloadIndexHtml}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg flex items-center gap-2 transition cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>index.html Dosyasını İndir</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-4 text-center text-xs text-slate-500">
        <p>
          İlk Web Sayfamızı Oluşturmak • Hazırlayan: <span className="text-slate-300">{profile.fullName}</span> • index.html
        </p>
      </footer>
    </div>
  );
}
