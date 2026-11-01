import React, { useState } from 'react';
import { MetricCards } from './MetricCards';
import { CONVERGENCE_METRICS } from '../data/industryData';
import { Cpu, ShieldCheck, Zap, ArrowRight, Layers, HelpCircle } from 'lucide-react';

interface OverviewTabProps {
  onNavigateTab: (tab: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab }) => {
  const [hoveredAxis, setHoveredAxis] = useState<number | null>(null);

  // Radar Chart Geometry (Center at 160, 150, radius 100)
  const cx = 170;
  const cy = 160;
  const r = 110;
  const total = CONVERGENCE_METRICS.length;

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const distance = (value / 100) * r;
    const x = cx + distance * Math.cos(angle);
    const y = cy + distance * Math.sin(angle);
    return { x, y };
  };

  // SVG paths for radar polygons
  const mvPoints = CONVERGENCE_METRICS.map((m, i) => {
    const { x, y } = getCoordinates(i, m.machineVision);
    return `${x},${y}`;
  }).join(' ');

  const secPoints = CONVERGENCE_METRICS.map((m, i) => {
    const { x, y } = getCoordinates(i, m.physicalSecurity);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-6">
      {/* 1. KEY INTEL METRIC CARDS (Requested Component) */}
      <MetricCards onNavigateToTab={onNavigateTab} />

      {/* 2. Convergence Narrative Intro */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span>기술 융합 아키텍처</span>
            <span aria-hidden="true">·</span>
            <span>Technology Convergence</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            머신비전과 지능형 보안 영상 기술의 패러다임 융합
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            과거 공장 자동화의 무손실·초고속 원시 데이터 전송 중심인 <strong>머신비전(Machine Vision)</strong>과 고효율 압축·장거리 네트워크 안정성 중심인 <strong>물리 보안(Physical Security)</strong>은 분리되어 발전해 왔습니다. 그러나 시스템온칩(SoC) 내 <strong>듀얼 NPU</strong>와 <strong>온카메라 엣지 러닝(Edge Learning)</strong>이 보편화되고, 200km/h 고속도로 ITS 및 공정 물류 로봇(AMR) 수요가 폭증하면서 두 분야는 <strong>‘글로벌 셔터 + 온디바이스 AI’</strong> 기반의 단일 스마트 센싱 시스템으로 급격히 수렴하고 있습니다.
          </p>
        </div>
      </div>

      {/* 3. Visual Charts & SoC Deep-Dive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: 6-Axis Interactive Radar Chart */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                산업 분야별 6대 핵심 기술 요구도 비교 (Radar Analysis)
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                100점 척도
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              머신비전과 물리 보안 카메라의 엔지니어링 가치 비중 차이 (마우스 오버 시 세부 지표 확인)
            </p>
          </div>

          {/* SVG Radar Chart */}
          <div className="relative flex justify-center items-center py-2">
            <svg
              viewBox="0 0 340 320"
              className="w-full max-w-[340px] h-[300px] overflow-visible select-none"
            >
              {/* Concentric Grid Circles */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, idx) => (
                <circle
                  key={idx}
                  cx={cx}
                  cy={cy}
                  r={r * level}
                  fill="none"
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-800"
                  strokeDasharray={level === 1.0 ? 'none' : '2 3'}
                  strokeWidth="1"
                />
              ))}

              {/* Axis Rays */}
              {CONVERGENCE_METRICS.map((_, i) => {
                const { x, y } = getCoordinates(i, 100);
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={x}
                    y2={y}
                    stroke="currentColor"
                    className="text-slate-200 dark:text-slate-800"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Machine Vision Polygon (Amber) */}
              <polygon
                points={mvPoints}
                className="fill-amber-500/20 dark:fill-amber-500/30 stroke-amber-500"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Physical Security Polygon (Teal) */}
              <polygon
                points={secPoints}
                className="fill-teal-500/20 dark:fill-teal-500/30 stroke-teal-500"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Data Point Dots & Interactive Areas */}
              {CONVERGENCE_METRICS.map((metric, i) => {
                const coordMv = getCoordinates(i, metric.machineVision);
                const coordSec = getCoordinates(i, metric.physicalSecurity);
                const labelCoord = getCoordinates(i, 128);

                const isHovered = hoveredAxis === i;

                return (
                  <g key={i} onMouseEnter={() => setHoveredAxis(i)} onMouseLeave={() => setHoveredAxis(null)} className="cursor-pointer">
                    {/* Machine Vision Dot */}
                    <circle
                      cx={coordMv.x}
                      cy={coordMv.y}
                      r={isHovered ? 5 : 3.5}
                      className="fill-amber-500 stroke-white dark:stroke-slate-900 transition-all"
                      strokeWidth="1.5"
                    />

                    {/* Physical Security Dot */}
                    <circle
                      cx={coordSec.x}
                      cy={coordSec.y}
                      r={isHovered ? 5 : 3.5}
                      className="fill-teal-500 stroke-white dark:stroke-slate-900 transition-all"
                      strokeWidth="1.5"
                    />

                    {/* Axis Label */}
                    <text
                      x={labelCoord.x}
                      y={labelCoord.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`text-[11px] font-medium transition-colors ${
                        isHovered
                          ? 'fill-amber-600 dark:fill-amber-400 font-bold'
                          : 'fill-slate-600 dark:fill-slate-400'
                      }`}
                    >
                      {metric.axis}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Benchmark Info Banner */}
          <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            {hoveredAxis !== null ? (
              <div className="space-y-1 animate-in fade-in duration-100">
                <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                  <span>{CONVERGENCE_METRICS[hoveredAxis].axis}</span>
                  <span className="font-mono text-slate-500">
                    비전 <span className="text-amber-600 font-bold">{CONVERGENCE_METRICS[hoveredAxis].machineVision}점</span> vs 보안 <span className="text-teal-600 font-bold">{CONVERGENCE_METRICS[hoveredAxis].physicalSecurity}점</span>
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  {CONVERGENCE_METRICS[hoveredAxis].benchmark}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">머신비전</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">물리 보안</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono">축 라벨에 마우스를 올려 비교</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Proprietary SoC & NPU Edge Engine Spotlight */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                글로벌 선도 기업 독자 SoC & 온디바이스 NPU 아키텍처
              </h3>
              <span className="text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 font-semibold font-mono">
                칩셋 자립화
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              외부 칩셋(하이실리콘 등) 의존성을 탈피하고 자체 AI 반도체를 내재화한 대표 모델
            </p>
          </div>

          <div className="space-y-3 my-auto text-xs">
            {/* Axis ARTPEC-9 */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition-colors">
              <div className="flex justify-between items-start font-bold mb-1">
                <span className="text-slate-900 dark:text-white">Axis Communications (스웨덴)</span>
                <span className="text-amber-600 dark:text-amber-400 font-mono">ARTPEC-9 SoC</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                업계 최초 오픈 비디오 코덱 <strong>AV1 하드웨어 인코더</strong> 탑재로 스트리밍 대역폭 30% 절감. 하드웨어 신뢰 루트(Root of Trust) 및 보안 부팅으로 사이버 침해 차단.
              </p>
              <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">
                <span>적용 라인: Q3538-LVE</span>
                <span>·</span>
                <span>Lightfinder 2.0</span>
              </div>
            </div>

            {/* Hanwha Wisenet 9 */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-400 transition-colors">
              <div className="flex justify-between items-start font-bold mb-1">
                <span className="text-slate-900 dark:text-white">한화비전 (대한민국)</span>
                <span className="text-teal-600 dark:text-teal-400 font-mono">Wisenet 9 Dual NPU</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                화질 개선을 담당하는 <strong>ISP 전용 딥러닝 NPU</strong>(AI 노이즈 제거)와 <strong>객체·소리 분류 전용 NPU</strong>를 병렬 분리하여 프레임 드롭 없는 실시간 4K 분석 구현.
              </p>
              <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">
                <span>적용 라인: P/X 시리즈 AI</span>
                <span>·</span>
                <span>NDAA 100% 컴플라이언스</span>
              </div>
            </div>

            {/* Cognex In-Sight EL */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 transition-colors">
              <div className="flex justify-between items-start font-bold mb-1">
                <span className="text-slate-900 dark:text-white">Cognex (미국)</span>
                <span className="text-blue-600 dark:text-blue-400 font-mono">In-Sight Edge Learning</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                GPU 서버 없이 스마트 카메라 자체 가속기에서 <strong>단 5~10장의 샘플</strong>만으로 결함 분류 및 ViDi EL OCR 모델을 수 분 내 현장 훈련하는 혁신적 알고리즘.
              </p>
              <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">
                <span>적용 라인: In-Sight 3800 / 2800</span>
                <span>·</span>
                <span>분당 2,500 PPM 처리</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Footer Button */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigateTab('vendors')}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>14개 글로벌 제조사 상세 탐색기 바로가기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Action Banner: Physics Simulator Teaser */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-amber-400 font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>실시간 물리 역학 시뮬레이터</span>
          </div>
          <h3 className="text-base font-bold text-white">
            시속 100km/h 주행 차량에서 50ms 트리거 지연이 발생하면 몇 미터 밀려 찍힐까요?
          </h3>
          <p className="text-xs text-slate-300">
            속도(v)와 지연시간(t_latency), 셔터 스피드에 따른 모션 블러 변위를 캔버스에서 직접 테스트하세요.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigateTab('simulator')}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <span>트리거 계산기 실행</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
