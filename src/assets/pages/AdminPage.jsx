import React, { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiLock,
  FiUnlock,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX,
  FiArrowLeft,
  FiSun,
  FiMoon,
  FiSearch,
  FiExternalLink,
  FiCopy,
  FiRotateCcw,
  FiStar,
  FiLayers,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';
import { useProjects } from '../../context/ProjectsContext';
import { useTheme } from '../components/theme/ThemeContext';
import { useTransitionNavigate } from '../components/animations/TransitionContext';

const CORRECT_PIN = '316316';
const AUTH_KEY = 'acelino_admin_auth';

const categories = ['ALL', 'PINNED', 'LANDING PAGE', 'WEB APP', 'ECOMMERCE', 'HIDDEN'];

const defaultFormState = {
  title: '',
  slug: '',
  category: 'LANDING PAGE',
  client: '',
  role: 'Frontend Specialist & UI Designer',
  started: 'March 2025',
  timeline: 'March 2025 – Present',
  year: '2025 – 2026',
  stackText: 'React, Tailwind CSS, JavaScript',
  live: '',
  image: '/images/bokis-soreang.webp',
  description: '',
  briefText: '',
  challengeText: '',
  featuresText: '',
  hidden: false,
};

const AdminPage = () => {
  const navigateWithTransition = useTransitionNavigate();
  const { theme, toggleTheme } = useTheme();

  const titleId = useId();
  const slugId = useId();
  const categoryId = useId();
  const clientId = useId();
  const roleId = useId();
  const yearId = useId();
  const stackId = useId();
  const liveId = useId();
  const imageId = useId();
  const descriptionId = useId();
  const briefId = useId();
  const challengeId = useId();
  const featuresId = useId();
  const hiddenId = useId();

  const {
    allProjects,
    projects,
    featuredProjects,
    pinnedSlugs,
    addProject,
    updateProject,
    deleteProject,
    togglePin,
    toggleHide,
    resetToDefault,
    generateExportCode,
  } = useProjects();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Modals & Notifications
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState(defaultFormState);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [copiedExport, setCopiedExport] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Auto-clear toast
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle PIN input
  const handlePinSubmit = (e) => {
    if (e) e.preventDefault();
    if (pinInput === CORRECT_PIN) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      setPinError(false);
      showToast('Autentikasi berhasil. Selamat datang di Panel Admin!', 'success');
    } else {
      setPinError(true);
      setShakeKey((prev) => prev + 1);
      setPinInput('');
    }
  };

  const handleKeypadPress = (num) => {
    if (pinInput.length < 6) {
      const nextPin = pinInput + num;
      setPinInput(nextPin);
      if (nextPin.length === 6) {
        if (nextPin === CORRECT_PIN) {
          sessionStorage.setItem(AUTH_KEY, 'true');
          setIsAuthenticated(true);
          setPinError(false);
          showToast('Autentikasi berhasil. Selamat datang di Panel Admin!', 'success');
        } else {
          setPinError(true);
          setShakeKey((prev) => prev + 1);
          setTimeout(() => setPinInput(''), 400);
        }
      }
    }
  };

  const handleKeypadBackspace = () => {
    setPinInput((prev) => prev.slice(0, -1));
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setPinInput('');
  };

  // Open modal for new project
  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData(defaultFormState);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      slug: project.slug || '',
      category: project.category || 'LANDING PAGE',
      client: project.client || '',
      role: project.role || '',
      started: project.started || '',
      timeline: project.timeline || '',
      year: project.year || '',
      stackText: (project.tech || project.stack || []).join(', '),
      live: project.live || '',
      image: project.image || '',
      description: project.description || '',
      briefText: (project.brief || []).join('\n\n'),
      challengeText: (project.challenge || []).join('\n\n'),
      featuresText: (project.features || []).join('\n'),
      hidden: Boolean(project.hidden),
    });
    setIsModalOpen(true);
  };

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingProject
        ? prev.slug
        : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));
  };

  // Save project form
  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Judul proyek tidak boleh kosong.', 'error');
      return;
    }

    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: formData.category,
      client: formData.client.trim(),
      role: formData.role.trim(),
      started: formData.started.trim(),
      timeline: formData.timeline.trim(),
      year: formData.year.trim(),
      tech: formData.stackText.split(',').map((s) => s.trim()).filter(Boolean),
      stack: formData.stackText.split(',').map((s) => s.trim()).filter(Boolean),
      live: formData.live.trim(),
      image: formData.image.trim(),
      description: formData.description.trim(),
      brief: formData.briefText.split('\n\n').map((s) => s.trim()).filter(Boolean),
      challenge: formData.challengeText.split('\n\n').map((s) => s.trim()).filter(Boolean),
      features: formData.featuresText.split('\n').map((s) => s.trim()).filter(Boolean),
      hidden: Boolean(formData.hidden),
    };

    if (editingProject) {
      updateProject(editingProject.slug, payload);
      showToast(`Proyek "${payload.title}" berhasil diperbarui!`, 'success');
    } else {
      addProject(payload);
      showToast(`Proyek "${payload.title}" berhasil ditambahkan!`, 'success');
    }

    setIsModalOpen(false);
  };

  // Toggle Pin with max 4 feedback
  const handleTogglePin = (slug, title) => {
    const res = togglePin(slug);
    if (!res.success) {
      showToast(res.error, 'error');
    } else {
      if (res.isPinned) {
        showToast(`"${title}" disematkan ke Landing Page (${pinnedSlugs.length + 1}/4).`, 'success');
      } else {
        showToast(`"${title}" dicopot dari Landing Page.`, 'info');
      }
    }
  };

  // Toggle Hide with feedback
  const handleToggleHide = (slug, title, isCurrentlyHidden) => {
    toggleHide(slug);
    if (isCurrentlyHidden) {
      showToast(`"${title}" dipublikasikan kembali.`, 'success');
    } else {
      showToast(`"${title}" diarsipkan/disembunyikan dari publik.`, 'info');
    }
  };

  // Delete project
  const handleDelete = (slug, title) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus proyek "${title}" secara permanen?`)) {
      deleteProject(slug);
      showToast(`Proyek "${title}" telah dihapus.`, 'info');
    }
  };

  // Reset to default
  const handleResetDefault = () => {
    if (
      window.confirm(
        'Apakah Anda yakin ingin me-reset seluruh data proyek kembali ke bawaan sistem? Perubahan kustom di browser akan dikembalikan.'
      )
    ) {
      resetToDefault();
      showToast('Data proyek berhasil di-reset ke bawaan default.', 'success');
    }
  };

  // Copy code to clipboard
  const handleCopyExport = () => {
    const code = generateExportCode();
    navigator.clipboard.writeText(code).then(() => {
      setCopiedExport(true);
      showToast('Kode projectsData.js berhasil disalin ke clipboard!', 'success');
      setTimeout(() => setCopiedExport(false), 3000);
    });
  };

  // Filtered projects list
  const filteredProjects = allProjects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.tech && p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    if (!matchesSearch) return false;

    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'PINNED') return pinnedSlugs.includes(p.slug);
    if (selectedCategory === 'HIDDEN') return Boolean(p.hidden);
    return p.category === selectedCategory && !p.hidden;
  });

  // --------------------------------------------------------------------------
  // RENDER: PIN SECURITY GATE IF NOT AUTHENTICATED
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans select-none">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[500px] h-96 sm:h-[500px] bg-neutral-800/30 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between z-10">
          <button
            onClick={() => navigateWithTransition('/')}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Kembali ke Portofolio</span>
          </button>
          <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 border border-neutral-800 px-3 py-1">
            PROTECTED SYSTEM // 316
          </span>
        </div>

        {/* Center Keypad & PIN Form */}
        <div className="max-w-md w-full mx-auto my-auto z-10 text-center py-8">
          <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-6 text-neutral-200 shadow-xl">
            <FiLock className="w-6 h-6" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Admin Access Required
          </h1>
          <p className="font-mono text-xs sm:text-sm text-neutral-400 uppercase tracking-wider mb-8">
            Masukkan PIN 6-digit untuk membuka panel kendali
          </p>

          {/* Shake Animated PIN Dots Display */}
          <motion.div
            key={shakeKey}
            animate={pinError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const isFilled = pinInput.length > index;
              return (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    isFilled
                      ? pinError
                        ? 'bg-red-500 shadow-lg shadow-red-500/50 scale-110'
                        : 'bg-white shadow-lg shadow-white/50 scale-110'
                      : 'border-2 border-neutral-700 bg-neutral-900'
                  }`}
                />
              );
            })}
          </motion.div>

          {pinError && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs font-mono uppercase tracking-wider mb-6 flex items-center justify-center gap-2"
            >
              <FiAlertCircle className="w-4 h-4" />
              <span>PIN salah. Silakan coba kembali.</span>
            </motion.p>
          )}

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeypadPress(String(num))}
                className="h-16 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 active:scale-95 border border-neutral-800/80 text-xl font-mono font-medium text-white transition-all cursor-pointer shadow-sm"
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPinInput('')}
              className="h-16 rounded-xl bg-neutral-900/40 hover:bg-neutral-800 text-xs font-mono uppercase tracking-widest text-neutral-400 active:scale-95 border border-neutral-800/50 transition-all cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handleKeypadPress('0')}
              className="h-16 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 active:scale-95 border border-neutral-800/80 text-xl font-mono font-medium text-white transition-all cursor-pointer shadow-sm"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleKeypadBackspace}
              className="h-16 rounded-xl bg-neutral-900/40 hover:bg-neutral-800 text-xs font-mono uppercase tracking-widest text-neutral-400 active:scale-95 border border-neutral-800/50 transition-all cursor-pointer"
            >
              ⌫
            </button>
          </div>

          {/* Keyboard input support */}
          <form onSubmit={handlePinSubmit} className="max-w-xs mx-auto">
            <input
              type="password"
              maxLength={6}
              value={pinInput}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                setPinInput(val);
                if (val.length === 6 && val === CORRECT_PIN) {
                  sessionStorage.setItem(AUTH_KEY, 'true');
                  setIsAuthenticated(true);
                  setPinError(false);
                }
              }}
              placeholder="Or type PIN here..."
              className="w-full text-center bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 font-mono text-sm tracking-widest text-neutral-300 focus:outline-none focus:border-neutral-500"
            />
          </form>
        </div>

        {/* Footer info */}
        <div className="text-center font-mono text-[11px] text-neutral-600 uppercase tracking-widest z-10">
          Acelino Portfolio Management System • Secured Session
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: AUTHENTICATED ADMIN DASHBOARD
  // --------------------------------------------------------------------------
  return (
    <div className="w-full min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 font-sans">
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-5 right-5 z-[100] px-5 py-3.5 border shadow-2xl flex items-center gap-3 font-mono text-xs tracking-wider uppercase font-semibold ${
              toastMessage.type === 'error'
                ? 'bg-red-950/95 border-red-800 text-red-200'
                : toastMessage.type === 'success'
                ? 'bg-emerald-950/95 border-emerald-800 text-emerald-200'
                : 'bg-neutral-900/95 border-neutral-750 text-white'
            }`}
          >
            {toastMessage.type === 'error' ? (
              <FiAlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            ) : (
              <FiCheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toastMessage.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-900 px-4 sm:px-8 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateWithTransition('/')}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Lihat Web Portofolio</span>
            </button>
            <span className="h-4 w-[1px] bg-gray-200 dark:bg-gray-800 hidden sm:inline-block" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                CMS Admin Panel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <FiUnlock className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Page Title & Action Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-gray-200 dark:border-gray-900">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gray-400">
                (MANAGEMENT // PROJECTS CMS)
              </span>
              <span className="h-[1px] w-12 bg-gray-200 dark:bg-gray-800" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Project Dashboard
            </h1>
            <p className="font-sans text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 max-w-xl leading-relaxed">
              Kelola proyek, atur pin untuk beranda (maksimal 4 proyek unggulan), atau tambahkan studi kasus klien baru.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2.5 px-5 py-3 bg-black dark:bg-white text-white dark:text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <FiPlus className="w-4 h-4" />
              <span>Tambah Proyek</span>
            </button>

            <button
              onClick={() => setIsExportOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-800 hover:border-black dark:hover:border-white font-mono text-xs uppercase tracking-widest text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
              title="Salin kode projectsData.js atau simpan permanen"
            >
              <FiCopy className="w-4 h-4" />
              <span>Export Code</span>
            </button>

            <button
              onClick={handleResetDefault}
              className="inline-flex items-center gap-2 px-3 py-3 border border-gray-200 dark:border-gray-800 text-gray-400 hover:text-red-500 hover:border-red-300 dark:hover:border-red-900/50 transition-colors cursor-pointer"
              title="Kembalikan ke data bawaan sistem"
            >
              <FiRotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Metric Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="p-5 border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-neutral-950">
            <span className="font-mono text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest block mb-1">
              Total Proyek Terdata
            </span>
            <span className="text-3xl sm:text-4xl font-mono font-bold text-gray-900 dark:text-white">
              {allProjects.length}
            </span>
          </div>

          <div className="p-5 border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-neutral-950">
            <span className="font-mono text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest block mb-1">
              Aktif di Arsip Publik
            </span>
            <span className="text-3xl sm:text-4xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {projects.length}
            </span>
          </div>

          <div className="p-5 border border-amber-300 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] sm:text-xs text-amber-700 dark:text-amber-400 uppercase tracking-widest font-semibold">
                Pinned di Beranda
              </span>
              <FiStar className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-amber-600 dark:text-amber-300">
                {pinnedSlugs.length}
              </span>
              <span className="font-mono text-xs text-amber-700/70 dark:text-amber-400/60 uppercase">
                / 4 Maksimal
              </span>
            </div>
          </div>

          <div className="p-5 border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-neutral-950">
            <span className="font-mono text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest block mb-1">
              Diarsipkan / Hidden
            </span>
            <span className="text-3xl sm:text-4xl font-mono font-bold text-gray-400">
              {allProjects.filter((p) => p.hidden).length}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* PINNED LANDING PAGE PREVIEW SECTION (MAX 4) */}
        {/* ------------------------------------------------------------------ */}
        <section className="mb-12 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 bg-gray-50/40 dark:bg-neutral-950">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold mb-1">
                <FiStar className="w-3.5 h-3.5 fill-current" />
                <span>Landing Page Showcase (Pinned {pinnedSlugs.length}/4)</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Ke-4 proyek ini akan tampil langsung di bagian "Selected works" pada halaman beranda utama.
              </p>
            </div>
            <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
              {pinnedSlugs.length === 4 ? 'Status: Kuota Penuh' : `Tersedia: ${4 - pinnedSlugs.length} Slot`}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((slotIndex) => {
              const project = featuredProjects[slotIndex];
              if (project) {
                return (
                  <div
                    key={project.slug}
                    className="relative group border border-gray-300 dark:border-gray-700 bg-white dark:bg-black p-3 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[1024/520] overflow-hidden bg-gray-100 dark:bg-neutral-900 mb-3">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider border border-amber-500/40 flex items-center gap-1">
                        <FiStar className="w-2.5 h-2.5 fill-current" />
                        <span>Slot 0{slotIndex + 1}</span>
                      </div>
                      <button
                        onClick={() => handleTogglePin(project.slug, project.title)}
                        className="absolute top-2 right-2 w-7 h-7 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                        title="Lepas Pin"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 block mb-0.5">
                        {project.category}
                      </span>
                      <h4 className="font-sans font-bold text-sm text-gray-900 dark:text-white truncate">
                        {project.title}
                      </h4>
                      <p className="font-mono text-[10px] text-gray-500 truncate mt-0.5">
                        {project.client}
                      </p>
                    </div>
                  </div>
                );
              }

              // Empty slot placeholder
              return (
                <div
                  key={`empty-${slotIndex}`}
                  className="border border-dashed border-gray-300 dark:border-gray-800 p-6 flex flex-col items-center justify-center text-center min-h-[160px] bg-white/50 dark:bg-black/30"
                >
                  <span className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-800 flex items-center justify-center text-gray-400 mb-2 font-mono text-xs">
                    0{slotIndex + 1}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-400">
                    Slot Kosong
                  </span>
                  <p className="font-sans text-[11px] text-gray-400 mt-1">
                    Klik tombol bintang pada tabel proyek untuk menyematkan.
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* ALL PROJECTS TABLE / GRID CONTROLS */}
        {/* ------------------------------------------------------------------ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              let count = 0;
              if (cat === 'ALL') count = allProjects.length;
              else if (cat === 'PINNED') count = pinnedSlugs.length;
              else if (cat === 'HIDDEN') count = allProjects.filter((p) => p.hidden).length;
              else count = allProjects.filter((p) => p.category === cat && !p.hidden).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                      : 'border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul, klien, stack..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-950 font-sans text-xs text-gray-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
          </div>
        </div>

        {/* Projects Table */}
        <div className="border border-gray-200 dark:border-gray-800 overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-gray-50 dark:bg-neutral-950 border-b border-gray-200 dark:border-gray-800 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="py-3 px-4 w-12 text-center">Pin</th>
                <th className="py-3 px-4 w-20">Preview</th>
                <th className="py-3 px-4">Proyek & Klien</th>
                <th className="py-3 px-4 w-32">Kategori</th>
                <th className="py-3 px-4 w-48 hidden lg:table-cell">Tech Stack</th>
                <th className="py-3 px-4 w-28 text-center">Status</th>
                <th className="py-3 px-4 w-36 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400 font-mono text-xs uppercase">
                    Tidak ada proyek yang sesuai dengan kriteria filter/pencarian.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => {
                  const isPinned = pinnedSlugs.includes(project.slug);
                  const isHidden = Boolean(project.hidden);

                  return (
                    <tr
                      key={project.slug}
                      className={`hover:bg-gray-50/60 dark:hover:bg-neutral-950/60 transition-colors ${
                        isHidden ? 'opacity-60 bg-gray-50/30 dark:bg-neutral-950/30' : ''
                      }`}
                    >
                      {/* Pin Button */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleTogglePin(project.slug, project.title)}
                          className={`p-2 transition-transform active:scale-90 cursor-pointer ${
                            isPinned
                              ? 'text-amber-500 hover:text-amber-600'
                              : 'text-gray-300 dark:text-gray-700 hover:text-amber-400'
                          }`}
                          title={isPinned ? 'Lepas dari Landing Page' : 'Pin ke Landing Page (Maks 4)'}
                        >
                          <FiStar className={`w-4 h-4 ${isPinned ? 'fill-current' : ''}`} />
                        </button>
                      </td>

                      {/* Thumbnail */}
                      <td className="py-3 px-4">
                        <div className="w-16 h-10 overflow-hidden bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 shrink-0">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Project Title & Client */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                          <span>{project.title}</span>
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noreferrer"
                              className="text-gray-400 hover:text-black dark:hover:text-white inline-block"
                              title="Kunjungi Website"
                            >
                              <FiExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                        <div className="font-mono text-[11px] text-gray-500 mt-0.5">
                          {project.client} • {project.year}
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-3 px-4">
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">
                          {project.category}
                        </span>
                      </td>

                      {/* Tech Stack */}
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {(project.tech || project.stack || []).slice(0, 3).map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-mono text-gray-500 bg-gray-100 dark:bg-neutral-900 px-1.5 py-0.5"
                            >
                              {t}
                            </span>
                          ))}
                          {(project.tech || project.stack || []).length > 3 && (
                            <span className="text-[9px] font-mono text-gray-400">
                              +{(project.tech || project.stack || []).length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center">
                        {isHidden ? (
                          <span className="font-mono text-[10px] text-gray-400 uppercase border border-dashed border-gray-300 dark:border-gray-700 px-2 py-0.5 inline-block">
                            Diarsipkan
                          </span>
                        ) : isPinned ? (
                          <span className="font-mono text-[10px] text-amber-700 dark:text-amber-400 font-bold uppercase bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-900 px-2 py-0.5 inline-block">
                            Pinned (0{pinnedSlugs.indexOf(project.slug) + 1})
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 uppercase px-2 py-0.5 inline-block">
                            Publik
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          {/* Toggle Hide/Show */}
                          <button
                            onClick={() => handleToggleHide(project.slug, project.title, isHidden)}
                            className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                            title={isHidden ? 'Tampilkan kembali ke publik' : 'Sembunyikan / Arsipkan'}
                          >
                            {isHidden ? <FiEyeOff className="w-3.5 h-3.5" /> : <FiEye className="w-3.5 h-3.5" />}
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => handleOpenEdit(project)}
                            className="p-1.5 text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                            title="Edit Data Proyek"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(project.slug, project.title)}
                            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                            title="Hapus Proyek"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* MODAL: ADD / EDIT PROJECT */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white dark:bg-neutral-950 border border-gray-200 dark:border-gray-800 my-8 shadow-2xl overflow-hidden text-gray-900 dark:text-white"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-neutral-900/50">
                <div>
                  <h3 className="font-bold text-lg font-sans">
                    {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
                  </h3>
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                    {editingProject ? `SLUG: ${editingProject.slug}` : 'INPUT METADATA LENGKAP'}
                  </span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSaveProject} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="sm:col-span-2">
                    <label htmlFor={titleId} className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Judul Proyek *
                    </label>
                    <input
                      id={titleId}
                      type="text"
                      required
                      value={formData.title}
                      onChange={handleTitleChange}
                      placeholder="cth: Skyscape Caffe"
                      className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-800 bg-white dark:bg-neutral-900 font-sans text-sm focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label htmlFor={slugId} className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Slug URL *
                    </label>
                    <input
                      id={slugId}
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="cth: skyscapecaffe"
                      className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-800 bg-white dark:bg-neutral-900 font-mono text-xs focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor={categoryId} className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Kategori
                    </label>
                    <select
                      id={categoryId}
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-800 bg-white dark:bg-neutral-900 font-sans text-sm focus:outline-none focus:border-black dark:focus:border-white"
                    >
                      <option value="LANDING PAGE">LANDING PAGE</option>
                      <option value="WEB APP">WEB APP</option>
                      <option value="ECOMMERCE">ECOMMERCE</option>
                    </select>
                  </div>

                  {/* Client */}
                  <div>
                    <label htmlFor={clientId} className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Klien / Brand
                    </label>
                    <input
                      id={clientId}
                      type="text"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      placeholder="cth: Skyscape Cafe Punclut"
                      className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-800 bg-white dark:bg-neutral-900 font-sans text-sm focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label htmlFor={roleId} className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Role / Peran
                    </label>
                    <input
                      id={roleId}
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="cth: Frontend Specialist & UI Designer"
                      className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-800 bg-white dark:bg-neutral-900 font-sans text-sm focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label htmlFor={yearId} className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Tahun
                    </label>
                    <input
                      id={yearId}
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="cth: 2025 – 2026"
                      className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-800 bg-white dark:bg-neutral-900 font-sans text-sm focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <label htmlFor={stackId} className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Tech Stack (pisahkan koma)
                    </label>
                    <input
                      id={stackId}
                      type="text"
                      value={formData.stackText}
                      onChange={(e) => setFormData({ ...formData, stackText: e.target.value })}
                      placeholder="React, Next.js, Tailwind CSS"
                      className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-800 bg-white dark:bg-neutral-900 font-mono text-xs focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  {/* Live URL */}
                  <div>
                    <label htmlFor={liveId} className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Live Website URL
                    </label>
                    <input
                      id={liveId}
                      type="url"
                      value={formData.live}
                      onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-800 bg-white dark:bg-neutral-900 font-mono text-xs focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  {/* Image URL / Path */}
                  <div>
                    <label htmlFor={imageId} className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Path Gambar (/images/...)
                    </label>
                    <input
                      id={imageId}
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/images/proyek.webp"
                      className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-800 bg-white dark:bg-neutral-900 font-mono text-xs focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label htmlFor={descriptionId} className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Deskripsi Ringkas (1-2 kalimat)
                    </label>
                    <textarea
                      id={descriptionId}
                      rows={2}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Ringkasan platform untuk kartu portofolio..."
                      className="w-full px-3.5 py-2 border border-gray-300 dark:border-gray-800 bg-white dark:bg-neutral-900 font-sans text-xs focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  {/* Brief */}
                  <div className="sm:col-span-2">
                    <label htmlFor={briefId} className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Project Brief (pisahkan antar paragraf dengan baris kosong)
                    </label>
                    <textarea
                      id={briefId}
                      rows={3}
                      value={formData.briefText}
                      onChange={(e) => setFormData({ ...formData, briefText: e.target.value })}
                      placeholder="Paragraf latar belakang dan urgensi proyek..."
                      className="w-full px-3.5 py-2 border border-gray-300 dark:border-gray-800 bg-white dark:bg-neutral-900 font-sans text-xs focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  {/* Challenge */}
                  <div className="sm:col-span-2">
                    <label htmlFor={challengeId} className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Tantangan Teknis (*Challenge*)
                    </label>
                    <textarea
                      id={challengeId}
                      rows={2}
                      value={formData.challengeText}
                      onChange={(e) => setFormData({ ...formData, challengeText: e.target.value })}
                      placeholder="Tantangan arsitektur, animasi, atau performa..."
                      className="w-full px-3.5 py-2 border border-gray-300 dark:border-gray-800 bg-white dark:bg-neutral-900 font-sans text-xs focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  {/* Features */}
                  <div className="sm:col-span-2">
                    <label htmlFor={featuresId} className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Fitur-Fitur Utama (1 baris per fitur)
                    </label>
                    <textarea
                      id={featuresId}
                      rows={3}
                      value={formData.featuresText}
                      onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                      placeholder="Desain responsif mobile-first&#10;Integrasi WhatsApp Checkout&#10;Animasi transisi halus"
                      className="w-full px-3.5 py-2 border border-gray-300 dark:border-gray-800 bg-white dark:bg-neutral-900 font-sans text-xs focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  {/* Hidden Toggle */}
                  <div className="sm:col-span-2 flex items-center gap-2 pt-2">
                    <input
                      id={hiddenId}
                      type="checkbox"
                      checked={formData.hidden}
                      onChange={(e) => setFormData({ ...formData, hidden: e.target.checked })}
                      className="w-4 h-4 accent-black dark:accent-white"
                    />
                    <label htmlFor={hiddenId} className="font-mono text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 cursor-pointer">
                      Sembunyikan dari arsip publik (*Archive / Hidden*)
                    </label>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 border border-gray-300 dark:border-gray-700 font-mono text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {editingProject ? 'Simpan Perubahan' : 'Tambahkan Proyek'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------------ */}
      {/* MODAL: EXPORT CODE / BACKUP JSON */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {isExportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-white dark:bg-neutral-950 border border-gray-200 dark:border-gray-800 p-6 shadow-2xl text-gray-900 dark:text-white"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <h3 className="font-bold text-lg font-sans">Export projectsData.js Code</h3>
                  <p className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                    Salin kode ini ke src/data/projectsData.js untuk commit permanen ke Git
                  </p>
                </div>
                <button
                  onClick={() => setIsExportOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="relative mb-4">
                <pre className="p-4 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 font-mono text-[11px] text-gray-700 dark:text-gray-300 max-h-96 overflow-y-auto select-all">
                  {generateExportCode()}
                </pre>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={handleCopyExport}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {copiedExport ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                  <span>{copiedExport ? 'Tersalin ke Clipboard!' : 'Salin Seluruh Kode'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;
