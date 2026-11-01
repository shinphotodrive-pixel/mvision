import { Vendor, SensorComparison, InterfaceSpec } from '../types/camera';

export interface MetricCardData {
  id: string;
  category: 'market' | 'regulation' | 'tech';
  title: string;
  value: string;
  unit?: string;
  subValue: string;
  changeRate?: string;
  isPositiveChange?: boolean;
  statusType: 'success' | 'warning' | 'info' | 'critical';
  statusLabel: string;
  description: string;
  keyPoints: string[];
  regulationRef?: string;
}

export const METRIC_CARDS: MetricCardData[] = [
  {
    id: 'market-size',
    category: 'market',
    title: '글로벌 머신비전 시장 규모',
    value: '14.8',
    unit: 'B USD',
    subValue: '2026년 기준 (2030년 25.6B USD 전망)',
    changeRate: '+8.7% CAGR',
    isPositiveChange: true,
    statusType: 'info',
    statusLabel: '고성장 추세',
    description: '반도체, 2차전지 배터리 전극 검사, 스마트 팩토리 자동화 수요 급증으로 고속 원시 데이터 전송 중심의 머신비전 시장이 가파르게 팽창하고 있습니다.',
    keyPoints: [
      '2차전지 파우치/원통형 배터리 외관 및 웰딩 검사 수요 연 24% 급성장',
      '반도체 웨이퍼 어드밴스드 패키징(2.5D/3D) 검사 장비 채택 증가',
      'CXP-12 및 10GigE 기반 초고속 멀티 카메라 동시 검사 라인 보편화'
    ]
  },
  {
    id: 'ndaa-compliance',
    category: 'regulation',
    title: '글로벌 주요 제조사 NDAA 준수율',
    value: '78.5',
    unit: '%',
    subValue: '서방 핵심 14개 분석 제조사 중 11개사 부합',
    changeRate: '서방 조달 100% 필수',
    isPositiveChange: true,
    statusType: 'success',
    statusLabel: '공급망 재편 완료',
    description: '미국 국방수권법(NDAA 제889조)에 따라 연방 정부 및 연방 자금 지원 공공 인프라에서 하이크비전/다후아 등 특정 중국산 카메라 및 화웨이/하이실리콘 칩셋이 전면 퇴출되었습니다.',
    keyPoints: [
      '한화비전(대한민국), Axis(스웨덴), IDIS(대한민국) 등이 북미/유럽 공공 조달 시장 점유율 급상승',
      '미국 정부 승인 TAA(Trade Agreements Act) 원산지 증명 요구 강화',
      '하이크비전/다후아 등 제재 기업은 동남아, 아프리카, 중동 등 비서방 신흥국으로 수출 우회'
    ],
    regulationRef: 'US NDAA Section 889(a)(1)(B) & FCC Order 22-84'
  },
  {
    id: 'eu-ai-act',
    category: 'regulation',
    title: 'EU AI Act 생체인식 규제 영향권',
    value: '2024.08',
    unit: '발효',
    subValue: '공공장소 실시간 원격 안면인식 전면 금지',
    changeRate: '최대 3,500만 유로 벌금',
    isPositiveChange: false,
    statusType: 'warning',
    statusLabel: '고위험(High-Risk) 단계 적용',
    description: '유럽연합의 인공지능법(EU AI Act) 시행으로 공공장소에서의 실시간 생체인식 및 감정 분석이 불법화되어, 물리 보안 제조사들이 신원 비식별화 엣지 AI로 대전환하고 있습니다.',
    keyPoints: [
      '안면 식별 대신 익명화된 윤곽(Silhouette) 및 골격 추적 메타데이터만 온디바이스 추출',
      '동적 프라이버시 마스킹(Dynamic Privacy Masking) 칩셋 레벨 하드웨어 가속 의무화',
      '학습 데이터셋 투명성 문서화 및 CE 마크 적합성 평가 준수 필수'
    ],
    regulationRef: 'EU Regulation 2024/1689 (EU AI Act Annex III)'
  },
  {
    id: 'edge-npu-adoption',
    category: 'tech',
    title: '카메라 온디바이스 NPU 탑재율',
    value: '72.4',
    unit: '%',
    subValue: '2026년 신규 출시 산업/보안 카메라 기준',
    changeRate: '+21.5%p YoY',
    isPositiveChange: true,
    statusType: 'success',
    statusLabel: '표준 탑재 가속',
    description: '클라우드나 외부 서버에 의존하지 않고 카메라 자체 SoC(Wisenet 9, ARTPEC-9, In-Sight EL 등)에서 신경망 연산을 실시간 처리하는 온디바이스 AI가 표준화되었습니다.',
    keyPoints: [
      'Axis ARTPEC-9: 하드웨어 AV1 코덱 및 딥러닝 객체 분석기(AOA) 내장',
      'Hanwha Vision Wisenet 9: 픽셀 노이즈 제거(AI-NR)와 객체 감지 전용 듀얼 NPU 분리',
      'Cognex In-Sight: 단 5~10장 샘플로 현장에서 즉각 파인튜닝하는 엣지 러닝 구현'
    ]
  },
  {
    id: 'pregius-s-migration',
    category: 'tech',
    title: '차세대 BSI 글로벌 셔터 전환율',
    value: '64.2',
    unit: '%',
    subValue: '소니 Pregius S (4세대 BSI 2.74µm) 비중',
    changeRate: '해상도 2.1배 집적',
    isPositiveChange: true,
    statusType: 'info',
    statusLabel: '광학 혁신',
    description: '화소 배선층을 포토다이오드 아래로 내린 이면조사(BSI) 구조로 픽셀 피치를 2.74µm로 축소하면서도 양자 효율(QE)을 71.5%로 대폭 끌어올려 C-Mount 호환 초고해상도를 완성했습니다.',
    keyPoints: [
      '기존 2세대 FSI 대비 동일 렌즈 포맷에서 2배 이상의 유효 화소수 확보',
      '주광선각(CRA) 특성 개선으로 광각 렌즈 체결 시 주변부 광량 저하(비네팅) 억제',
      '최대 프레임 레이트 2.4배 향상으로 초고속 컨베이어 및 200km/h ITS ANPR 대응'
    ]
  },
  {
    id: 'us-procurement-shift',
    category: 'regulation',
    title: '대미 공공 조달 대체 수요 규모',
    value: '3.2',
    unit: 'B USD',
    subValue: '중국산 배제 후 서방 동맹국 재편 시장',
    changeRate: '한국·스웨덴 수혜 집중',
    isPositiveChange: true,
    statusType: 'success',
    statusLabel: '지정학적 재편',
    description: '미국 연방 정부, 공항, 철도, 병원, 군 기지 및 주정부 지원 시설에서 중국산 감시 카메라 수백만 대가 철거되고 서방 인증 규격(NDAA Compliant) 기기로 교체되고 있습니다.',
    keyPoints: [
      '한화비전 미주 법인 매출 연평균 25%+ 성장 견인',
      '사이버 보안 인증(UL CAP, FIPS 140-3) 및 하드웨어 보안 부팅(Root of Trust) 필수 검증',
      '엔드투엔드 제조국(Country of Origin) 추적성 및 부품 공급망 실사 제도화'
    ],
    regulationRef: 'FAR Case 2019-009 (Prohibition on Contracting for Certain Telecommunications)'
  }
];

