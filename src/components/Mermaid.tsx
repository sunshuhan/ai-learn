import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';

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

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 my-6 font-mono text-sm">
        图表渲染失败，请检查语法。
      </div>
    );
  }

  return (
    <div 
      className="flex justify-center my-8 p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
};
