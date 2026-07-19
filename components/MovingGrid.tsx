export default function MovingGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex flex-col">
       {/* Wall */}
       <div 
         className="w-full h-[50vh] relative"
         style={{
           backgroundImage: `
             linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), 
             linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
           `,
           backgroundSize: '60px 60px',
           backgroundPosition: 'center bottom',
           animation: 'move-wall 3s linear infinite',
           // Fade out near the top
           maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
           WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)'
         }}
       />
       
       {/* Floor */}
       <div 
         className="w-full h-[50vh] relative origin-top"
         style={{
           perspective: '800px',
         }}
       >
          <div 
            className="absolute inset-x-0 top-0 h-[200vh] origin-top"
            style={{
              transform: 'rotateX(70deg)',
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), 
                linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              backgroundPosition: 'center top',
              animation: 'move-floor 3s linear infinite',
              // Fade out near the horizon (top) and at the very bottom
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 60%, transparent 100%)'
            }}
          />
       </div>

       {/* Overlay to blur the seam and create a soft horizon curve illusion */}
       <div className="absolute inset-x-0 top-[40vh] h-[20vh] bg-gradient-to-b from-transparent via-gray-100 to-transparent pointer-events-none" />

       <style>{`
         @keyframes move-wall {
           0% { background-position: center 0px; }
           100% { background-position: center 60px; }
         }
         @keyframes move-floor {
           0% { background-position: center 0px; }
           100% { background-position: center 60px; }
         }
       `}</style>
    </div>
  );
}
