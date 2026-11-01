import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import { MARKET_GROWTH_DATA } from '../data/industryData';
import { TrendingUp, DollarSign, Activity, HelpCircle, Layers } from 'lucide-react';

export const MarketGrowthChart: React.FC = () => {
  const [metricView, setMetricView] = useState<'growth' | 'size'>('growth');
  const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>({
    total: true,
    semi: true,
    battery: true,
    robotics: true,
    medical: false,
  });

  const toggleLine = (key: string) => {
    setVisibleLines((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Recharts data mapper
  const chartData = MARKET_GROWTH_DATA.map((item) => ({
    year: item.year,
    '전체 머신비전 시장': metricView === 'growth' ? item.totalGrowthRate : item.totalMarket,
    '반도체 & 전자 패키징': metricView === 'growth' ? item.semiGrowthRate : item.semiconductor,
    '2차전지 배터리 & EV': metricView === 'growth' ? item.batteryGrowthRate : item.evBattery,
    '스마트 팩토리 & 로보틱스': metricView === 'growth' ? item.roboticsGrowthRate : item.roboticsAutomation,
    '의료 & 바이오 비전': metricView === 'growth' ? item.medicalGrowthRate : item.medicalLifeScience,
  }));

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl text-xs space-y-1.5 z-50">
          <div className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-1 flex justify-between items-center gap-4">
            <span>{label}년도 지표</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {String(label).includes('E') ? '전망치 (Forecast)' : '실적치 (Actual)'}
            </span>
          </div>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex justify-between items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                <span className="truncate max-w-[150px] font-sans">{entry.name}:</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                {metricView === 'growth' ? `${Number(entry.value).toFixed(1)}%` : `$${Number(entry.value).toFixed(1)}B`}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <span>Recharts 다중 라인 시각화</span>
            <span aria-hidden="true">·</span>
            <span>2020 ~ 2030E 장기 시계열 분석</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
            머신비전 주요 산업군별 연도별 성장률 & 시장 규모 추이
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            2차전지 배터리 검사의 고성장세와 반도체 HBM/어드밴스드 패키징 고해상도 비전 수요 전환 추이
          </p>
        </div>

        {/* View Mode Toggle: Growth Rate (%) vs Market Size ($B) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setMetricView('growth')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              metricView === 'growth'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>연도별 성장률 (YoY %)</span>
          </button>
          <button
            type="button"
            onClick={() => setMetricView('size')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              metricView === 'size'
                ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>시장 규모 (B USD)</span>
          </button>
        </div>
      </div>

      {/* Interactive Line Filters */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 dark:text-slate-400 font-semibold text-[11px]">
          표시 계열 선택:
        </span>
        <button
          type="button"
          onClick={() => toggleLine('total')}
          className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            visibleLines.total
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 font-bold'
              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 line-through'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>전체 시장</span>
        </button>

        <button
          type="button"
          onClick={() => toggleLine('battery')}
          className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            visibleLines.battery
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-300 font-bold'
              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 line-through'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span>2차전지 배터리 & EV</span>
        </button>

        <button
          type="button"
          onClick={() => toggleLine('semi')}
          className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            visibleLines.semi
              ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-300 font-bold'
              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 line-through'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span>반도체 & 전자 패키징</span>
        </button>

        <button
          type="button"
          onClick={() => toggleLine('robotics')}
          className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            visibleLines.robotics
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 font-bold'
              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 line-through'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>스마트 팩토리 & 로보틱스</span>
        </button>

        <button
          type="button"
          onClick={() => toggleLine('medical')}
          className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            visibleLines.medical
              ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-300 font-bold'
              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 line-through'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
          <span>의료 & 바이오 비전</span>
        </button>
      </div>

      {/* Multi-Line Recharts Chart */}
      <div className="w-full h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800/60" vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
              unit={metricView === 'growth' ? '%' : 'B'}
              domain={metricView === 'growth' ? [-10, 32] : [0, 28]}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Reference Line for 2026 (Current Benchmark) */}
            <ReferenceLine
              x="2026"
              stroke="#f59e0b"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: '2026 현재 실측 기준',
                position: 'top',
                fill: '#d97706',
                fontSize: 10,
                fontWeight: 'bold',
              }}
            />

            {/* Total Market Line */}
            {visibleLines.total && (
              <Line
                type="monotone"
                dataKey="전체 머신비전 시장"
                stroke="#d97706"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#ffffff', stroke: '#d97706' }}
                activeDot={{ r: 6, fill: '#d97706' }}
              />
            )}

            {/* EV Battery Line */}
            {visibleLines.battery && (
              <Line
                type="monotone"
                dataKey="2차전지 배터리 & EV"
                stroke="#f43f5e"
                strokeWidth={2.5}
                dot={{ r: 3.5, strokeWidth: 2, fill: '#ffffff', stroke: '#f43f5e' }}
                activeDot={{ r: 6, fill: '#f43f5e' }}
              />
            )}

            {/* Semiconductor Line */}
            {visibleLines.semi && (
              <Line
                type="monotone"
                dataKey="반도체 & 전자 패키징"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={{ r: 3.5, strokeWidth: 2, fill: '#ffffff', stroke: '#3b82f6' }}
                activeDot={{ r: 6, fill: '#3b82f6' }}
              />
            )}

            {/* Smart Factory Robotics Line */}
            {visibleLines.robotics && (
              <Line
                type="monotone"
                dataKey="스마트 팩토리 & 로보틱스"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 2, fill: '#ffffff', stroke: '#10b981' }}
                activeDot={{ r: 5, fill: '#10b981' }}
              />
            )}

            {/* Medical Line */}
            {visibleLines.medical && (
              <Line
                type="monotone"
                dataKey="의료 & 바이오 비전"
                stroke="#a855f7"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 2, fill: '#ffffff', stroke: '#a855f7' }}
                activeDot={{ r: 5, fill: '#a855f7' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key Takeaways & Highlights Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3 bg-rose-50/60 dark:bg-rose-950/20 rounded-xl border border-rose-200/80 dark:border-rose-900/50 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-rose-800 dark:text-rose-300">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>최고 성장률: 2차전지 배터리</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
            배터리 파우치 노칭/폴딩 및 롤투롤 전극 표면 검사 수요 급증으로 연평균 <strong>+20~28%</strong> 고속 성장 지속.
          </p>
        </div>

        <div className="p-3 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl border border-blue-200/80 dark:border-blue-900/50 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-blue-800 dark:text-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>최대 비중: 반도체 & 전자</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
            HBM 3D 적층 및 미세 범프 검사를 위한 초고해상도(127MP+) 및 CXP-12 고속 전송 도입 확대로 2030년 <strong>$11.7B</strong> 돌파 전망.
          </p>
        </div>

        <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200/80 dark:border-amber-900/50 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>전체 시장 전망: 2030년 $25.6B</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
            온디바이스 NPU 스마트 카메라와 이면조사 BSI 글로벌 셔터(Pregius S) 표준 채택으로 <strong>연평균 +10.8%</strong> 견고한 성장세.
          </p>
        </div>
      </div>
    </div>
  );
};
