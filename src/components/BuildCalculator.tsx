import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EquipmentSlot {
  id: string;
  name: string;
  icon: string;
  position: { top: string; left: string };
}

interface Item {
  id: string;
  name: string;
  ap?: number;
  aap?: number;
  dp?: number;
  hp?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Build {
  id: number;
  name: string;
  equipment: Record<string, Item | null>;
}

const equipmentSlots: EquipmentSlot[] = [
  { id: 'helmet', name: 'Шлем', icon: 'Shield', position: { top: '5%', left: '50%' } },
  { id: 'necklace', name: 'Ожерелье', icon: 'Circle', position: { top: '15%', left: '78%' } },
  { id: 'earring2', name: 'Серьга', icon: 'CircleDot', position: { top: '35%', left: '88%' } },
  { id: 'ring2', name: 'Кольцо', icon: 'Hexagon', position: { top: '60%', left: '85%' } },
  { id: 'chest', name: 'Броня', icon: 'ShieldCheck', position: { top: '78%', left: '70%' } },
  { id: 'gloves', name: 'Перчатки', icon: 'Hand', position: { top: '88%', left: '50%' } },
  { id: 'boots', name: 'Ботинки', icon: 'Footprints', position: { top: '78%', left: '30%' } },
  { id: 'belt', name: 'Пояс', icon: 'Minus', position: { top: '60%', left: '15%' } },
  { id: 'ring1', name: 'Кольцо', icon: 'Hexagon', position: { top: '35%', left: '12%' } },
  { id: 'earring1', name: 'Серьга', icon: 'CircleDot', position: { top: '15%', left: '22%' } },
  { id: 'weapon', name: 'Оружие', icon: 'Sword', position: { top: '25%', left: '50%' } },
  { id: 'awakening', name: 'Пробуждение', icon: 'Zap', position: { top: '40%', left: '60%' } },
  { id: 'subweapon', name: 'Доп. оружие', icon: 'Swords', position: { top: '40%', left: '40%' } },
];

const sampleItems: Item[] = [
  { id: '1', name: 'Кзарка', ap: 18, aap: 0, dp: 0, hp: 0, rarity: 'legendary' },
  { id: '2', name: 'Кутум', ap: 0, aap: 20, dp: 0, hp: 0, rarity: 'legendary' },
  { id: '3', name: 'Данделион', ap: 22, aap: 0, dp: 0, hp: 0, rarity: 'legendary' },
  { id: '4', name: 'Бег', ap: 5, aap: 5, dp: 0, hp: 0, rarity: 'epic' },
  { id: '5', name: 'Огр', ap: 10, aap: 0, dp: 0, hp: 0, rarity: 'epic' },
  { id: '6', name: 'Красный Коралл', ap: 0, aap: 0, dp: 5, hp: 150, rarity: 'rare' },
  { id: '7', name: 'Босс броня', ap: 0, aap: 0, dp: 15, hp: 200, rarity: 'legendary' },
  { id: '8', name: 'Перчатки босса', ap: 0, aap: 0, dp: 12, hp: 150, rarity: 'legendary' },
  { id: '9', name: 'Ботинки босса', ap: 0, aap: 0, dp: 12, hp: 150, rarity: 'legendary' },
  { id: '10', name: 'Шлем босса', ap: 0, aap: 0, dp: 13, hp: 180, rarity: 'legendary' },
];

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-amber-500',
};

