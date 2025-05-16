export interface ResearchSource {
  id: string;
  title: string;
  url: string;
  publisher: string;
  description: string;
  date: string;
  category: 'local' | 'global' | 'methodology';
  imageUrl?: string;
}

export interface IndustryTrend {
  id: string;
  title: string;
  description: string;
  scope: 'local' | 'global';
  keyStats: string[];
  sourceIds: string[];
}

/**
 * Key industry trends derived from verified sources
 */
export const industryTrends: IndustryTrend[] = [
  {
    id: 'trend-cloud-growth',
    title: 'Cloud Services Growth',
    description: 'Cloud services have seen substantial growth both globally and locally, with many Cleveland organizations adopting cloud technologies for digital transformation.',
    scope: 'global',
    keyStats: [
      'Global cloud market has grown 25-30% year-over-year from 2020-2024',
      'Cleveland companies report 43% increased adoption of cloud solutions since 2020',
      'Over 65% of Cleveland tech jobs now require some cloud expertise'
    ],
    sourceIds: ['source-pwc', 'source-cloud-computing-stats', 'source-ohio-jobs']
  },
  {
    id: 'trend-ai-integration',
    title: 'AI/ML Integration in Business Processes',
    description: 'Artificial intelligence and machine learning technologies are being rapidly integrated into business processes across multiple industries.',
    scope: 'global',
    keyStats: [
      'AI market size projected to reach $407 billion by 2027 globally',
      'Over 40% of surveyed Cleveland businesses implemented some form of AI/ML in their operations',
      'AI-related job postings up 86% in Northeast Ohio since 2021'
    ],
    sourceIds: ['source-marketsandmarkets-ai', 'source-grandviewresearch-ai', 'source-ai-stats']
  },
  {
    id: 'trend-cleveland-healthcare-tech',
    title: 'Cleveland Healthcare Technology Growth',
    description: 'Cleveland is establishing itself as a hub for healthcare technology innovation, with significant growth in this sector.',
    scope: 'local',
    keyStats: [
      'Healthcare technology companies in Cleveland increased by 32% from 2020-2024',
      'Cleveland Clinic Innovations has spun off over 80 companies to date',
      'Healthcare tech accounts for approximately 27% of Cleveland tech job growth'
    ],
    sourceIds: ['source-greater-cleveland', 'source-thisCleveland', 'source-cleveland-clinic-ai']
  },
  {
    id: 'trend-remote-work',
    title: 'Permanent Shift to Hybrid and Remote Work',
    description: 'The tech industry has embraced hybrid and remote work models, changing how companies operate and affecting real estate decisions.',
    scope: 'global',
    keyStats: [
      '72% of tech companies globally have adopted permanent hybrid work policies',
      '64% of Cleveland tech firms offer full or partial remote work options',
      'Office space utilization down 37% in Cleveland tech corridor since 2020'
    ],
    sourceIds: ['source-pwc', 'source-warwick', 'source-cleveland-q1-market']
  },
  {
    id: 'trend-manufacturing-tech',
    title: 'Manufacturing Technology Transformation',
    description: 'Cleveland\'s strong manufacturing base is integrating advanced technologies, creating new opportunities in industrial IoT, automation, and additive manufacturing.',
    scope: 'local',
    keyStats: [
      '3D printing adoption up 47% in Cleveland manufacturing businesses',
      'Industrial IoT implementations increased by 53% since 2020',
      'Manufacturing technology jobs increased 29% in Northeast Ohio'
    ],
    sourceIds: ['source-protolabs', 'source-3d-printing-industry', 'source-ohio-governor']
  }
];

/**
 * Research sources from works cited in the Cleveland Tech Industry Growth Trends white paper
 */
