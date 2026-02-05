
import { PlaceHolderImages } from './placeholder-images';
import { User } from './types';
import { Music, Handshake, Music2, Video, Heart, Wrench, DollarSign, HeartHandshake, Baby, PenSquare, Shield, Users, Briefcase } from 'lucide-react';

export const devotionals = [
  {
    id: 1,
    title: 'Morning Manna: A New Day\'s Mercies',
    author: 'Pastor John Doe',
    date: '2024-07-28',
    category: 'Faith',
    image: PlaceHolderImages.find(p => p.id === 'devotional-1'),
    content: {
      text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness. (Lamentations 3:22-23). Today, let's reflect on the promise of a fresh start. No matter what yesterday held, God's mercy is a new gift for you this morning. Embrace it, walk in it, and let it redefine your day. Your past does not dictate your future when you are covered by His grace.",
      audioUrl: '#',
      videoUrl: '#',
    },
  },
  {
    id: 2,
    title: 'The Path of Peace',
    author: 'Prophetess Jane Smith',
    date: '2024-07-27',
    category: 'Peace',
    image: PlaceHolderImages.find(p => p.id === 'devotional-2'),
    content: {
      text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you. (Isaiah 26:3). In a world filled with chaos, where do you find your peace? True, lasting peace is not found in circumstances but in a steadfast mind fixed on God. Today, intentionally shift your focus from your worries to the Worshiped One. Trust in His sovereignty, and let His perfect peace guard your heart and mind.",
      audioUrl: '#',
      videoUrl: '#',
    },
  },
  {
    id: 3,
    title: 'Shining Your Light',
    author: 'Evangelist Michael Lee',
    date: '2024-07-26',
    category: 'Witnessing',
    image: PlaceHolderImages.find(p => p.id === 'devotional-3'),
    content: {
      text: "You are the light of the world. A city set on a hill cannot be hidden. (Matthew 5:14). Your life is a testimony. You carry the light of Christ within you. Don't hide it under a bushel. Let it shine in your workplace, in your home, and in your community. A simple act of kindness, a word of encouragement, or an unwavering integrity can be the beacon that points someone to Jesus.",
      audioUrl: '#',
      videoUrl: '#',
    },
  },
];

export const prayerRequests = [
  {
    id: 1,
    user: 'Sarah K.',
    avatar: PlaceHolderImages.find(p => p.id === 'avatar-2'),
    request: 'Please pray for my mother\'s healing. She is scheduled for surgery next week. Praying for the doctors\' wisdom and a successful procedure.',
    timestamp: '2 hours ago',
    prayedCount: 15,
  },
  {
    id: 2,
    user: 'David R.',
    avatar: PlaceHolderImages.find(p => p.id === 'avatar-1'),
    request: 'Pray for a job opportunity. I have an important interview tomorrow morning. I need favor and clarity.',
    timestamp: '5 hours ago',
    prayedCount: 28,
  },
  {
    id: 3,
    user: 'Anonymous',
    avatar: undefined,
    request: 'For my family\'s salvation. That their hearts would be softened to the Gospel.',
    timestamp: '1 day ago',
    prayedCount: 52,
  },
];

export const liveSessions = {
  current: {
    title: 'Kingdom-Driven Leadership: Activating Your Calling',
    speaker: 'The Bondservant of Christ Joseph Tryson',
    image: PlaceHolderImages.find(p => p.id === 'live-stream-feature'),
    videoUrl: 'https://royallifetelevision.online.church/',
  },
  replays: [
    { id: 1, title: 'Understanding the Prophetic', speaker: 'Prophetess Norah Tryson', image: PlaceHolderImages.find(p => p.id === 'live-replay-1') },
    { id: 2, title: 'Worship Wednesday: Encounter Service', speaker: 'Faith Connect Worship', image: PlaceHolderImages.find(p => p.id === 'live-replay-2') },
    { id: 3, title: 'Faith that Moves Mountains', speaker: 'Guest Speaker Name', image: PlaceHolderImages.find(p => p.id === 'devotional-1') },
    { id: 4, title: 'Family & Faith: Building a Godly Home', speaker: 'The Tryson Family', image: PlaceHolderImages.find(p => p.id === 'community-feature') },
  ],
};

export const ministries = [
  { id: 1, name: 'Global Outreach Missions', logo: PlaceHolderImages.find(p => p.id === 'ministry-logo-1'), description: 'Taking the Gospel to the ends of the earth through church planting and humanitarian aid.' },
  { id: 2, name: 'Kingdom Builders Youth', logo: PlaceHolderImages.find(p => p.id === 'ministry-logo-2'), description: 'Equipping the next generation of leaders to walk in their divine purpose.' },
  { id: 3, name: 'Women of Faith United', logo: PlaceHolderImages.find(p => p.id === 'ministry-logo-1'), description: 'A sisterhood dedicated to spiritual growth, mentorship, and community support.' },
];

