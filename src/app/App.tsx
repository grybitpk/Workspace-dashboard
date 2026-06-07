import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Toolbar from './components/Toolbar';
import SearchBar from './components/SearchBar';
import ToolCard from './components/ToolCard';
import AddToolModal from './components/AddToolModal';
import EditToolModal from './components/EditToolModal';
import StatsWidget from './components/StatsWidget';
import Dock from './components/Dock';
import CategoryFilter from './components/CategoryFilter';
import SettingsPanel from './components/SettingsPanel';
import SplashScreen from './components/SplashScreen';
import WelcomePanel from './components/WelcomePanel';
import AccountPromptToast from './components/AccountPromptToast';
import KeyboardShortcutsPanel from './components/KeyboardShortcutsPanel';
import UserProfilePanel from './components/UserProfilePanel';
import LoadingScreen from './components/LoadingScreen';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { Clock, MousePointer, Zap } from 'lucide-react';
import OrionLogo from '../imports/Orion_logo.svg';
import { authService, type AuthUser } from '../../services/auth';
import { syncService } from '../../services/sync';

interface Tool {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
  category?: string;
  isFavorite?: boolean;
}

const defaultTools: Tool[] = [
  { id: '1', name: 'Figma', url: 'https://figma.com', icon: 'https://www.google.com/s2/favicons?domain=figma.com&sz=128', color: '#a855f7', category: 'Design' },
  { id: '2', name: 'GitHub', url: 'https://github.com', icon: 'https://www.google.com/s2/favicons?domain=github.com&sz=128', color: '#3b82f6', category: 'Development' },
  { id: '3', name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'https://www.google.com/s2/favicons?domain=chat.openai.com&sz=128', color: '#10a37f', category: 'AI Tools' },
  { id: '4', name: 'YouTube', url: 'https://youtube.com', icon: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=128', color: '#ef4444', category: 'Media' },
  { id: '5', name: 'Notion', url: 'https://notion.so', icon: 'https://www.google.com/s2/favicons?domain=notion.so&sz=128', color: '#000000', category: 'Productivity' },
  { id: '6', name: 'Slack', url: 'https://slack.com', icon: 'https://www.google.com/s2/favicons?domain=slack.com&sz=128', color: '#4a154b', category: 'Productivity' },
  { id: '7', name: 'Twitter', url: 'https://twitter.com', icon: 'https://www.google.com/s2/favicons?domain=twitter.com&sz=128', color: '#1da1f2', category: 'Social' },
  { id: '8', name: 'LinkedIn', url: 'https://linkedin.com', icon: 'https://www.google.com/s2/favicons?domain=linkedin.com&sz=128', color: '#0077b5', category: 'Social' },
  { id: '9', name: 'Dribbble', url: 'https://dribbble.com', icon: 'https://www.google.com/s2/favicons?domain=dribbble.com&sz=128', color: '#ea4c89', category: 'Design' },
  { id: '10', name: 'Spotify', url: 'https://spotify.com', icon: 'https://www.google.com/s2/favicons?domain=spotify.com&sz=128', color: '#1db954', category: 'Media' },
  { id: '11', name: 'Gmail', url: 'https://gmail.com', icon: 'https://www.google.com/s2/favicons?domain=gmail.com&sz=128', color: '#ea4335', category: 'Productivity' },
  { id: '12', name: 'Trello', url: 'https://trello.com', icon: 'https://www.google.com/s2/favicons?domain=trello.com&sz=128', color: '#0079bf', category: 'Productivity' },
];

const themes = [
  { name: 'Neo Dark', bg: 'https://images.unsplash.com/photo-1554176259-aa961fc32671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920' },
  { name: 'Aurora', bg: 'https://images.unsplash.com/photo-1551309292-e185c0b6e22a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920' },
  { name: 'Mountain Peak', bg: 'https://images.unsplash.com/photo-1543359278-18e6c95a483c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920' },
];

interface ActivityStats {
  totalClicks: number;
  clicksThisWeek: number;
  clicksLastWeek: number;
  lastResetDate: string;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showWelcomePanel, setShowWelcomePanel] = useState(false);
  const [welcomePanelMode, setWelcomePanelMode] = useState<'welcome' | 'signin' | 'signup'>('welcome');
  const [showAccountPrompt, setShowAccountPrompt] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [tools, setTools] = useState<Tool[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [activityStats, setActivityStats] = useState<ActivityStats>({
    totalClicks: 0,
    clicksThisWeek: 0,
    clicksLastWeek: 0,
    lastResetDate: new Date().toISOString(),
  });

  // Set up auth state listener
  useEffect(() => {
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setCurrentUser(user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Check authentication and load data
  useEffect(() => {
    const initializeApp = async () => {
      setIsLoading(true);

      // Check auth session
      const session = await authService.getSession();
      const user = session ? await authService.getUser() : null;
      setCurrentUser(user);

      if (user) {
        // Load from cloud
        try {
          const [cloudTools, cloudSettings, cloudStats] = await Promise.all([
            syncService.getToolsFromCloud(),
            syncService.getSettingsFromCloud(),
            syncService.getStatsFromCloud()
          ]);

          if (cloudTools && cloudTools.length > 0) {
            setTools(cloudTools);
          } else {
            // Load from localStorage if no cloud data
            const savedTools = localStorage.getItem('orbit-tools');
            if (savedTools) {
              setTools(JSON.parse(savedTools));
            } else {
              setTools(defaultTools);
            }
          }

          if (cloudSettings) {
            setCurrentTheme(cloudSettings.theme_index || 0);
          }

          if (cloudStats) {
            setActivityStats({
              totalClicks: cloudStats.total_clicks || 0,
              clicksThisWeek: cloudStats.clicks_this_week || 0,
              clicksLastWeek: cloudStats.clicks_last_week || 0,
              lastResetDate: cloudStats.last_reset_date || new Date().toISOString()
            });
          }
        } catch (error) {
          console.error('Failed to load from cloud:', error);
          // Fallback to localStorage
          const savedTools = localStorage.getItem('orbit-tools');
          if (savedTools) {
            setTools(JSON.parse(savedTools));
          } else {
            setTools(defaultTools);
          }
        }
      } else {
        // Not logged in - use localStorage
        const savedTools = localStorage.getItem('orbit-tools');
        if (savedTools) {
          setTools(JSON.parse(savedTools));
        } else {
          setTools(defaultTools);
          localStorage.setItem('orbit-tools', JSON.stringify(defaultTools));
        }

        const savedStats = localStorage.getItem('orbit-activity-stats');
        if (savedStats) {
          const stats: ActivityStats = JSON.parse(savedStats);
          const lastReset = new Date(stats.lastResetDate);
          const now = new Date();
          const daysDiff = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));

          if (daysDiff >= 7) {
            const resetStats: ActivityStats = {
              totalClicks: stats.totalClicks,
              clicksThisWeek: 0,
              clicksLastWeek: stats.clicksThisWeek,
              lastResetDate: now.toISOString(),
            };
            setActivityStats(resetStats);
            localStorage.setItem('orbit-activity-stats', JSON.stringify(resetStats));
          } else {
            setActivityStats(stats);
          }
        }
      }

      setIsLoading(false);
    };

    initializeApp();

    // Listen for auth changes
    const { data: authListener } = authService.onAuthStateChange((user) => {
      setCurrentUser(user);
      if (user) {
        localStorage.setItem('orbit-user-logged-in', 'true');
      } else {
        localStorage.removeItem('orbit-user-logged-in');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modKey = isMac ? e.metaKey : e.ctrlKey;

      if (modKey && e.key === '/') {
        e.preventDefault();
        setShowKeyboardShortcuts(true);
      }
      if (modKey && e.key === 'h') {
        e.preventDefault();
        handleHomeClick();
      }
      if (modKey && e.key === 'f') {
        e.preventDefault();
        setActiveCategory('Favorites');
      }
      if (modKey && e.key === 'n') {
        e.preventDefault();
        setIsAddModalOpen(true);
      }
      if (modKey && e.key === ',') {
        e.preventDefault();
        setIsSettingsOpen(true);
      }
      if (modKey && e.key === 'u') {
        e.preventDefault();
        setShowUserProfile(true);
      }
      if (e.key === 'Escape') {
        setShowKeyboardShortcuts(false);
        setShowUserProfile(false);
        setIsSettingsOpen(false);
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setShowWelcomePanel(false);
        setShowAccountPrompt(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      setScrollY(target.scrollTop);
      if (target.scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const scrollContainer = document.querySelector('.scroll-container') as HTMLDivElement;
    scrollContainerRef.current = scrollContainer;
    scrollContainer?.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCloseWelcomePanel = () => {
    setShowWelcomePanel(false);
    setWelcomePanelMode('welcome');
    localStorage.setItem('orbit-welcome-dismissed', 'true');
  };

  const handleCloseAccountPrompt = () => {
    setShowAccountPrompt(false);
    localStorage.setItem('orbit-account-prompt-dismissed', 'true');
  };

  const handleSignUpFromPrompt = () => {
    setShowAccountPrompt(false);
    setShowWelcomePanel(true);
  };

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('orbit-welcome-dismissed');

    if (!hasSeenWelcome && !showSplash) {
      const timer = setTimeout(() => {
        setShowWelcomePanel(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  useEffect(() => {
    if (showAccountPrompt) {
      const timer = setTimeout(() => {
        handleCloseAccountPrompt();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showAccountPrompt]);

  const handleAddTool = async (tool: Omit<Tool, 'id'>) => {
    const newTool = {
      ...tool,
      id: Date.now().toString(),
    };
    const updatedTools = [...tools, newTool];
    setTools(updatedTools);
    localStorage.setItem('orbit-tools', JSON.stringify(updatedTools));

    // Sync to cloud if logged in
    if (currentUser) {
      await syncService.saveToolToCloud(newTool);
    }

    // Show account prompt if user is not logged in and hasn't dismissed it
    const isLoggedIn = localStorage.getItem('orbit-user-logged-in');
    const hasSeenAccountPrompt = localStorage.getItem('orbit-account-prompt-dismissed');

    if (!isLoggedIn && !hasSeenAccountPrompt) {
      setShowAccountPrompt(true);
    }
  };

  const handleDeleteTool = async (toolId: string) => {
    const updatedTools = tools.filter((tool) => tool.id !== toolId);
    setTools(updatedTools);
    localStorage.setItem('orbit-tools', JSON.stringify(updatedTools));

    // Sync to cloud if logged in
    if (currentUser) {
      await syncService.deleteToolFromCloud(toolId);
    }
  };

  const handleToggleFavorite = async (toolId: string) => {
    const updatedTools = tools.map((tool) =>
      tool.id === toolId ? { ...tool, isFavorite: !tool.isFavorite } : tool
    );
    setTools(updatedTools);
    localStorage.setItem('orbit-tools', JSON.stringify(updatedTools));

    // Sync to cloud if logged in
    if (currentUser) {
      const updatedTool = updatedTools.find(t => t.id === toolId);
      if (updatedTool) {
        await syncService.updateToolInCloud(toolId, { isFavorite: updatedTool.isFavorite });
      }
    }
  };

  const handleEditTool = (toolId: string) => {
    const tool = tools.find((t) => t.id === toolId);
    if (tool) {
      setEditingTool(tool);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = async (updatedData: { name: string; url: string; icon: string; color: string; category?: string }) => {
    if (editingTool) {
      const updatedTools = tools.map((tool) =>
        tool.id === editingTool.id
          ? { ...tool, ...updatedData }
          : tool
      );
      setTools(updatedTools);
      localStorage.setItem('orbit-tools', JSON.stringify(updatedTools));

      // Sync to cloud if logged in
      if (currentUser) {
        await syncService.updateToolInCloud(editingTool.id, updatedData);
      }

      setIsEditModalOpen(false);
      setEditingTool(null);
    }
  };

  const handleThemeToggle = async () => {
    const newTheme = (currentTheme + 1) % themes.length;
    setCurrentTheme(newTheme);

    // Sync to cloud if logged in
    if (currentUser) {
      try {
        await syncService.syncToCloud(tools, newTheme, activityStats);
      } catch (error) {
        console.error('Failed to sync theme:', error);
      }
    }
  };

  const handleToolClick = async () => {
    const updatedStats: ActivityStats = {
      ...activityStats,
      totalClicks: activityStats.totalClicks + 1,
      clicksThisWeek: activityStats.clicksThisWeek + 1,
    };
    setActivityStats(updatedStats);
    localStorage.setItem('orbit-activity-stats', JSON.stringify(updatedStats));

    // Sync stats to cloud if logged in
    if (currentUser) {
      await syncService.updateStatsInCloud(updatedStats);
    }
  };

  const handleExportData = () => {
    const exportData = {
      tools,
      settings: {
        currentTheme,
        activeCategory
      },
      activityStats,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orion-workspace-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (data: any) => {
    try {
      if (data.tools) {
        setTools(data.tools);
        localStorage.setItem('orbit-tools', JSON.stringify(data.tools));
      }
      if (data.settings) {
        if (data.settings.currentTheme !== undefined) {
          setCurrentTheme(data.settings.currentTheme);
        }
        if (data.settings.activeCategory) {
          setActiveCategory(data.settings.activeCategory);
        }
      }
      if (data.activityStats) {
        setActivityStats(data.activityStats);
        localStorage.setItem('orbit-activity-stats', JSON.stringify(data.activityStats));
      }

      // Sync to cloud if logged in
      if (currentUser) {
        syncService.syncToCloud(data.tools || tools, data.settings?.currentTheme || currentTheme, data.activityStats || activityStats);
      }

      alert('Workspace imported successfully!');
    } catch (error) {
      alert('Failed to import workspace. Please check the file format.');
    }
  };

  const handleClearData = () => {
    setTools(defaultTools);
    setActivityStats({
      totalClicks: 0,
      clicksThisWeek: 0,
      clicksLastWeek: 0,
      lastResetDate: new Date().toISOString()
    });
    setCurrentTheme(0);
    setActiveCategory('All');

    localStorage.setItem('orbit-tools', JSON.stringify(defaultTools));
    localStorage.removeItem('orbit-activity-stats');

    alert('All data cleared successfully!');
  };

  const handleAuthSuccess = async () => {
    const user = await authService.getUser();
    setCurrentUser(user);

    // Sync current data to cloud
    if (user) {
      setIsSyncing(true);
      try {
        await syncService.syncToCloud(tools, currentTheme, activityStats);
      } catch (error) {
        console.error('Failed to sync after auth:', error);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  const handleShowSignIn = () => {
    setWelcomePanelMode('signin');
    setShowWelcomePanel(true);
  };

  const handleShowSignUp = () => {
    setWelcomePanelMode('signup');
    setShowWelcomePanel(true);
  };

  const calculateTimeSaved = () => {
    const avgTimePerClick = 0.5;
    const hoursSaved = (activityStats.clicksThisWeek * avgTimePerClick) / 60;
    return hoursSaved >= 1 ? `${hoursSaved.toFixed(1)} hrs` : `${(hoursSaved * 60).toFixed(0)} min`;
  };

  const calculateProductivity = () => {
    if (activityStats.clicksLastWeek === 0) return '+0%';
    const change = ((activityStats.clicksThisWeek - activityStats.clicksLastWeek) / activityStats.clicksLastWeek) * 100;
    return change >= 0 ? `+${Math.round(change)}%` : `${Math.round(change)}%`;
  };

  const handleHomeClick = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setScrolled(false);
    setActiveCategory('All');
    setSearchQuery('');
  };

  const categories = Array.from(new Set(tools.map((tool) => tool.category).filter(Boolean))) as string[];
  const hasFavorites = tools.some((tool) => tool.isFavorite);

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' ||
      (activeCategory === 'Favorites' && tool.isFavorite) ||
      tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Cinematic Background */}
      <motion.div
        key={currentTheme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: `url(${themes[currentTheme].bg})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
      </motion.div>

      {/* Toolbar */}
      <Toolbar
        onSettingsClick={() => setIsSettingsOpen(true)}
        onUserClick={() => setShowUserProfile(true)}
      />

      {/* Main Content */}
      <div className="scroll-container relative z-10 h-full overflow-y-auto pb-28 sm:pb-32 scroll-smooth scrollbar-hide">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 pt-16 sm:pt-20 lg:pt-24">
          {/* Logo - Centered */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: scrolled ? 0 : 1,
              y: scrolled ? -50 : 0,
              scale: scrolled ? 0.8 : 1
            }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6 sm:mb-8 overflow-hidden"
            style={{
              display: scrolled ? 'none' : 'block'
            }}
          >
            <h1 className="flex items-center justify-center mb-2">
              <img src={OrionLogo} alt="Orion" className="h-12 sm:h-16 lg:h-20 w-auto" />
            </h1>
            <p className="text-white/60 text-base sm:text-lg">Your workspace</p>
          </motion.div>

          {/* Stats Widgets - Responsive positioning */}
          <motion.div
            className="mb-6 lg:absolute lg:left-6 lg:top-16"
            animate={{
              opacity: scrolled ? 0 : 1,
              x: scrolled ? -100 : 0,
              scale: scrolled ? 0.8 : 1
            }}
            transition={{ duration: 0.4 }}
            style={{
              display: scrolled ? 'none' : 'block'
            }}
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs sm:text-sm text-white/90 mb-3 text-center lg:text-left"
            >
              Your Activity
            </motion.h2>
            <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start overflow-x-auto pb-2 px-2 lg:px-0">
              <StatsWidget
                label="Time Saved"
                value={calculateTimeSaved()}
                subtext="This week"
                index={0}
                icon={<Clock className="w-3 h-3 text-cyan-400" />}
              />
              <StatsWidget
                label="Total Clicks"
                value={activityStats.totalClicks.toString()}
                subtext="All time"
                index={1}
                icon={<MousePointer className="w-3 h-3 text-purple-400" />}
              />
              <StatsWidget
                label="Productivity"
                value={calculateProductivity()}
                subtext="vs last week"
                index={2}
                icon={<Zap className="w-3 h-3 text-green-400" />}
              />
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="mb-6 sm:mb-8"
            animate={{
              opacity: scrolled ? 0 : 1,
              y: scrolled ? -30 : 0,
              scale: scrolled ? 0.8 : 1
            }}
            transition={{ duration: 0.4 }}
            style={{
              display: scrolled ? 'none' : 'block'
            }}
          >
            <SearchBar
              onSearch={setSearchQuery}
              tools={tools}
              value={searchQuery}
            />
          </motion.div>

          {/* Category Filter */}
          {(categories.length > 0 || hasFavorites) && (
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              showFavorites={hasFavorites}
            />
          )}

          {/* Pinned Tools Section - Responsive Grid */}
          <div className="mt-4 sm:mt-6 lg:mt-8">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3 p-1 sm:p-2">
              {filteredTools.map((tool, index) => (
                <ToolCard
                  key={tool.id}
                  {...tool}
                  index={index}
                  onToolClick={handleToolClick}
                  onDelete={() => handleDeleteTool(tool.id)}
                  onFavorite={() => handleToggleFavorite(tool.id)}
                  onEdit={() => handleEditTool(tool.id)}
                />
              ))}
            </div>

            {filteredTools.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 sm:py-12 text-white/40 text-sm sm:text-base"
              >
                No tools found. Try a different search or add a new tool.
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Dock */}
      <Dock
        onHomeClick={handleHomeClick}
        onSearchClick={() => document.querySelector('input')?.focus()}
        onFavoritesClick={() => setActiveCategory('Favorites')}
        onAddClick={() => setIsAddModalOpen(true)}
      />

      {/* Add Tool Modal */}
      <AddToolModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTool}
      />

      {/* Edit Tool Modal */}
      {editingTool && (
        <EditToolModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTool(null);
          }}
          onSave={handleSaveEdit}
          tool={editingTool}
        />
      )}

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onThemeToggle={handleThemeToggle}
        onShowAnalytics={() => setShowAnalytics(true)}
        currentTheme={themes[currentTheme].name}
      />

      {/* Analytics Dashboard */}
      <AnimatePresence>
        {showAnalytics && (
          <AnalyticsDashboard
            isOpen={showAnalytics}
            onClose={() => setShowAnalytics(false)}
            stats={activityStats}
            toolsCount={tools.length}
            favoritesCount={tools.filter(t => t.isFavorite).length}
          />
        )}
      </AnimatePresence>

      {/* Welcome Panel */}
      <AnimatePresence>
        {showWelcomePanel && (
          <WelcomePanel
            onClose={handleCloseWelcomePanel}
            onAuthSuccess={handleAuthSuccess}
            initialMode={welcomePanelMode}
          />
        )}
      </AnimatePresence>

      {/* User Profile Panel */}
      <AnimatePresence>
        {showUserProfile && (
          <UserProfilePanel
            user={currentUser}
            onClose={() => setShowUserProfile(false)}
            onSignOut={handleSignOut}
            onExportData={handleExportData}
            onImportData={handleImportData}
            onClearData={handleClearData}
            onShowSignIn={handleShowSignIn}
            onShowSignUp={handleShowSignUp}
          />
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Panel */}
      <AnimatePresence>
        {showKeyboardShortcuts && (
          <KeyboardShortcutsPanel onClose={() => setShowKeyboardShortcuts(false)} />
        )}
      </AnimatePresence>

      {/* Account Prompt Toast */}
      <AnimatePresence>
        {showAccountPrompt && (
          <AccountPromptToast
            onClose={handleCloseAccountPrompt}
            onSignUp={handleSignUpFromPrompt}
          />
        )}
      </AnimatePresence>

      {/* Syncing Indicator */}
      {isSyncing && (
        <div className="fixed bottom-24 right-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2 z-50">
          <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white text-sm">Syncing...</span>
        </div>
      )}
    </div>
      )}
    </>
  );
}