import { ArrowLeft, Crown, Smile } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PawPrint, Save } from 'lucide-react';
import { toast } from 'sonner';

const hats = [
  { id: 1, emoji: '🎩', name: 'Top Hat', unlocked: true },
  { id: 2, emoji: '👑', name: 'Crown', unlocked: true },
  { id: 3, emoji: '🧢', name: 'Cap', unlocked: true },
  { id: 4, emoji: '🎓', name: 'Graduation Cap', unlocked: false },
  { id: 5, emoji: '👒', name: 'Sun Hat', unlocked: true },
  { id: 6, emoji: '⛑️', name: 'Helmet', unlocked: false },
  { id: 7, emoji: '🪖', name: 'Army Helmet', unlocked: false },
];

const animals = [
  { id: 1, emoji: '🐱', name: 'Cat', color: 'from-orange-400 to-orange-600', unlocked: true },
  { id: 2, emoji: '🐶', name: 'Dog', color: 'from-amber-400 to-amber-600', unlocked: true },
  { id: 3, emoji: '🐻', name: 'Bear', color: 'from-yellow-600 to-yellow-800', unlocked: true },
  { id: 4, emoji: '🐰', name: 'Rabbit', color: 'from-pink-300 to-pink-500', unlocked: true },
  { id: 5, emoji: '🐼', name: 'Panda', color: 'from-gray-300 to-gray-500', unlocked: true },
  { id: 6, emoji: '🦊', name: 'Fox', color: 'from-orange-500 to-red-500', unlocked: true },
  { id: 7, emoji: '🐯', name: 'Tiger', color: 'from-orange-400 to-orange-700', unlocked: false },
  { id: 8, emoji: '🦁', name: 'Lion', color: 'from-yellow-500 to-yellow-700', unlocked: false },
  { id: 9, emoji: '🐨', name: 'Koala', color: 'from-gray-400 to-gray-600', unlocked: false },
  { id: 10, emoji: '🐵', name: 'Monkey', color: 'from-yellow-700 to-yellow-900', unlocked: false },
  { id: 11, emoji: '🦝', name: 'Raccoon', color: 'from-gray-500 to-gray-700', unlocked: false },
  { id: 12, emoji: '🐺', name: 'Wolf', color: 'from-slate-400 to-slate-600', unlocked: false },
];

const accessories = [
  { id: 1, emoji: '🎀', name: 'Bow', unlocked: true },
  { id: 2, emoji: '🌸', name: 'Pink Flower', unlocked: true },
  { id: 3, emoji: '🌟', name: 'Star', unlocked: true },
  { id: 4, emoji: '🦋', name: 'Butterfly', unlocked: true },
  { id: 5, emoji: '✨', name: 'Sparkles', unlocked: true },
  { id: 6, emoji: '🌺', name: 'Hibiscus', unlocked: false },
  { id: 7, emoji: '🌻', name: 'Sunflower', unlocked: false },
  { id: 8, emoji: '🌼', name: 'Daisy', unlocked: false },
  { id: 9, emoji: '🪶', name: 'Feather', unlocked: false },
  { id: 10, emoji: '🌈', name: 'Rainbow', unlocked: false },
  { id: 11, emoji: '❄️', name: 'Snowflake', unlocked: false },
];