export const communityUsers: User[] = [
  { id: 1, name: 'John Doe', location: 'Lagos, Nigeria', avatar: PlaceHolderImages.find(p => p.id === 'avatar-1')!, isFriend: false },
  { id: 2, name: 'Jane Smith', location: 'London, UK', avatar: PlaceHolderImages.find(p => p.id === 'avatar-2')!, isFriend: true },
  { id: 3, name: 'Carlos Garcia', location: 'São Paulo, Brazil', avatar: PlaceHolderImages.find(p => p.id === 'avatar-3')!, isFriend: false },
  { id: 4, name: 'Aisha Khan', location: 'Mumbai, India', avatar: PlaceHolderImages.find(p => p.id === 'avatar-2')!, isFriend: false },
  { id: 5, name: 'Michael Chen', location: 'Sydney, Australia', avatar: PlaceHolderImages.find(p => p.id === 'avatar-1')!, isFriend: true },
  { id: 6, name: 'Maria Rodriguez', location: 'Mexico City, Mexico', avatar: PlaceHolderImages.find(p => p.id === 'avatar-2')!, isFriend: false },
];

export const feedItems = [
  {
    id: 1,
    type: 'PRAYER_REQUEST',
    user: prayerRequests[0].user,
    avatar: prayerRequests[0].avatar,
    content: 'posted a new prayer request.',
    details: prayerRequests[0].request,
    timestamp: prayerRequests[0].timestamp,
    href: '/prayer'
  },
  {
    id: 2,
    type: 'NEW_DEVOTIONAL',
    user: devotionals[0].author,
    avatar: PlaceHolderImages.find(p => p.id === 'avatar-1'),
    content: `published a new devotional: "${devotionals[0].title}"`,
    details: devotionals[0].content.text,
    timestamp: '10 hours ago',
    href: '/devotionals'
  },
  {
    id: 3,
    type: 'PRAYER_REQUEST',
    user: prayerRequests[1].user,
    avatar: prayerRequests[1].avatar,
    content: 'posted a new prayer request.',
    details: prayerRequests[1].request,
    timestamp: prayerRequests[1].timestamp,
    href: '/prayer'
  },
  {
    id: 4,
    type: 'NEW_CONNECTION',
    user: communityUsers[1].name,
    avatar: communityUsers[1].avatar,
    content: `connected with ${communityUsers[2].name}.`,
    details: 'Welcome them to the community!',
    timestamp: '18 hours ago',
    href: '/connect'
  },
    {
    id: 5,
    type: 'NEW_DEVOTIONAL',
    user: devotionals[1].author,
    avatar: PlaceHolderImages.find(p => p.id === 'avatar-2'),
    content: `published a new devotional: "${devotionals[1].title}"`,
    details: devotionals[1].content.text,
    timestamp: '1 day ago',
    href: '/devotionals'
  },
];

export const events = [
  {
    id: 1,
    title: 'Prophetic Encounter Night',
    speaker: 'Prophetess Norah Tryson',
    date: new Date(2024, 8, 15), // Note: Month is 0-indexed, so 8 is September
    time: '7:00 PM - 9:00 PM EST',
    isLive: false,
    isRegistered: false,
  },
  {
    id: 2,
    title: 'Kingdom Finance Workshop',
    speaker: 'The Bondservant of Christ Joseph Tryson',
    date: new Date(2024, 8, 22),
    time: '10:00 AM - 1:00 PM EST',
    isLive: false,
    isRegistered: true,
  },
   {
    id: 3,
    title: 'Sunday Worship Service',
    date: new Date('2024-07-28T11:00:00'),
    speaker: 'Faith Connect Worship',
    time: '11:00 AM EST',
    isLive: true,
    isRegistered: false,
  },
];

