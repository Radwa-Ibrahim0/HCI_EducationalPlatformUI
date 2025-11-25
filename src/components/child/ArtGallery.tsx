import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Download, X } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import houseDrawing from 'figma:asset/98f8c421c9c73fe487ea4e35a3eee261095c7dbe.png';
import catDrawing from 'figma:asset/41c10b1bf826e3ad651cf56fb43f25a6c2720e01.png';
import birdDrawing from 'figma:asset/ca195c2edbc3503ebd9accfdbf0c06d63c44c753.png';
import treeDrawing from 'figma:asset/b059cd25525d337b0c6177d57723efc71893ffdb.png';
import mouseDrawing from 'figma:asset/03a08cf0b23b02bedc9fcb98ed16356b5ac976ff.png';
import rainbowDrawing from 'figma:asset/3b9e01f34957d73eded8241d3405f382ca528d29.png';
import whaleDrawing from 'figma:asset/a274ca28f98902dac05dea8e5123e27830efc7dd.png';
import carDrawing from 'figma:asset/61fb430f2bc5aa89a5810960af75f82200ce4a86.png';

const defaultArtworks = [
  {
    id: 1,
    title: 'My Dream House',
    date: 'Nov 20, 2025',
    image: houseDrawing,
    likes: 15
  },
  {
    id: 2,
    title: 'Happy Cat',
    date: 'Nov 19, 2025',
    image: catDrawing,
    likes: 18
  },
  {
    id: 3,
    title: 'Blue Bird',
    date: 'Nov 18, 2025',
    image: birdDrawing,
    likes: 12
  },
  {
    id: 4,
    title: 'Tree & Flower',
    date: 'Nov 17, 2025',
    image: treeDrawing,
    likes: 16
  },
  {
    id: 5,
    title: 'Little Mouse',
    date: 'Nov 16, 2025',
    image: mouseDrawing,
    likes: 14
  },
  {
    id: 6,
    title: 'Rainbow Sky',
    date: 'Nov 15, 2025',
    image: rainbowDrawing,
    likes: 20
  },
  {
    id: 7,
    title: 'Blue Whale',
    date: 'Nov 14, 2025',
    image: whaleDrawing,
    likes: 22
  },
  {
    id: 8,
    title: 'Pink Car',
    date: 'Nov 13, 2025',
    image: carDrawing,
    likes: 19
  }
];

export default function ArtGallery() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<typeof defaultArtworks[0] | null>(null);
  const [artworks, setArtworks] = useState(defaultArtworks);
  const itemsPerPage = 8;

  useEffect(() => {
    // Load artworks from localStorage (synced with parent portal)
    const savedArtworks = localStorage.getItem('artGallery');
    if (savedArtworks) {
      const parsed = JSON.parse(savedArtworks);
      // Combine saved artworks with default artworks
      setArtworks([...parsed, ...defaultArtworks]);
    } else {
      setArtworks(defaultArtworks);
    }
  }, []);

  const totalPages = Math.ceil(artworks.length / itemsPerPage);

  const displayedArtworks = artworks.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/child/dashboard')}
                className="rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-4xl">🎨</span>
                <h1 className="text-3xl text-black" style={{ fontFamily: 'Comic Sans MS, cursive' }}>Art Gallery</h1>
              </div>
            </div>
            <Button
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-full"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
              onClick={() => navigate('/child/whiteboard')}
            >
              Create New Art ✏️
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Gallery Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {displayedArtworks.map((artwork, index) => (
            <Card 
              key={artwork.id} 
              className="overflow-hidden rounded-3xl border-4 shadow-xl transform transition-all hover:scale-105 hover:-rotate-1 relative group cursor-pointer p-0"
              style={{
                borderColor: ['#fbbf24', '#ec4899', '#8b5cf6', '#10b981', '#f97316', '#3b82f6'][index % 6],
                transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
              }}
              onClick={() => setSelectedImage(artwork)}
            >
              {/* Save Button - appears on hover */}
              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  className="rounded-full bg-white hover:bg-gray-100 text-black shadow-lg border-2 border-gray-300"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                  onClick={async (e) => {
                    e.stopPropagation(); // Prevent card click
                    try {
                      const response = await fetch(artwork.image);
                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `${artwork.title}.jpg`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      window.URL.revokeObjectURL(url);
                    } catch (error) {
                      console.error('Download failed:', error);
                    }
                  }}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
              
              {/* Image */}
              <div className="aspect-[16/9] relative bg-gradient-to-br from-purple-200 to-pink-200 overflow-hidden">
                <ImageWithFallback
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              {/* Date Section */}
              <div className="px-3 py-4 bg-purple-100">
                <p className="text-xs text-gray-700 m-0 leading-tight" style={{ fontFamily: 'Comic Sans MS, cursive' }}>{artwork.date}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="rounded-full w-12 h-12"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentPage === i
                      ? 'bg-purple-500 w-8'
                      : 'bg-purple-200 hover:bg-purple-300'
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="rounded-full w-12 h-12"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        )}
      </main>

      {/* Image Popup Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full p-2 shadow-lg transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-300">
                <ImageWithFallback
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="p-4 bg-gradient-to-br from-white to-purple-50">
                  <p className="text-center text-gray-400" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    {selectedImage.date}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}