export const VENDORS: Vendor[] = [
  {
    id: 'basler',
    name: 'Basler AG',
    country: '독일',
    domain: 'mv',
    domainLabel: '머신비전',
    website: 'https://www.baslerweb.com',
    youtube: 'https://www.youtube.com/user/BaslerAG',
    ndaa: 'compliant',
    chip: 'pylon vTools / Sony Pregius S',
    socDetails: 'FPGA 기반 고속 전처리 파이프라인 + pylon C/C++/Python SDK로 임베디드 ARM 및 x86 호환성 극대화',
    products: 'ace 2 Basic/Pro, boost CoaXPress 2.0, dart BCON/USB, racer 라인스캔',
    summary: '독일 글로벌 머신비전 선도기업. ace 2 시리즈에 Sony Pregius S 및 Gpixel 센서를 최적화 탑재하고 pylon vTools 소프트웨어를 통해 코드 작성 없이도 온카메라 필터링과 비전 알고리즘을 구동합니다.',
    founded: 1988,
    headquarters: 'Ahrensburg, Germany',
    strengths: [
      '업계 표준급 안정성의 pylon Camera Software Suite',
      'Sony Pregius S BSI 글로벌 셔터 센서의 열 관리 및 픽셀 튜닝 최적화',
      '초소형 29x29mm 폼팩터 및 C-Mount 광학 표준 준수'
    ],
    keySensors: ['Sony IMX540 (24.5MP)', 'Sony IMX541 (20.3MP)', 'Sony IMX542 (16.2MP)', 'Gpixel GMAX2505'],
    supportedInterfaces: ['GigE Vision', '5GigE', 'USB3 Vision', 'CoaXPress 2.0 (CXP-12)'],
    flagshipCamera: {
      model: 'boost CXP-12 (boA5320-17cm)',
      resolution: '24.5 MP (5320 x 4600)',
      maxFps: '17 fps (CXP-12 단일 채널)',
      interfaceType: 'CoaXPress 2.0',
      highlight: 'Pregius S IMX540 탑재, 초소형 BSI 2.74µm 픽셀로 고감도 및 왜곡 없는 고속 결함 검출'
    }
  },
  {
    id: 'cognex',
    name: 'Cognex Corporation',
    country: '미국',
    domain: 'mv',
    domainLabel: '머신비전 / 엣지 AI',
    website: 'https://www.cognex.com',
    youtube: 'https://www.youtube.com/@CognexTV',
    ndaa: 'compliant',
    chip: 'In-Sight Edge Learning (ViDi EL)',
    socDetails: '온디바이스 전용 가속기 내장 엣지 러닝 엔진으로 사전 학습된 신경망을 5~10장 샘플로 파인튜닝',
    products: 'In-Sight 3800, In-Sight 2800, DataMan 380/470, VisionPro Deep Learning',
    summary: '스탠드얼론 스마트 비전 시스템의 글로벌 선구자. In-Sight 3800 및 2800 시리즈에 Edge Learning 기술을 도입하여, 고도의 딥러닝 지식 없이도 수 분 만에 부품 분류, 존재 유무, ViDi EL Read OCR 검사를 온카메라로 처리합니다.',
    founded: 1981,
    headquarters: 'Natick, Massachusetts, USA',
    strengths: [
      '스탠드얼론 올인원 스마트 카메라 (내장형 렌즈, 고성능 다색 조명, 고속 연산기 통합)',
      '단 5~10장의 정상/불량 이미지 샘플만으로 분류기 훈련 완료',
      '산업용 통신 프로토콜 (PROFINET, EtherNet/IP, Modbus TCP) 원스톱 통합'
    ],
    keySensors: ['커스텀 고속 고감도 센서', 'Sony Pregius 시리즈 글로벌 셔터'],
    supportedInterfaces: ['GigE Vision', 'EtherNet/IP', 'PROFINET', 'RS-232 / I/O'],
    flagshipCamera: {
      model: 'In-Sight 3800',
      resolution: '1.6 MP ~ 16 MP',
      maxFps: '최대 2,500 PPM (분당 부품 처리 수)',
      interfaceType: 'Gigabit Ethernet & Industrial I/O',
      highlight: '통합형 멀티 컬러 HDR+ 조명, 초고속 룰 베이스 툴과 엣지 러닝 AI 툴의 하이브리드 파이프라인'
    }
  },
  {
    id: 'flir',
    name: 'Teledyne FLIR / DALSA',
    country: '미국 / 캐나다',
    domain: 'mv',
    domainLabel: '에어리어 & 라인스캔',
    website: 'https://www.teledynevisionsolutions.com',
    youtube: 'https://www.youtube.com/@Flir',
    ndaa: 'compliant',
    chip: 'Intel Movidius Myriad 2 VPU / TDI 센서',
    socDetails: 'TDI(Time Delay Integration) 고속 전하 누적 로직 및 머신비전 카메라 내부 VPU 신경망 탑재',
    products: 'Blackfly S, Oryx 10GigE, Linea SWIR, Piranha XL, Firefly S AI',
    summary: '열화상 적외선(FLIR)부터 나노 스케일 반도체 웨이퍼 검사용 초고속 라인스캔(DALSA)까지 비전 솔루션 전 영역을 장악한 거인. 고감도 TDI 기술과 Spinnaker SDK를 통해 미세 결함을 극저지연으로 검출합니다.',
    founded: 1978,
    headquarters: 'Waterloo, Canada & Wilsonville, OR, USA',
    strengths: [
      '세계 최정상급 TDI(Time Delay and Integration) 라인스캔 센서 설계 역량',
      'Oryx 10GigE 인터페이스를 통한 고대역폭 무손실 데이터 스트리밍',
      'SWIR(단파장 적외선) 및 광범위 스펙트럼 영상 분석 지원'
    ],
    keySensors: ['Teledyne 독자 TDI 라인스캔 센서', 'Sony Pregius BSI 글로벌 셔터'],
    supportedInterfaces: ['10GigE Vision', 'GigE Vision', 'USB3 Vision', 'Camera Link', 'CoaXPress'],
    flagshipCamera: {
      model: 'Oryx ORX-10G-123S6M',
      resolution: '12.3 MP (4096 x 3000)',
      maxFps: '68 fps (10Gbps 풀 대역폭)',
      interfaceType: '10GBASE-T Ethernet',
      highlight: '10GigE 전송 인터페이스로 장거리(최대 50m) 초고속 프레임 데이터 손실 제로 전송'
    }
  },
  {
    id: 'vieworks',
    name: 'Vieworks (뷰웍스)',
    country: '대한민국',
    domain: 'mv',
    domainLabel: '초고해상도 머신비전',
    website: 'https://vision.vieworks.com',
    youtube: 'https://www.youtube.com/user/vieworks1',
    ndaa: 'compliant',
    chip: '하이브리드 TDI / 능동 펠티어 열전 냉각 (TEC)',
    socDetails: '센서 온도를 주변 대비 -20℃ 냉각 유지하는 능동형 펠티어 제어 및 나노스케일 픽셀 시프팅 엔진',
    products: 'VC / VN 시리즈 (나노 픽셀 시프팅), VP 시리즈 (열전 냉각), VT 시리즈 (하이브리드 TDI 라인스캔)',
    summary: '디스플레이(OLED/Micro LED) 및 반도체 검사 분야 세계 최고 수준의 대한민국 광학·머신비전 명가. 자체 특허 픽셀 시프팅 기술로 1억 2700만 화소 이상의 극한 해상도를 구현하며 CoaXPress-over-Fiber를 선도합니다.',
    founded: 1999,
    headquarters: '경기도 안양시, 대한민국',
    strengths: [
      '세계 최초 픽셀 시프팅(Pixel Shifting) 기반 4.2억 화소 극한 초정밀 이미징',
      '고온 노이즈 억제를 위한 펠티어 소자(TEC) 능동 냉각 기술 내장',
      '초고속 광통신 기반 CXP-over-Fiber (광케이블 수 킬로미터 무손실 전송)'
    ],
    keySensors: ['Custom Hybrid TDI 센서', 'Sony Pregius S / 온세미 대형 포맷 센서'],
    supportedInterfaces: ['CoaXPress 2.0 (CXP-12)', 'CXP-over-Fiber', 'Camera Link'],
    flagshipCamera: {
      model: 'VP-127MX2 (Thermoelectric Cooled)',
      resolution: '127.4 MP (13296 x 9576)',
      maxFps: '21.9 fps',
      interfaceType: 'CoaXPress 2.0 (4채널)',
      highlight: '능동 펠티어 냉각으로 암전류 노이즈 극소화, FPD 및 반도체 기판 미세 결함 완벽 검출'
    }
  },
  {
    id: 'ids',
    name: 'IDS Imaging Development Systems',
    country: '독일',
    domain: '3d',
    domainLabel: '산업용 / 3D & AI',
    website: 'https://en.ids-imaging.com',
    youtube: 'https://www.youtube.com/@IDS_Imaging',
    ndaa: 'compliant',
    chip: 'IDS NXT AI Core (FPGA 신경망)',
    socDetails: '클라우드 플랫폼(IDS NXT lighthouse)에서 훈련된 심층 신경망을 카메라 내부 FPGA로 직접 배포 및 실행',
    products: 'uEye+, IDS NXT 스마트 카메라 (ocean, rome), Ensenso 3D 스테레오 카메라',
    summary: '독일의 혁신적 산업용 카메라 제조사. uEye 시리즈의 컴팩트 산업용 카메라와 함께, 비전문가도 웹 브라우저에서 AI 모델을 제작하고 카메라에 직접 주입하는 IDS NXT 올인원 온카메라 추론 생태계를 제공합니다.',
    founded: 1997,
    headquarters: 'Obersulm, Germany',
    strengths: [
      'IDS lighthouse 클라우드에서 온카메라 FPGA로 이어지는 엔드투엔드 AI 워크플로우',
      'Ensenso 3D 패턴 프로젝션 스테레오 비전 (로봇 빈피킹 최적화)',
      'IP65/67 방수 방진 산업용 하우징 지원'
    ],
    keySensors: ['Sony Pregius S BSI 시리즈', 'Onsemi Python / e2v 센서'],
    supportedInterfaces: ['GigE Vision', 'USB3 Vision', 'Ensenso 3D Stereo Interface'],
    flagshipCamera: {
      model: 'IDS NXT rome',
      resolution: 'Up to 20 MP',
      maxFps: 'Full frame at target speed',
      interfaceType: 'GigE Vision with C-Mount / IP65/67',
      highlight: '임베디드 신경망 가속 엔진 내장, 외부 PC 없이 실시간 제품 판정 및 신호 출력'
    }
  },
  {
    id: 'kohyoung',
    name: 'Koh Young Technology (고영테크놀러지)',
    country: '대한민국',
    domain: '3d',
    domainLabel: '3D 검사 시스템',
    website: 'https://kohyoung.com',
    youtube: 'https://www.youtube.com/c/kohyoungtechnologyinc',
    ndaa: 'compliant',
    chip: '특허 모아레(Moiré) 간섭계 & KSMART AI 엔진',
    socDetails: '다방향 프로젝터와 고속 머신비전 카메라가 연동되어 Z축 정밀 고도 위상 데이터를 산출하는 특허 광학계',
    products: '3D SPI (납도포 검사기), 3D AOI (부품 장착 검사기 Meister 시리즈), 뇌수술용 의료 로봇',
    summary: 'SMT(표면실장기술) 3D 검사 장비 분야 글로벌 시장점유율 독보적 1위 기업. 그림자 현상과 난반사를 원천 차단하는 다중 방향 위상 측정 모아레 기술로 부품 높이를 ±0.75% 풀스케일 선형성으로 전수 측정합니다.',
    founded: 2002,
    headquarters: '서울특별시 금천구 가산디지털단지, 대한민국',
    strengths: [
      '글로벌 3D SPI 및 3D AOI 시장 점유율 1위 (애플, 테슬라, 보쉬 전방위 채택)',
      '2D 이미지의 한계를 극복한 100% 3D 진성 높이 및 볼륨 측정',
      '공정 최적화 및 스마트 팩토리 피드백 솔루션 KSMART'
    ],
    keySensors: ['초고속 커스텀 CMOS 센서', '특허 격자 프로젝터 어레이'],
    supportedInterfaces: ['High-speed Custom Optical / Camera Link'],
    flagshipCamera: {
      model: 'Meister D+ (Advanced 3D Packaging AOI)',
      resolution: 'Sub-micron 3D 높이 분해능',
      maxFps: '초고속 스캔 검사',
      interfaceType: 'Dedicated High-Speed Bus',
      highlight: '투명 글래스 및 반도체 범프 고도를 모아레 간섭계로 실시간 3D 프로파일링'
    }
  },
  {
    id: 'econ',
    name: 'e-con Systems',
    country: '인도',
    domain: '3d',
    domainLabel: 'OEM 임베디드 비전',
    website: 'https://www.e-consystems.com',
    youtube: 'https://www.youtube.com/@econsystems',
    ndaa: 'compliant',
    chip: 'NVIDIA Jetson / NXP i.MX / Qualcomm ISP 연동',
    socDetails: 'NVIDIA Jetson Orin / AGX 보드와 하드웨어 드라이버 수준에서 결합된 MIPI CSI-2 / GMSL2 카메라 파이프라인',
    products: 'e-CAM 시리즈, GMSL2 HDR 서라운드 카메라, 멀티 카메라 동기화 허브',
    summary: '자율주행 로봇(AMR), 농업 드론, 의료 진단 기기를 위한 임베디드 OEM 비전 전문 기업. NVIDIA Jetson 생태계의 최고 파트너로서 초소형 글로벌 셔터 및 멀티 카메라 하드웨어 트리거 동기화 솔루션을 제공합니다.',
    founded: 2003,
    headquarters: 'Chennai, India & San Jose, CA, USA',
    strengths: [
      'NVIDIA Jetson Orin Nano, NX, AGX 공식 엘리트 카메라 파트너',
      '최대 15m 장거리 동축 케이블 전송을 지원하는 GMSL2 / FPD-Link III 인터페이스',
      '초소형 보드 레벨(Board-level) 폼팩터 및 맞춤 렌즈 튜닝'
    ],
    keySensors: ['Sony Pregius S (IMX568 / IMX565)', 'Onsemi AR0234 (글로벌 셔터)'],
    supportedInterfaces: ['MIPI CSI-2', 'GMSL2', 'USB3.0 Type-C'],
    flagshipCamera: {
      model: 'NileCAM25 (Full HD GMSL2 Global Shutter)',
      resolution: '2.3 MP (1920 x 1200)',
      maxFps: '120 fps',
      interfaceType: 'GMSL2 (동축 15m)',
      highlight: '초저지연 비압축 전송, 자율주행 AMR 및 AGV의 장애물 감지 및 SLAM 네비게이션 최적'
    }
  },
  {
    id: 'hikrobot',
    name: 'Hikrobot (하이크로봇)',
    country: '중국',
    domain: 'mv',
    domainLabel: '머신비전 & 로지스틱스',
    website: 'https://www.hikrobotics.com',
    youtube: 'https://www.youtube.com/c/hikrobot',
    ndaa: 'sanctioned',
    chip: 'VisionMaster AI 엔진 & 임베디드 VPU',
    socDetails: '모회사 하이크비전의 영상 코덱 및 AI IP를 머신비전 검사 소프트웨어 알고리즘과 결합',
    products: 'SC 시리즈 스마트 카메라, ID3000/5000/7000 바코드 리더, 레이저 3D 프로파일러, AMR 물류 로봇',
    summary: '중국 1위 머신비전 및 모바일 물류 로봇 제조사. 압도적인 가성비와 광범위한 라인업을 앞세워 중국 내수 및 신흥국 공장을 장악했으나, 미국의 NDAA 및 엔티티 리스트 제재로 인해 서방 공공/전략 제조 인프라 진입이 차단되었습니다.',
    founded: 2016,
    headquarters: 'Hangzhou, China',
    strengths: [
      '극단적인 단가 경쟁력 및 빠른 공급 납기',
      'VisionMaster 알고리즘 플랫폼을 통한 비전 검사와 AMR 로봇의 단일 통제',
      '중국 내수 배터리 및 태양광 제조 라인 대규모 공급 실적'
    ],
    keySensors: ['Sony 글로벌 셔터', 'Gpixel 중국 국산 센서'],
    supportedInterfaces: ['GigE Vision', 'USB3 Vision', 'CoaXPress'],
    flagshipCamera: {
      model: 'SC7000 Smart Camera',
      resolution: '12 MP ~ 20 MP',
      maxFps: '60+ fps',
      interfaceType: 'Gigabit Ethernet',
      highlight: '딥러닝 알고리즘 내장, 복잡한 문자 판독(OCR) 및 조립 결함 유무 고속 판정'
    }
  },
  {
    id: 'axis',
    name: 'Axis Communications',
    country: '스웨덴',
    domain: 'sec',
    domainLabel: '프리미엄 물리 보안',
    website: 'https://www.axis.com',
    youtube: 'https://www.youtube.com/axiscommunications',
    ndaa: 'compliant',
    chip: '자체 개발 ARTPEC-9 SoC',
    socDetails: 'AV1 하드웨어 인코더, Lightfinder 2.0 고도화, 하드웨어 기반 보안 부팅(Secure Boot) 및 신뢰 루트(Root of Trust)',
    products: 'Q / P / M 시리즈 IP 네트워크 카메라, 가상 펜스 레이더, 열화상 바이옵틱 카메라',
    summary: '1996년 세계 최초로 네트워크 IP 카메라를 발명한 물리 보안 업계의 기술 표준. 9세대 자체 칩셋 ARTPEC-9을 통해 차세대 AV1 고효율 영상 압축과 극한의 사이버 보안 무결성을 구현하여 미국 정부 및 공공 기관의 최우선 권장 벤더로 군림합니다.',
    founded: 1984,
    headquarters: 'Lund, Sweden',
    strengths: [
      '100% 자체 설계 ARTPEC-9 SoC (백도어 원천 차단 및 공급망 신뢰성 보장)',
      '업계 최초 오픈 비디오 코덱 AV1 하드웨어 인코딩 지원 (대역폭 30% 이상 절감)',
      '엄격한 제로 트러스트(Zero Trust) 사이버 보안 아키텍처 및 FIPS 140-3 규격 충족'
    ],
    keySensors: ['1/1.8" ~ 4/3" 초고감도 센서', 'Sony 저조도 STARVIS 2'],
    supportedInterfaces: ['IPv4/v6 IP Network', 'PoE / PoE+ (IEEE 802.3af/at)', 'ONVIF Profile S/G/T/M'],
    flagshipCamera: {
      model: 'AXIS Q3538-LVE',
      resolution: '4K (3840 x 2160) at 60 fps',
      maxFps: '60 fps',
      interfaceType: 'Gigabit IP PoE+',
      highlight: 'ARTPEC-9 기반 딥러닝 객체 분류(AXIS Object Analytics), 저조도 컬러 Lightfinder 2.0 및 Forensic WDR'
    }
  },
  {
    id: 'hanwha',
    name: 'Hanwha Vision (한화비전)',
    country: '대한민국',
    domain: 'sec',
    domainLabel: 'AI 기반 보안 영상',
    website: 'https://www.hanwhavision.com',
    youtube: 'https://www.youtube.com/@HanwhaVision',
    ndaa: 'compliant',
    chip: '자체 개발 Wisenet 9 SoC (Dual NPU)',
    socDetails: 'ISP 전용 딥러닝 NPU (픽셀 단위 AI 노이즈 제거) + 객체 감지 및 소리 분류 전용 고성능 NPU 독립 구동',
    products: 'P / X / Q 시리즈 AI 카메라, TNO-7180RLP (초고속 도로 차량 번호 인식), 멀티 센서 360° 카메라',
    summary: '미국 NDAA(국방수권법) 시행 이후 서방 보안 시장에서 중국 업체의 빈자리를 가장 성공적으로 대체한 글로벌 톱티어 보안 기업. 독자 칩셋 Wisenet 9의 듀얼 NPU 기술로 극저조도 노이즈 제거와 고속 차량/인물 메타데이터 추출을 온디바이스로 처리합니다.',
    founded: 1977,
    headquarters: '경기도 성남시 판교, 대한민국',
    strengths: [
      '미국 정부 조달 완벽 부합 100% NDAA 컴플라이언스 및 TAA 인증',
      'Wisenet 9 Dual NPU: 화질 개선 AI-NR과 메타데이터 분석의 하드웨어적 병렬 분리',
      '글로벌 최고 수준의 사이버 보안 전담팀 S-CERT 운영 및 UL CAP 사이버 인증 획득'
    ],
    keySensors: ['Sony Pregius 글로벌 셔터 (ITS 전용)', 'Sony STARVIS 2 4K 센서'],
    supportedInterfaces: ['Gigabit IP PoE+', 'ONVIF Profile S/G/T/M', 'Dry Contact I/O'],
    flagshipCamera: {
      model: 'TNO-7180RLP (High-Speed ANPR Camera)',
      resolution: 'Full HD 1080p (Global Shutter)',
      maxFps: '60 fps',
      interfaceType: 'Gigabit Ethernet PoE+',
      highlight: '글로벌 셔터 센서 탑재로 최대 시속 200km/h 주행 차량의 번호판 왜곡 없는 포착 및 차종/색상 식별'
    }
  },
  {
    id: 'hikvision',
    name: 'Hikvision (하이크비전)',
    country: '중국',
    domain: 'sec',
    domainLabel: '대중형 보안 감시',
    website: 'https://www.hikvision.com',
    youtube: 'https://www.youtube.com/@HikvisionCorporateChannel',
    ndaa: 'sanctioned',
    chip: '관란(Guanlan) 거대 AI 모델 / ColorVu SoC',
    socDetails: '자체 개발 멀티모달 대규모 비전 모델(관란)과 초저조도 ISP 알고리즘 결합',
    products: 'ColorVu 4K, AcuSense, HeatPro 열화상 카메라, Hik-Partner Pro 플랫폼',
    summary: '글로벌 영상 감시 시장 출하량 1위의 중국 국유 거대 기업. F1.0 슈퍼 조리개와 초고감도 센서를 결합한 ColorVu로 24시간 풀컬러 야간 감시를 대중화했으나, 미국 NDAA 제재 및 FCC 인증 금지 조치로 인해 서방 주요 공공기관에서 퇴출되었습니다.',
    founded: 2001,
    headquarters: 'Hangzhou, China',
    strengths: [
      '세계 최대의 제조 규모를 통한 극한의 원가 절감력',
      'ColorVu 기술 기반 24시간 풀컬러 야간 감시 기능',
      '아시아, 아프리카, 중남미, 중동 등 비서방 신흥국 시장에서의 독보적 점유율'
    ],
    keySensors: ['중국 국산 대형 센서', 'Sony 저조도 CIS'],
    supportedInterfaces: ['IP PoE', 'Coaxial (Turbo HD)', 'ONVIF'],
    flagshipCamera: {
      model: 'ColorVu Smart Hybrid Light 4K',
      resolution: '4K Ultra HD (3840 x 2160)',
      maxFps: '30 fps',
      interfaceType: 'Gigabit IP PoE',
      highlight: '0.0005 Lux 극저조도에서도 보조 조명 없이 자연광 색상 복원 및 사람/차량 구분 경고'
    }
  },
  {
    id: 'dahua',
    name: 'Dahua Technology (다후아)',
    country: '중국',
    domain: 'sec',
    domainLabel: '통합 AIoT 보안',
    website: 'https://www.dahuasecurity.com',
    youtube: 'https://www.youtube.com/channel/UC8eFvmjnPkQ2ROnABxHkEYw',
    ndaa: 'sanctioned',
    chip: 'Xinghan 거대 파운데이션 모델',
    socDetails: 'Dahua Think# 2.0 아키텍처 기반의 도시 단위 스마트 시티 영상 분석 SoC',
    products: 'TiOC (Three-in-One), WizMind AI, WizSense, Full-color Cube',
    summary: '글로벌 보안 영상 시장 2위의 중국 대표 제조사. 24/7 풀컬러 감시, 능동적 사이렌/스트로브 경고, AI 분석을 하나의 카메라 하우징에 집약한 TiOC 시리즈로 상업 시장을 공략했으나 하이크비전과 동일하게 미국 및 EU 공공 조달 제재 대상입니다.',
    founded: 2001,
    headquarters: 'Hangzhou, China',
    strengths: [
      'TiOC(3-in-1) 시리즈의 직관적인 사전 예방형 액티브 디터런스(Active Deterrence)',
      'HDCVI 기술로 기존 동축 케이블 인프라에서 4K 고화질 전송',
      '풍부한 주변기기(인터폰, 출입통제, 드론)와의 에코시스템'
    ],
    keySensors: ['1/1.8" 고감도 센서', 'Dual Sensor F1.0'],
    supportedInterfaces: ['IP PoE', 'HDCVI Coaxial', 'ONVIF'],
    flagshipCamera: {
      model: 'TiOC Duo (Dual-Lens Splicing Camera)',
      resolution: '4K (180° 파노라마 뷰)',
      maxFps: '25/30 fps',
      interfaceType: 'Gigabit IP PoE',
      highlight: '듀얼 렌즈 왜곡 보정 스티칭 기술로 180도 사각지대 없는 감시 및 적청 경광등/스피커 경보'
    }
  },
  {
    id: 'idis',
    name: 'IDIS (아이디스)',
    country: '대한민국',
    domain: 'sec',
    domainLabel: '엔드투엔드 원스톱 보안',
    website: 'https://www.idisglobal.com',
    youtube: 'https://www.youtube.com/c/IDISGlobal',
    ndaa: 'compliant',
    chip: 'IDLA (IDIS Deep Learning Analytics) & 양자내성암호(PQC)',
    socDetails: '카메라부터 NVR, VMS까지 100% 자체 제조되며, 세계 최초로 양자내성암호(PQC)를 적용한 비디오 보안 엔진',
    products: 'DirectIP 카메라/NVR, Quantum AI NVR, IDIS Solution Suite (ISS) VMS',
    summary: 'DVR 및 NVR을 자체 기술로 개척한 한국 비디오 보안의 원조. 100% 국내 연구 및 제조를 유지하며, 복잡한 IP 설정 없이 랜선만 꽂으면 즉시 암호화 연결되는 DirectIP와 금융/방위 보안을 위한 양자내성암호(PQC)를 상용화했습니다.',
    founded: 1997,
    headquarters: '대전광역시 유성구 / 경기도 판교 R&D 센터, 대한민국',
    strengths: [
      '100% 대한민국 국내 생산으로 보증되는 신뢰성 (Made in Korea)',
      '세계 최초 양자내성암호(PQC) 탑재로 미래 양자컴퓨터 해킹 위협 대비',
      '네트워크 지식 없이 원클릭 자동 연동되는 플러그 앤 플레이 DirectIP'
    ],
    keySensors: ['Sony 감시용 센서', '고신뢰도 이미지 센서'],
    supportedInterfaces: ['DirectIP (PoE 전용)', 'Standard IP PoE', 'ONVIF'],
    flagshipCamera: {
      model: 'DC-Y6516WRX (Fisheye 12MP)',
      resolution: '12 MP (3008 x 3008)',
      maxFps: '30 fps',
      interfaceType: 'DirectIP PoE',
      highlight: '하드웨어 왜곡 보정(Dewarping) 및 온카메라 히트맵/피플카운팅 분석'
    }
  },
  {
    id: 'bosch',
    name: 'Bosch Security Systems',
    country: '독일',
    domain: 'sec',
    domainLabel: '고신뢰도 엔지니어링 보안',
    website: 'https://www.boschsecurity.com',
    youtube: 'https://www.youtube.com/@BoschSecuritySystems',
    ndaa: 'compliant',
    chip: 'Intelligent Video Analytics (IVA Pro)',
    socDetails: '철도, 터널, 공항 등 극한 환경에 특화된 온에지 메타데이터 추적 알고리즘 내장',
    products: 'FLEXIDOME, AUTODOME PTZ, MIC IP ultra 7100i (극한 환경 방폭/부식 방지)',
    summary: '독일 자동차 및 산업 기계 거인 보쉬의 물리 보안 부문. 극한의 기후(-40℃ ~ +65℃)와 염분, 진동에 견디는 항공기 등급의 견고한 하드웨어 설계와 미세한 객체 궤적을 추적하는 IVA Pro 엣지 분석 기술을 자랑합니다.',
    founded: 2001,
    headquarters: 'Grasbrunn, Germany',
    strengths: [
      '방폭, 염해, 폭풍을 견디는 극한 환경용 MIC IP 아키텍처',
      '카메라 내부에서 실시간으로 3D 지리좌표(GPS) 메타데이터를 계산하는 IVA Pro',
      '엄격한 엔지니어링 품질 관리와 긴 제품 수명 주기 보장'
    ],
    keySensors: ['1/1.8" ~ 1" 초고화질 저조도 센서'],
    supportedInterfaces: ['Gigabit IP PoE', 'Fiber Optic Direct', 'ONVIF Profile M'],
    flagshipCamera: {
      model: 'MIC IP fusion 9000i (Optical + Thermal)',
      resolution: 'Optical 1080p / Thermal 640x512',
      maxFps: '60 fps',
      interfaceType: 'IP PoE with Optical interface option',
      highlight: '광학 카메라와 열화상 카메라의 실시간 비디오 퓨전(Metadata Fusion)으로 안개/연기 관통 감시'
    }
  }
];