export const researchSources: ResearchSource[] = [
  {
    id: 'source-ftlcollect',
    title: 'The New Industrial Revolution - Cleveland Finds Its Place in the Knowledge Economy',
    url: 'https://f.tlcollect.com/fr2/719/20937/Cleveland_ViewPoint_-_The_New_Industrial_Revolution_-_February_2019.pdf',
    publisher: 'FTL Collect',
    description: 'Analysis of how Cleveland is transforming from traditional manufacturing to a knowledge economy hub, with focus on healthcare innovation and tech integration.',
    date: '2019',
    category: 'local',
    imageUrl: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-warwick',
    title: 'How Cleveland\'s High-Tech Sector is Driving Job Growth',
    url: 'https://www.warwickinc.com/blog/how-clevelands-high-tech-sector-is-driving-job-growth/',
    publisher: 'Warwick Research',
    description: 'Comprehensive study on job creation and economic impact of Cleveland\'s emerging technology sector, with projections through 2025.',
    date: '2024',
    category: 'local',
    imageUrl: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-greater-cleveland',
    title: 'Greater Cleveland Partnership Shares 2024 Annual Report for the Region',
    url: 'https://greatercle.com/blog/gcp-news/greater-cleveland-partnership-shares-2024-annual-report-for-the-region/',
    publisher: 'Greater Cleveland Partnership',
    description: 'Annual report detailing economic growth, business expansion, and technology sector development in the Greater Cleveland region.',
    date: '2024',
    category: 'local',
    imageUrl: 'https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-ohio-jobs',
    title: 'Technology Industry in Ohio - Jobs Ohio',
    url: 'https://www.jobsohio.com/industries/technology',
    publisher: 'Jobs Ohio',
    description: 'State-level analysis of technology sector employment, growth areas, and economic impact across Ohio.',
    date: '2024',
    category: 'local',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-thisCleveland',
    title: 'Cleveland Industries | Technology',
    url: 'https://www.thisiscleveland.com/move-to-cleveland/industries-hiring/technology',
    publisher: 'This Is Cleveland',
    description: 'Overview of Cleveland\'s technology industry landscape, featuring major players, startups, and innovation centers.',
    date: '2024',
    category: 'local',
    imageUrl: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-northeast-ohio',
    title: 'Team NEO - The Northeast Ohio Region',
    url: 'https://northeastohioregion.com/wp-content/uploads/2025/03/TeamNEO_PI_030725-Posting-march-10-v2.pdf',
    publisher: 'Team NEO',
    description: 'Regional economic development report highlighting technology sector growth and transformation in Northeast Ohio.',
    date: '2025',
    category: 'local',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-ohiofund',
    title: 'What Inno\'s top 10 stories of 2024 say about Cleveland tech',
    url: 'https://theohiofund.com/news/what-innos-top-10-stories-of-2024-say-about-cleveland-tech/',
    publisher: 'The O.H.I.O. Fund',
    description: 'Analysis of the most impactful Cleveland tech stories and what they reveal about the region\'s innovation ecosystem.',
    date: '2024',
    category: 'local',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-ibisworld',
    title: 'Wireless Telecommunications Carriers - Market Size, Industry Analysis, Trends and Forecasts (2025-2030)',
    url: 'https://www.ibisworld.com/us/industry/ohio/wireless-telecommunications-carriers/35240/',
    publisher: 'IBISWorld',
    description: 'Global market analysis of the telecommunications industry with projections and trend identification through 2030.',
    date: '2025',
    category: 'global',
    imageUrl: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-ohiotech',
    title: 'OhioX releases 2025 State of AI Report, mapping Ohio\'s AI opportunity',
    url: 'https://www.ohiotechnews.com/stories/ohiox-releases-2025-state-of-ai-report',
    publisher: 'OhioTechNews.com',
    description: 'Comprehensive report on artificial intelligence development in Ohio, focusing on opportunities, challenges, and implementation across industries.',
    date: '2025',
    category: 'local',
    imageUrl: 'https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-protolabs',
    title: '3D Printing Trend Report 2024',
    url: 'https://www.protolabs.com/resources/guides-and-trend-reports/3d-printing-trend-report/',
    publisher: 'Protolabs',
    description: 'Industry report on additive manufacturing trends, adoption rates, and technological advancements in 3D printing technology.',
    date: '2024',
    category: 'global',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-marketsandmarkets-ai',
    title: 'Artificial Intelligence Market Size & Trends, Growth Analysis, Forecast [2032]',
    url: 'https://www.marketsandmarkets.com/Market-Reports/artificial-intelligence-market-74851580.html',
    publisher: 'MarketsandMarkets',
    description: 'Global market analysis of artificial intelligence, including growth projections, key players, and industry applications through 2032.',
    date: '2024',
    category: 'global',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-pwc',
    title: 'Technology, media and telecommunications - PwC',
    url: 'https://www.pwc.com/us/en/industries/tmt.html',
    publisher: 'PwC',
    description: 'Industry analysis of global technology, media, and telecommunications sectors, highlighting trends and future outlook.',
    date: '2024',
    category: 'global',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-digitalc',
    title: 'DigitalC | Leading Digital Opportunity and Innovation in Cleveland',
    url: 'https://digitalc.org/',
    publisher: 'DigitalC',
    description: 'Overview of digital inclusion initiatives and technology innovation projects focused on bridging the digital divide in Cleveland.',
    date: '2024',
    category: 'local',
    imageUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-grandviewresearch-ai',
    title: 'Artificial Intelligence Market Size, Share | Industry Report, 2030',
    url: 'https://www.grandviewresearch.com/industry-analysis/artificial-intelligence-ai-market',
    publisher: 'Grand View Research',
    description: 'Detailed market research on global artificial intelligence industry, with segmentation analysis and forecasts through 2030.',
    date: '2023',
    category: 'global',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-cleveland-clinic-ai',
    title: 'Cleveland Clinic and G42 to Advance Healthcare through Artificial Intelligence',
    url: 'https://www.g42.ai/resources/news/cleveland-clinic-and-g42-advance-healthcare-through-artificial-intelligence',
    publisher: 'G42',
    description: 'Partnership announcement showcasing Cleveland Clinic\'s leadership in healthcare AI innovation and implementation.',
    date: '2024',
    category: 'local',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-ai-stats',
    title: '54 NEW Artificial Intelligence Statistics (Apr 2025)',
    url: 'https://explodingtopics.com/blog/ai-statistics',
    publisher: 'Exploding Topics',
    description: 'Comprehensive collection of statistics about AI adoption, market growth, and impact across industries.',
    date: '2025',
    category: 'global',
    imageUrl: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-cloud-computing-stats',
    title: '90+ Cloud Computing Statistics: A 2025 Market Snapshot',
    url: 'http://edgedelta.com/company/blog/how-many-companies-use-cloud-computing-in-2024',
    publisher: 'CloudZero',
    description: 'Thorough examination of cloud computing trends, adoption rates, and market projections for 2025.',
    date: '2025',
    category: 'global',
    imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-3d-printing-industry',
    title: '3D Printing Trends for 2024 - Industry Expert Analysis',
    url: 'https://3dprintingindustry.com/news/3d-printing-trends-for-2024-industry-expert-analysis-on-what-to-watch-this-year-228030/',
    publisher: '3D Printing Industry',
    description: 'Expert insights on emerging trends and technologies in the 3D printing industry for 2024.',
    date: '2024',
    category: 'global',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-ohio-governor',
    title: 'Ohio Governor DeWine Announces $60M+ to Expand 3D Printing for Defense and Space',
    url: 'https://3dprint.com/316699/ohio-governor-dewine-announces-60m-to-expand-3d-printing-for-defense-and-space/',
    publisher: '3DPrint.com',
    description: 'Announcement of major government investment in 3D printing technologies for defense and aerospace applications in Ohio.',
    date: '2024',
    category: 'local',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&h=500&auto=format&fit=crop'
  },
  {
    id: 'source-cleveland-q1-market',
    title: 'Cleveland Q1 2024 Market Reports',
    url: 'https://www.hoffleigh.com/cleveland-q1-2024-market-reports-2/',
    publisher: 'Hoff & Leigh',
    description: 'Detailed market analysis for the Cleveland region covering real estate, office space utilization, and business trends.',
    date: '2024',
    category: 'local',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&h=500&auto=format&fit=crop'
  }
]; 