export default function AvatarCustomization() {
  const navigate = useNavigate();
  const [selectedHat, setSelectedHat] = useState<number | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<number | null>(4);
  const [selectedAccessory, setSelectedAccessory] = useState<number | null>(null);
  const [avatarEmoji, setAvatarEmoji] = useState('😊');
  const [avatarColor, setAvatarColor] = useState('from-blue-400 to-blue-600');

  useEffect(() => {
    // Get the selected animal from the users page
    const savedAvatar = localStorage.getItem('selectedAvatar');
    if (savedAvatar) {
      const avatar = JSON.parse(savedAvatar);
      setAvatarEmoji(avatar.emoji);
      setAvatarColor(avatar.color);
      // Find the matching animal
      const matchingAnimal = animals.find(a => a.emoji === avatar.emoji);
      if (matchingAnimal) {
        setSelectedAnimal(matchingAnimal.id);
      }
    }
    
    // Get the saved customization for hat and accessory
    const savedCustomization = localStorage.getItem('avatarCustomization');
    if (savedCustomization) {
      const customization = JSON.parse(savedCustomization);
      setSelectedHat(customization.hatId);
      setSelectedAccessory(customization.accessoryId);
    }
  }, []);

  // Update avatar when animal is selected
  useEffect(() => {
    const selected = animals.find(a => a.id === selectedAnimal);
    if (selected) {
      setAvatarEmoji(selected.emoji);
      setAvatarColor(selected.color);
    }
  }, [selectedAnimal]);

  const currentHat = hats.find(h => h.id === selectedHat);
  const currentAnimal = animals.find(a => a.id === selectedAnimal);
  const currentAccessory = accessories.find(a => a.id === selectedAccessory);
  
  // Check if the current accessory is glasses, goggles, or sunglasses (should be centered)
  const isCenteredAccessory = currentAccessory && (currentAccessory.name === 'Glasses' || currentAccessory.name === 'Goggles' || currentAccessory.name === 'Sunglasses');
  
  // Different vertical positions for different glasses types
  const getAccessoryPosition = () => {
    if (!currentAccessory) return '';
    if (currentAccessory.name === 'Goggles') return 'top-24 left-1/2 transform -translate-x-1/2';
    if (currentAccessory.name === 'Glasses' || currentAccessory.name === 'Sunglasses') return 'top-[6.5rem] left-1/2 transform -translate-x-1/2';
    return 'top-20 right-8';
  };

  const saveAvatar = () => {
    const avatar = {
      emoji: avatarEmoji,
      color: avatarColor,
      animalId: selectedAnimal,
      hatId: selectedHat,
      accessoryId: selectedAccessory,
    };
    localStorage.setItem('avatarCustomization', JSON.stringify(avatar));
    toast.success('Avatar saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
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
                <span className="text-4xl">🐰</span>
                <h1 className="text-3xl text-black" style={{ fontFamily: 'Comic Sans MS, cursive' }}>My Avatar</h1>
              </div>
            </div>
            
            {/* Save Button */}
            <Button
              onClick={saveAvatar}
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-full"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              Save Avatar 💾
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Avatar Preview */}
          <Card className="rounded-3xl border-0 shadow-2xl bg-gradient-to-br from-purple-100 to-pink-100">
            <CardHeader>
              <CardTitle className="text-center text-black text-2xl" style={{ fontFamily: 'Comic Sans MS, cursive' }}>My Avatar</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                {/* Main Avatar */}
                <div className={`w-64 h-64 bg-gradient-to-br ${avatarColor} rounded-full shadow-2xl flex items-center justify-center text-9xl`}>
                  {avatarEmoji}
                </div>
                
                {/* Hat */}
                {currentHat && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-8xl">
                    {currentHat.emoji}
                  </div>
                )}
                
                {/* Accessory */}
                {currentAccessory && (
                  <div className="absolute top-20 right-8 text-6xl">
                    {currentAccessory.emoji}
                  </div>
                )}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-lg text-black" style={{ fontFamily: 'Comic Sans MS, cursive' }}>Looking awesome! 🌟</p>
              </div>
            </CardContent>
          </Card>

          {/* Customization Options */}
          <div>
            <Tabs defaultValue="animals" className="w-full">
              <TabsList className="w-full grid grid-cols-3 bg-purple-100 p-1 rounded-xl mb-6">
                <TabsTrigger value="animals" className="gap-2 rounded-lg data-[state=active]:bg-white text-black" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  <PawPrint className="w-4 h-4" />
                  Animals
                </TabsTrigger>
                <TabsTrigger value="hats" className="gap-2 rounded-lg data-[state=active]:bg-white text-black" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  <Crown className="w-4 h-4" />
                  Hats
                </TabsTrigger>
                <TabsTrigger value="accessories" className="gap-2 rounded-lg data-[state=active]:bg-white text-black" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  <Smile className="w-4 h-4" />
                  Accessories
                </TabsTrigger>
              </TabsList>

              <TabsContent value="animals">
                <div className="grid grid-cols-4 gap-4">
                  {animals.map((animal) => (
                    <button
                      key={animal.id}
                      onClick={() => animal.unlocked && setSelectedAnimal(animal.id)}
                      disabled={!animal.unlocked}
                      className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${
                        animal.unlocked
                          ? selectedAnimal === animal.id
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl scale-105'
                            : 'bg-white shadow-md hover:shadow-xl hover:scale-105'
                          : 'bg-gray-200 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <span className="text-5xl">{animal.emoji}</span>
                      <span className={`text-sm ${selectedAnimal === animal.id ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                        {animal.name}
                      </span>
                      {!animal.unlocked && (
                        <span className="text-xs text-black" style={{ fontFamily: 'Comic Sans MS, cursive' }}>🔒 Locked</span>
                      )}
                    </button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hats">
                <div className="grid grid-cols-4 gap-4">
                  {/* None Option */}
                  <button
                    onClick={() => setSelectedHat(null)}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${
                      selectedHat === null
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl scale-105'
                        : 'bg-white shadow-md hover:shadow-xl hover:scale-105'
                    }`}
                  >
                    <span className="text-5xl">🚫</span>
                    <span className={`text-sm ${selectedHat === null ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                      None
                    </span>
                  </button>
                  
                  {hats.map((hat) => (
                    <button
                      key={hat.id}
                      onClick={() => hat.unlocked && setSelectedHat(hat.id === selectedHat ? null : hat.id)}
                      disabled={!hat.unlocked}
                      className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${
                        hat.unlocked
                          ? selectedHat === hat.id
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl scale-105'
                            : 'bg-white shadow-md hover:shadow-xl hover:scale-105'
                          : 'bg-gray-200 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <span className="text-5xl">{hat.emoji}</span>
                      <span className={`text-sm ${selectedHat === hat.id ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                        {hat.name}
                      </span>
                      {!hat.unlocked && (
                        <span className="text-xs text-black" style={{ fontFamily: 'Comic Sans MS, cursive' }}>🔒 Locked</span>
                      )}
                    </button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="accessories">
                <div className="grid grid-cols-4 gap-4">
                  {/* None Option */}
                  <button
                    onClick={() => setSelectedAccessory(null)}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${
                      selectedAccessory === null
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl scale-105'
                        : 'bg-white shadow-md hover:shadow-xl hover:scale-105'
                    }`}
                  >
                    <span className="text-5xl">🚫</span>
                    <span className={`text-sm ${selectedAccessory === null ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                      None
                    </span>
                  </button>
                  
                  {accessories.map((accessory) => (
                    <button
                      key={accessory.id}
                      onClick={() => accessory.unlocked && setSelectedAccessory(accessory.id === selectedAccessory ? null : accessory.id)}
                      disabled={!accessory.unlocked}
                      className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${
                        accessory.unlocked
                          ? selectedAccessory === accessory.id
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl scale-105'
                            : 'bg-white shadow-md hover:shadow-xl hover:scale-105'
                          : 'bg-gray-200 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <span className="text-5xl">{accessory.emoji}</span>
                      <span className={`text-sm ${selectedAccessory === accessory.id ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                        {accessory.name}
                      </span>
                      {!accessory.unlocked && (
                        <span className="text-xs text-black" style={{ fontFamily: 'Comic Sans MS, cursive' }}>🔒 Locked</span>
                      )}
                    </button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}