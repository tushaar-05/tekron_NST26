import React, { useState } from 'react';

const VendingMachineFrame = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #0a0315 0%, #1a0b2e 50%, #0d0520 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <svg 
        viewBox="0 0 800 600" 
        style={{ 
          width: '95%', 
          height: '95%',
          filter: 'drop-shadow(0 0 30px rgba(138, 79, 255, 0.3))'
        }}
      >
        <defs>
          {/* Neon glow filters */}
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <radialGradient id="floorGlow">
            <stop offset="0%" style={{stopColor: '#8a4fff', stopOpacity: 0.3}} />
            <stop offset="100%" style={{stopColor: '#1a0b2e', stopOpacity: 0}} />
          </radialGradient>

          <linearGradient id="reflectionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#8a4fff', stopOpacity: 0.4}} />
            <stop offset="100%" style={{stopColor: '#1a0b2e', stopOpacity: 0}} />
          </linearGradient>

          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#0d0520', stopOpacity: 0.9}} />
            <stop offset="100%" style={{stopColor: '#1a0b2e', stopOpacity: 0.7}} />
          </linearGradient>
        </defs>

        {/* Background ambient glow */}
        <ellipse cx="400" cy="550" rx="350" ry="40" fill="url(#floorGlow)" opacity="0.4"/>

        {/* Main vending machine body - angled perspective */}
        <g transform="skewY(-3)">
          
          {/* Left side panel (3D depth) - enhanced */}
          <polygon points="100,60 145,85 145,530 100,505" fill="#0d0520" stroke="#1a0b2e" strokeWidth="2"/>
          <polygon points="100,60 145,85 145,120 100,95" fill="#1a0b2e" opacity="0.8"/>
          <rect x="110" y="250" width="30" height="150" fill="#0a0315" opacity="0.6"/>
          <line x1="122" y1="100" x2="122" y2="500" stroke="#2d1b69" strokeWidth="1" opacity="0.5"/>
          
          {/* Main front face */}
          <rect x="145" y="85" width="555" height="445" fill="#1a0b2e" stroke="#2d1b69" strokeWidth="3"/>
          
          {/* Top decorative band */}
          <rect x="145" y="85" width="555" height="38" fill="#2d1b69"/>
          <rect x="145" y="85" width="555" height="4" fill="#8a4fff" filter="url(#neonGlow)"/>
          <rect x="145" y="119" width="555" height="4" fill="#8a4fff" filter="url(#neonGlow)"/>
          
          {/* COMPETITIONS title */}
          <g filter="url(#strongGlow)">
            {/* C */}
            <rect x="185" y="92" width="4" height="20" fill="#d8c6f2"/>
            <rect x="185" y="92" width="16" height="4" fill="#d8c6f2"/>
            <rect x="185" y="108" width="16" height="4" fill="#d8c6f2"/>
            
            {/* O */}
            <rect x="210" y="92" width="16" height="4" fill="#d8c6f2"/>
            <rect x="210" y="92" width="4" height="20" fill="#d8c6f2"/>
            <rect x="222" y="92" width="4" height="20" fill="#d8c6f2"/>
            <rect x="210" y="108" width="16" height="4" fill="#d8c6f2"/>
            
            {/* M */}
            <rect x="235" y="92" width="4" height="20" fill="#d8c6f2"/>
            <rect x="239" y="96" width="4" height="4" fill="#d8c6f2"/>
            <rect x="243" y="100" width="4" height="4" fill="#d8c6f2"/>
            <rect x="247" y="96" width="4" height="4" fill="#d8c6f2"/>
            <rect x="251" y="92" width="4" height="20" fill="#d8c6f2"/>
            
            {/* P */}
            <rect x="264" y="92" width="4" height="20" fill="#d8c6f2"/>
            <rect x="264" y="92" width="12" height="4" fill="#d8c6f2"/>
            <rect x="272" y="96" width="4" height="4" fill="#d8c6f2"/>
            <rect x="264" y="100" width="12" height="4" fill="#d8c6f2"/>
            
            {/* E */}
            <rect x="285" y="92" width="4" height="20" fill="#d8c6f2"/>
            <rect x="285" y="92" width="14" height="4" fill="#d8c6f2"/>
            <rect x="285" y="100" width="12" height="4" fill="#d8c6f2"/>
            <rect x="285" y="108" width="14" height="4" fill="#d8c6f2"/>
            
            {/* T */}
            <rect x="308" y="92" width="16" height="4" fill="#d8c6f2"/>
            <rect x="314" y="92" width="4" height="20" fill="#d8c6f2"/>
            
            {/* I */}
            <rect x="333" y="92" width="12" height="4" fill="#d8c6f2"/>
            <rect x="337" y="92" width="4" height="20" fill="#d8c6f2"/>
            <rect x="333" y="108" width="12" height="4" fill="#d8c6f2"/>
            
            {/* T */}
            <rect x="354" y="92" width="16" height="4" fill="#d8c6f2"/>
            <rect x="360" y="92" width="4" height="20" fill="#d8c6f2"/>
            
            {/* I */}
            <rect x="379" y="92" width="12" height="4" fill="#d8c6f2"/>
            <rect x="383" y="92" width="4" height="20" fill="#d8c6f2"/>
            <rect x="379" y="108" width="12" height="4" fill="#d8c6f2"/>
            
            {/* O */}
            <rect x="400" y="92" width="16" height="4" fill="#d8c6f2"/>
            <rect x="400" y="92" width="4" height="20" fill="#d8c6f2"/>
            <rect x="412" y="92" width="4" height="20" fill="#d8c6f2"/>
            <rect x="400" y="108" width="16" height="4" fill="#d8c6f2"/>
            
            {/* N */}
            <rect x="425" y="92" width="4" height="20" fill="#d8c6f2"/>
            <rect x="429" y="96" width="4" height="4" fill="#d8c6f2"/>
            <rect x="433" y="100" width="4" height="4" fill="#d8c6f2"/>
            <rect x="437" y="92" width="4" height="20" fill="#d8c6f2"/>
            
            {/* S */}
            <rect x="450" y="92" width="16" height="4" fill="#d8c6f2"/>
            <rect x="450" y="92" width="4" height="8" fill="#d8c6f2"/>
            <rect x="450" y="100" width="16" height="4" fill="#d8c6f2"/>
            <rect x="462" y="104" width="4" height="8" fill="#d8c6f2"/>
            <rect x="450" y="108" width="16" height="4" fill="#d8c6f2"/>
          </g>

          {/* Main display screen area with competition posters */}
          <g>
            {/* Outer frame */}
            <rect 
              x="170" 
              y="140" 
              width="450" 
              height="300" 
              fill="url(#screenGrad)" 
              stroke="#8a4fff" 
              strokeWidth="3" 
              filter="url(#neonGlow)"
            />
            
            {/* Inner glass border effect */}
            <rect 
              x="177" 
              y="147" 
              width="436" 
              height="286" 
              fill="transparent" 
              stroke="#6b3dcc" 
              strokeWidth="1" 
              opacity="0.5"
            />
            
            {/* Poster Row 1 */}
            <g>
              {/* Poster 1 - Coding Competition */}
              <rect x="185" y="160" width="130" height="120" fill="#2d1b69" stroke="#6b3dcc" strokeWidth="1"/>
              <text x="250" y="185" textAnchor="middle" fill="#d8c6f2" fontSize="11" fontWeight="bold" fontFamily="monospace">HACKATHON</text>
              <text x="250" y="200" textAnchor="middle" fill="#8a4fff" fontSize="9" fontFamily="monospace">2025</text>
              <rect x="195" y="210" width="110" height="2" fill="#8a4fff" opacity="0.6"/>
              <text x="250" y="225" textAnchor="middle" fill="#d8c6f2" fontSize="7" fontFamily="monospace">Build • Code • Win</text>
              <text x="250" y="235" textAnchor="middle" fill="#6b3dcc" fontSize="6" fontFamily="monospace">DEC 15-17</text>
              <circle cx="210" cy="255" r="8" fill="#8a4fff" opacity="0.3"/>
              <circle cx="250" cy="255" r="8" fill="#8a4fff" opacity="0.3"/>
              <circle cx="290" cy="255" r="8" fill="#8a4fff" opacity="0.3"/>
              
              {/* Poster 2 - Design Competition */}
              <rect x="325" y="160" width="130" height="120" fill="#2d1b69" stroke="#6b3dcc" strokeWidth="1"/>
              <text x="390" y="185" textAnchor="middle" fill="#d8c6f2" fontSize="11" fontWeight="bold" fontFamily="monospace">DESIGN</text>
              <text x="390" y="200" textAnchor="middle" fill="#d8c6f2" fontSize="11" fontWeight="bold" fontFamily="monospace">CONTEST</text>
              <rect x="335" y="210" width="110" height="2" fill="#8a4fff" opacity="0.6"/>
              <text x="390" y="225" textAnchor="middle" fill="#d8c6f2" fontSize="7" fontFamily="monospace">Create Amazing UI</text>
              <text x="390" y="235" textAnchor="middle" fill="#6b3dcc" fontSize="6" fontFamily="monospace">JAN 5-8</text>
              <rect x="350" y="245" width="15" height="15" fill="#6b3dcc" opacity="0.4"/>
              <rect x="370" y="245" width="15" height="15" fill="#8a4fff" opacity="0.4"/>
              <rect x="390" y="245" width="15" height="15" fill="#6b3dcc" opacity="0.4"/>
              <rect x="410" y="245" width="15" height="15" fill="#8a4fff" opacity="0.4"/>
              
              {/* Poster 3 - AI Competition */}
              <rect x="465" y="160" width="130" height="120" fill="#2d1b69" stroke="#6b3dcc" strokeWidth="1"/>
              <text x="530" y="185" textAnchor="middle" fill="#d8c6f2" fontSize="11" fontWeight="bold" fontFamily="monospace">AI SUMMIT</text>
              <rect x="475" y="195" width="110" height="2" fill="#8a4fff" opacity="0.6"/>
              <text x="530" y="210" textAnchor="middle" fill="#d8c6f2" fontSize="7" fontFamily="monospace">Machine Learning</text>
              <text x="530" y="220" textAnchor="middle" fill="#d8c6f2" fontSize="7" fontFamily="monospace">Challenge</text>
              <text x="530" y="235" textAnchor="middle" fill="#6b3dcc" fontSize="6" fontFamily="monospace">FEB 12-14</text>
              <circle cx="505" cy="255" r="12" fill="none" stroke="#8a4fff" strokeWidth="2" opacity="0.5"/>
              <circle cx="530" cy="255" r="12" fill="none" stroke="#8a4fff" strokeWidth="2" opacity="0.5"/>
              <circle cx="555" cy="255" r="12" fill="none" stroke="#8a4fff" strokeWidth="2" opacity="0.5"/>
            </g>
            
            {/* Poster Row 2 */}
            <g>
              {/* Poster 4 - Data Science */}
              <rect x="185" y="290" width="130" height="120" fill="#2d1b69" stroke="#6b3dcc" strokeWidth="1"/>
              <text x="250" y="315" textAnchor="middle" fill="#d8c6f2" fontSize="10" fontWeight="bold" fontFamily="monospace">DATA SCI</text>
              <text x="250" y="328" textAnchor="middle" fill="#d8c6f2" fontSize="10" fontWeight="bold" fontFamily="monospace">CHALLENGE</text>
              <rect x="195" y="338" width="110" height="2" fill="#8a4fff" opacity="0.6"/>
              <text x="250" y="353" textAnchor="middle" fill="#d8c6f2" fontSize="7" fontFamily="monospace">Analyze • Predict</text>
              <text x="250" y="363" textAnchor="middle" fill="#6b3dcc" fontSize="6" fontFamily="monospace">MAR 20-22</text>
              <rect x="215" y="375" width="70" height="20" fill="#8a4fff" opacity="0.2"/>
              <text x="250" y="389" textAnchor="middle" fill="#d8c6f2" fontSize="7" fontFamily="monospace">REGISTER</text>
              
              {/* Poster 5 - Game Dev */}
              <rect x="325" y="290" width="130" height="120" fill="#2d1b69" stroke="#6b3dcc" strokeWidth="1"/>
              <text x="390" y="315" textAnchor="middle" fill="#d8c6f2" fontSize="11" fontWeight="bold" fontFamily="monospace">GAME JAM</text>
              <rect x="335" y="325" width="110" height="2" fill="#8a4fff" opacity="0.6"/>
              <text x="390" y="340" textAnchor="middle" fill="#d8c6f2" fontSize="7" fontFamily="monospace">48 Hour Sprint</text>
              <text x="390" y="355" textAnchor="middle" fill="#6b3dcc" fontSize="6" fontFamily="monospace">APR 8-10</text>
              <polygon points="370,375 390,365 410,375 390,385" fill="#8a4fff" opacity="0.4"/>
              <circle cx="345" cy="380" r="6" fill="#6b3dcc" opacity="0.4"/>
              <circle cx="435" cy="380" r="6" fill="#6b3dcc" opacity="0.4"/>
              
              {/* Poster 6 - Cybersecurity */}
              <rect x="465" y="290" width="130" height="120" fill="#2d1b69" stroke="#6b3dcc" strokeWidth="1"/>
              <text x="530" y="315" textAnchor="middle" fill="#d8c6f2" fontSize="10" fontWeight="bold" fontFamily="monospace">CYBER CTF</text>
              <rect x="475" y="325" width="110" height="2" fill="#8a4fff" opacity="0.6"/>
              <text x="530" y="340" textAnchor="middle" fill="#d8c6f2" fontSize="7" fontFamily="monospace">Capture The Flag</text>
              <text x="530" y="355" textAnchor="middle" fill="#6b3dcc" fontSize="6" fontFamily="monospace">MAY 15-16</text>
              <rect x="495" y="370" width="70" height="25" fill="none" stroke="#8a4fff" strokeWidth="2" opacity="0.4"/>
              <text x="530" y="386" textAnchor="middle" fill="#8a4fff" fontSize="8" fontFamily="monospace">SECURE</text>
            </g>
            
            {/* Corner details */}
            <rect x="170" y="140" width="8" height="8" fill="#d8c6f2" opacity="0.6"/>
            <rect x="612" y="140" width="8" height="8" fill="#d8c6f2" opacity="0.6"/>
            <rect x="170" y="432" width="8" height="8" fill="#d8c6f2" opacity="0.6"/>
            <rect x="612" y="432" width="8" height="8" fill="#d8c6f2" opacity="0.6"/>
          </g>

          {/* Right control panel */}
          <g>
            {/* Panel background */}
            <rect x="635" y="140" width="50" height="300" fill="#1a0b2e" stroke="#2d1b69" strokeWidth="2"/>
            
            {/* Decorative buttons (non-functional) */}
            <g filter="url(#neonGlow)">
              {/* Button 1 - Purple */}
              <rect 
                x="643" 
                y="160" 
                width="35" 
                height="22" 
                rx="2" 
                fill="#6b3dcc" 
                stroke="#8a4fff" 
                strokeWidth="1"
                style={{
                  cursor: 'pointer',
                  opacity: hoveredButton === 1 ? 1 : 0.8
                }}
                onMouseEnter={() => setHoveredButton(1)}
                onMouseLeave={() => setHoveredButton(null)}
              />
              <rect x="647" y="164" width="27" height="14" fill="#4a2a8a" opacity="0.6"/>
              
              {/* Button 2 - Blue */}
              <rect 
                x="643" 
                y="195" 
                width="35" 
                height="22" 
                rx="2" 
                fill="#4a5f8a" 
                stroke="#6b8fd8" 
                strokeWidth="1"
                style={{
                  cursor: 'pointer',
                  opacity: hoveredButton === 2 ? 1 : 0.8
                }}
                onMouseEnter={() => setHoveredButton(2)}
                onMouseLeave={() => setHoveredButton(null)}
              />
              <rect x="647" y="199" width="27" height="14" fill="#2d4469" opacity="0.6"/>
              
              {/* Button 3 - Lavender */}
              <rect 
                x="643" 
                y="230" 
                width="35" 
                height="22" 
                rx="2" 
                fill="#8a6bcc" 
                stroke="#d8c6f2" 
                strokeWidth="1"
                style={{
                  cursor: 'pointer',
                  opacity: hoveredButton === 3 ? 1 : 0.8
                }}
                onMouseEnter={() => setHoveredButton(3)}
                onMouseLeave={() => setHoveredButton(null)}
              />
              <rect x="647" y="234" width="27" height="14" fill="#6b4a9a" opacity="0.6"/>
              
              {/* Button 4 - Purple */}
              <rect 
                x="643" 
                y="265" 
                width="35" 
                height="22" 
                rx="2" 
                fill="#6b3dcc" 
                stroke="#8a4fff" 
                strokeWidth="1"
                style={{
                  cursor: 'pointer',
                  opacity: hoveredButton === 4 ? 1 : 0.8
                }}
                onMouseEnter={() => setHoveredButton(4)}
                onMouseLeave={() => setHoveredButton(null)}
              />
              <rect x="647" y="269" width="27" height="14" fill="#4a2a8a" opacity="0.6"/>
              
              {/* Button 5 - Blue */}
              <rect 
                x="643" 
                y="300" 
                width="35" 
                height="22" 
                rx="2" 
                fill="#4a5f8a" 
                stroke="#6b8fd8" 
                strokeWidth="1"
                style={{
                  cursor: 'pointer',
                  opacity: hoveredButton === 5 ? 1 : 0.8
                }}
                onMouseEnter={() => setHoveredButton(5)}
                onMouseLeave={() => setHoveredButton(null)}
              />
              <rect x="647" y="304" width="27" height="14" fill="#2d4469" opacity="0.6"/>
            </g>
            
            {/* Indicator lights */}
            <g>
              <circle cx="660" cy="345" r="4" fill="#ff4d4d" filter="url(#neonGlow)">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="660" cy="360" r="4" fill="#4dff4d" filter="url(#neonGlow)">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="660" cy="375" r="4" fill="#4d9fff" filter="url(#neonGlow)">
                <animate attributeName="opacity" values="1;0.5;1" dur="1.8s" repeatCount="indefinite"/>
              </circle>
            </g>
            
            {/* Speaker grille */}
            <g opacity="0.6">
              <line x1="643" y1="395" x2="677" y2="395" stroke="#4a2a8a" strokeWidth="1"/>
              <line x1="643" y1="400" x2="677" y2="400" stroke="#4a2a8a" strokeWidth="1"/>
              <line x1="643" y1="405" x2="677" y2="405" stroke="#4a2a8a" strokeWidth="1"/>
              <line x1="643" y1="410" x2="677" y2="410" stroke="#4a2a8a" strokeWidth="1"/>
              <line x1="643" y1="415" x2="677" y2="415" stroke="#4a2a8a" strokeWidth="1"/>
              <line x1="643" y1="420" x2="677" y2="420" stroke="#4a2a8a" strokeWidth="1"/>
            </g>
          </g>

          {/* Output tray (decorative) */}
          <g>
            <rect x="170" y="455" width="450" height="50" fill="#0d0520" stroke="#6b3dcc" strokeWidth="2"/>
            <rect x="170" y="455" width="450" height="3" fill="#8a4fff" filter="url(#neonGlow)"/>
            
            {/* Tray opening */}
            <rect x="190" y="470" width="410" height="25" fill="rgba(26, 11, 46, 0.9)" stroke="#4a2a8a" strokeWidth="1"/>
            <path d="M 190 470 L 205 475 L 585 475 L 600 470 Z" fill="#1a0b2e" opacity="0.7"/>
          </g>

          {/* Coin slot (decorative) */}
          <g>
            <rect x="180" y="510" width="40" height="28" rx="2" fill="#1a0b2e" stroke="#4a2a8a" strokeWidth="2"/>
            <rect x="186" y="518" width="28" height="10" rx="1" fill="#0d0520"/>
            <text x="190" y="526" fontFamily="monospace" fontSize="7" fill="#6b3dcc">COIN</text>
          </g>

          {/* Decorative vents and panels */}
          <g opacity="0.4">
            {/* Top vents */}
            <rect x="540" y="90" width="3" height="3" fill="#6b3dcc"/>
            <rect x="546" y="90" width="3" height="3" fill="#6b3dcc"/>
            <rect x="552" y="90" width="3" height="3" fill="#6b3dcc"/>
            <rect x="558" y="90" width="3" height="3" fill="#6b3dcc"/>
            
            {/* Side panel lines */}
            <line x1="155" y1="140" x2="155" y2="520" stroke="#4a2a8a" strokeWidth="1"/>
            <line x1="690" y1="140" x2="690" y2="520" stroke="#4a2a8a" strokeWidth="1"/>
            
            {/* Screw details */}
            <circle cx="152" cy="132" r="2" fill="#2d1b69" stroke="#4a2a8a" strokeWidth="0.5"/>
            <circle cx="693" cy="132" r="2" fill="#2d1b69" stroke="#4a2a8a" strokeWidth="0.5"/>
            <circle cx="152" cy="523" r="2" fill="#2d1b69" stroke="#4a2a8a" strokeWidth="0.5"/>
            <circle cx="693" cy="523" r="2" fill="#2d1b69" stroke="#4a2a8a" strokeWidth="0.5"/>
          </g>

          {/* Neon edge highlights */}
          <g filter="url(#neonGlow)">
            <line x1="145" y1="85" x2="145" y2="530" stroke="#8a4fff" strokeWidth="2" opacity="0.6"/>
            <line x1="700" y1="85" x2="700" y2="530" stroke="#8a4fff" strokeWidth="2" opacity="0.6"/>
            <line x1="145" y1="530" x2="700" y2="530" stroke="#8a4fff" strokeWidth="2" opacity="0.6"/>
          </g>

          {/* Right side panel (3D depth) - enhanced */}
          <polygon points="700,85 730,60 730,505 700,530" fill="#0d0520" stroke="#1a0b2e" strokeWidth="2" opacity="0.7"/>
          <polygon points="700,85 730,60 730,120 700,123" fill="#1a0b2e" opacity="0.6"/>
          <line x1="715" y1="150" x2="715" y2="480" stroke="#2d1b69" strokeWidth="2" opacity="0.5"/>
          <rect x="705" y="280" width="20" height="100" fill="#0a0315" opacity="0.5"/>

        </g>

        {/* Floor reflection */}
        <g opacity="0.2">
          <ellipse cx="400" cy="535" rx="300" ry="20" fill="url(#reflectionGrad)"/>
        </g>

      </svg>

      {/* Info panel */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        background: 'rgba(26, 11, 46, 0.9)',
        border: '2px solid #8a4fff',
        borderRadius: '8px',
        padding: '15px',
        color: '#d8c6f2',
        fontFamily: 'monospace',
        fontSize: '12px',
        maxWidth: '250px'
      }}>
        <div style={{ marginBottom: '8px', color: '#8a4fff', fontWeight: 'bold' }}>
          PIXEL ART VENDING MACHINE
        </div>
        <div style={{ fontSize: '10px', lineHeight: '1.5' }}>
          • Enhanced 3D perspective<br/>
          • 6 competition posters displayed<br/>
          • Neon lavender highlights<br/>
          • Interactive hover effects<br/>
          • Retro 32-bit aesthetic
        </div>
      </div>
    </div>
  );
};

export default VendingMachineFrame;