export const annualCalendar = [
    {
        month: 'January',
        theme: 'Evangelism & Outreach Core',
        purpose: 'Winning souls, territorial harvest, public witness of Christ.',
        activities: ['Street evangelism', 'Community crusades', 'Prison & hospital outreaches', 'Market-place evangelism', 'Door-to-door missions', 'Water baptism services']
    },
    {
        month: 'February',
        theme: 'Foundational Spiritual Formation',
        purpose: 'Establishing believers in Christ identity and supernatural encounters.',
        activities: ['The Encounter Programs (Salvation, Deliverance, Spirit Infilling)', 'New Creations Course', 'School of the Spirit', 'Spiritual Maturity Course']
    },
    {
        month: 'March',
        theme: 'Leadership & Ministry Development',
        purpose: 'Raising Kingdom leaders with vision and discipline.',
        activities: ['Leadership Training Courses (Servant leadership, Vision alignment, Integrity & accountability, Kingdom governance)']
    },
    {
        month: 'April',
        theme: 'Mentorship System (Core Pillar)',
        purpose: 'Life transfer, impartation, and guidance across all ministry expressions.',
        activities: ['Pastoral Mentorship', 'Prophetic Mentorship', 'Apostolic Mentorship', 'Evangelical Mentorship', 'Leadership Mentorship']
    },
    {
        month: 'May',
        theme: 'Schools of Empowerment',
        purpose: 'Equipping believers for practical ministry and supernatural operation.',
        activities: ['School of Ministry', 'School of Revelation', 'School of Deliverance', 'School of Healing', 'Intercessory Ministry Training']
    },
    {
        month: 'June',
        theme: 'Generational & Demographic Ministries',
        purpose: 'Addressing the needs of every age group for stability, purpose, and foundation.',
        activities: ['Adult Ministry Focus', 'Youth Ministry Conferences', 'Kids & Teens Ministry VBS']
    },
    {
        month: 'July',
        theme: 'Identity & Purpose Formation',
        purpose: 'Helping believers discover their divine design and assignment.',
        activities: ['God\'s Workmanship Workshop (Purpose discovery, Gift identification, Destiny alignment)']
    },
    {
        month: 'August',
        theme: 'Conferences & Seminars',
        purpose: 'Targeted impartation for every area of life.',
        activities: ['Pastors & Leaders Conference', 'Single & Free Seminars', 'Dating & Relationship Seminars', 'Couples Conferences', 'Women\'s Conferences', 'Men\'s Seminars']
    },
    {
        month: 'September',
        theme: 'Monthly Empowerment Focus',
        purpose: 'A dedicated month to emphasize impartation, activation, and spiritual renewal.',
        activities: ['First Weekend Empowerment Meetings', 'Special Guest Ministers', 'Activation Services']
    },
    {
        month: 'October',
        theme: 'Discipleship System',
        purpose: 'Producing grounded, mature followers of Christ.',
        activities: ['Discipleship Program Launch', 'Discipleship & Leadership Forums']
    },
    {
        month: 'November',
        theme: 'Word & Community Life',
        purpose: 'Deepening word depth and expanding community through small groups.',
        activities: ['Intensive Bible Study Series', 'Life Groups Seminars & Launch', 'Bridge Events (Community Outreach)']
    },
    {
        month: 'December',
        theme: 'Counseling & Restoration',
        purpose: 'Bringing healing and wholeness to individuals and families.',
        activities: ['Marriage Counseling Workshops', 'Personal Counseling Availability', 'Trauma & Emotional Healing Seminars']
    }
];

export const conferences = [
    {
        id: 1,
        title: 'Global Impact Conference 2024',
        description: 'A 3-day conference focused on equipping believers for global missions and marketplace ministry.',
        dates: 'October 10-12, 2024',
        location: 'Atlanta, GA & Online',
        image: PlaceHolderImages.find(p => p.id === 'hero'),
        isRegistered: false,
    },
    {
        id: 2,
        title: 'Prophetic Summit: The Seer\'s Realm',
        description: 'An immersive summit for prophets and prophetic people to go deeper in the seer dimension.',
        dates: 'November 7-9, 2024',
        location: 'Online Only',
        image: PlaceHolderImages.find(p => p.id === 'live-replay-2'),
        isRegistered: true,
    },
    {
        id: 3,
        title: 'Annual Leadership Summit',
        description: 'An intensive summit to equip and commission leaders for the new year.',
        dates: 'January 15-17, 2025',
        location: 'Online Only',
        image: PlaceHolderImages.find(p => p.id === 'live-replay-1'),
        isRegistered: false,
    }
];

