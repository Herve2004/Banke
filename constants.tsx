
import React from 'react';
import { 
  LayoutDashboard, History, Heart, User as UserIcon, 
  ShieldAlert, Users, Activity, Landmark, 
  Database, Terminal, ArrowRightLeft, Contact2, Mail
} from 'lucide-react';
import { User } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Jean Dupont',
  email: 'admin@nexgen.com',
  balance: 12450.75,
  avatar: '', 
  accountNumber: 'FR76 3000 1234 5678 9012 345',
  role: 'ADMIN'
};

export const USER_NAVIGATION = [
  { name: 'Tableau de bord', icon: <LayoutDashboard size={20} />, id: 'dashboard' },
  { name: 'Virements', icon: <ArrowRightLeft size={20} />, id: 'transfers' },
  { name: 'Envoyer un Don', icon: <Heart size={20} />, id: 'donations' },
  { name: 'Contacts', icon: <Contact2 size={20} />, id: 'contacts' },
  { name: 'Transactions', icon: <History size={20} />, id: 'history' },
  { name: 'Mon Profil', icon: <UserIcon size={20} />, id: 'profile' },
];

export const ADMIN_NAVIGATION = [
  { name: 'Command Center', icon: <Activity size={20} />, id: 'admin-dashboard' },
  { name: 'Gestion Utilisateurs', icon: <Users size={20} />, id: 'admin-users' },
  { name: 'Messagerie', icon: <Mail size={20} />, id: 'admin-messages' },
  { name: 'Flux de Trésorerie', icon: <Landmark size={20} />, id: 'admin-finance' },
  { name: 'Logs Système', icon: <Database size={20} />, id: 'admin-logs' },
  { name: 'Sécurité & API', icon: <ShieldAlert size={20} />, id: 'admin-security' },
];

export const MOCK_TRANSACTIONS = [
  { id: 't1', type: 'DONATION', amount: 500, recipientName: 'Fondation Marie Curie', date: '2023-11-20', category: 'Santé', status: 'COMPLETED' },
  { id: 't2', type: 'TRANSFER', amount: 1200, recipientName: 'Pierre Durand', date: '2023-11-18', category: 'Personnel', status: 'COMPLETED' },
  { id: 't3', type: 'DEPOSIT', amount: 3500, recipientName: 'Auto-Virement', date: '2023-11-15', category: 'Salaire', status: 'COMPLETED' },
];

export const MOCK_BENEFICIARIES = [
  { id: 'b1', name: 'Marie Curie', email: 'marie@curie.org', accountNumber: 'FR76 3000 0000 1111 2222 333', category: 'Famille' },
  { id: 'b2', name: 'Pierre Durand', email: 'pierre.d@gmail.com', accountNumber: 'FR76 3000 4444 5555 6666 777', category: 'Amis' },
  { id: 'b3', name: 'Fondation SPA', email: 'contact@spa.fr', accountNumber: 'FR76 3000 8888 9999 0000 111', category: 'Donations' },
  { id: 'b4', name: 'Luc Martin', email: 'luc@martin.fr', accountNumber: 'FR76 1234 5678 9012 3456 789', category: 'Professionnel' },
];

export const MOCK_USERS_LIST = [
  { id: 'u1', name: 'Jean Dupont', email: 'jean@dupont.com', balance: 12450, status: 'Actif', joins: '2023-01-12' },
  { id: 'u2', name: 'Marie Curie', email: 'marie@curie.org', balance: 89200, status: 'Actif', joins: '2023-03-05' },
  { id: 'u3', name: 'Luc Martin', email: 'luc@martin.fr', balance: 1200, status: 'Actif', joins: '2023-05-20' },
  { id: 'u4', name: 'Sarah Wilson', email: 'sarah@wilson.com', balance: 450, status: 'En Révision', joins: '2023-10-15' },
  { id: 'u5', name: 'Robert Fox', email: 'robert@fox.io', balance: 0, status: 'Suspendu', joins: '2023-08-22' },
];
