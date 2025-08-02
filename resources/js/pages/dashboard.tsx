import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link, usePage } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    balance: string;
}

interface Props {
    auth: {
        user: User;
    };
    [key: string]: unknown;
}

export default function Dashboard() {
    const { auth } = usePage<Props>().props;
    const user = auth.user;

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="container mx-auto px-4 py-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back, {user.name}! 🎰
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Ready to test your luck today?
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    {/* Balance Card */}
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                                💰 Your Balance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                                ${parseFloat(user.balance).toFixed(2)}
                            </div>
                            <p className="text-sm text-green-600/70 dark:text-green-400/70">
                                Available to play
                            </p>
                        </CardContent>
                    </Card>

                    {/* Quick Play Card */}
                    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                                🎰 Quick Play
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-yellow-600/70 dark:text-yellow-400/70 mb-4">
                                Jump straight into the action
                            </p>
                            <Link href="/games">
                                <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold">
                                    Play Now
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Game Stats Card */}
                    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                                📊 Your Stats
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-purple-600/70 dark:text-purple-400/70">Games Played</span>
                                    <span className="font-semibold text-purple-700 dark:text-purple-300">-</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-purple-600/70 dark:text-purple-400/70">Biggest Win</span>
                                    <span className="font-semibold text-purple-700 dark:text-purple-300">-</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Featured Games */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        🔥 Featured Games
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { name: 'Lucky Sevens', type: 'slot', emoji: '🍀', color: 'from-green-400 to-blue-500' },
                            { name: 'Mega Fortune', type: 'slot', emoji: '💎', color: 'from-purple-400 to-pink-500' },
                            { name: 'Blackjack', type: 'blackjack', emoji: '🃏', color: 'from-red-400 to-yellow-500' },
                            { name: 'Roulette', type: 'roulette', emoji: '🎯', color: 'from-indigo-400 to-purple-500' },
                        ].map((game) => (
                            <Card key={game.name} className="group cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="p-4">
                                    <div className={`h-32 bg-gradient-to-br ${game.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                                        <span className="text-4xl">{game.emoji}</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-center">
                                        {game.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center capitalize">
                                        {game.type}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-6">
                        <Link href="/games">
                            <Button variant="outline" size="lg">
                                View All Games →
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Game Categories */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        🎮 Game Categories
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { name: 'Slot Machines', icon: '🎰', description: 'Classic and modern slot games', count: '50+' },
                            { name: 'Table Games', icon: '🃏', description: 'Blackjack, Poker, Baccarat', count: '20+' },
                            { name: 'Live Casino', icon: '🎯', description: 'Real dealers, real-time action', count: '15+' },
                        ].map((category) => (
                            <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <span className="text-2xl">{category.icon}</span>
                                        <div>
                                            <div className="text-lg">{category.name}</div>
                                            <div className="text-sm font-normal text-muted-foreground">
                                                {category.count} games
                                            </div>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{category.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border-yellow-200 dark:border-yellow-800">
                    <CardContent className="p-8 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            🚀 Ready to Win Big?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                            Join thousands of players and experience the excitement of our premium casino games. 
                            With your current balance of ${parseFloat(user.balance).toFixed(2)}, you're ready to start winning!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/games">
                                <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold">
                                    🎰 Play Games Now
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline">
                                📈 View Game History
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}