export const consecrationWeek = {
    type: "Consecration Week",
    title: "Global Consecration Week",
    description: "Daily focus on alignment, fasting, prayer",
    startDate: new Date("2024-08-01T00:00:00"),
    endDate: new Date("2024-08-07T23:59:59"),
    global: true,
    assignedUsers: [],
    schedule: [
        { day: "Day 1", theme: "Alignment & Repentance", points: [{title: "Focus on Personal Alignment", scripture: "Psalm 51:10"}, {title: "Corporate Repentance", scripture: "2 Chronicles 7:14"}] },
        { day: "Day 2", theme: "Hearing God's Voice", points: [{title: "Cultivating a Listening Heart", scripture: "John 10:27"}, {title: "Discerning God's Will", scripture: "Romans 12:2"}] },
        { day: "Day 3", theme: "Spiritual Warfare & Authority", points: [{title: "Putting on the Armor of God", scripture: "Ephesians 6:11"}, {title: "Exercising Delegated Authority", scripture: "Luke 10:19"}] },
        { day: "Day 4", theme: "Family & Relationships", points: [{title: "Healing Family Lines", scripture: "Malachi 4:6"}, {title: "Covenant Relationships", scripture: "1 Samuel 18:3"}] },
        { day: "Day 5", theme: "Kingdom Finance & Stewardship", points: [{title: "Honoring God with Firstfruits", scripture: "Proverbs 3:9-10"}, {title: "Breaking the Spirit of Mammon", scripture: "Matthew 6:24"}] },
        { day: "Day 6", theme: "Health & Wholeness", points: [{title: "Divine Health Covenant", scripture: "Isaiah 53:5"}, {title: "Stewarding the Body as a Temple", scripture: "1 Corinthians 6:19-20"}] },
        { day: "Day 7", theme: "Commissioning & Impartation", points: [{title: "Receiving a Fresh Anointing", scripture: "Acts 1:8"}, {title: "Go and Make Disciples", scripture: "Matthew 28:19"}] },
    ]
};


export const courses = [
    {
        id: 1,
        title: 'Foundations of Faith',
        description: 'Solidify your understanding of core biblical doctrines.',
        category: 'Spiritual Growth',
        image: PlaceHolderImages.find(p => p.id === 'devotional-2'),
    },
    {
        id: 2,
        title: 'Kingdom Leadership',
        description: 'Develop your influence and lead with a servant\'s heart.',
        category: 'Leadership',
        image: PlaceHolderImages.find(p => p.id === 'live-replay-1'),
    }
];

export const mentorshipClasses = [
    {
        id: 1,
        title: 'Foundations of Faith Mentorship',
        description: 'A 12-week program covering the core doctrines of Christianity, designed for new believers.',
        mentorId: 1,
    },
    {
        id: 2,
        title: 'Prophetic Ministry Training',
        description: 'Learn to hear the voice of God more clearly and operate in the prophetic gifts.',
        mentorId: 2,
    }
];

export const discipleship = {
    personal: [
        { id: 1, discipleId: 3, disciplerId: 1 },
        { id: 2, discipleId: 4, disciplerId: 2 },
    ],
    general: [
        { id: 1, title: 'Foundations of Discipleship', description: 'Weekly meeting covering the fundamentals of following Christ.'},
        { id: 2, title: 'Marketplace Discipleship', description: 'Monthly cohort for professionals seeking to integrate faith and work.'},
    ]
};


export const availableContent = [
  'Morning Manna: A New Day\'s Mercies',
  'The Path of Peace',
  'Shining Your Light',
  'Kingdom-Driven Leadership: Activating Your Calling',
  'Understanding the Prophetic',
  'Worship Wednesday: Encounter Service',
  'Faith that Moves Mountains',
  'Family & Faith: Building a Godly Home',
];

export const empowermentMeetings = [
  {
    id: 1,
    title: 'Monthly Empowerment Meeting',
    description: 'A time of deep teaching, impartation, and prophetic ministry to empower you for the month ahead.',
    frequency: 'First Sunday of Every Month',
    time: '6:00 PM EST',
    type: 'Monthly',
    image: PlaceHolderImages.find(p => p.id === 'live-replay-1'),
    isRegistered: false,
  },
  {
    id: 2,
    title: 'Annual Global Empowerment Summit',
    description: 'Our pinnacle event of the year, gathering believers from around the world for a week of intensive equipping and commissioning.',
    frequency: 'December 1st - 7th, 2024',
    time: 'Various Times',
    type: 'Yearly',
    image: PlaceHolderImages.find(p => p.id === 'hero'),
    isRegistered: true,
  },
  {
    id: 3,
    title: 'Weekly Empowerment Meeting',
    description: 'Join us every Saturday for a powerful time of prayer, teaching, and fellowship to strengthen your week.',
    frequency: 'Every Saturday',
    time: '10:00 AM EST',
    type: 'Weekly',
    image: PlaceHolderImages.find(p => p.id === 'community-feature'),
    isRegistered: false,
  }
];

