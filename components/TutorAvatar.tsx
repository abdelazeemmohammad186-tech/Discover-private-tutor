import React from 'react';
import { Language } from '../contexts/LanguageContext';

export type TutorStatus = 'idle' | 'preparing' | 'thinking' | 'speaking';

interface TutorAvatarProps {
  status: TutorStatus;
  className?: string;
  showStatusBadge?: boolean;
  language?: Language;
}

const TutorAvatar: React.FC<TutorAvatarProps> = ({ 
  status, 
  className = "w-40 h-40 md:w-56 md:h-56", 
  showStatusBadge = true,
  language = 'ar'
}) => {
  
  const getBadgeText = () => {
    if (language === 'en') {
       switch(status) {
           case 'preparing': return "Preparing... 📚";
           case 'thinking': return "Thinking... 🤔";
           case 'speaking': return "Speaking 🎙️";
           default: return "Miss AI";
       }
    }
    // Arabic Default - Feminine forms
    switch(status) {
        case 'preparing': return "تجهز الدرس... 📚";
        case 'thinking': return "تفكر... 🤔";
        case 'speaking': return "تتحدث 🎙️";
        default: return "المعلمة الذكية";
    }
  };

  return (
    <div className={`relative mx-auto transition-all duration-500 ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Body Background Circle - Soft Pink/Purple theme */}
        <circle cx="100" cy="100" r="90" fill="#FCE7F3" stroke="#EC4899" strokeWidth="4" />
        
        {/* Hair (Back) - Dark Brown Bun/Long Hair */}
        <path d="M60 90 C 40 110, 40 160, 60 180 L 140 180 C 160 160, 160 110, 140 90" fill="#3E2723" />
        <circle cx="100" cy="85" r="50" fill="#3E2723" /> 

        {/* Neck */}
        <rect x="85" y="145" width="30" height="30" fill="#F5D0C5" />

        {/* Dress/Clothing - Purple Blouse */}
        <path d="M50 180 Q 100 215 150 180 L 150 200 L 50 200 Z" fill="#9333EA" />
        {/* Necklace */}
        <path d="M85 180 Q 100 195 115 180" stroke="#FDBA74" strokeWidth="3" fill="none" />

        {/* Face */}
        <circle cx="100" cy="115" r="45" fill="#F5D0C5" />
        
        {/* Hair (Bangs/Front) */}
        <path d="M55 115 C 55 65, 145 65, 145 115 C 145 95, 120 75, 100 75 C 80 75, 55 95, 55 115" fill="#3E2723" />

        {/* Glasses (Red/Pinkish frame, Cat-eye ish) */}
        <g stroke="#BE123C" strokeWidth="2.5" fill="rgba(255,255,255,0.2)">
            <circle cx="82" cy="112" r="12" />
            <circle cx="118" cy="112" r="12" />
            <line x1="94" y1="112" x2="106" y2="112" />
        </g>

        {/* Eyes Logic */}
        {status === 'preparing' ? (
           // Eyes looking down at book
           <g fill="#1E293B">
             <circle cx="82" cy="118" r="2.5" />
             <circle cx="118" cy="118" r="2.5" />
             {/* Eyelashes */}
             <path d="M70 112 L67 109" stroke="#1E293B" strokeWidth="1.5" />
             <path d="M130 112 L133 109" stroke="#1E293B" strokeWidth="1.5" />
           </g>
        ) : status === 'thinking' ? (
           // Eyes looking up/side
           <g fill="#1E293B">
             <circle cx="82" cy="108" r="2.5">
                <animate attributeName="cy" values="108;106;108" dur="2s" repeatCount="indefinite" />
             </circle>
             <circle cx="118" cy="108" r="2.5">
                <animate attributeName="cy" values="108;106;108" dur="2s" repeatCount="indefinite" />
             </circle>
             <path d="M72 102 Q82 98 92 102" stroke="#1E293B" strokeWidth="1.5" fill="none" />
             <path d="M108 102 Q118 98 128 102" stroke="#1E293B" strokeWidth="1.5" fill="none" />
           </g>
        ) : (
           // Normal Eyes
           <g fill="#1E293B">
             <circle cx="82" cy="112" r="2.5">
                 <animate attributeName="cy" values="112;114;112" dur="4s" repeatCount="indefinite" />
             </circle>
             <circle cx="118" cy="112" r="2.5">
                  <animate attributeName="cy" values="112;114;112" dur="4s" repeatCount="indefinite" />
             </circle>
             {/* Eyelashes */}
             <path d="M70 108 L67 105" stroke="#1E293B" strokeWidth="1.5" />
             <path d="M130 108 L133 105" stroke="#1E293B" strokeWidth="1.5" />
           </g>
        )}

        {/* Mouth Logic */}
        {status === 'speaking' ? (
           <ellipse cx="100" cy="140" rx="8" ry="5" fill="#BE123C">
             <animate attributeName="ry" values="2;6;2" dur="0.3s" repeatCount="indefinite" />
           </ellipse>
        ) : status === 'preparing' ? (
           <circle cx="100" cy="140" r="2.5" fill="#BE123C" />
        ) : status === 'thinking' ? (
           <path d="M96 140 L104 140" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" />
        ) : (
           <path d="M90 140 Q100 148 110 140" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" fill="none" />
        )}

        {/* Book (Visible only when preparing) */}
        {status === 'preparing' && (
            <g transform="translate(0, 15)">
                <rect x="60" y="160" width="80" height="30" rx="2" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2" />
                <path d="M60 175 L140 175" stroke="#60A5FA" strokeWidth="1" />
                <rect x="65" y="165" width="30" height="20" rx="1" fill="white" />
                <rect x="105" y="165" width="30" height="20" rx="1" fill="white" />
                <animateTransform attributeName="transform" type="translate" values="0,15; 0,17; 0,15" dur="2s" repeatCount="indefinite" />
            </g>
        )}
      </svg>
      
      {/* Status Badge */}
      {showStatusBadge && (
        <div className={`
            absolute -bottom-4 left-1/2 transform -translate-x-1/2 
            px-4 py-2 rounded-xl shadow-lg text-sm font-bold border border-pink-100 whitespace-nowrap transition-all
            ${status === 'speaking' ? 'bg-green-100 text-green-700 scale-110' : 
            status === 'preparing' ? 'bg-yellow-100 text-yellow-700' :
            status === 'thinking' ? 'bg-purple-100 text-purple-700' :
            'bg-white text-pink-600'}
        `}>
            {getBadgeText()}
        </div>
      )}
    </div>
  );
};

export default TutorAvatar;