export const SENSOR_COMPARISONS: SensorComparison[] = [
  {
    generation: '2세대 FSI (Front-Illuminated)',
    name: 'Sony Pregius 2세대 (예: IMX250)',
    pixelPitch: 3.45,
    qe: 60.0,
    saturationCapacity: 10500,
    dynamicRange: 71.0,
    readNoise: 2.5,
    maxFpsScale: 1.0,
    structure: 'FSI (Front-Illuminated)',
    craAdvantage: '주광선각(CRA) 허용치 제한 (주변부 비네팅 방지 위해 장초점 광학계 선호)'
  },
  {
    generation: '4세대 BSI (Back-Illuminated)',
    name: 'Sony Pregius S (예: IMX540 / IMX541)',
    pixelPitch: 2.74,
    qe: 71.5,
    saturationCapacity: 10000,
    dynamicRange: 72.8,
    readNoise: 1.8,
    maxFpsScale: 2.4,
    structure: 'Stacked BSI',
    craAdvantage: '포토다이오드가 배선층 상단에 위치하여 광각 렌즈 결합 시에도 주변부 감도 저하가 극히 적음'
  }
];

export const INTERFACE_SPECS: InterfaceSpec[] = [
  {
    name: 'GigE Vision (1Gbps)',
    bandwidthGbps: 1.0,
    maxDistanceMeters: 100,
    latencyJitter: '~1ms (드라이버 필터 사용 시 수십 µs)',
    frameGrabber: '불필요 (NIC / Host)',
    cableType: '표준 CAT5e / CAT6 (RJ45)',
    powerDelivery: 'PoE 지원 (최대 15.4W)',
    typicalApplication: '일반 공정 검사, 스마트 팩토리 분산 카메라 모니터링'
  },
  {
    name: '5GigE / 10GigE Vision',
    bandwidthGbps: 10.0,
    maxDistanceMeters: 100,
    latencyJitter: '< 100µs',
    frameGrabber: '불필요 (NIC / 10G NIC)',
    cableType: 'CAT6A / CAT7 또는 SFP+ 광',
    powerDelivery: 'PoE+ 지원 (최대 30W)',
    typicalApplication: '고속 포장 라인, 3D 검사, 다중 카메라 동시 스트리밍'
  },
  {
    name: 'USB3 Vision',
    bandwidthGbps: 5.0,
    maxDistanceMeters: 5,
    latencyJitter: '~100µs (OS 부하 영향 받음)',
    frameGrabber: '불필요 (Host USB 3.0)',
    cableType: '스크류 락 USB 3.0 케이블',
    powerDelivery: 'USB 버스 파워 (4.5W)',
    typicalApplication: '탁상형 현미경 검사기, 의료 장비, 연구소 벤치마크'
  },
  {
    name: 'CoaXPress 2.0 (CXP-12, 4ch)',
    bandwidthGbps: 50.0,
    maxDistanceMeters: 35,
    latencyJitter: '< 1µs (나노초 단위 고정밀 하드웨어 트리거)',
    frameGrabber: '필수 (PCIe)',
    cableType: 'Micro-BNC (HD-BNC) 75Ω 동축',
    powerDelivery: 'PoCXP 지원 (채널당 최대 13W)',
    typicalApplication: '반도체 웨이퍼 검사, 디스플레이 FPD 결함 고속 검사'
  },
  {
    name: 'CoaXPress-over-Fiber (CXP-oF)',
    bandwidthGbps: 40.0,
    maxDistanceMeters: 10000,
    latencyJitter: '< 1µs (전기적 노이즈 완전 차단)',
    frameGrabber: '필수 (PCIe 광 인터페이스)',
    cableType: '표준 LC 광섬유 (단일모드/다중모드)',
    powerDelivery: '외부 전원 공급 필수',
    typicalApplication: '철도 선로 검사, 초대형 철강 압연 라인, 전자기 노이즈 극심 공정'
  }
];