export const announcements = [
  {
    id: 1,
    title: 'Platform Maintenance Scheduled',
    content: 'Please be advised that the Faith Connect Global platform will be undergoing scheduled maintenance on Saturday, August 3rd, from 2:00 AM to 4:00 AM EST. During this time, the platform may be temporarily unavailable. We appreciate your understanding as we work to improve your experience.',
    date: '2024-07-29',
    category: 'Platform Update',
  },
  {
    id: 2,
    title: 'New Course Available: "The Seer\'s Realm"',
    content: 'We are excited to launch a new advanced course in the School of the Prophet, "The Seer\'s Realm: Interpreting Visions & Dreams." Enroll today to deepen your understanding of symbolic revelation.',
    date: '2024-07-28',
    category: 'New Content',
  },
  {
    id: 3,
    title: 'Global Day of Prayer & Fasting',
    content: 'Join us this Friday as we come together as a global community for a day of prayer and fasting. We will be interceding for revival in the nations. A live prayer session will be held at 12:00 PM EST.',
    date: '2024-07-27',
    category: 'Community Event',
  }
];

export const groups = [
    {
        id: 1,
        name: 'Men of Valor',
        description: 'A community of men dedicated to growing in faith, integrity, and leadership in their families and communities.',
        image: PlaceHolderImages.find(p => p.id === 'live-replay-1'),
        members: 128,
        category: 'Men\'s Group',
        isMember: true,
    },
    {
        id: 2,
        name: 'Women of Wisdom',
        description: 'Connecting women to build authentic friendships, study the Word, and encourage one another in their walk with Christ.',
        image: PlaceHolderImages.find(p => p.id === 'devotional-3'),
        members: 245,
        category: 'Women\'s Group',
        isMember: false,
    },
    {
        id: 3,
        name: 'Marketplace Leaders',
        description: 'For professionals and entrepreneurs seeking to apply biblical principles in their careers and businesses for Kingdom impact.',
        image: PlaceHolderImages.find(p => p.id === 'community-feature'),
        members: 89,
        category: 'Career & Business',
        isMember: false,
    },
     {
        id: 4,
        name: 'Daily Devotional Readers',
        description: 'A group to discuss the daily devotional, share insights, and encourage each other to apply the Word.',
        image: PlaceHolderImages.find(p => p.id === 'devotionals-feature'),
        members: 450,
        category: 'Bible Study',
        isMember: false,
    },
];

export type Department = {
  name: string;
  description: string;
  icon: string;
  isMember?: boolean;
}

export const departments: Department[] = [
  { name: 'Praise & Worship Department', description: 'Leading the congregation into the presence of God through music.', icon: 'Music', isMember: true },
  { name: 'Ushering Department', description: 'Creating a welcoming and orderly environment for all services.', icon: 'Handshake' },
  { name: 'Music Department', description: 'Serving the house through instrumental and vocal music.', icon: 'Music2' },
  { name: 'Media Department', description: 'Managing sound, video, and streaming to spread the gospel.', icon: 'Video' },
  { name: 'Hospitality Department', description: 'Welcoming guests and members with love and care.', icon: 'Heart' },
  { name: 'Sanctuary Maintenance  Department', description: 'Ensuring the house of God is clean and well-maintained.', icon: 'Wrench' },
  { name: 'Administration Department', description: 'Overseeing the operational and administrative functions of the church.', icon: 'Briefcase' },
  { name: 'Treasury Department', description: 'Managing the church\'s finances with integrity and transparency.', icon: 'DollarSign' },
  { name: 'Intercessory Department', description: 'Standing in the gap through prayer for the church and the nations.', icon: 'HeartHandshake' },
  { name: 'Kids & Teens Department', description: 'Nurturing the next generation in the ways of the Lord.', icon: 'Baby' },
  { name: 'Secretarial Department', description: 'Providing administrative support to the pastoral team and ministries.', icon: 'PenSquare' },
  { name: 'Protocol Department', description: 'Assisting church leadership and special guests during services.', icon: 'Shield' },
  { name: 'Life Groups department', description: 'Fostering community and spiritual growth in small group settings.', icon: 'Users' },
  { name: 'Men\'s Department', description: 'Building strong men of faith, integrity, and purpose.', icon: 'Users' },
  { name: 'Ladies Department', description: 'Empowering women to walk in their God-given identity and purpose.', icon: 'Users' },
  { name: 'Programming Department', description: 'Developing and managing the church\'s digital platforms and tools.', icon: 'Wrench' },
];

