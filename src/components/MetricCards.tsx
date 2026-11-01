import React, { useState } from 'react';
import { METRIC_CARDS, MetricCardData } from '../data/industryData';
import { TrendingUp, ShieldCheck, Cpu, AlertTriangle, ArrowUpRight, Scale, Info, CheckCircle2, X } from 'lucide-react';

interface MetricCardsProps {
  onSelectVendorForNdaa?: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ onSelectVendorForNdaa, onNavigateToTab }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'market' | 'regulation' | 'tech'>('all');
  const [selectedMetric, setSelectedMetric] = useState<MetricCardData | null>(null);

  const filteredCards = METRIC_CARDS.filter((card) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'market') return card.category === 'market';
    if (activeCategory === 'regulation') return card.category === 'regulation';
    if (activeCategory === 'tech') return card.category === 'tech';
    return true;
  });

  return (
    <section className="space-y-4">
      {/* Header and Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <span>핵심 인텔리전스 지표</span>
            <span aria-hidden="true">·</span>
            <span>2026 최신 시장 및 규제 데이터</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            머신비전 시장 동향 & NDAA / EU AI Act 핵심 수치
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            고속 온디바이스 NPU 전환율, 센서 공정 고도화 및 글로벌 서방 공급망 규제 대응 실태
          </p>
        </div>

        {/* Category Filter Buttons (Functional Buttons, not static pills) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            전체 지표 ({METRIC_CARDS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('market')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'market'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>시장 규모</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('regulation')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'regulation'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>NDAA / 규제</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('tech')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'tech'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>센서 & NPU</span>
          </button>
        </div>
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCards.map((card) => {
          const isRegulation = card.category === 'regulation';
          const isMarket = card.category === 'market';
          const isTech = card.category === 'tech';

          return (
            <div
              key={card.id}
              onClick={() => setSelectedMetric(card)}
              className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md hover:border-amber-300 dark:hover:border-amber-500/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Top unboxed metadata line */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <div className="flex items-center gap-1.5 font-medium">
                    {isRegulation ? (
                      <Scale className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    ) : isTech ? (
                      <Cpu className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                    ) : (
                      <TrendingUp className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    )}
                    <span>
                      {isRegulation ? '규제 & 지정학' : isTech ? '하드웨어 & AI' : '시장 성장'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{card.statusLabel}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 flex items-center gap-0.5 transition-colors">
                    상세보기
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                  {card.title}
                </h3>

                {/* Main Metric Value */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight tabular-nums">
                    {card.value}
                  </span>
                  {card.unit && (
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                      {card.unit}
                    </span>
                  )}
                  {card.changeRate && (
                    <span
                      className={`ml-auto text-xs font-semibold font-mono tabular-nums px-2 py-0.5 rounded ${
                        card.isPositiveChange
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      }`}
                    >
                      {card.changeRate}
                    </span>
                  )}
                </div>

                {/* Subvalue text */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                  {card.subValue}
                </p>

                {/* Short Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Bottom Quick Snippet */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {card.regulationRef ? (
                  <span className="truncate max-w-[240px] text-blue-600 dark:text-blue-400">
                    근거: {card.regulationRef}
                  </span>
                ) : (
                  <span>주요 동인: {card.keyPoints[0].slice(0, 32)}...</span>
                )}
                <span className="text-slate-400 shrink-0">Click to expand</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Metric Detail Modal Drawer */}
      {selectedMetric && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedMetric(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 pr-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <span>{selectedMetric.category === 'regulation' ? '지정학 & 규제 프레임워크' : selectedMetric.category === 'tech' ? '차세대 기술 동향' : '산업 시장 분석'}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedMetric.statusLabel}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {selectedMetric.title}
              </h3>
            </div>

            {/* Modal Body */}
            <div className="py-4 space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">기준 지표 수치</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                      {selectedMetric.value}
                    </span>
                    {selectedMetric.unit && (
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                        {selectedMetric.unit}
                      </span>
                    )}
                  </div>
                </div>
                {selectedMetric.changeRate && (
                  <span className="text-xs font-semibold font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-800">
                    {selectedMetric.changeRate}
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  현황 분석 및 시사점
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedMetric.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  핵심 영향 및 세부 동향
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {selectedMetric.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedMetric.regulationRef && (
                <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300">
                  <span className="font-bold">법적 규정 및 표준 조항:</span>{' '}
                  <span className="font-mono">{selectedMetric.regulationRef}</span>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">데이터 갱신: 2026 Q3 실측치</span>
              <div className="flex gap-2">
                {selectedMetric.category === 'regulation' && onNavigateToTab && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMetric(null);
                      onNavigateToTab('regulations');
                    }}
                    className="px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium transition-colors cursor-pointer"
                  >
                    규제 상세 탭으로 이동 →
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedMetric(null)}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 font-medium transition-colors cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
