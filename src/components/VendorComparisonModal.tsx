import React from 'react';
import { Vendor } from '../types/camera';
import { X, ShieldCheck, AlertOctagon, Check, Trash2 } from 'lucide-react';

interface VendorComparisonModalProps {
  vendors: Vendor[];
  onClose: () => void;
  onRemoveVendor: (id: string) => void;
  onClearAll: () => void;
}

export const VendorComparisonModal: React.FC<VendorComparisonModalProps> = ({
  vendors,
  onClose,
  onRemoveVendor,
  onClearAll
}) => {
  if (vendors.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-5xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex justify-between items-center pr-8">
          <div>
            <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              1:1 다각도 사양 비교기
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              선택 제조사 스펙 매트릭스 ({vendors.length}개사 선택됨)
            </h2>
          </div>
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 flex items-center gap-1 font-semibold cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>비교 목록 비우기</span>
          </button>
        </div>

        {/* Comparison Matrix Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="p-3 w-36 text-slate-400 font-semibold uppercase tracking-wider bg-slate-50 dark:bg-slate-800/40">
                  항목 / 제조사
                </th>
                {vendors.map((v) => (
                  <th key={v.id} className="p-3 min-w-[220px] bg-slate-50 dark:bg-slate-800/60">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[10px] text-slate-400 font-mono uppercase">{v.country} · {v.domainLabel}</div>
                        <div className="font-bold text-base text-slate-900 dark:text-white">{v.name}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveVendor(v.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                        title="비교에서 제거"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/20">
                  미국 NDAA 준수 여부
                </td>
                {vendors.map((v) => (
                  <td key={v.id} className="p-3">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded ${
                        v.ndaa === 'compliant'
                          ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}
                    >
                      {v.ndaa === 'compliant' ? (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>준수 (서방 권역 적합)</span>
                        </>
                      ) : (
                        <>
                          <AlertOctagon className="w-3.5 h-3.5" />
                          <span>제재 대상 (Part B 금지)</span>
                        </>
                      )}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/20">
                  자체 개발 SoC / AI
                </td>
                {vendors.map((v) => (
                  <td key={v.id} className="p-3 font-mono text-[11px]">
                    <div className="font-bold text-amber-600 dark:text-amber-400 mb-0.5">{v.chip}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{v.socDetails}</div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/20">
                  대표 플래그십 카메라
                </td>
                {vendors.map((v) => (
                  <td key={v.id} className="p-3 font-mono text-[11px]">
                    <div className="font-bold text-slate-900 dark:text-white">{v.flagshipCamera.model}</div>
                    <div className="text-slate-500">해상도: {v.flagshipCamera.resolution}</div>
                    <div className="text-slate-500">프레임: {v.flagshipCamera.maxFps}</div>
                    <div className="text-slate-500">인터페이스: {v.flagshipCamera.interfaceType}</div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/20">
                  핵심 센서 에코시스템
                </td>
                {vendors.map((v) => (
                  <td key={v.id} className="p-3">
                    <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                      {v.keySensors.map((s, idx) => (
                        <span key={idx} className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/20">
                  지원 인터페이스
                </td>
                {vendors.map((v) => (
                  <td key={v.id} className="p-3 font-mono text-[11px]">
                    {v.supportedInterfaces.join(', ')}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/20">
                  핵심 강점
                </td>
                {vendors.map((v) => (
                  <td key={v.id} className="p-3 space-y-1 text-[11px]">
                    {v.strengths.map((str, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