export const serviceElements = [
    {
        id: 1,
        title: "1. The Atmosphere & Opening",
        description: "Setting a spiritual atmosphere of worship, reverence, and expectation.",
        details: `Opening Prayer (5 mins) - Pastor John
Praise & Worship (25 mins) - Worship Team
Prophetic Declarations (5 mins) - Prophetess Norah`
    },
    {
        id: 2,
        title: "2. Revelation & The Word",
        description: "The centerpiece of the service, where the Word of God is taught with clarity and power.",
        details: `Announcements & Welcome (5 mins) - MC
Tithes & Offerings (10 mins) - Deacon Smith
The Sermon (45 mins) - Joseph Tryson`
    },
    {
        id: 3,
        title: "3. Impartation & Ministry",
        description: "The time for personal ministry, where the congregation receives from God.",
        details: `Altar Call (10 mins) - Joseph Tryson
Healing & Deliverance (15 mins) - Ministry Team`
    },
    {
        id: 4,
        title: "4. Closing & Commissioning",
        description: "Sending the church out into the world, empowered and equipped.",
        details: `Closing Announcements (5 mins) - MC
Benediction & Blessing (5 mins) - Joseph Tryson
Fellowship (Ongoing) - All`
    }
];

export const globalDirectives = [
    {
        title: "Economic Stability",
        description: "Pray against spirits of inflation and economic collapse. Decree wisdom for global financial leaders and the release of Kingdom-based economic solutions.",
        scripture: "Deuteronomy 8:18"
    },
    {
        title: "Governmental Righteousness",
        description: "Intercede for national leaders, praying for righteous governance, the exposure of corruption, and the alignment of nations with God's purposes.",
        scripture: "Proverbs 14:34"
    },
    {
        title: "Global Revival & Harvest",
        description: "Contend for a global outpouring of the Holy Spirit, the salvation of souls, and the advancement of the Gospel in unreached areas.",
        scripture: "Acts 2:17"
    }
];

export const regionalTowers = [
    { region: "North America", focus: "Spiritual awakening and repentance.", leader: "Watchman John" },
    { region: "Europe", focus: "Re-evangelization and contending against ancient idolatrous spirits.", leader: "Watchman Maria" },
    { region: "Asia", focus: "Protection for the persecuted church and open doors for the Gospel.", leader: "Watchman Daniel" },
    { region: "Africa", focus: "Breaking cycles of poverty and corruption; raising righteous leaders.", leader: "Watchman Esther" },
    { region: "South America", focus: "Unity in the body of Christ and deliverance from political instability.", leader: "Watchman Carlos" },
    { region: "Oceania", focus: "Revival among indigenous peoples and a new wave of missionaries.", leader: "Watchman Sarah" },
];

export const newsFeed = [
    {
        id: 1,
        title: "Global Day of Prayer & Fasting",
        content: "Join us this Friday as we come together as a global community for a day of prayer and fasting. We will be interceding for revival in the nations.\n\nA live prayer session will be held at 12:00 PM EST.",
        timestamp: "9:30 PM",
        image: PlaceHolderImages.find(p => p.id === 'prayer-feature'),
        reactions: [
            { emoji: '🙏', count: 128 },
            { emoji: '❤️', count: 72 },
        ]
    },
    {
        id: 2,
        title: "New Course Available: The Seer's Realm",
        content: "We are excited to launch a new advanced course in the School of the Prophet, 'The Seer's Realm: Interpreting Visions & Dreams.' Enroll today to deepen your understanding of symbolic revelation.",
        timestamp: "4:15 PM",
        image: PlaceHolderImages.find(p => p.id === 'devotional-3'),
        reactions: [
             { emoji: '🔥', count: 95 },
             { emoji: '👍', count: 63 },
        ]
    },
    {
        id: 3,
        title: "Platform Maintenance Scheduled",
        content: "Please be advised that the Faith Connect Global platform will be undergoing scheduled maintenance on Saturday, August 3rd, from 2:00 AM to 4:00 AM EST. During this time, the platform may be temporarily unavailable.",
        timestamp: "1:00 PM",
        image: null,
        reactions: [
            { emoji: '👍', count: 45 },
        ]
    }
];

