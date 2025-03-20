// Initial startups data
export const initialStartups = [
  {
    id: '1',
    name: 'Quantum Computing Labs',
    founder: 'Dr. Sarah Chen',
    industry: 'Quantum Technology',
    stage: 'Series A',
    logo: 'https://PLACEHOLDER',
    description: 'Developing next-generation quantum processors for commercial applications',
    yearFounded: 2020,
    website: 'https://quantumcomputing.example.com',
    metrics: {
      before: {
        fundingRaised: 800000, // $800K
        userGrowth: 5, // 5 enterprise clients
        mediaMentions: 8
      },
      after: {
        fundingRaised: 12000000, // $12M
        userGrowth: 28, // 28 enterprise clients
        mediaMentions: 45
      }
    }
  },
  {
    id: '2',
    name: 'MediSync',
    founder: 'Daniel Levy',
    industry: 'Healthcare',
    stage: 'Seed',
    logo: 'https://PLACEHOLDER',
    description: 'AI-powered medical diagnostic platform for remote healthcare providers',
    yearFounded: 2021,
    website: 'https://medisync.example.com',
    metrics: {
      before: {
        fundingRaised: 300000, // $300K
        userGrowth: 1200, // 1,200 monthly users
        mediaMentions: 3
      },
      after: {
        fundingRaised: 2500000, // $2.5M
        userGrowth: 15000, // 15,000 monthly users
        mediaMentions: 24
      }
    }
  },
  {
    id: '3',
    name: 'EcoFarm Tech',
    founder: 'Maya Winston',
    industry: 'AgTech',
    stage: 'Series B',
    logo: 'https://PLACEHOLDER',
    description: 'Smart farming solutions using IoT sensors and predictive analytics',
    yearFounded: 2019,
    website: 'https://ecofarmtech.example.com',
    metrics: {
      before: {
        fundingRaised: 5000000, // $5M
        userGrowth: 120, // 120 farms
        mediaMentions: 15
      },
      after: {
        fundingRaised: 25000000, // $25M
        userGrowth: 850, // 850 farms
        mediaMentions: 78
      }
    }
  },
  {
    id: '4',
    name: 'SecurityShield',
    founder: 'Alex Rodriguez',
    industry: 'Cybersecurity',
    stage: 'Series A',
    logo: 'https://PLACEHOLDER',
    description: 'AI-driven cybersecurity platform for enterprise threat detection',
    yearFounded: 2020,
    website: 'https://securityshield.example.com',
    metrics: {
      before: {
        fundingRaised: 1500000, // $1.5M
        userGrowth: 40, // 40 enterprise clients
        mediaMentions: 12
      },
      after: {
        fundingRaised: 10000000, // $10M
        userGrowth: 175, // 175 enterprise clients
        mediaMentions: 65
      }
    }
  }
];

// Initial connections data
export const initialConnections = [
  {
    id: '1',
    startupId: '1',
    contactName: 'Michael Chen',
    contactPosition: 'Partner',
    contactCompany: 'Quantum Ventures',
    date: '2022-03-15',
    type: 'Investment',
    description: 'Introduction to lead investor for Series A round',
    outcome: 'Secured $8M investment',
    status: 'Successful'
  },
  {
    id: '2',
    startupId: '1',
    contactName: 'Priya Shah',
    contactPosition: 'Editor',
    contactCompany: 'Tech Innovations Today',
    date: '2022-04-22',
    type: 'Media',
    description: 'Connected for feature article on quantum computing breakthroughs',
    outcome: 'Featured cover story and 5 follow-up articles',
    status: 'Successful'
  },
  {
    id: '3',
    startupId: '2',
    contactName: 'Dr. James Wilson',
    contactPosition: 'Head of Innovation',
    contactCompany: 'National Health Network',
    date: '2022-01-10',
    type: 'Partnership',
    description: 'Introduction for potential pilot program',
    outcome: 'Signed 18-month pilot with 5 hospitals',
    status: 'Successful'
  },
  {
    id: '4',
    startupId: '3',
    contactName: 'Rebecca Lee',
    contactPosition: 'Managing Director',
    contactCompany: 'Green Future Capital',
    date: '2021-11-05',
    type: 'Investment',
    description: 'Introduction to impact investment fund',
    outcome: 'Led $15M Series B round',
    status: 'Successful'
  },
  {
    id: '5',
    startupId: '4',
    contactName: 'Thomas Wright',
    contactPosition: 'CISO',
    contactCompany: 'Enterprise Solutions Inc.',
    date: '2022-02-18',
    type: 'Client',
    description: 'Introduction to potential enterprise client',
    outcome: '3-year security contract signed',
    status: 'Successful'
  }
];

// Initial success stories data
export const initialSuccessStories = [
  {
    id: '1',
    startupId: '1',
    title: 'Quantum Computing Labs: From Lab to Market Leader',
    summary: 'How strategic introductions and positioning helped Quantum Computing Labs secure major Series A funding and establish industry dominance',
    keyPoints: [
      'Secured $12M in funding through key investor introductions',
      'Increased enterprise client base by 460%',
      'Generated 45 media mentions across major tech publications',
      'Established partnerships with 3 leading research institutions'
    ],
    testimonial: 'Hillel's network and strategic guidance transformed our business trajectory. His introductions to key investors and media opened doors that would have taken years to access on our own.',
    testimonialAuthor: 'Dr. Sarah Chen, CEO of Quantum Computing Labs'
  },
  {
    id: '2',
    startupId: '3',
    title: 'How EcoFarm Tech Revolutionized AgTech with Strategic Connections',
    summary: 'The journey of EcoFarm Tech from innovative idea to industry disruptor through targeted introductions and market positioning',
    keyPoints: [
      'Grew from 120 to 850 farms using their technology',
      'Secured $20M in additional funding',
      'Featured in 78 media publications, establishing thought leadership',
      'Expanded to international markets through strategic introductions'
    ],
    testimonial: 'Working with Hillel fundamentally changed our company's trajectory. His ability to connect us with the right investors, partners, and media outlets accelerated our growth beyond what we thought possible.',
    testimonialAuthor: 'Maya Winston, Founder of EcoFarm Tech'
  }
];