import { Contact, Message } from '@/app/types/message';

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    lastMessage: {
      id: 'm1',
      content: 'Hey, how are you doing?',
      timestamp: '2 hours ago'
    },
    isActive: true
  },
  {
    id: '2',
    name: 'Sarah Smith',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    lastMessage: {
      id: 'm2',
      content: 'The project looks great! Let\'s catch up tomorrow.',
      timestamp: '5 hours ago'
    },
    isActive: false
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    lastMessage: {
      id: 'm3',
      content: 'Thanks for your help!',
      timestamp: '1 day ago'
    },
    isActive: false
  }
];

export const messages: Message[] = [
  {
    id: '1',
    content: 'Hey, how are you doing?',
    timestamp: '2:30 PM'
  },
  {
    id: '2',
    content: 'I\'m doing great! How about you?',
    timestamp: '2:31 PM'
  },
  {
    id: '3',
    content: 'Just working on some new projects. Would love to catch up soon!',
    timestamp: '2:35 PM'
  }
];