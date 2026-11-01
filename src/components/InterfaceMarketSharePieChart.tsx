import React, { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { INTERFACE_MARKET_SHARES, InterfaceMarketShareItem } from '../data/industryData';
import { PieChart as PieIcon, TrendingUp, TrendingDown, Info, ArrowRight, Zap, Check } from 'lucide-react';

export const InterfaceMarketSharePieChart: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<'2020' | '2023' | '2026' | '2030E'>('2026');
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  // Prepare Pie data based on selected year
  const pieData = INTERFACE_MARKET_SHARES.map((item) => ({
    id: item.id,
    name: item.shortName,
    fullName: item.name,
    value: item.shares[selectedYear],
    color: item.color,
    delta: item.changeDelta,
    isGrowing: item.isGrowing,
    reason: item.driverReason,
    keySpecs: item.keySpecs,
  }));

  // Custom Tooltip
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl text-xs space-y-1.5 z-50">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-1">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: data.color }} />
            <span>{data.fullName}</span>
          </div>
          <div className="flex justify-between items-baseline gap-4 font-mono">
            <span className="text-slate-500 dark:text-slate-400 font-sans">{selectedYear}년 시장 점유율:</span>
            <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
              {data.value.toFixed(1)}%
            </span>
          </div>
          <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300">
            변동률: <span className={data.isGrowing ? 'text-amber-600 font-bold' : 'text-slate-500'}>{data.delta}</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans pt-1 border-t border-slate-100 dark:border-slate-800 max-w-[220px]">
            {data.reason}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
      {/* Header and Year Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            <span>Recharts 파이 차트 시각화</span>
            <span aria-hidden="true">·</span>
            <span>데이터 전송 인터페이스 세대 교체</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
            전송 인터페이스별 시장 점유율 변화 (CoaXPress vs GigE vs USB3)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            반도체·2차전지 초고속 결함 검사 확대로 인한 CoaXPress 2.0의 급부상과 Camera Link 퇴조
          </p>
        </div>

        {/* Year Filter Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs self-start sm:self-auto shrink-0 font-mono">
          {(['2020', '2023', '2026', '2030E'] as const).map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                selectedYear === year
                  ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {year === '2026' ? `${year} (현재)` : year === '2030E' ? `${year} (전망)` : `${year}년`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Recharts Donut/Pie Chart + Granular Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Recharts Donut/Pie Chart */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-full h-72 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={3}
                  dataKey="value"
                  onMouseEnter={(_, index) => setHoveredSlice(pieData[index].id)}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={entry.color}
                      stroke="currentColor"
                      className="text-white dark:text-slate-900 transition-all duration-200"
                      strokeWidth={hoveredSlice === entry.id ? 3 : 1.5}
                      style={{
                        transform: hoveredSlice === entry.id ? 'scale(1.04)' : 'scale(1)',
                        transformOrigin: 'center center',
                        filter: hoveredSlice === entry.id ? 'brightness(1.1)' : 'none',
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Summary Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {selectedYear} 점유율
              </span>
              <span className="text-xl font-black text-slate-900 dark:text-white font-mono tabular-nums">
                100%
              </span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                CXP {pieData.find((p) => p.id === 'cxp')?.value.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono text-center">
            * 슬라이스에 마우스를 올리면 세부 점유율 및 사양이 표시됩니다
          </div>
        </div>

        {/* Right: Detailed Comparison Breakdown List */}
        <div className="lg:col-span-7 space-y-2.5">
          {pieData.map((item) => {
            const isHovered = hoveredSlice === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredSlice(item.id)}
                onMouseLeave={() => setHoveredSlice(null)}
                className={`p-3 rounded-xl border transition-all text-xs flex flex-col justify-between cursor-pointer ${
                  isHovered
                    ? 'bg-slate-50 dark:bg-slate-800 border-amber-400 dark:border-amber-500/70 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="font-bold text-slate-900 dark:text-white">
                      {item.fullName}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                      {item.value.toFixed(1)}%
                    </span>
                    <span
                      className={`text-[11px] font-semibold flex items-center gap-0.5 ${
                        item.isGrowing ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'
                      }`}
                    >
                      {item.isGrowing ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{item.delta}</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800 gap-1">
                  <span className="font-sans text-slate-600 dark:text-slate-300">
                    {item.reason}
                  </span>
                  <span className="font-mono text-slate-400 shrink-0">
                    [{item.keySpecs}]
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategic Trend Takeaway */}
      <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            📊 인터페이스 세대 교체 요약:
          </span>
          <p className="text-slate-600 dark:text-slate-400 text-[11px]">
            <strong>CoaXPress (14% → 38.5%)</strong>가 반도체·배터리 공정의 절대 표준으로 부상하며 과거 <strong>Camera Link</strong>를 거의 완전히 대체했습니다. 한편 <strong>GigE Vision</strong>은 1G에서 5G/10G PoE로 진화하며 분산 팩토리의 중심을 유지하고 있습니다.
          </p>
        </div>
        <span className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded font-mono font-bold text-[11px] shrink-0">
          CXP-12 채택율 1위 성장
        </span>
      </div>
    </div>
  );
};
