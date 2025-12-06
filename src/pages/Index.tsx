import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [damageCalc, setDamageCalc] = useState({ ap: '', dp: '', enemyDp: '' });
  const [expCalc, setExpCalc] = useState({ currentLevel: '', targetLevel: '', expRate: '' });
  const [farmCalc, setFarmCalc] = useState({ itemPrice: '', dropRate: '', hoursPerDay: '' });
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', message: string }>>([]);

  const calculateDamage = () => {
    const ap = Number(damageCalc.ap);
    const dp = Number(damageCalc.dp);
    const enemyDp = Number(damageCalc.enemyDp);
    if (ap && enemyDp) {
      const baseDamage = ap * 0.8;
      const reduction = enemyDp * 0.3;
      const finalDamage = Math.max(baseDamage - reduction, ap * 0.2);
      return Math.round(finalDamage);
    }
    return 0;
  };

  const calculateExp = () => {
    const current = Number(expCalc.currentLevel);
    const target = Number(expCalc.targetLevel);
    const rate = Number(expCalc.expRate) || 100;
    if (current && target && target > current) {
      const baseExpNeeded = (target - current) * 1000 * Math.pow(1.15, current);
      const expWithRate = baseExpNeeded / (rate / 100);
      return Math.round(expWithRate);
    }
    return 0;
  };

  const calculateFarmProfit = () => {
    const price = Number(farmCalc.itemPrice);
    const dropRate = Number(farmCalc.dropRate);
    const hours = Number(farmCalc.hoursPerDay);
    if (price && dropRate && hours) {
      const dropsPerHour = (dropRate / 100) * 60;
      const dailyProfit = price * dropsPerHour * hours;
      return Math.round(dailyProfit);
    }
    return 0;
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatHistory([...chatHistory, { role: 'user', message: chatMessage }]);
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        message: 'Привет! Я AI-ассистент для Black Desert. В будущем я буду отвечать на твои вопросы по механикам игры, классам, билдам и фарму. Сейчас я в режиме демо 🎮'
      }]);
    }, 500);
    setChatMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)'
        }}
      />

      <div className="relative z-10">
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center animate-glow">
                  <Icon name="Swords" size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    BDO Gaming Hub
                  </h1>
                  <p className="text-xs text-muted-foreground">Powered by AI Assistant</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-primary/10 border-primary/50">
                  <Icon name="Sparkles" size={14} className="mr-1" />
                  Black Desert
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Твой AI-помощник в мире Black Desert
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Калькуляторы, гайды от AI-ассистента и инструменты для максимального профита в игре
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity group">
                <Icon name="Calculator" size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                Калькуляторы
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 group">
                <Icon name="Bot" size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                AI Ассистент
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-3">Игровые калькуляторы</h3>
              <p className="text-muted-foreground">Рассчитай урон, опыт и профит для эффективного прокачки</p>
            </div>

            <Tabs defaultValue="damage" className="w-full animate-scale-in">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-card border border-border">
                <TabsTrigger value="damage" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Sword" size={18} className="mr-2" />
                  Урон
                </TabsTrigger>
                <TabsTrigger value="exp" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="TrendingUp" size={18} className="mr-2" />
                  Опыт
                </TabsTrigger>
                <TabsTrigger value="farm" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Coins" size={18} className="mr-2" />
                  Профит
                </TabsTrigger>
              </TabsList>

              <TabsContent value="damage">
                <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Zap" size={20} className="text-primary" />
                    Калькулятор урона
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <Label htmlFor="ap">Сила атаки (AP)</Label>
                      <Input
                        id="ap"
                        type="number"
                        placeholder="250"
                        value={damageCalc.ap}
                        onChange={(e) => setDamageCalc({ ...damageCalc, ap: e.target.value })}
                        className="bg-background/50 border-primary/30 focus:border-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dp">Твоя защита (DP)</Label>
                      <Input
                        id="dp"
                        type="number"
                        placeholder="300"
                        value={damageCalc.dp}
                        onChange={(e) => setDamageCalc({ ...damageCalc, dp: e.target.value })}
                        className="bg-background/50 border-primary/30 focus:border-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="enemyDp">Защита противника</Label>
                      <Input
                        id="enemyDp"
                        type="number"
                        placeholder="200"
                        value={damageCalc.enemyDp}
                        onChange={(e) => setDamageCalc({ ...damageCalc, enemyDp: e.target.value })}
                        className="bg-background/50 border-primary/30 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 rounded-lg border border-primary/30">
                    <p className="text-sm text-muted-foreground mb-2">Примерный урон за удар:</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {calculateDamage()} HP
                    </p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="exp">
                <Card className="p-6 border-secondary/20 bg-card/50 backdrop-blur-sm">
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Icon name="LineChart" size={20} className="text-secondary" />
                    Калькулятор опыта
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <Label htmlFor="currentLevel">Текущий уровень</Label>
                      <Input
                        id="currentLevel"
                        type="number"
                        placeholder="60"
                        value={expCalc.currentLevel}
                        onChange={(e) => setExpCalc({ ...expCalc, currentLevel: e.target.value })}
                        className="bg-background/50 border-secondary/30 focus:border-secondary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="targetLevel">Целевой уровень</Label>
                      <Input
                        id="targetLevel"
                        type="number"
                        placeholder="61"
                        value={expCalc.targetLevel}
                        onChange={(e) => setExpCalc({ ...expCalc, targetLevel: e.target.value })}
                        className="bg-background/50 border-secondary/30 focus:border-secondary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expRate">Бонус опыта (%)</Label>
                      <Input
                        id="expRate"
                        type="number"
                        placeholder="100"
                        value={expCalc.expRate}
                        onChange={(e) => setExpCalc({ ...expCalc, expRate: e.target.value })}
                        className="bg-background/50 border-secondary/30 focus:border-secondary"
                      />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-secondary/20 to-accent/20 p-6 rounded-lg border border-secondary/30">
                    <p className="text-sm text-muted-foreground mb-2">Необходимо опыта:</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                      {calculateExp().toLocaleString()} XP
                    </p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="farm">
                <Card className="p-6 border-accent/20 bg-card/50 backdrop-blur-sm">
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Icon name="DollarSign" size={20} className="text-accent" />
                    Калькулятор профита
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <Label htmlFor="itemPrice">Цена предмета (серебро)</Label>
                      <Input
                        id="itemPrice"
                        type="number"
                        placeholder="1000000"
                        value={farmCalc.itemPrice}
                        onChange={(e) => setFarmCalc({ ...farmCalc, itemPrice: e.target.value })}
                        className="bg-background/50 border-accent/30 focus:border-accent"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dropRate">Шанс дропа (%/мин)</Label>
                      <Input
                        id="dropRate"
                        type="number"
                        placeholder="5"
                        value={farmCalc.dropRate}
                        onChange={(e) => setFarmCalc({ ...farmCalc, dropRate: e.target.value })}
                        className="bg-background/50 border-accent/30 focus:border-accent"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hoursPerDay">Часов фарма в день</Label>
                      <Input
                        id="hoursPerDay"
                        type="number"
                        placeholder="4"
                        value={farmCalc.hoursPerDay}
                        onChange={(e) => setFarmCalc({ ...farmCalc, hoursPerDay: e.target.value })}
                        className="bg-background/50 border-accent/30 focus:border-accent"
                      />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-accent/20 to-primary/20 p-6 rounded-lg border border-accent/30">
                    <p className="text-sm text-muted-foreground mb-2">Профит за день:</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                      {calculateFarmProfit().toLocaleString()} 💰
                    </p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-12 px-4 bg-gradient-to-b from-transparent to-card/30">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-3 flex items-center justify-center gap-2">
                <Icon name="BotMessageSquare" size={32} className="text-primary" />
                AI Ассистент
              </h3>
              <p className="text-muted-foreground">Задай вопрос по игре - получи ответ от AI</p>
            </div>

            <Card className="p-6 border-primary/30 bg-card/70 backdrop-blur-sm">
              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="MessageCircle" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Начни общение с AI-ассистентом</p>
                    <p className="text-sm mt-2">Спроси про билды, локации для фарма или механики игры</p>
                  </div>
                ) : (
                  chatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
                            : 'bg-muted border border-border'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <Textarea
                  placeholder="Какой билд лучше для PvE на уровне 60?..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="min-h-[60px] bg-background/50 border-primary/30 focus:border-primary resize-none"
                />
                <Button
                  onClick={sendMessage}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-6"
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </Card>
          </div>
        </section>

        <footer className="border-t border-border/50 py-8 px-4 mt-12">
          <div className="container mx-auto text-center text-muted-foreground">
            <p className="mb-2">BDO Gaming Hub - Твой помощник в Black Desert Online</p>
            <p className="text-sm">Создано с ❤️ для игрового сообщества</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