export default function BuildCalculator() {
  const [builds, setBuilds] = useState<Build[]>([
    { id: 1, name: 'Build #1', equipment: {} },
  ]);
  const [selectedBuildId, setSelectedBuildId] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const selectedBuild = builds.find(b => b.id === selectedBuildId) || builds[0];

  const calculateStats = (build: Build) => {
    let ap = 0, aap = 0, dp = 0, hp = 0;
    Object.values(build.equipment).forEach(item => {
      if (item) {
        ap += item.ap || 0;
        aap += item.aap || 0;
        dp += item.dp || 0;
        hp += item.hp || 0;
      }
    });
    return { ap, aap, dp, hp };
  };

  const equipItem = (slotId: string, item: Item) => {
    setBuilds(builds.map(b =>
      b.id === selectedBuildId
        ? { ...b, equipment: { ...b.equipment, [slotId]: item } }
        : b
    ));
    setSelectedSlot(null);
  };

  const addNewBuild = () => {
    const newId = Math.max(...builds.map(b => b.id)) + 1;
    setBuilds([...builds, { id: newId, name: `Build #${newId}`, equipment: {} }]);
  };

  const stats = calculateStats(selectedBuild);

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Icon name="User" size={24} className="text-primary" />
              Конструктор билда
            </h3>
            <Button
              onClick={addNewBuild}
              size="sm"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <Icon name="Plus" size={16} className="mr-1" />
              Новый билд
            </Button>
          </div>

          <div className="relative aspect-square max-w-lg mx-auto bg-gradient-to-br from-background/50 to-card border-2 border-primary/20 rounded-full p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-primary/5 to-transparent rounded-full" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-accent via-primary to-secondary rounded-full border-4 border-primary/30 shadow-2xl flex items-center justify-center animate-glow">
              <div className="w-24 h-24 bg-background/80 rounded-full flex flex-col items-center justify-center backdrop-blur-sm">
                <Icon name="Diamond" size={32} className="text-primary mb-1" />
                <span className="text-xs font-bold text-primary">Алхим.</span>
                <span className="text-xs font-bold text-primary">камень</span>
              </div>
            </div>
            
            {equipmentSlots.map((slot) => {
              const equippedItem = selectedBuild.equipment[slot.id];
              return (
                <Dialog key={slot.id}>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => setSelectedSlot(slot.id)}
                      className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 group"
                      style={{ top: slot.position.top, left: slot.position.left }}
                    >
                      <div className={`
                        w-full h-full rounded-lg border-2 
                        ${equippedItem 
                          ? `${rarityColors[equippedItem.rarity]} border-transparent shadow-lg shadow-primary/20` 
                          : 'bg-background/60 border-border/50 hover:border-primary/70 hover:bg-background/80'
                        }
                        transition-all duration-200 flex items-center justify-center
                        group-hover:scale-110 group-hover:shadow-2xl backdrop-blur-sm
                      `}>
                        <Icon 
                          name={slot.icon as any} 
                          size={equippedItem ? 32 : 24} 
                          className={equippedItem ? 'text-white' : 'text-muted-foreground'}
                        />
                      </div>
                      {equippedItem && (
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-center w-20 truncate font-medium">
                          {equippedItem.name}
                        </div>
                      )}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Icon name={slot.icon as any} size={24} className="text-primary" />
                        Выбрать: {slot.name}
                      </DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-96">
                      <div className="grid grid-cols-2 gap-3 p-4">
                        {sampleItems.map(item => (
                          <Card
                            key={item.id}
                            className="p-4 cursor-pointer hover:border-primary/50 transition-all hover:scale-105"
                            onClick={() => equipItem(slot.id, item)}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-12 h-12 ${rarityColors[item.rarity]} rounded-lg flex items-center justify-center`}>
                                <Icon name={slot.icon as any} size={24} className="text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{item.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {item.rarity}
                                </Badge>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              {item.ap! > 0 && (
                                <div className="text-red-400">AP: +{item.ap}</div>
                              )}
                              {item.aap! > 0 && (
                                <div className="text-orange-400">AAP: +{item.aap}</div>
                              )}
                              {item.dp! > 0 && (
                                <div className="text-blue-400">DP: +{item.dp}</div>
                              )}
                              {item.hp! > 0 && (
                                <div className="text-green-400">HP: +{item.hp}</div>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-to-br from-red-500/20 to-red-600/10 border-red-500/30">
              <div className="text-sm text-muted-foreground mb-1">AP</div>
              <div className="text-3xl font-bold text-red-400">{stats.ap}</div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30">
              <div className="text-sm text-muted-foreground mb-1">AAP</div>
              <div className="text-3xl font-bold text-orange-400">{stats.aap}</div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
              <div className="text-sm text-muted-foreground mb-1">DP</div>
              <div className="text-3xl font-bold text-blue-400">{stats.dp}</div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
              <div className="text-sm text-muted-foreground mb-1">HP</div>
              <div className="text-3xl font-bold text-green-400">{stats.hp}</div>
            </Card>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon name="ScrollText" size={20} className="text-primary" />
            Сохраненные билды
          </h3>
          <ScrollArea className="h-[600px]">
            <div className="space-y-3">
              {builds.map((build) => {
                const buildStats = calculateStats(build);
                const isActive = build.id === selectedBuildId;
                return (
                  <Card
                    key={build.id}
                    className={`p-4 cursor-pointer transition-all ${
                      isActive 
                        ? 'border-primary bg-primary/10' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedBuildId(build.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{build.name}</h4>
                      {isActive && (
                        <Badge className="bg-primary">
                          <Icon name="Check" size={14} />
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-red-400">AP:</span>
                        <span className="font-semibold">{buildStats.ap}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-orange-400">AAP:</span>
                        <span className="font-semibold">{buildStats.aap}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-blue-400">DP:</span>
                        <span className="font-semibold">{buildStats.dp}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-green-400">HP:</span>
                        <span className="font-semibold">{buildStats.hp}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}