import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    fontFamily: 'Inter, sans-serif',
    primaryColor: '#eef2ff',
    primaryTextColor: '#1e1b4b',
    primaryBorderColor: '#c7d2fe',
    lineColor: '#6366f1',
    secondaryColor: '#f5f3ff',
    tertiaryColor: '#f0fdf4',
  },
  securityLevel: 'loose',
});

export const Mermaid = ({ chart }: { chart: string }) => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [isEnlarged, setIsEnlarged] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);

  useEffect(() => {
    const renderChart = async () => {
      try {
        setError(false);
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        // Decode HTML entities that react-markdown might have escaped
        const unescapedChart = chart
          .replace(/&gt;/g, '>')
          .replace(/&lt;/g, '<')
          .replace(/&amp;/g, '&');
        const { svg } = await mermaid.render(id, unescapedChart);
        setSvg(svg);
      } catch (e) {
        console.error('Mermaid rendering error:', e);
        setError(true);
      }
    };
    if (chart) {
      renderChart();
    }
  }, [chart]);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(1);
  };

  const handleClose = () => {
    setIsEnlarged(false);
    setZoom(1);
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 my-6 font-mono text-sm">
        图表渲染失败，请检查语法。
      </div>
    );
  }

  return (
    <>
      <div 
        className="flex justify-center my-8 p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-x-auto cursor-zoom-in group relative"
        onClick={() => setIsEnlarged(true)}
      >
        <div className="absolute top-4 right-4 p-2 bg-zinc-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 className="w-4 h-4 text-zinc-500" />
        </div>
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      </div>

      {isEnlarged && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 md:p-12"
          onClick={handleClose}
        >
          {/* Header Controls */}
          <div className="absolute top-6 right-6 flex items-center gap-4 z-[110]">
            <div className="flex items-center bg-zinc-800/80 backdrop-blur-md rounded-full p-1 border border-zinc-700/50">
              <button 
                onClick={handleZoomOut}
                className="p-2 text-white/70 hover:text-white hover:bg-zinc-700 rounded-full transition-all"
                title="缩小"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <div className="px-3 text-xs font-mono text-white/50 min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </div>
              <button 
                onClick={handleZoomIn}
                className="p-2 text-white/70 hover:text-white hover:bg-zinc-700 rounded-full transition-all"
                title="放大"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <div className="w-px h-4 bg-zinc-700 mx-1" />
              <button 
                onClick={handleResetZoom}
                className="p-2 text-white/70 hover:text-white hover:bg-zinc-700 rounded-full transition-all"
                title="重置"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              onClick={handleClose}
              className="p-2 bg-zinc-800/80 backdrop-blur-md text-white/70 hover:text-white hover:bg-zinc-700 rounded-full border border-zinc-700/50 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content Area */}
          <div 
            className="w-full h-full flex items-center justify-center overflow-auto cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="bg-white p-12 rounded-[2rem] shadow-2xl transition-transform duration-200 ease-out origin-center"
              style={{ transform: `scale(${zoom})` }}
              dangerouslySetInnerHTML={{ __html: svg.replace(/max-width: \d+px;/, 'max-width: 100%;') }} 
            />
          </div>
          
          <div className="absolute bottom-8 text-white/30 text-[10px] uppercase tracking-widest pointer-events-none">
            使用手势或上方按钮进行缩放
          </div>
        </div>
      )}
    </>
  );
};
