
import React from 'react';

interface UserAvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, src, size = 'md', className = '' }) => {
  // Génère une couleur de fond stable basée sur le nom
  const getBackgroundColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    return `hsl(${h}, 60%, 50%)`;
  };

  const initial = name.charAt(0).toUpperCase();
  const bgColor = getBackgroundColor(name);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-28 h-28 text-3xl',
  };

  if (src && src.trim() !== '') {
    return (
      <img 
        src={src} 
        alt={name} 
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-sm ${className}`} 
      />
    );
  }

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-black text-white shadow-inner border-2 border-white/20 ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {initial}
    </div>
  );
};

export default UserAvatar;
