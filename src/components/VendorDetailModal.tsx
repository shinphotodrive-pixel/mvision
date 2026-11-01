import React from 'react';
import { Vendor } from '../types/camera';
import { X, Globe, Video, ShieldCheck, AlertOctagon, CheckCircle2, Cpu, Camera, Radio } from 'lucide-react';

interface VendorDetailModalProps {
  vendor: Vendor | null;
  onClose: () => void;
  onToggleCompare?: (vendorId: string) => void;
  isComparing?: boolean;
}

export const VendorDetailModal: React.FC<VendorDetailModalProps> = ({
  vendor,
  onClose,
  onToggleCompare,
  isComparing
}) => {
  if (!vendor) return null;

  const isCompliant = vendor.ndaa === 'compliant';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 pr-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{vendor.country}</span>
            <span aria-hidden="true">·</span>
            <span>{vendor.domainLabel}</span>
            <span aria-hidden="true">·</span>
            <span>설립 {vendor.founded}년</span>
            <span aria-hidden="true">·</span>
            <span>{vendor.headquarters}</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-1.5">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {vendor.name}
            </h2>

            {/* NDAA Compliance Badge */}
            <div
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border ${
                isCompliant
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
                  : 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800'
              }`}
            >
              {isCompliant ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>미국 NDAA 준수 (서방 인프라 적합)</span>
                </>
              ) : (
                <>
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span>미국 NDAA 제재 대상 (Sec 889)</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="py-4 space-y-4 text-xs">
          {/* Summary */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1">
              기업 개요 및 기술 포지셔닝
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              {vendor.summary}
            </p>
          </div>

          {/* Chip & SoC Details */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
              <Cpu className="w-4 h-4 text-amber-500" />
              <span>자체 개발 SoC / AI 알고리즘 파이프라인</span>
            </div>
            <div className="font-mono text-amber-600 dark:text-amber-400 font-semibold">
              {vendor.chip}
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {vendor.socDetails}
            </p>
          </div>

          {/* Flagship Camera */}
          <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200/70 dark:border-amber-900/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
              <Camera className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>대표 주력 모델: {vendor.flagshipCamera.model}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <div>해상도: <span className="font-bold">{vendor.flagshipCamera.resolution}</span></div>
              <div>최대 프레임: <span className="font-bold">{vendor.flagshipCamera.maxFps}</span></div>
              <div>인터페이스: <span className="font-bold">{vendor.flagshipCamera.interfaceType}</span></div>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              <strong>특징:</strong> {vendor.flagshipCamera.highlight}
            </p>
          </div>

          {/* Strengths */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              핵심 경쟁력 및 차별화 포인트
            </h3>
            <ul className="space-y-1.5">
              {vendor.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sensors & Interfaces */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                주요 센서 에코시스템
              </span>
              <div className="flex flex-wrap gap-1">
                {vendor.keySensors.map((s, idx) => (
                  <span key={idx} className="font-mono text-[11px] text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                지원 전송 인터페이스
              </span>
              <div className="flex flex-wrap gap-1">
                {vendor.supportedInterfaces.map((intf, idx) => (
                  <span key={idx} className="font-mono text-[11px] text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    {intf}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap justify-between items-center gap-3 text-xs">
          {onToggleCompare && (
            <button
              type="button"
              onClick={() => onToggleCompare(vendor.id)}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
                isComparing
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {isComparing ? '✓ 비교 대상에 추가됨' : '+ 비교 목록에 담기'}
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <a
              href={vendor.website}
              target="_blank"
              rel="noreferrer noopener"
              className="px-3.5 py-2 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>공식 웹사이트 방문</span>
            </a>
            <a
              href={vendor.youtube}
              target="_blank"
              rel="noreferrer noopener"
              className="px-3.5 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-500 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>유튜브 채널</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