const worshipTeamAssignments = {
    'praise-worship-department': {
        announcements: [
            { id: 1, date: '2024-07-30', title: 'Rehearsal Schedule Update', content: 'This week\'s rehearsal is moved to Thursday at 7 PM to prepare for the conference.' },
            { id: 2, date: '2024-07-25', title: 'New Song Added to Setlist', content: 'Please familiarize yourselves with "Way Maker". Chord charts are in the trainings tab.' },
        ],
        meetings: [
            { id: 1, title: 'Weekly Rehearsal', date: '2024-08-01T19:00:00', description: 'Full team rehearsal for this Sunday\'s service.' },
            { id: 2, title: 'Songwriting Session', date: '2024-08-08T18:00:00', description: 'Open session for all team members to bring new song ideas.' },
        ],
        teachings: [
            { id: 1, title: 'The Theology of Worship', description: 'A deep dive into the biblical foundations of praise and worship.', file: { name: 'Theology of Worship.pdf' } },
            { id: 2, title: 'Leading with a Shepherd\'s Heart', description: 'Understanding the pastoral role of a worship leader.', file: { name: 'Shepherds Heart.pdf' } },
        ],
        trainings: [
            { id: 1, title: 'Vocal Control Techniques', description: 'Exercises and best practices for vocalists to improve control and stamina.', file: { name: 'VocalTechniques.pdf' } },
            { id: 2, title: 'Using Ableton for Live Worship', description: 'A technical guide to running tracks and pads during service.', file: { name: 'AbletonGuide.pdf' } },
        ],
        assignments: {
            title: 'Sunday Service Rota - August 4, 2024',
            roles: [
                { role: 'Worship Leader', person: 'Jane Smith' },
                { role: 'Acoustic Guitar', person: 'John Doe' },
                { role: 'Electric Guitar', person: 'Carlos Garcia' },
                { role: 'Bass Guitar', person: 'Aisha Khan' },
                { role: 'Drums', person: 'Michael Chen' },
                { role: 'Keys / Pads', person: 'Maria Rodriguez' },
                { role: 'Vocalist 1', person: 'Sarah K.' },
                { role: 'Vocalist 2', person: 'David R.' },
            ]
        }
    }
}

export const departmentContent = {
    ...worshipTeamAssignments
}

