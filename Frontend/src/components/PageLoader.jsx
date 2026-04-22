import React from "react";

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      
      <div className="relative w-24 h-24 flex items-center justify-center">
        
        {/* Center SVG Icon - Kuch seconds ke liye aayega aur jayega */}
        <div className="absolute z-10 center-icon">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="36" height="36" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#22d3ee" /* Tailwind cyan-400 */
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>

        {/* Windows Outer Dots */}
        <div className="absolute w-full h-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full win-dot-wrapper"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <span className="absolute top-0 left-1/2 -ml-1.5 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            </div>
          ))}
        </div>

      </div>

      <style>
        {`
        /* Asli Windows Easing Curve */
        .win-dot-wrapper {
          animation: winChase 2.5s infinite cubic-bezier(0.53, 0.21, 0.29, 0.67);
          transform-origin: center center;
          opacity: 0;
        }

        @keyframes winChase {
          0% { transform: rotate(0deg); opacity: 0; }
          5% { opacity: 1; }
          75% { opacity: 1; }
          100% { transform: rotate(360deg); opacity: 0; }
        }

        /* Icon Animation: Aayega, rukega, aur fir gayab hoga */
        .center-icon {
          animation: iconBlink 5s infinite ease-in-out;
        }

        @keyframes iconBlink {
          0% { opacity: 0; transform: scale(0.5); }
          15% { opacity: 1; transform: scale(1); } /* Fade In */
          85% { opacity: 1; transform: scale(1); } /* Stays visible for seconds */
          100% { opacity: 0; transform: scale(0.8); } /* Fade Out */
        }
        `}
      </style>

    </div>
  );
}

export default PageLoader;