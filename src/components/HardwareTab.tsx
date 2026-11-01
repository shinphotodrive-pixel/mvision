import React, { useState } from 'react';
import { SENSOR_COMPARISONS, INTERFACE_SPECS, LENS_MOUNTS } from '../data/industryData';
import { InterfaceMarketSharePieChart } from './InterfaceMarketSharePieChart';
import { Cpu, Zap, Activity, Calculator, Check, ArrowRight } from 'lucide-react';

export const HardwareTab: React.FC = () => {
  // Bandwidth calculation state
  const [calcWidth, setCalcWidth] = useState<number>(4096);
  const [calcHeight, setCalcHeight] = useState<number>(3000);
  const [calcFps, setCalcFps] = useState<number>(60);
  const [calcBitDepth, setCalcBitDepth] = useState<number>(10);

  // Math: width * height * bitDepth * fps / 1,000,000,000 = Gbps
  const totalPixels = calcWidth * calcHeight;
  const rawBitsPerSec = totalPixels * calcBitDepth * calcFps;
  const calculatedGbps = (rawBitsPerSec / 1_000_000_000).toFixed(2);
  const calculatedMBps = ((totalPixels * (calcBitDepth / 8) * calcFps) / (1024 * 1024)).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Section Intro */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          광학 센서 & 고속 데이터 버스 아키텍처
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
          핵심 하드웨어 생태계 & 광학 인터페이스 표준
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
          초고속 생산 라인 및 차세대 ITS 감시 체계의 원시 데이터 품질을 결정짓는 <strong>Sony Pregius S 4세대 BSI 글로벌 셔터</strong> 기술과 대표적인 <strong>데이터 전송 인터페이스(GigE, USB3, CXP-12, CXP-oF)</strong> 및 렌즈 마운트 규격을 비교·분석합니다.
        </p>
      </div>

      {/* Sensor Comparison Grid: Pregius S vs 2nd Gen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sensor Specs Comparison Card */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Sony Pregius S (4세대 BSI) vs 2세대 (FSI) 정밀 스펙 비교
              </h3>
              <span className="text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded font-mono font-bold border border-amber-200 dark:border-amber-800">
                글로벌 셔터 혁신
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              화소 배선층을 수광 포토다이오드 아래로 내린 BSI 적층 아키텍처의 혁신적 성과
            </p>

            <div className="space-y-3">
              {/* Metric 1: Pixel Pitch */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>픽셀 피치 (Pixel Pitch, µm - 낮을수록 고집적)</span>
                  <span className="font-mono text-emerald-600 font-bold">-21% 소형화 (2.74µm)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 block text-[10px]">2세대 FSI:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">3.45 µm</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2 rounded border border-amber-300 dark:border-amber-700">
                    <span className="text-amber-600 dark:text-amber-400 block text-[10px]">4세대 Pregius S (BSI):</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">2.74 µm (동일 크기 2.1배 해상도)</span>
                  </div>
                </div>
              </div>

              {/* Metric 2: Quantum Efficiency (QE) */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>양자 효율 (Quantum Efficiency @ 530nm)</span>
                  <span className="font-mono text-emerald-600 font-bold">+19% 감도 향상 (71.5%)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 block text-[10px]">2세대 FSI:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">60.0 %</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2 rounded border border-teal-300 dark:border-teal-700">
                    <span className="text-teal-600 dark:text-teal-400 block text-[10px]">4세대 Pregius S (BSI):</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">71.5 % (저조도 선명도 극대화)</span>
                  </div>
                </div>
              </div>

              {/* Metric 3: Max Frame Rate Multiplier */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>최대 프레임 레이트 스케일 & 대역폭</span>
                  <span className="font-mono text-emerald-600 font-bold">2.4배 초고속 전송</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 block text-[10px]">2세대 FSI:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">1.0x (Sub-LVDS)</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2 rounded border border-amber-300 dark:border-amber-700">
                    <span className="text-amber-600 dark:text-amber-400 block text-[10px]">4세대 Pregius S (BSI):</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">2.4x (SLVS-EC 고속 버스)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-amber-50/60 dark:bg-amber-950/20 rounded-lg border border-amber-200/70 dark:border-amber-900/50 text-[11px] text-amber-900 dark:text-amber-200">
            <strong>CRA (주광선각) 개선 효과:</strong> 기존 센서는 비네팅을 피하기 위해 대형 렌즈가 필요했으나, Pregius S는 입사각이 큰 주변부 광선도 수광소자로 집광하여 콤팩트 C-Mount 렌즈로도 왜곡 없는 고품질 이미지를 촬영할 수 있습니다.
          </div>
        </div>

        {/* Interface Bandwidth Comparison Visual Chart */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                영상 데이터 전송 인터페이스 물리 대역폭 (Bandwidth)
              </h3>
              <span className="text-xs bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded font-mono font-bold border border-teal-200 dark:border-teal-800">
                Gbps 단위
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              카메라에서 프레임 그래버 또는 호스트 PC로 전송되는 초당 데이터 처리량
            </p>

            <div className="space-y-3.5 my-auto">
              {INTERFACE_SPECS.map((intf) => {
                const maxBarWidth = 50; // CXP-12 is 50 Gbps
                const widthPercent = (intf.bandwidthGbps / maxBarWidth) * 100;

                return (
                  <div key={intf.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800 dark:text-slate-200">{intf.name}</span>
                      <span className="font-mono text-amber-600 dark:text-amber-400 font-bold tabular-nums">
                        {intf.bandwidthGbps} Gbps{' '}
                        <span className="text-[10px] text-slate-400 font-normal">
                          (최대 {intf.maxDistanceMeters}m)
                        </span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden flex">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-teal-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(widthPercent, 3)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>케이블: {intf.cableType}</span>
                      <span>프레임그래버: {intf.frameGrabber}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
            <strong>인터페이스 선정 가이드:</strong> 100m 이내 일반 스마트 팩토리 분산 연결에는 <strong>GigE / 10GigE PoE</strong>가 이상적이며, 반도체 웨이퍼 및 OLED 마이크로 결함의 나노초 단위 동기화 검사에는 <strong>CoaXPress 2.0 (CXP-12)</strong> 또는 광케이블 기반 <strong>CXP-over-Fiber</strong>가 필수적입니다.
          </div>
        </div>
      </div>

      {/* RECHARTS INTERFACE MARKET SHARE PIE CHART */}
      <InterfaceMarketSharePieChart />

      {/* Interactive Bandwidth Calculator */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            비압축 원시 데이터 전송 대역폭 실시간 계산기
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          센서의 가로·세로 해상도, 프레임 레이트(FPS), 픽셀 비트 수(Bit Depth)를 입력하여 필요한 네트워크/인터페이스 대역폭을 즉시 산출합니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              가로 해상도 (픽셀):
            </label>
            <input
              type="number"
              value={calcWidth}
              onChange={(e) => setCalcWidth(Math.max(100, parseInt(e.target.value) || 0))}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              세로 해상도 (픽셀):
            </label>
            <input
              type="number"
              value={calcHeight}
              onChange={(e) => setCalcHeight(Math.max(100, parseInt(e.target.value) || 0))}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              촬영 속도 (FPS):
            </label>
            <input
              type="number"
              value={calcFps}
              onChange={(e) => setCalcFps(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              픽셀 비트 심도:
            </label>
            <select
              value={calcBitDepth}
              onChange={(e) => setCalcBitDepth(parseInt(e.target.value))}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-mono font-bold text-slate-900 dark:text-white"
            >
              <option value={8}>Mono/Raw 8-bit (1 Byte/px)</option>
              <option value={10}>Mono/Raw 10-bit (고계조)</option>
              <option value={12}>Mono/Raw 12-bit (의료/정밀검사)</option>
              <option value={24}>RGB 24-bit (컬러 풀 비압축)</option>
            </select>
          </div>
        </div>

        {/* Calculation Result Strip */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                총 유효 화소수
              </span>
              <span className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {(totalPixels / 1_000_000).toFixed(1)} MP
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                초당 필요 순수 대역폭
              </span>
              <span className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400 tabular-nums">
                {calculatedGbps} Gbps
              </span>
              <span className="text-xs text-slate-400 font-mono ml-2">({calculatedMBps} MB/s)</span>
            </div>
          </div>

          {/* Recommended Interface Tag */}
          <div className="text-xs">
            <span className="text-slate-500 dark:text-slate-400 block mb-0.5">권장 최적 인터페이스:</span>
            <span className="font-bold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 px-3 py-1 rounded-md font-mono">
              {parseFloat(calculatedGbps) <= 0.9
                ? 'GigE Vision (1Gbps)'
                : parseFloat(calculatedGbps) <= 4.5
                ? '5GigE 또는 USB3 Vision'
                : parseFloat(calculatedGbps) <= 9.0
                ? '10GigE Vision'
                : parseFloat(calculatedGbps) <= 45.0
                ? 'CoaXPress 2.0 (CXP-12)'
                : 'CXP-over-Fiber (광통신 필수)'}
            </span>
          </div>
        </div>
      </div>

      {/* Lens Mount Standards Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            광학 렌즈 마운트 기계 규격 및 플랜지 백 거리(FFD) 비교
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase font-semibold">
              <tr>
                <th className="p-3">마운트 규격</th>
                <th className="p-3">나사산 / 결합 방식</th>
                <th className="p-3">플랜지 백 거리 (FFD)</th>
                <th className="p-3">수용 센서 크기</th>
                <th className="p-3">주요 적용 분야 및 특징</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              {LENS_MOUNTS.map((mount) => (
                <tr key={mount.mount} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-amber-600 dark:text-amber-400 font-mono">
                    {mount.mount}
                  </td>
                  <td className="p-3 font-mono">{mount.thread}</td>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">
                    {mount.ffdMm} mm
                  </td>
                  <td className="p-3">{mount.maxSensorFormat}</td>
                  <td className="p-3">{mount.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
