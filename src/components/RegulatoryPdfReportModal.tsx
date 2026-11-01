import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Vendor } from '../types/camera';
import { Download, X, AlertTriangle, ShieldAlert, CheckCircle2, FileText, Loader2, Printer } from 'lucide-react';

interface RegulatoryPdfReportModalProps {
  vendor: Vendor;
  isOpen: boolean;
  onClose: () => void;
}

export const RegulatoryPdfReportModal: React.FC<RegulatoryPdfReportModalProps> = ({
  vendor,
  isOpen,
  onClose
}) => {
  const reportRef = useRef<HTMLDivElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    setIsGenerating(true);
    setDownloadSuccess(false);

    try {
      // Create high-res canvas of the report element
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const filename = `규제위반_대응전략리포트_${vendor.name.replace(/[^a-zA-Z0-9가-힣]/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
      pdf.save(filename);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const isCompliant = vendor.ndaa === 'compliant';
  const currentDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[94vh] flex flex-col">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                규제 위반 사유 및 대응 전략 공식 리포트 (PDF 내보내기)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                A4 규격 공식 감사 서식으로 렌더링되어 즉시 PDF 다운로드가 가능합니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>PDF 생성 중...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>다운로드 완료!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>PDF 다운로드</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Container */}
        <div className="overflow-y-auto flex-grow my-4 pr-1">
          {/* Printable Document Box (White background, strictly styled for PDF) */}
          <div
            ref={reportRef}
            id="regulatory-report-document"
            className="bg-white text-slate-900 p-8 sm:p-10 rounded-xl border border-slate-300 shadow-sm space-y-6 font-sans text-xs max-w-[800px] mx-auto"
            style={{ width: '794px', minHeight: '1123px', boxSizing: 'border-box' }}
          >
            {/* Report Header & Stamp */}
            <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
              <div>
                <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-slate-500 block">
                  GLOBAL VISION & SECURITY INTELLIGENCE AUDIT AUTHORITY
                </span>
                <h1 className="text-xl font-black text-slate-950 mt-1 tracking-tight">
                  글로벌 공급망 규제 위반 분석 및 전략적 대응 리포트
                </h1>
                <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
                  미국 국방수권법(NDAA Sec 889) 및 유럽연합 인공지능법(EU AI Act) 적합성 실사
                </p>
              </div>

              <div className="text-right font-mono text-[10px] text-slate-500 border border-slate-300 p-2 rounded bg-slate-50">
                <div>문서번호: AUD-2026-{vendor.id.toUpperCase()}-089</div>
                <div>발행일자: {currentDate}</div>
                <div>보안등급: 대외비 (CONFIDENTIAL)</div>
              </div>
            </div>

            {/* Target Manufacturer Intelligence Profile */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-800 text-sm">
                  1. 실사 대상 제조사 기본 정보
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded font-mono font-bold text-[11px] ${
                    isCompliant
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {isCompliant ? 'NDAA COMPLIANT (서방 조달 적합)' : 'NDAA SECTION 889 제재 대상'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                <div>기업명: <strong className="text-slate-900 font-sans">{vendor.name}</strong></div>
                <div>원산국 / 본사: <span className="text-slate-800">{vendor.country} · {vendor.headquarters}</span></div>
                <div>적용 SoC / NPU: <span className="text-slate-800">{vendor.chip}</span></div>
                <div>주요 공급 제품군: <span className="text-slate-800 truncate">{vendor.products}</span></div>
              </div>
            </div>

            {/* Section 2: Specific NDAA Violation Grounds */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-300 pb-1.5">
                <span className="p-1 bg-rose-600 text-white rounded text-[10px] font-bold">법적 제재</span>
                <h2 className="text-sm font-bold text-slate-900">
                  2. 미국 국방수권법(NDAA) Section 889 구체적 위반 사유
                </h2>
              </div>

              {isCompliant ? (
                <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-slate-700 space-y-1.5">
                  <p className="font-semibold text-emerald-800">
                    ✓ 본 제조사는 미국 NDAA Section 889 제재 대상에 해당하지 않으며, 100% 서방 공공 조달 요건을 충족합니다.
                  </p>
                  <p className="text-[11px] text-slate-600">
                    하이실리콘 칩셋을 배제한 자체 개발 SoC를 적용하여 TAA(Trade Agreements Act) 원산지 규정 및 FAR 52.204-24 조항에 부합합니다.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5 text-slate-700 leading-relaxed">
                  <div className="p-3 bg-rose-50/70 rounded-lg border border-rose-200 space-y-1">
                    <strong className="text-rose-900 block text-[11px]">
                      가. Section 889(a)(1)(A) & (B) 직접 조달 및 계약 체결 금지
                    </strong>
                    <p className="text-[11px] text-slate-600">
                      미국 연방 행정기관 및 국방부, 연방 기금 지원 시설(병원, 학교, 공항, 항만)에서 {vendor.name} 장비의 구매, 조달 및 연계 사용이 법적으로 전면 금지되어 있습니다. 하청 계약자 및 공급업체 역시 본 장비를 업무망에 연결할 수 없습니다.
                    </p>
                  </div>

                  <div className="p-3 bg-rose-50/70 rounded-lg border border-rose-200 space-y-1">
                    <strong className="text-rose-900 block text-[11px]">
                      나. 화웨이·하이실리콘(HiSilicon) SoC 칩셋 의존 및 백도어 리스크
                    </strong>
                    <p className="text-[11px] text-slate-600">
                      카메라 메인 프로세서 내 화웨이 계열 하이실리콘 비디오 인코딩 SoC 또는 중국 국유 지분 소프트웨어 스택이 탑재되어, 미국 정보보안국(CISA)의 제로 트러스트(Zero Trust) 및 공급망 위험 관리 기준을 충족하지 못합니다.
                    </p>
                  </div>

                  <div className="p-3 bg-rose-50/70 rounded-lg border border-rose-200 space-y-1">
                    <strong className="text-rose-900 block text-[11px]">
                      다. 미국 FCC 판매 승인 영구 거부 (Order 22-84)
                    </strong>
                    <p className="text-[11px] text-slate-600">
                      신규 출시 모델에 대해 미국 연방통신위원회(FCC)의 보안 인증 발급이 불허되어 미국 상업 유통망 진입이 법적으로 차단되었습니다.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: EU AI Act Violation & Risk Factors */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-300 pb-1.5">
                <span className="p-1 bg-amber-600 text-white rounded text-[10px] font-bold">인공지능 규제</span>
                <h2 className="text-sm font-bold text-slate-900">
                  3. 유럽연합 인공지능법(EU AI Act) 고위험군 및 과징금 리스크
                </h2>
              </div>

              <div className="space-y-2 text-slate-700 leading-relaxed text-[11px]">
                <p>
                  2024년 8월 공식 발효된 <strong>EU Regulation 2024/1689 (EU AI Act)</strong>에 따라 공공장소에서의 실시간 원격 생체인식(Remote Biometric Identification) 및 신원 추론은 <strong>‘허용할 수 없는 위험(Unacceptable Risk)’</strong>으로 규정되어 원칙적 금지 처분을 받습니다.
                </p>

                <div className="grid grid-cols-2 gap-2 font-mono">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                    <span className="font-bold text-slate-800 block text-[10px]">징벌적 과징금 상한</span>
                    <span className="text-rose-700 font-bold">최대 3,500만 유로 (약 510억 원)</span>
                    <span className="text-slate-500 block text-[10px]">또는 글로벌 전년도 매출액의 7%</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                    <span className="font-bold text-slate-800 block text-[10px]">학습 데이터셋 투명성 의무</span>
                    <span className="text-slate-700 font-bold">기술 문서 및 CE 마킹 필수</span>
                    <span className="text-slate-500 block text-[10px]">편향성 검증 문서 미제출 시 유통 중지</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: 4-Step Strategic Remediation Plan */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-300 pb-1.5">
                <span className="p-1 bg-blue-600 text-white rounded text-[10px] font-bold">대응 전략</span>
                <h2 className="text-sm font-bold text-slate-900">
                  4. 공급망 리스크 완화 및 단계별 마이그레이션 전략 (Action Plan)
                </h2>
              </div>

              <div className="space-y-2 text-[11px] text-slate-700">
                <div className="p-2.5 bg-slate-50 rounded border-l-4 border-l-blue-600 space-y-0.5">
                  <strong className="text-slate-900 block">
                    단계 1: 서방 동맹국 공인 대체 벤더 (TAA Compliant)로 B.O.M 즉시 교체
                  </strong>
                  <p className="text-slate-600">
                    {vendor.name} 기종 대신 100% NDAA 준수 및 UL CAP 사이버 인증을 획득한 <strong>한화비전(대한민국, Wisenet 9)</strong>, <strong>Axis Communications(스웨덴, ARTPEC-9)</strong>, <strong>IDIS(대한민국, DirectIP/PQC)</strong> 제품군으로 설계 변경.
                  </p>
                </div>

                <div className="p-2.5 bg-slate-50 rounded border-l-4 border-l-amber-600 space-y-0.5">
                  <strong className="text-slate-900 block">
                    단계 2: 기설치 장비의 물리적 망분리 및 폐쇄형 VLAN 격리
                  </strong>
                  <p className="text-slate-600">
                    단기 철거가 어려운 현장의 경우 외부 인터넷 라우팅을 영구 차단하고 전용 관리망 VLAN으로 고립시켜 백도어 통신 위험을 즉각 차단.
                  </p>
                </div>

                <div className="p-2.5 bg-slate-50 rounded border-l-4 border-l-teal-600 space-y-0.5">
                  <strong className="text-slate-900 block">
                    단계 3: 프라이버시 보존형 엣지 AI 아키텍처 의무화 (EU AI Act 대응)
                  </strong>
                  <p className="text-slate-600">
                    인물 식별 대신 익명화된 윤곽(Silhouette) 분석과 픽셀 단위 동적 프라이버시 마스킹을 온카메라 하드웨어 레벨에서 활성화.
                  </p>
                </div>

                <div className="p-2.5 bg-slate-50 rounded border-l-4 border-l-slate-600 space-y-0.5">
                  <strong className="text-slate-900 block">
                    단계 4: FIPS 140-3 하드웨어 신뢰 루트(Root of Trust) 검증서 수령
                  </strong>
                  <p className="text-slate-600">
                    시스템 통합(SI) 계약 체결 전 부품 원산지 증명서 및 사이버 침해사고 대응팀(S-CERT / PSIRT) 보증서 공식 첨부.
                  </p>
                </div>
              </div>
            </div>

            {/* Official Stamp & Sign-off Footer */}
            <div className="pt-6 border-t-2 border-slate-900 flex justify-between items-center text-[10px] text-slate-500 font-mono">
              <div>
                <div>조사관: 수석 규제 컴플라이언스 엔지니어</div>
                <div>검토기관: 글로벌 비전 & 물리 보안 산업 인텔리전스 센터</div>
              </div>

              <div className="text-right border-2 border-slate-900 px-4 py-2 font-bold uppercase tracking-wider text-slate-900">
                OFFICIAL AUDIT VERIFIED
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