export const bibleStories = [
    {
        id: 1,
        slug: 'david-and-goliath-dominion-of-the-spirit-filled-mind',
        category: 'Adults & Leaders',
        title: "David and Goliath: Dominion of a Spirit-Filled Mind Over Physical Giants",
        image: PlaceHolderImages.find(p => p.id === 'david-goliath-story'),
        scripture: "1 Samuel 17:45 (SLT) - Then David said to the Philistine, 'You come to me with a sword, with a spear, and with a javelin. But I come to you in the name of the LORD of hosts, the God of the armies of Israel, whom you have defied.'",
        narrative: [
            "The valley was thick with fear. For forty days, a physical giant named Goliath, a system of intimidation, had paralyzed the armies of Israel. His words were spiritual weapons, designed to shrink the identity of God's people. He was not just a large man; he was a stronghold, a spiritual argument against the promise of God.",
            "While the army saw a nine-foot obstacle, a young shepherd named David saw a covenant opportunity. He was not trained in the art of war, but he was skilled in the art of faith. His confidence was not in his ability but in his identity as a covenant man. He remembered the lion and the bear—past victories that were training for this present battle. He operated from a different realm of reality.",
            "Rejecting the king's armor, which represented man's system and logic, David chose five smooth stones. Five is the number of grace. He approached the giant not with the strength of flesh, but with the authority of a name—the name of the LORD of hosts. His declaration was a prophetic verdict issued before the battle even began.",
            "The stone, propelled by faith and guided by the Spirit, found its mark. The system of intimidation crashed. David's victory was not just physical; it was a spiritual legislation that broke the atmosphere of fear and activated the courage of an entire nation. He demonstrated that what you see with spiritual eyes determines the outcome of your physical battles."
        ],
        revelationInsight: {
            title: "Revelation Insight: The Law of spiritual Authority",
            text: "Goliath operated by the law of intimidation, a spiritual force that magnifies physical circumstances to paralyze faith. David operated by the law of covenant and the Spirit. He understood that spiritual authority, released through faith-filled declarations, supersedes physical reality. The battle was won in the spirit before the stone was ever thrown."
        },
        lifeApplication: [
            "Fear vs. Faith: Your focus determines your reality. Like the Israelite army, you can focus on the size of your 'giant' (a financial problem, a health diagnosis) or, like David, you can focus on the size of your God.",
            "Identity vs. Intimidation: The enemy's primary weapon is to make you forget who you are in Christ. Your identity as a child of God gives you legal access to His power and authority.",
            "Obedience vs. Delay: David's immediate obedience positioned him for victory. Delay born of fear or doubt can forfeit your moment of breakthrough."
        ],
        declaration: "I carry the Spirit of the Lord. My mind is renewed by the Word. No giant of intimidation assigned to stop my destiny shall stand before me. I operate from victory, not toward it. In Jesus' name."
    },
    {
        id: 2,
        slug: 'noahs-ark-obedience-in-a-corrupt-world',
        category: 'Kids',
        title: "Noah's Ark: Building a Future on Obedience",
        image: PlaceHolderImages.find(p => p.id === 'noahs-ark-story'),
        scripture: "Genesis 6:22 (SLT) - Thus Noah did; according to all that God commanded him, so he did.",
        narrative: [
            "A long, long time ago, the world became a very noisy and sad place. People forgot about God and did whatever they wanted. But one man, Noah, still loved God and listened to His voice. God saw Noah's faithful heart.",
            "God told Noah, 'I am going to wash the world clean with a great flood. But I will save you. Build a huge boat—an ark!' It was a strange instruction. There was no rain. But Noah didn't question; he obeyed. He and his family started building, day after day, year after year.",
            "As they built, animals started coming, two by two. Big elephants, tall giraffes, and tiny ladybugs all lined up. They were responding to God's call. Finally, Noah, his family, and all the animals went inside. God Himself shut the door, sealing them in safety.",
            "Then the rain came. It rained and rained until the whole world was covered in water. But inside the ark, Noah and his family were safe and dry, protected by their obedience. When the waters went down, God placed a beautiful rainbow in the sky as a promise of His faithfulness."
        ],
        revelationInsight: {
            title: "Revelation Insight: The Principle of the Ark",
            text: "The Ark is a picture of Christ. In a world facing judgment, obedience to God's specific instruction (building the ark) brought Noah and his family into a place of safety and preservation. Today, our 'ark' is our position in Christ. By obeying His word and dwelling in Him, we are kept safe from the spiritual storms of the world."
        },
        lifeApplication: [
            "Listen and Obey: Even when God's instructions don't make sense to others, obeying Him always leads to safety and blessing.",
            "Be Different: Noah was righteous in a wicked world. Don't be afraid to live differently for God.",
            "God Always Provides a Way: In the face of judgment, God always provides a way of escape for those who trust Him."
        ],
        declaration: "I choose to listen to God's voice and obey, even when it's hard. I am safe in Jesus, my Ark of salvation. God's promises to me are true!"
    },
    {
        id: 3,
        slug: 'daniel-in-the-lions-den-authority-in-hostile-environments',
        category: 'Teens & Youth',
        title: "Daniel in the Lion's Den: Authority in Hostile Environments",
        image: PlaceHolderImages.find(p => p.id === 'daniel-lions-den-story'),
        scripture: "Daniel 6:22 (SLT) - My God sent His angel and shut the lions’ mouths, so that they have not hurt me, because I was found innocent before Him...",
        narrative: [
            "Daniel was a young man of excellence and integrity, serving in a foreign, godless government. His commitment to God made him stand out, and his promotion made others jealous. His enemies couldn't find any fault in his work, so they targeted his faith.",
            "They created a law they knew he would break: a 30-day ban on praying to anyone but the king. For Daniel, prayer was not a religious ritual; it was his lifeline to the source of his wisdom and strength. He refused to compromise his connection to God, even under the threat of death. He prayed openly, as he always had.",
            "Thrown into a den of lions, Daniel entered a physical manifestation of the hostile, demonic environment he had been living in all along. But the authority he carried in the spirit realm was greater than the authority of the lions in the physical realm. His innocence and unwavering faith gave heaven the legal right to intervene.",
            "An angel was dispatched—not to fight the lions, but simply to shut their mouths. The threat was neutralized by a higher government. Daniel's survival wasn't just a miracle; it was a demonstration of Kingdom authority that caused an entire empire to recognize the power of the God of Israel."
        ],
        revelationInsight: {
            title: "Revelation Insight: The Law of Innocence and Dominion",
            text: "Daniel was protected because he was found 'innocent'. His integrity gave him legal standing in the courts of heaven. The lions' mouths were shut because the spiritual realm of authority, where Daniel operated through prayer, governs the natural realm. The angels enforced a verdict that was already won through a lifestyle of faithfulness."
        },
        lifeApplication: [
            "Compromise is Not an Option: Your connection with God is your greatest asset. Never compromise it for acceptance or to avoid trouble.",
            "Excellence as a Weapon: Daniel's enemies couldn't attack his work, so they attacked his faith. Excellence in your school, job, or craft is a powerful form of witness.",
            "Your Private Devotion Determines Your Public Victory: The victory in the lions' den was won in Daniel's prayer room long before he was thrown in."
        ],
        declaration: "I will not bow to the pressures of this world. My integrity is my shield, and my faith is my authority. The environment around me must submit to the Kingdom of God that is within me. Angels are dispatched on my behalf."
    }
];
