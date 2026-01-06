
import React, { useState, useEffect } from 'react';
import { USER_NAVIGATION, ADMIN_NAVIGATION, MOCK_USER, MOCK_USERS_LIST } from './constants';
import Dashboard from './components/Dashboard';
import DonationCenter from './components/DonationCenter';
import TransferFunds from './components/TransferFunds';
import ContactPage from './components/ContactPage';
import TransactionHistory from './components/TransactionHistory';
import AdminDashboard from './components/AdminDashboard';
import AdminUsers from './components/AdminUsers';
import AdminFinance from './components/AdminFinance';
import AdminLogs from './components/AdminLogs';
import AdminSecurity from './components/AdminSecurity';
import AdminMessaging from './components/AdminMessaging';
import Sidebar from './components/Sidebar';
import AdminLayout from './components/AdminLayout';
import Auth from './components/Auth';
import Profile from './components/Profile';
import AIChatbot from './components/AIChatbot';
import UserAvatar from './components/UserAvatar';
import NotificationPanel from './components/NotificationPanel';
import { User, Notification } from './types';
import { Bell } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User>(MOCK_USER);
  const [allUsers, setAllUsers] = useState(MOCK_USERS_LIST);
  const [prefilledContact, setPrefilledContact] = useState<{name: string, account?: string} | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'SECURITY',
      title: 'Connexion sécurisée',
      message: 'Cryptage AES-256 activé pour votre session.',
      timestamp: 'Il y a 1 min',
      isRead: false,
      isSystem: true
    }
  ]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  useEffect(() => {
    if (activeTab !== 'transfers' && activeTab !== 'donations' && activeTab !== 'contacts') {
      setPrefilledContact(null);
    }
  }, [activeTab]);

  const handleLogin = (email: string) => {
    const isAdmin = email.toLowerCase() === 'admin@nexgen.com';
    setUser({
      ...MOCK_USER,
      email: email,
      role: isAdmin ? 'ADMIN' : 'USER',
      name: isAdmin ? 'System Admin' : 'Jean Dupont'
    });
    setIsAuthenticated(true);
    setActiveTab(isAdmin ? 'admin-dashboard' : 'dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  const addNotification = (notif: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    setNotifications(prev => [{
      ...notif,
      id: Date.now().toString(),
      timestamp: 'À l\'instant',
      isRead: false
    }, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleUpdateUser = (updatedData: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  const isAdminView = activeTab.startsWith('admin-');
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard user={user} />;
      case 'transfers': return <TransferFunds 
          user={user} 
          initialData={prefilledContact}
          onUpdateBalance={(b) => handleUpdateUser({ balance: b })}
          onTransferSuccess={(amt, rec) => addNotification({ type: 'SUCCESS', title: 'Transfert réussi', message: `$${amt} vers ${rec}` })}
        />;
      case 'donations': return <DonationCenter 
          user={user} 
          initialRecipient={prefilledContact?.name}
          onUpdateBalance={(b) => handleUpdateUser({ balance: b })}
          onDonationSuccess={(amt, rec) => addNotification({ type: 'SUCCESS', title: 'Donation traitée', message: `$${amt} pour ${rec}` })}
        />;
      case 'contacts': return <ContactPage 
          onNavigateToTransfer={(n, a) => { setPrefilledContact({ name: n, account: a }); setActiveTab('transfers'); }}
          onNavigateToDonation={(n) => { setPrefilledContact({ name: n }); setActiveTab('donations'); }}
        />;
      case 'history': return <TransactionHistory />;
      case 'profile': return <Profile user={user} onUpdateUser={handleUpdateUser} onLogout={handleLogout} />;
      
      // Admin Interface
      case 'admin-dashboard': return <AdminDashboard usersCount={allUsers.length} />;
      case 'admin-users': return <AdminUsers 
          users={allUsers} 
          onSetUsers={setAllUsers} 
          onNotify={(msg) => addNotification({ type: 'INFO', title: 'Système', message: msg, isSystem: true })}
        />;
      case 'admin-messages': return <AdminMessaging 
          users={allUsers} 
          onSendMessage={(type, title, message) => addNotification({ type, title, message, isSystem: true })} 
        />;
      case 'admin-finance': return <AdminFinance />;
      case 'admin-logs': return <AdminLogs />;
      case 'admin-security': return <AdminSecurity />;
        
      default: return <Dashboard user={user} />;
    }
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  if (isAdminView) {
    return (
      <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} user={user}>
        {renderContent()}
      </AdminLayout>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} user={user} />
      
      <main className="flex-1 lg:ml-64 p-4 md:p-8 pb-24 lg:pb-8 relative">
        <header className="flex items-center justify-between mb-8">
          <div className="animate-in slide-in-from-left duration-500">
            <h1 className="text-2xl font-black text-slate-900 capitalize tracking-tight">
              {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-slate-500 text-sm font-medium">Session sécurisée: {user.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsNotifOpen(true)}
              className="relative p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
            >
              <Bell size={20} className="text-slate-600" />
              {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">{unreadCount}</span>}
            </button>
            <div onClick={() => setActiveTab('profile')} className="cursor-pointer hover:scale-110 transition-transform">
              <UserAvatar name={user.name} src={user.avatar} size="md" />
            </div>
          </div>
        </header>

        {renderContent()}
        
        <AIChatbot userBalance={user.balance} />
        <NotificationPanel 
          isOpen={isNotifOpen}
          onClose={() => setIsNotifOpen(false)}
          notifications={notifications}
          onMarkAsRead={markAsRead}
          onClearAll={() => setNotifications([])}
        />
      </main>
    </div>
  );
};

export default App;
