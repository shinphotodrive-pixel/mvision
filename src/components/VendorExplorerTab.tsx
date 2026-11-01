import React, { useState, useMemo } from 'react';
import { VENDORS } from '../data/industryData';
import { Vendor, DomainType } from '../types/camera';
import { Search, Globe, Video, ShieldCheck, AlertOctagon, SlidersHorizontal, ArrowUpRight, Cpu } from 'lucide-react';

interface VendorExplorerTabProps {
  onSelectVendor: (vendor: Vendor) => void;
  selectedCompareIds: string[];
  onToggleCompare: (id: string) => void;
  onOpenCompare: () => void;
}

export const VendorExplorerTab: React.FC<VendorExplorerTabProps> = ({
  onSelectVendor,
  selectedCompareIds,
  onToggleCompare,
  onOpenCompare
}) => {
  const [domainFilter, setDomainFilter] = useState<DomainType>('all');
  const [ndaaFilter, setNdaaFilter] = useState<'all' | 'compliant' | 'sanctioned'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = useMemo(() => {
    return VENDORS.filter((v) => {
      // Domain filter
      if (domainFilter !== 'all' && v.domain !== domainFilter) return false;

      // NDAA filter
      if (ndaaFilter !== 'all' && v.ndaa !== ndaaFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = v.name.toLowerCase().includes(q);
        const matchCountry = v.country.toLowerCase().includes(q);
        const matchChip = v.chip.toLowerCase().includes(q);
        const matchProducts = v.products.toLowerCase().includes(q);
        const matchSensors = v.keySensors.some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchCountry && !matchChip && !matchProducts && !matchSensors) {
          return false;
        }
      }

      return true;
    });
  }, [domainFilter, ndaaFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Intro Box */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              글로벌 제조사 에코시스템 (14개사 분석)
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              글로벌 주요 카메라 제조사 매트릭스 & 탐색기
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              독일, 미국, 대한민국, 스웨덴, 캐나다, 중국, 인도의 대표 제조사 14곳의 주력 제품, 핵심 자체 SoC, NDAA 준수 여부 및 공식 지원 채널을 검색·비교할 수 있습니다.
            </p>
          </div>

          {selectedCompareIds.length > 0 && (
            <button
              type="button"
              onClick={onOpenCompare}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>선택 {selectedCompareIds.length}개사 1:1 비교 보기</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap gap-4 items-center justify-between">
        {/* Domain and NDAA filter tabs */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Domain Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
            <span className="px-2 font-bold text-slate-500 dark:text-slate-400">도메인:</span>
            {[
              { id: 'all', label: '전체 (14)' },
              { id: 'mv', label: '머신비전 (5)' },
              { id: 'sec', label: '물리 보안 (6)' },
              { id: '3d', label: '3D/임베디드 (3)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setDomainFilter(tab.id as DomainType)}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer font-medium ${
                  domainFilter === tab.id
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* NDAA Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
            <span className="px-2 font-bold text-slate-500 dark:text-slate-400">NDAA:</span>
            <button
              type="button"
              onClick={() => setNdaaFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer font-medium ${
                ndaaFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              전체
            </button>
            <button
              type="button"
              onClick={() => setNdaaFilter('compliant')}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer font-medium flex items-center gap-1 ${
                ndaaFilter === 'compliant'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>준수 (11)</span>
            </button>
            <button
              type="button"
              onClick={() => setNdaaFilter('sanctioned')}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer font-medium flex items-center gap-1 ${
                ndaaFilter === 'sanctioned'
                  ? 'bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
              <span>제재 (3)</span>
            </button>
          </div>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="제조사명, 국가, 칩셋, 센서 검색..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-amber-500"
          />
        </div>
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVendors.map((vendor) => {
          const isCompliant = vendor.ndaa === 'compliant';
          const isComparing = selectedCompareIds.includes(vendor.id);

          return (
            <div
              key={vendor.id}
              className={`bg-white dark:bg-slate-900 p-5 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                isComparing
                  ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header info */}
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      {vendor.country} · {vendor.domainLabel}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
                      {vendor.name}
                    </h3>
                  </div>

                  {/* NDAA Status Badge */}
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold inline-flex items-center gap-1 ${
                      isCompliant
                        ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                    }`}
                  >
                    {isCompliant ? <ShieldCheck className="w-3 h-3" /> : <AlertOctagon className="w-3 h-3" />}
                    {isCompliant ? 'NDAA 준수' : 'NDAA 제재'}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3">
                  {vendor.summary}
                </p>

                {/* Technical specs pill container */}
                <div className="text-[11px] bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/80 font-mono text-slate-700 dark:text-slate-300 space-y-1">
                  <div className="truncate">
                    <strong className="text-slate-900 dark:text-white">SoC / 엔진:</strong>{' '}
                    <span className="text-amber-600 dark:text-amber-400">{vendor.chip}</span>
                  </div>
                  <div className="truncate">
                    <strong className="text-slate-900 dark:text-white">주력 라인업:</strong> {vendor.products}
                  </div>
                  <div className="truncate">
                    <strong className="text-slate-900 dark:text-white">플래그십:</strong> {vendor.flagshipCamera.model}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectVendor(vendor)}
                    className="text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>상세 스펙</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleCompare(vendor.id)}
                    className={`text-[11px] px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      isComparing
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 font-bold'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {isComparing ? '✓ 비교 중' : '+ 비교'}
                  </button>
                </div>

                <div className="flex space-x-2 text-slate-400">
                  <a
                    href={vendor.website}
                    target="_blank"
                    rel="noreferrer noopener"
                    title="공식 웹사이트"
                    className="hover:text-amber-600 dark:hover:text-amber-400 p-1"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                  <a
                    href={vendor.youtube}
                    target="_blank"
                    rel="noreferrer noopener"
                    title="공식 유튜브"
                    className="hover:text-rose-600 dark:hover:text-rose-400 p-1"
                  >
                    <Video className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVendors.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500">
          <p className="text-sm font-semibold">검색 조건과 일치하는 제조사가 없습니다.</p>
          <button
            type="button"
            onClick={() => {
              setDomainFilter('all');
              setNdaaFilter('all');
              setSearchQuery('');
            }}
            className="mt-3 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs rounded-lg text-slate-700 dark:text-slate-300 font-medium cursor-pointer"
          >
            검색 필터 초기화
          </button>
        </div>
      )}
    </div>
  );
};
