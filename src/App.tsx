/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { OverviewTab } from './components/OverviewTab';
import { VendorExplorerTab } from './components/VendorExplorerTab';
import { HardwareTab } from './components/HardwareTab';
import { TriggerSimulatorTab } from './components/TriggerSimulatorTab';
import { RegulationsTab } from './components/RegulationsTab';
import { VendorDetailModal } from './components/VendorDetailModal';
import { VendorComparisonModal } from './components/VendorComparisonModal';
import { VENDORS, METRIC_CARDS } from './data/industryData';
import { Vendor } from './types/camera';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [selectedVendorForModal, setSelectedVendorForModal] = useState<Vendor | null>(null);
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Sync dark class on document root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  // Toggle vendor for comparison
  const handleToggleCompare = (id: string) => {
    setSelectedCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleRemoveCompare = (id: string) => {
    setSelectedCompareIds((prev) => prev.filter((item) => item !== id));
  };

  const handleClearCompare = () => {
    setSelectedCompareIds([]);
    setIsCompareModalOpen(false);
  };

  // Export report to CSV
  const handleExportData = () => {
    const headers = [
      '제조사명',
      '국가',
      '도메인',
      'NDAA 준수여부',
      '자체 SoC / 엔진',
      '플래그십 모델',
      '주요 센서',
      '지원 인터페이스'
    ];

    const rows = VENDORS.map((v) => [
      `"${v.name}"`,
      `"${v.country}"`,
      `"${v.domainLabel}"`,
      `"${v.ndaa === 'compliant' ? '준수 (Compliant)' : '제재 (Sanctioned)'}"`,
      `"${v.chip.replace(/"/g, '""')}"`,
      `"${v.flagshipCamera.model}"`,
      `"${v.keySensors.join(', ')}"`,
      `"${v.supportedInterfaces.join(', ')}"`
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `글로벌_머신비전_보안카메라_산업보고서_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedCompareVendors = VENDORS.filter((v) =>
    selectedCompareIds.includes(v.id)
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleDark={toggleDark}
        onExportData={handleExportData}
        selectedCompareCount={selectedCompareIds.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
      />

      {/* Main Viewport Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow w-full">
        {activeTab === 'overview' && (
          <OverviewTab onNavigateTab={setActiveTab} />
        )}

        {activeTab === 'vendors' && (
          <VendorExplorerTab
            onSelectVendor={(v) => setSelectedVendorForModal(v)}
            selectedCompareIds={selectedCompareIds}
            onToggleCompare={handleToggleCompare}
            onOpenCompare={() => setIsCompareModalOpen(true)}
          />
        )}

        {activeTab === 'hardware' && <HardwareTab />}

        {activeTab === 'simulator' && <TriggerSimulatorTab />}

        {activeTab === 'regulations' && (
          <RegulationsTab onNavigateTab={setActiveTab} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>
            글로벌 머신비전 및 물리 보안 카메라 산업 심층 분석 대시보드 · 2026 Intelligence Engine
          </p>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span>NDAA Sec 889 준수 검증</span>
            <span>·</span>
            <span>EU AI Act (2024/1689)</span>
          </div>
        </div>
      </footer>

      {/* Vendor Detail Modal */}
      <VendorDetailModal
        vendor={selectedVendorForModal}
        onClose={() => setSelectedVendorForModal(null)}
        onToggleCompare={handleToggleCompare}
        isComparing={
          selectedVendorForModal
            ? selectedCompareIds.includes(selectedVendorForModal.id)
            : false
        }
      />

      {/* Comparison Modal */}
      {isCompareModalOpen && (
        <VendorComparisonModal
          vendors={selectedCompareVendors}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveVendor={handleRemoveCompare}
          onClearAll={handleClearCompare}
        />
      )}
    </div>
  );
}
