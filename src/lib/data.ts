

import { PlaceHolderImages } from './placeholder-images';
import { User } from './types';
import { Music, Handshake, Music2, Video, Heart, Wrench, DollarSign, HeartHandshake, Baby, PenSquare, Shield, Users } from 'lucide-react';

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
  { id: 1, name: 'John Doe', location: 'Lagos, Nigeria', avatar: PlaceHolderImages.find(p => p.id === 'avatar-1')! },
  { id: 2, name: 'Jane Smith', location: 'London, UK', avatar: PlaceHolderImages.find(p => p.id === 'avatar-2')! },
  { id: 3, name: 'Carlos Garcia', location: 'São Paulo, Brazil', avatar: PlaceHolderImages.find(p => p.id === 'avatar-3')! },
  { id: 4, name: 'Aisha Khan', location: 'Mumbai, India', avatar: PlaceHolderImages.find(p => p.id === 'avatar-2')! },
  { id: 5, name: 'Michael Chen', location: 'Sydney, Australia', avatar: PlaceHolderImages.find(p => p.id === 'avatar-1')! },
  { id: 6, name: 'Maria Rodriguez', location: 'Mexico City, Mexico', avatar: PlaceHolderImages.find(p => p.id === 'avatar-2')! },
];

export const friends: User[] = [
  communityUsers[1],
  communityUsers[2],
  communityUsers[4],
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
  },
  {
    id: 2,
    title: 'Kingdom Finance Workshop',
    speaker: 'The Bondservant of Christ Joseph Tryson',
    date: new Date(2024, 8, 22),
    time: '10:00 AM - 1:00 PM EST',
    isLive: false,
  },
   {
    id: 3,
    title: 'Sunday Worship Service',
    date: new Date('2024-07-28T11:00:00'),
    speaker: 'Faith Connect Worship',
    time: '11:00 AM EST',
    isLive: true,
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
    },
    {
        id: 2,
        title: 'Prophetic Summit: The Seer\'s Realm',
        description: 'An immersive summit for prophets and prophetic people to go deeper in the seer dimension.',
        dates: 'November 7-9, 2024',
        location: 'Online Only',
        image: PlaceHolderImages.find(p => p.id === 'live-replay-2'),
    },
    {
        id: 3,
        title: 'Annual Leadership Summit',
        description: 'An intensive summit to equip and commission leaders for the new year.',
        dates: 'January 15-17, 2025',
        location: 'Online Only',
        image: PlaceHolderImages.find(p => p.id === 'live-replay-1'),
    }
];

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
  },
  {
    id: 2,
    title: 'Annual Global Empowerment Summit',
    description: 'Our pinnacle event of the year, gathering believers from around the world for a week of intensive equipping and commissioning.',
    frequency: 'December 1st - 7th, 2024',
    time: 'Various Times',
    type: 'Yearly',
    image: PlaceHolderImages.find(p => p.id === 'hero'),
  },
  {
    id: 3,
    title: 'Weekly Empowerment Meeting',
    description: 'Join us every Saturday for a powerful time of prayer, teaching, and fellowship to strengthen your week.',
    frequency: 'Every Saturday',
    time: '10:00 AM EST',
    type: 'Weekly',
    image: PlaceHolderImages.find(p => p.id === 'community-feature'),
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
    },
    {
        id: 2,
        name: 'Women of Wisdom',
        description: 'Connecting women to build authentic friendships, study the Word, and encourage one another in their walk with Christ.',
        image: PlaceHolderImages.find(p => p.id === 'devotional-3'),
        members: 245,
        category: 'Women\'s Group',
    },
    {
        id: 3,
        name: 'Marketplace Leaders',
        description: 'For professionals and entrepreneurs seeking to apply biblical principles in their careers and businesses for Kingdom impact.',
        image: PlaceHolderImages.find(p => p.id === 'community-feature'),
        members: 89,
        category: 'Career & Business',
    },
     {
        id: 4,
        name: 'Daily Devotional Readers',
        description: 'A group to discuss the daily devotional, share insights, and encourage each other to apply the Word.',
        image: PlaceHolderImages.find(p => p.id === 'devotionals-feature'),
        members: 450,
        category: 'Bible Study',
    },
];

export type Department = {
  name: string;
  description: string;
  icon: string;
}

export const departments: Department[] = [
  { name: 'Praise & Worship Department', description: 'Leading the congregation into the presence of God through music.', icon: 'Music' },
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
        description: "Setting a spiritual atmosphere of worship, reverence, and expectation. This is where we welcome the presence of the Holy Spirit.",
        details: "Opening Prayer, Praise & Worship, Prophetic Declarations"
    },
    {
        id: 2,
        title: "2. Revelation & The Word",
        description: "The centerpiece of the service, where the Word of God is taught with clarity, revelation, and power.",
        details: "Announcements & Welcome, Tithes & Offerings Teaching, The Sermon (Rhema Word)"
    },
    {
        id: 3,
        title: "3. Impartation & Ministry",
        description: "The time for personal ministry, where the congregation receives from God through the laying on of hands, prophecy, and prayer.",
        details: "Altar Call (Salvation, Rededication), Healing & Deliverance Ministry, Prophetic Ministry"
    },
    {
        id: 4,
        title: "4. Closing & Commissioning",
        description: "Sending the church out into the world, empowered and equipped to demonstrate the Kingdom.",
        details: "Closing Announcements, Benediction & Blessing, Fellowship"
    }
];
    
