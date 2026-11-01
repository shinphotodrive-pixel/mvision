import React, { useState } from 'react';
import { REGULATION_MILESTONES, VENDORS } from '../data/industryData';
import { RegulatoryPdfReportModal } from './RegulatoryPdfReportModal';
import { Vendor } from '../types/camera';
import {
  ShieldCheck,
  AlertOctagon,
  Scale,
  CheckSquare,
  FileText,
  Globe2,
  ArrowRight,
  Cpu,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Building2,
  Lock,
  Download
} from 'lucide-react';

interface RegulationsTabProps {
  onNavigateTab: (tab: string) => void;
}

export const RegulationsTab: React.FC<RegulationsTabProps> = ({ onNavigateTab }) => {
  // Currently selected vendor for regulatory risk audit
  const [selectedVendorId, setSelectedVendorId] = useState<string>('hikvision');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);

  const selectedVendor = VENDORS.find((v) => v.id === selectedVendorId) || VENDORS[0];
  const isSanctioned = selectedVendor.ndaa === 'sanctioned';

  return (
    <div className="space-y-6">
      {/* Intro Box */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          지정학적 공급망 재편 & 법적 리스크 분석
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
          미국 NDAA Section 889 & 유럽연합 EU AI Act 규제 프레임워크
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
          미국의 <strong>국방수권법(NDAA) 제889조</strong>에 따른 대중국 카메라 조달 제재와 유럽연합의 <strong>EU AI Act</strong>에 따른 생체인식 제약은 글로벌 카메라 제조사들의 공급망, 반도체 SoC 설계 및 엣지 AI 아키텍처를 근본적으로 재편하고 있습니다.
        </p>
      </div>

      {/* ⚠️ LIVE RISK INDICATOR AUDIT SECTION (Requested Feature) */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <span>실시간 규제 감사 엔진</span>
              <span aria-hidden="true">·</span>
              <span>NDAA & EU AI Act Risk Indicator</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              제조사별 규제 적합성 및 위반 리스크 진단 지표
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              검증 대상 제조사를 선택하면 미국 NDAA 조달 금지 및 EU AI Act 생체인식 위반 위험도를 즉시 판정합니다.
            </p>
          </div>

          {/* Quick preset test buttons */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0 text-xs">
            <span className="text-slate-400 text-[11px] font-mono mr-1">빠른 테스트:</span>
            <button
              type="button"
              onClick={() => setSelectedVendorId('hikvision')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer border ${
                selectedVendorId === 'hikvision'
                  ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-700 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              🚨 제재사 (하이크비전)
            </button>
            <button
              type="button"
              onClick={() => setSelectedVendorId('hanwha')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer border ${
                selectedVendorId === 'hanwha'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              ✅ 준수사 (한화비전)
            </button>
            <button
              type="button"
              onClick={() => setSelectedVendorId('axis')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer border ${
                selectedVendorId === 'axis'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              ✅ 준수사 (Axis)
            </button>
          </div>
        </div>

        {/* Vendor Selector Dropdown and Overview strip */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/80">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-slate-500 shrink-0" />
            <div>
              <label htmlFor="vendorAuditSelect" className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                진단 대상 제조사 선택:
              </label>
              <select
                id="vendorAuditSelect"
                value={selectedVendorId}
                onChange={(e) => setSelectedVendorId(e.target.value)}
                className="mt-0.5 text-xs font-bold font-sans bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-500 cursor-pointer min-w-[220px]"
              >
                {VENDORS.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.country}) - {v.ndaa === 'compliant' ? '✓ NDAA 준수' : '⚠️ NDAA 제재'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono self-end sm:self-auto">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase block">국가 및 도메인</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {selectedVendor.country} · {selectedVendor.domainLabel}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase block">자체 개발 SoC</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 truncate max-w-[160px] inline-block">
                {selectedVendor.chip}
              </span>
            </div>
          </div>
        </div>

        {/* Visual Risk Indicator Alert Box */}
        {isSanctioned ? (
          /* 🚨 SANCTIONED / HIGH RISK STATE */
          <div className="p-5 rounded-2xl border-2 border-rose-500 bg-rose-50/70 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100 space-y-4 animate-in fade-in duration-200">
            {/* Banner Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-200 dark:border-rose-900/60 pb-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-rose-600 text-white rounded-xl shrink-0 shadow-sm animate-pulse">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100">
                      CRITICAL RISK · 위반 위험 감지
                    </span>
                    <span className="text-xs font-mono text-rose-700 dark:text-rose-300">
                      리스크 지수: <strong className="text-rose-950 dark:text-rose-100">95 / 100</strong>
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-rose-950 dark:text-white mt-1">
                    🚨 {selectedVendor.name}: 미국 NDAA Section 889 제재 및 EU AI Act 고위험 경고
                  </h4>
                </div>
              </div>

              <div className="self-start sm:self-auto shrink-0">
                <span className="px-3 py-1.5 bg-rose-600 text-white rounded-lg font-bold text-xs uppercase tracking-wider font-mono shadow-xs">
                  서방 조달 완전 불가
                </span>
              </div>
            </div>

            {/* Granular 2-Pillar Violation Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* NDAA Violation Card */}
              <div className="p-4 bg-white/80 dark:bg-slate-900/90 rounded-xl border border-rose-200 dark:border-rose-900/70 space-y-2">
                <div className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-300">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>1. 미국 NDAA Section 889(a)(1)(B) 직접 위반</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                  미국 연방 정부 기관(국방부, 연방청사, 공항, 국경)뿐만 아니라 연방 보조금을 수령하는 <strong>학교, 병원, 지자체, 교통공사 등 민간 연계 인프라(Part B)</strong>에서 {selectedVendor.name} 장비의 신규 도입 및 구매가 법적으로 전면 금지되어 있습니다.
                </p>
                <div className="p-2 bg-rose-50 dark:bg-rose-950/50 rounded border border-rose-200 dark:border-rose-900 text-[11px] font-mono text-rose-800 dark:text-rose-300">
                  <strong>조달 결과:</strong> 연방 계약 파기 및 TAA(Trade Agreements Act) 인증 결격.
                </div>
              </div>

              {/* EU AI Act Violation Card */}
              <div className="p-4 bg-white/80 dark:bg-slate-900/90 rounded-xl border border-rose-200 dark:border-rose-900/70 space-y-2">
                <div className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-300">
                  <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>2. EU AI Act 실시간 생체인식 및 데이터 규제 위반 위험</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                  공공장소에서의 <strong>실시간 원격 안면 인식(Facial Recognition)</strong> 및 감정/연령 추론 알고리즘이 기본 내장된 경우, 2024년 8월 발효된 EU AI Act에 의해 <strong>'허용할 수 없는 위험(Unacceptable Risk)'</strong>으로 분류되어 판매 및 운영이 차단됩니다.
                </p>
                <div className="p-2 bg-rose-50 dark:bg-rose-950/50 rounded border border-rose-200 dark:border-rose-900 text-[11px] font-mono text-rose-800 dark:text-rose-300">
                  <strong>벌칙 기준:</strong> 최대 3,500만 유로 또는 글로벌 매출의 7% 과징금.
                </div>
              </div>
            </div>

            {/* Mitigation & Alternative Recommendation */}
            <div className="p-3 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-rose-200 dark:border-rose-900/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 dark:text-white">
                  💡 공급망 리스크 완화 대체 조치:
                </span>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                  서방 및 국내 공공 인프라 구축 프로젝트의 경우 100% NDAA 준수 및 TAA 인증을 취득한 <strong>한화비전(대한민국)</strong>, <strong>Axis Communications(스웨덴)</strong>, <strong>IDIS(대한민국)</strong> 기종으로 B.O.M 교체를 강력 권고합니다.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPdfModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs whitespace-nowrap transition-colors cursor-pointer shadow-xs active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>위반 사유 및 대응 전략 PDF 다운로드</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedVendorId('hanwha')}
                  className="px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-lg text-xs whitespace-nowrap transition-colors cursor-pointer border border-slate-300 dark:border-slate-700"
                >
                  대체재 검토 →
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ✅ COMPLIANT / SAFE STATE */
          <div className="p-5 rounded-2xl border-2 border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100 space-y-4 animate-in fade-in duration-200">
            {/* Banner Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200 dark:border-emerald-900/60 pb-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-emerald-600 text-white rounded-xl shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100">
                      COMPLIANT · 서방 조달 100% 적합
                    </span>
                    <span className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
                      신뢰도 지수: <strong className="text-emerald-950 dark:text-emerald-100">98 / 100</strong>
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-emerald-950 dark:text-white mt-1">
                    🛡️ {selectedVendor.name}: 미국 NDAA Section 889 준수 & EU AI Act 규격 충족
                  </h4>
                </div>
              </div>

              <div className="self-start sm:self-auto shrink-0">
                <span className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-xs uppercase tracking-wider font-mono shadow-xs">
                  글로벌 조달 1등급 권장
                </span>
              </div>
            </div>

            {/* Granular 2-Pillar Compliance Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* NDAA Compliance Card */}
              <div className="p-4 bg-white/80 dark:bg-slate-900/90 rounded-xl border border-emerald-200 dark:border-emerald-900/70 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1. 미국 NDAA Section 889 및 TAA 원산지 무결성</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                  중국산 통신·영상 칩셋(HiSilicon 등)을 배제하고 <strong>자체 개발 SoC ({selectedVendor.chip})</strong> 또는 승인된 서방 부품만을 적용하여, 미국 연방 정부 조달 규정(FAR 52.204-24) 및 공공 인프라 입찰에 무조건 합격합니다.
                </p>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded border border-emerald-200 dark:border-emerald-900 text-[11px] font-mono text-emerald-800 dark:text-emerald-300">
                  <strong>보안 인증:</strong> UL CAP 사이버 보안 및 하드웨어 신뢰 루트(Root of Trust) 검증 완료.
                </div>
              </div>

              {/* EU AI Act Compliance Card */}
              <div className="p-4 bg-white/80 dark:bg-slate-900/90 rounded-xl border border-emerald-200 dark:border-emerald-900/70 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                  <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2. EU AI Act 프라이버시 보존형 엣지 AI 아키텍처</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                  개인 신원 식별을 강제하지 않는 <strong>익명화 실루엣(Silhouette) 추적</strong> 및 센서 단 <strong>동적 프라이버시 마스킹</strong>을 지원하여, 유럽연합의 엄격한 GDPR 및 2024년 8월 발효된 EU AI Act 고위험 조항을 위반하지 않습니다.
                </p>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded border border-emerald-200 dark:border-emerald-900 text-[11px] font-mono text-emerald-800 dark:text-emerald-300">
                  <strong>유럽 공공 적합도:</strong> CE 마킹 및 AI 투명성 문서화 요건 완벽 충족.
                </div>
              </div>
            </div>

            {/* Procurement Status Summary */}
            <div className="p-3 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-emerald-200 dark:border-emerald-900/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 dark:text-slate-300 text-[11px]">
                {selectedVendor.name} 제품군은 미국, 유럽, 대한민국 등 서방 동맹국의 스마트 팩토리, ITS 고속도로, 공항 및 군사 기지에 즉시 투입 가능한 안전 자산으로 분류됩니다.
              </span>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPdfModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs whitespace-nowrap transition-colors cursor-pointer shadow-xs active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>규제 적합성 검증 리포트 PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('vendors')}
                  className="px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-lg text-xs whitespace-nowrap transition-colors cursor-pointer border border-slate-300 dark:border-slate-700"
                >
                  제조사 상세 스펙 보기 →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Two Regulatory Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pillar 1: US NDAA Section 889 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 border-t-4 border-t-blue-600">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                미국 연방 공급망 통제
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                🇺🇸 미국 NDAA Section 889
              </h3>
            </div>
            <span className="text-xs bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 px-2.5 py-1 rounded font-bold border border-rose-200 dark:border-rose-800">
              공공 조달 완전 퇴출
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            미국 국방수권법 제889조는 연방 기관(Part A)뿐만 아니라 연방 자금을 지원받거나 연방 정부와 계약을 맺는 모든 민간 기업 및 하청업체(Part B)에서 <strong>특정 중국산 감시 카메라(하이크비전, 다후아 등) 및 통신/영상 반도체(하이실리콘 칩셋)</strong> 사용을 포괄적으로 금지합니다.
          </p>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              <span>직접 제재 대상 기업 및 부품군:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200 rounded">Hikvision (하이크비전)</span>
              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200 rounded">Dahua Technology (다후아)</span>
              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200 rounded">Huawei / HiSilicon SoC</span>
              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200 rounded">ZTE / Hytera</span>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-200/80 dark:border-blue-900/60 space-y-2 text-xs">
            <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>서방 동맹국 주요 수혜 기업 (대체 조달 벤더):</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-blue-200 dark:border-blue-800">
                <span className="font-bold text-slate-900 dark:text-white block">한화비전 (대한민국)</span>
                <span className="text-slate-500">Wisenet 9 자체 칩셋 및 TAA 인증으로 북미 공공 시장 점유율 급등</span>
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-blue-200 dark:border-blue-800">
                <span className="font-bold text-slate-900 dark:text-white block">Axis Communications (스웨덴)</span>
                <span className="text-slate-500">ARTPEC-9 자체 설계로 백도어 원천 배제, FIPS 140-3 표준 충족</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 2: EU AI Act */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 border-t-4 border-t-amber-600">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                유럽연합 인공지능 규제
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                🇪🇺 유럽연합 EU AI Act
              </h3>
            </div>
            <span className="text-xs bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 px-2.5 py-1 rounded font-bold border border-amber-200 dark:border-amber-800">
              2024년 8월 공식 발효
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            EU AI Act는 AI 위험도를 4단계로 분류하며, 공공장소에서의 <strong>실시간 원격 생체인식(안면 인식)</strong>과 직장/교육 시설에서의 감정 인식(Emotion Recognition)을 <strong>'허용할 수 없는 위험(Unacceptable Risk)'</strong>으로 규정하여 원칙적으로 전면 금지했습니다.
          </p>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-600" />
              <span>벌칙 조항 및 준수 요구사항:</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              위반 시 최대 <strong>3,500만 유로(약 510억 원) 또는 글로벌 연간 매출액의 7%</strong> 중 더 큰 금액이 과징금으로 부과되며, AI 학습 데이터셋의 편향성 검증 문서 제출이 강제됩니다.
            </p>
          </div>

          <div className="p-3.5 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200/80 dark:border-amber-900/60 space-y-2 text-xs">
            <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-amber-600" />
              <span>제조사들의 기술적 대응: 프라이버시 보존형 엣지 AI</span>
            </div>
            <ul className="space-y-1 text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <span>·</span>
                <span><strong>익명화 실루엣(Silhouette) 분석:</strong> 안면 특징점 대신 인체 윤곽 및 골격 좌표만 추론.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span>·</span>
                <span><strong>동적 프라이버시 마스킹:</strong> 카메라 센서 원시 버퍼 단계에서 인물 얼굴을 하드웨어 블러링.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Regulatory Timeline */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>📅 글로벌 규제 및 컴플라이언스 주요 마일스톤</span>
        </h3>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-5 py-1">
          {REGULATION_MILESTONES.map((item, idx) => (
            <div key={idx} className="relative pl-6">
              <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-amber-500 border-2 border-white dark:border-slate-900"></div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{item.year}</span>
                <span className="font-bold text-slate-900 dark:text-white">{item.title}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Checklist for Buyers & Integrators */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-emerald-500" />
          <span>엔터프라이즈 및 공공 조달을 위한 컴플라이언스 사전 점검 체크리스트</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200">1. 공급망 원산지(TAA) 및 칩셋 검증</span>
            <p className="text-slate-500">
              카메라 내부 메인 SoC 및 보조 NPU가 하이실리콘(HiSilicon) 등 제재 대상 벤더 칩셋인지 BOM(자재명세서) 검증 필수.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200">2. 하드웨어 신뢰 루트(Root of Trust) 여부</span>
            <p className="text-slate-500">
              변조된 비인가 펌웨어 실행을 방지하기 위한 암호화 서명 보안 부팅(Secure Boot) 및 물리적 암호 칩셋(TPM 2.0) 탑재 확인.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200">3. EU AI Act 실시간 생체인식 기능 점검</span>
            <p className="text-slate-500">
              유럽 지사 또는 공공 시설에 설치 시 인가받지 않은 실시간 안면 인식 기능이 기본 활성화되어 있는지 확인 및 마스킹 적용.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200">4. 사이버 보안 인증(UL CAP / FIPS 140-3)</span>
            <p className="text-slate-500">
              전용 사이버 보안 전담 침해사고 대응팀(PSIRT/S-CERT) 운영 및 글로벌 보안 평가 인증서 획득 여부 확인.
            </p>
          </div>
        </div>
      </div>

      {/* Regulatory Audit Summary & Mitigation Strategy PDF Modal */}
      <RegulatoryPdfReportModal
        vendor={selectedVendor}
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />
    </div>
  );
};
