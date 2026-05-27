import { AiFillLike } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';



export const reactionsData = [
  {
    id: 'like',
    icon: <AiFillLike color="#3b82f6" fontSize={22} />,
    label: 'Like',
    color: 'text-blue-500',
    emoji: "👍"
  },
  {
    id: 'love',
    icon: <FaHeart color="#ef4444" fontSize={20} />,
    label: 'Love',
    color: 'text-red-500',
    emoji: "❤️"
  },
  {
    id: 'haha',
    icon: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f602.png" alt="haha" className="w-6 h-6 object-contain" />,
    label: 'Haha',
    color: 'text-yellow-500',
    emoji: "😂"
  },
  {
    id: 'wow',
    icon: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f62e.png" alt="wow" className="w-6 h-6 object-contain" />,
    label: 'Wow',
    color: 'text-yellow-500',
    emoji: "😮"
  },
  {
    id: 'sad',
    icon: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f622.png" alt="sad" className="w-6 h-6 object-contain" />,
    label: 'Sad',
    color: 'text-yellow-500',
    emoji: "😢"
  },
  {
    id: 'angry',
    icon: <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f621.png" alt="angry" className="w-6 h-6 object-contain" />,
    label: 'Angry',
    color: 'text-orange-600',
    emoji: "😡"
  },
];