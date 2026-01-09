
import { PlaceHolderImages } from './placeholder-images';
import { User } from './types';

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
    date: new Date(2024, 7, 15), // Note: Month is 0-indexed, so 7 is August
    time: '7:00 PM - 9:00 PM EST',
    isLive: false,
  },
  {
    id: 2,
    title: 'Kingdom Finance Workshop',
    speaker: 'The Bondservant of Christ Joseph Tryson',
    date: new Date(2024, 7, 22),
    time: '10:00 AM - 1:00 PM EST',
    isLive: false,
  },
   {
    id: 3,
    title: 'Sunday Worship Service',
    speaker: 'Faith Connect Worship',
    date: new Date(),
    time: '11:00 AM EST',
    isLive: true,
  },
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