export const LENS_MOUNTS = [
  {
    mount: 'C-Mount',
    thread: '1인치 나사산 (32 TPI)',
    ffdMm: 17.526,
    maxSensorFormat: '최대 1.2인치 (대각 19.3mm)',
    description: '산업용 머신비전의 세계 절대 표준. 대다수 산업용 에어리어 카메라의 기본 마운트.'
  },
  {
    mount: 'CS-Mount',
    thread: '1인치 나사산 (32 TPI)',
    ffdMm: 12.526,
    maxSensorFormat: '최대 1/2.7" ~ 1/1.8"',
    description: '물리 보안 CCTV 카메라에서 주로 사용. 5mm 어댑터 링을 추가하면 C-Mount 렌즈를 장착 가능.'
  },
  {
    mount: 'F-Mount (Nikon Bayonet)',
    thread: '베이오넷 방식 (잠금 링)',
    ffdMm: 46.5,
    maxSensorFormat: '35mm 풀프레임 (대각 43.3mm)',
    description: '대형 라인스캔 카메라 및 50MP 이상 초고해상도 에어리어 검사 카메라의 표준 규격.'
  },
  {
    mount: 'M42 Mount (T2 / x1)',
    thread: 'M42 x 1mm 또는 x 0.75mm',
    ffdMm: '기종별 상이 (보통 12mm or 45.5mm)',
    maxSensorFormat: '최대 35mm 풀프레임',
    description: '라인스캔 및 대면적 고속 산업용 카메라에서 렌즈 결합 안정성을 위해 채택.'
  },
  {
    mount: 'S-Mount (M12)',
    thread: 'M12 x 0.5mm',
    ffdMm: '가변 초점 (보통 렌즈 배럴 직접 회전)',
    maxSensorFormat: '1/3" ~ 1/2.3" 초소형 센서',
    description: '임베디드 비전, 자율주행 드론, AMR 로봇 보드 레벨 카메라에 사용되는 마이크로 렌즈 규격.'
  }
];

