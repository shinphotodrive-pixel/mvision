import React from 'react';
import { REGULATION_MILESTONES } from '../data/industryData';
import { ShieldCheck, AlertOctagon, Scale, CheckSquare, FileText, Globe2, ArrowRight, Cpu } from 'lucide-react';

interface RegulationsTabProps {
  onNavigateTab: (tab: string) => void;
}

export const RegulationsTab: React.FC<RegulationsTabProps> = ({ onNavigateTab }) => {
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
    </div>
  );
};
