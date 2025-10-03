import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Video {
  id: number;
  title: string;
  channel: string;
  views: string;
  thumbnail: string;
  likes: number;
  dislikes: number;
  tags: string[];
  description: string;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [videos, setVideos] = useState<Video[]>([
    {
      id: 1,
      title: "Космические пейзажи: Путешествие к звездам",
      channel: "Space Explorer",
      views: "2.5M",
      thumbnail: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=225&fit=crop",
      likes: 45000,
      dislikes: 320,
      tags: ["космос", "наука", "путешествия"],
      description: "Удивительное путешествие через галактики"
    },
    {
      id: 2,
      title: "Программирование для начинающих",
      channel: "CodeMaster",
      views: "1.2M",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
      likes: 38000,
      dislikes: 150,
      tags: ["программирование", "обучение", "код"],
      description: "Основы программирования с нуля"
    },
    {
      id: 3,
      title: "Кулинарные шедевры: Итальянская паста",
      channel: "Chef's Kitchen",
      views: "890K",
      thumbnail: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=225&fit=crop",
      likes: 52000,
      dislikes: 280,
      tags: ["кулинария", "рецепты", "италия"],
      description: "Традиционный рецепт итальянской пасты"
    },
    {
      id: 4,
      title: "Фитнес трансформация за 30 дней",
      channel: "FitLife",
      views: "3.1M",
      thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=225&fit=crop",
      likes: 67000,
      dislikes: 420,
      tags: ["фитнес", "здоровье", "спорт"],
      description: "Программа тренировок на месяц"
    },
    {
      id: 5,
      title: "Путешествие по Японии: Токио",
      channel: "Travel Vlog",
      views: "1.8M",
      thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=225&fit=crop",
      likes: 43000,
      dislikes: 190,
      tags: ["путешествия", "япония", "культура"],
      description: "Обзор достопримечательностей Токио"
    },
    {
      id: 6,
      title: "Музыкальная теория: Основы гармонии",
      channel: "Music Academy",
      views: "650K",
      thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=225&fit=crop",
      likes: 29000,
      dislikes: 85,
      tags: ["музыка", "обучение", "теория"],
      description: "Изучаем основы музыкальной гармонии"
    }
  ]);

  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    tags: '',
    preview: ''
  });

  const handleUpload = () => {
    if (uploadForm.title && uploadForm.preview) {
      const newVideo: Video = {
        id: videos.length + 1,
        title: uploadForm.title,
        channel: "Мой канал",
        views: "0",
        thumbnail: uploadForm.preview,
        likes: 0,
        dislikes: 0,
        tags: uploadForm.tags.split(',').map(t => t.trim()),
        description: uploadForm.description
      };
      setVideos([newVideo, ...videos]);
      setUploadForm({ title: '', description: '', tags: '', preview: '' });
    }
  };

  const handleLike = (videoId: number) => {
    setVideos(videos.map(v => v.id === videoId ? { ...v, likes: v.likes + 1 } : v));
  };

  const handleDislike = (videoId: number) => {
    setVideos(videos.map(v => v.id === videoId ? { ...v, dislikes: v.dislikes + 1 } : v));
  };

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'trending', label: 'Трендовое', icon: 'TrendingUp' },
    { id: 'subscriptions', label: 'Подписки', icon: 'Users' },
    { id: 'history', label: 'История', icon: 'History' },
    { id: 'favorites', label: 'Избранное', icon: 'Heart' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-video-red via-video-purple to-video-blue flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <Icon name="Play" size={24} className="text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-video-red via-video-purple to-video-blue bg-clip-text text-transparent">
                VIDEO PLATFORM
              </h1>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Поиск видео..."
                  className="w-full pl-12 pr-4 py-6 rounded-full border-2 border-gray-100 focus:border-video-purple transition-all duration-300"
                />
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full bg-gradient-to-r from-video-red to-video-blue hover:from-video-red/90 hover:to-video-blue/90 text-white px-6 py-6 transform hover:scale-105 transition-all duration-300">
                  <Icon name="Upload" size={20} className="mr-2" />
                  Загрузить
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-video-red to-video-blue bg-clip-text text-transparent">
                    Загрузить видео
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Название</label>
                    <Input
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                      placeholder="Введите название видео"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Описание</label>
                    <Textarea
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                      placeholder="Расскажите о вашем видео..."
                      className="w-full min-h-24"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Теги (через запятую)</label>
                    <Input
                      value={uploadForm.tags}
                      onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                      placeholder="путешествия, влог, природа"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">URL превью</label>
                    <Input
                      value={uploadForm.preview}
                      onChange={(e) => setUploadForm({ ...uploadForm, preview: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="w-full"
                    />
                  </div>
                  <Button
                    onClick={handleUpload}
                    className="w-full bg-gradient-to-r from-video-red to-video-blue hover:from-video-red/90 hover:to-video-blue/90 text-white py-6"
                  >
                    <Icon name="Upload" size={20} className="mr-2" />
                    Опубликовать видео
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <nav className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-video-red to-video-blue text-white shadow-lg transform scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon name={item.icon as any} size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-video-red/10 to-video-blue/10">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Icon name="Play" size={32} className="text-video-red ml-1" />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 border-2 border-video-purple/20">
                    <AvatarFallback className="bg-gradient-to-br from-video-red to-video-blue text-white font-bold">
                      {video.channel[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg line-clamp-2 mb-1 group-hover:text-video-purple transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{video.channel}</p>
                    <p className="text-sm text-gray-500">{video.views} просмотров</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {video.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-gradient-to-r from-video-red/10 to-video-blue/10 text-gray-700 hover:from-video-red/20 hover:to-video-blue/20 transition-all duration-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleLike(video.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-video-red transition-colors duration-300 group/like"
                  >
                    <Icon name="ThumbsUp" size={18} className="group-hover/like:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium">{video.likes.toLocaleString()}</span>
                  </button>
                  <button
                    onClick={() => handleDislike(video.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-video-blue transition-colors duration-300 group/dislike"
                  >
                    <Icon name="ThumbsDown" size={18} className="group-hover/dislike:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium">{video.dislikes.toLocaleString()}</span>
                  </button>
                  <button className="ml-auto text-gray-600 hover:text-video-purple transition-colors duration-300">
                    <Icon name="Share2" size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
