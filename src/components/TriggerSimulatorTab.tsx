import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, AlertTriangle, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

export const TriggerSimulatorTab: React.FC = () => {
  // Simulator State
  const [mode, setMode] = useState<'traffic' | 'conveyor'>('traffic');
  const [speedKmH, setSpeedKmH] = useState<number>(100);
  const [latencyMs, setLatencyMs] = useState<number>(50);
  const [shutterSpeedDenom, setShutterSpeedDenom] = useState<number>(1000); // 1/1000s
  const [fovWidthM, setFovWidthM] = useState<number>(4.0); // 4 meters FOV width
  const [resolutionWidthPx, setResolutionWidthPx] = useState<number>(1920); // Full HD
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const objPosRef = useRef<number>(0);

  // Physics Calculations
  const speedMps = speedKmH / 3.6;
  const displacementM = speedMps * (latencyMs / 1000);
  const displacementCm = displacementM * 100;

  // Motion blur calculation
  const exposureTimeSec = 1 / shutterSpeedDenom;
  const motionBlurM = speedMps * exposureTimeSec;
  const motionBlurMm = motionBlurM * 1000;

  // Pixel resolution per mm
  const mmPerPixel = (fovWidthM * 1000) / resolutionWidthPx;
  const blurPixels = motionBlurMm / mmPerPixel;

  // Status assessment
  let statusBadge = {
    title: '정상 포착 범주 (안전)',
    color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
    icon: CheckCircle2,
    advice: `지연시간 ${latencyMs}ms 동안 이동 거리가 약 ${displacementCm.toFixed(1)}cm에 불과하여, 표준 ROI(관심영역) 내에서 피사체의 중심부를 안정적으로 포착할 수 있습니다.`
  };

  if (displacementM > 2.5) {
    statusBadge = {
      title: '화각 이탈 위험 (위험)',
      color: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800',
      icon: ShieldAlert,
      advice: `대상이 ${displacementM.toFixed(2)}m나 이동하여 카메라 렌즈 화각을 벗어나거나 화면 가장자리에 잘려서 찍힙니다. 하드웨어 외부 트리거 직결 또는 글로벌 셔터 산업용 카메라로 교체해야 합니다.`
    };
  } else if (displacementM > 0.8) {
    statusBadge = {
      title: 'ROI 오프셋 보정 필수 (주의)',
      color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
      icon: AlertTriangle,
      advice: `대상이 ${displacementM.toFixed(2)}m 밀려서 촬영됩니다. 번호판 인식(ANPR) 또는 바코드 스캔 영역(ROI)을 트리거 라인보다 전방으로 약 ${(displacementM + 0.5).toFixed(1)}m 여유 있게 설정해야 합니다.`
    };
  }

  // Presets
  const applyPreset = (preset: 'mv' | 'its' | 'surv') => {
    if (preset === 'mv') {
      setLatencyMs(1);
      setShutterSpeedDenom(10000);
    } else if (preset === 'its') {
      setLatencyMs(50);
      setShutterSpeedDenom(2000);
    } else if (preset === 'surv') {
      setLatencyMs(200);
      setShutterSpeedDenom(500);
    }
  };

  // Canvas Live Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      const w = canvas.width;
      const h = canvas.height;

      // Update position
      if (isPlaying) {
        // Speed in canvas pixels/sec (scale: 1 meter = 60 pixels)
        const scalePxPerM = 55;
        objPosRef.current += speedMps * scalePxPerM * dt;
        if (objPosRef.current > w + 100) {
          objPosRef.current = -80;
        }
      }

      // Draw background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      // Draw Road / Conveyor Belt
      const roadY = h / 2;
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([12, 10]);
      ctx.beginPath();
      ctx.moveTo(0, roadY);
      ctx.lineTo(w, roadY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Trigger Line (Sensor beam)
      const triggerX = w * 0.35;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(triggerX, 15);
      ctx.lineTo(triggerX, h - 15);
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('⚡ 광학 트리거 센서 감지점 (0m)', triggerX - 55, 25);

      // Captured Shutter Line
      const scalePxPerM = 55;
      const offsetPx = displacementM * scalePxPerM;
      const captureX = triggerX + offsetPx;

      ctx.strokeStyle = displacementM > 2.5 ? '#f43f5e' : displacementM > 0.8 ? '#f59e0b' : '#38bdf8';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(captureX, 15);
      ctx.lineTo(captureX, h - 15);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = displacementM > 2.5 ? '#f43f5e' : displacementM > 0.8 ? '#f59e0b' : '#38bdf8';
      ctx.fillText(`📷 실제 셔터 작동점 (+${displacementM.toFixed(2)}m)`, captureX + 6, h - 22);

      // Draw Distance Bracket between trigger & shutter
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(triggerX, h - 45);
      ctx.lineTo(captureX, h - 45);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`변위: ${(displacementM * 100).toFixed(1)}cm (${latencyMs}ms)`, triggerX + (offsetPx / 2) - 35, h - 50);

      // Draw Moving Vehicle or Conveyor Box
      const carX = objPosRef.current;
      const isPastTrigger = carX >= triggerX;
      const isNearShutter = Math.abs(carX - captureX) < 15;

      if (mode === 'traffic') {
        // Vehicle Body
        ctx.fillStyle = isNearShutter ? '#38bdf8' : '#64748b';
        ctx.fillRect(carX - 35, roadY - 18, 70, 36);

        // Windshield
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(carX + 5, roadY - 14, 18, 28);

        // Headlights
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(carX + 32, roadY - 14, 4, 8);
        ctx.fillRect(carX + 32, roadY + 6, 4, 8);

        // Text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText('CAR', carX - 22, roadY + 3);
      } else {
        // Conveyor Product
        ctx.fillStyle = isNearShutter ? '#f59e0b' : '#0284c7';
        ctx.fillRect(carX - 20, roadY - 20, 40, 40);

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(carX - 16, roadY - 16, 32, 32);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px monospace';
        ctx.fillText('IC CHIP', carX - 15, roadY + 3);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, speedMps, displacementM, latencyMs, mode]);

  return (
    <div className="space-y-6">
      {/* Section Intro */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          고속 물리 역학 & 타이밍 지터 시뮬레이터
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
          실시간 트리거 지연시간(Trigger Latency) & 속도 변위 계산기
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
          고속으로 이동하는 대상(컨베이어 부품, 주행 차량 등)의 신호 인입 지연시간(Trigger Latency)에 따라 화면 상에서 물체가 얼마만큼 밀려서 찍히는지를 계산하고 캔버스에 실시간 시각화합니다.
        </p>
      </div>

      {/* Main Grid: Parameters + Visual Simulation Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Control Panel */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                ⚙️ 파라미터 제어
              </h3>

              {/* Mode switch */}
              <div className="flex gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setMode('traffic');
                    setSpeedKmH(100);
                  }}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    mode === 'traffic'
                      ? 'bg-white dark:bg-slate-900 font-bold shadow-xs text-amber-600 dark:text-amber-400'
                      : 'text-slate-500'
                  }`}
                >
                  차량 감시 (ITS)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('conveyor');
                    setSpeedKmH(20);
                  }}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    mode === 'conveyor'
                      ? 'bg-white dark:bg-slate-900 font-bold shadow-xs text-amber-600 dark:text-amber-400'
                      : 'text-slate-500'
                  }`}
                >
                  공장 컨베이어
                </button>
              </div>
            </div>

            {/* Presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                카메라 유형 프리셋 선택:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => applyPreset('mv')}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-left cursor-pointer transition-colors"
                >
                  <span className="block font-bold text-xs text-amber-600 dark:text-amber-400">머신비전</span>
                  <span className="text-[10px] text-slate-500">1ms 초저지연</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('its')}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-left cursor-pointer transition-colors"
                >
                  <span className="block font-bold text-xs text-teal-600 dark:text-teal-400">ITS 전용 IP</span>
                  <span className="text-[10px] text-slate-500">50ms 하드웨어</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('surv')}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-left cursor-pointer transition-colors"
                >
                  <span className="block font-bold text-xs text-rose-600 dark:text-rose-400">일반 감시 IP</span>
                  <span className="text-[10px] text-slate-500">200ms 소프트</span>
                </button>
              </div>
            </div>

            {/* Speed Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>이동 속도 ({mode === 'traffic' ? 'km/h' : 'm/s'}):</span>
                <span className="font-mono text-amber-600 dark:text-amber-400 font-bold tabular-nums">
                  {speedKmH} km/h ({(speedKmH / 3.6).toFixed(2)} m/s)
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={250}
                value={speedKmH}
                onChange={(e) => setSpeedKmH(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Latency Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>카메라 트리거 지연시간 (Latency):</span>
                <span className="font-mono text-teal-600 dark:text-teal-400 font-bold tabular-nums">
                  {latencyMs} ms
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={300}
                value={latencyMs}
                onChange={(e) => setLatencyMs(parseInt(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>

            {/* Shutter Speed Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                <span>카메라 셔터 스피드:</span>
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold tabular-nums">
                  1/{shutterSpeedDenom.toLocaleString()} 초
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={20000}
                step={500}
                value={shutterSpeedDenom}
                onChange={(e) => setShutterSpeedDenom(parseInt(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Physics Output Box */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400 font-sans">초당 이동 거리:</span>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                {speedMps.toFixed(2)} m/s
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1">
              <span className="text-slate-500 dark:text-slate-400 font-sans">지연 동안 이동 변위 (Δx):</span>
              <span className="font-black text-amber-600 dark:text-amber-400 text-sm tabular-nums">
                {displacementM.toFixed(2)} m ({displacementCm.toFixed(1)} cm)
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1">
              <span className="text-slate-500 dark:text-slate-400 font-sans">셔터 노출 모션 블러:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                {motionBlurMm.toFixed(2)} mm (약 {blurPixels.toFixed(1)} px)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Simulation Canvas & Advice */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🎯 캡처 포지션 이탈 시뮬레이션 시각화</span>
              </h3>

              {/* Status Badge */}
              <div className={`px-2.5 py-1 rounded-md border text-xs font-bold inline-flex items-center gap-1.5 ${statusBadge.color}`}>
                <statusBadge.icon className="w-3.5 h-3.5 shrink-0" />
                <span>{statusBadge.title}</span>
              </div>
            </div>

            {/* Animation Canvas */}
            <div className="relative w-full h-56 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            {/* Play/Pause controls */}
            <div className="flex justify-between items-center mt-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? '일시 정지' : '재생'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    objPosRef.current = -50;
                  }}
                  className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500 rounded-md cursor-pointer"
                  title="위치 리셋"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-[11px] font-mono text-slate-400">
                녹색선: 트리거 감지 / 점선: 셔터 릴리즈
              </span>
            </div>
          </div>

          {/* Engineering Advice Box */}
          <div className="mt-4 p-3.5 bg-amber-50/70 dark:bg-amber-950/20 rounded-xl border border-amber-200/80 dark:border-amber-900/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
            <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-amber-500" />
              <span>현장 엔지니어링 가이드:</span>
            </div>
            <p className="leading-relaxed">
              {statusBadge.advice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
