import React from 'react';
import { Sun, Moon, Download, SlidersHorizontal } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  toggleDark: () => void;
  onExportData: () => void;
  selectedCompareCount: number;
  onOpenCompare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  toggleDark,
  onExportData,
  selectedCompareCount,
  onOpenCompare
}) => {
  const navItems = [
    { id: 'overview', label: '📊 종합 개요 & 트렌드' },
    { id: 'vendors', label: '🏢 글로벌 제조사 탐색기' },
    { id: 'hardware', label: '🔬 센서 & 인터페이스' },
    { id: 'simulator', label: '🧮 트리거 지연 계산기' },
    { id: 'regulations', label: '⚖️ 지정학 & 규제 분석' },
  ];

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 3-Zone Bar */}
        <div className="flex justify-between h-16 items-center gap-6">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="p-2 bg-amber-500 text-white rounded-lg text-lg font-bold select-none">
              📷
            </span>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight whitespace-nowrap">
                비전 & 보안 인텔리전스
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                글로벌 머신비전 및 물리 보안 카메라 산업 분석
              </p>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Clean single-line text links) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold border border-amber-200 dark:border-amber-800'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Actions (Compare counter, Dark mode toggle, Export) */}
          <div className="flex items-center gap-2 shrink-0">
            {selectedCompareCount > 0 && (
              <button
                type="button"
                onClick={onOpenCompare}
                className="px-2.5 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>비교 ({selectedCompareCount})</span>
              </button>
            )}

            {/* Dark mode toggle */}
            <button
              type="button"
              onClick={toggleDark}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Export Report Action */}
            <button
              type="button"
              onClick={onExportData}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-white transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">보고서 내보내기</span>
              <span className="sm:hidden">CSV</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex space-x-1 overflow-x-auto py-2 border-t border-slate-100 dark:border-slate-800 scrollbar-none text-xs">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 cursor-pointer font-medium ${
                activeTab === item.id
                  ? 'bg-amber-500 text-white font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