export const CONVERGENCE_METRICS = [
  { axis: '초고속 프레임 (FPS)', machineVision: 95, physicalSecurity: 40, benchmark: 'CXP-12 수백 FPS vs 일반 보안 30~60 FPS' },
  { axis: '무손실 원시 데이터 전송', machineVision: 98, physicalSecurity: 45, benchmark: '비압축 Raw 8/10/12비트 vs H.264/H.265/AV1 손실 압축' },
  { axis: '온디바이스 엣지 AI (NPU)', machineVision: 75, physicalSecurity: 95, benchmark: '룰 기반 + 엣지 러닝 vs 대규모 객체/행동/음향 멀티태스크 딥러닝' },
  { axis: '장거리 네트워크 & 인프라', machineVision: 40, physicalSecurity: 95, benchmark: '전용 동축/NIC 중심 vs 글로벌 인터넷망, VPN, 제로트러스트' },
  { axis: '사이버 보안 & 법적 규제', machineVision: 60, physicalSecurity: 95, benchmark: '폐쇄망 위주 vs 미국 NDAA, EU AI Act, UL CAP 엄격 준수' },
  { axis: '저조도 감도 & 역광 WDR', machineVision: 55, physicalSecurity: 92, benchmark: '인공 조명 통제 환경 vs 0.0005 Lux 칠흑 야간 및 150dB 광역 역광' }
];

export const REGULATION_MILESTONES = [
  {
    year: '2019.08',
    title: '미국 국방수권법(NDAA) Section 889 발효',
    body: '연방정부 기관의 하이크비전, 다후아, 하이실리콘 칩셋 카메라 구매 및 사용 공식 금지. 서방 주요 관공서 철거 시작.',
    tag: 'NDAA'
  },
  {
    year: '2020.08',
    title: 'NDAA Part B 조달 금지 확대',
    body: '연방 정부 계약을 체결하는 모든 민간 기업 및 하청업체까지 제재 대상 장비 사용을 금지하여 민간 공급망까지 확산.',
    tag: 'NDAA'
  },
  {
    year: '2022.11',
    title: '미국 FCC 보안 장비 승인 금지(Order 22-84)',
    body: '신규 제재 대상 중국산 카메라의 미국 내 상업용 판매 허가(FCC Certification) 영구 거부 조치.',
    tag: 'FCC'
  },
  {
    year: '2024.08',
    title: '유럽연합 EU AI Act 공식 발효',
    body: '공공장소 원격 안면인식 금지 규정 확정. 실시간 생체인식 시스템을 고위험군으로 지정하고 위반 시 최대 글로벌 매출 7% 과징금.',
    tag: 'EU AI Act'
  },
  {
    year: '2025~2026',
    title: '프라이버시 보존형 온디바이스 엣지 AI 표준화',
    body: '신원 비식별화, 실루엣 추적, AI-NR 듀얼 NPU 아키텍처가 전 세계 엔터프라이즈 및 공공 조달 시장의 기본 입찰 규격으로 안착.',
    tag: 'Standard'
  }
];
