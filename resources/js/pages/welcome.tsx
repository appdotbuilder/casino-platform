import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            balance?: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="Welcome to Lucky Casino" />
            
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
                {/* Header */}
                <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <span className="text-3xl">🎰</span>
                            <h1 className="text-2xl font-bold text-white">Lucky Casino</h1>
                        </div>
                        <nav className="flex space-x-4">
                            {auth?.user ? (
                                <>
                                    <Link href="/dashboard">
                                        <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <Link href="/games">
                                        <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold">
                                            Play Now
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="container mx-auto px-4 py-16">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-6">
                            🎰 Lucky Casino 🎲
                        </h2>
                        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
                            Experience the thrill of Las Vegas from your mobile device! 
                            Play slots, poker, blackjack, and more with real winnings.
                        </p>
                        
                        {auth?.user ? (
                            <div className="space-y-4">
                                <p className="text-lg text-white/70">
                                    Welcome back, <span className="text-yellow-400 font-semibold">{auth.user.name}</span>!
                                    {auth.user.balance && (
                                        <span className="ml-2">
                                            Balance: <span className="text-green-400 font-bold">${auth.user.balance}</span>
                                        </span>
                                    )}
                                </p>
                                <Link href="/games">
                                    <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg px-8 py-4">
                                        🎮 Start Playing Now
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/register">
                                    <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg px-8 py-4">
                                        🎯 Join Now - Free $100!
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 text-lg px-8 py-4">
                                        🔐 Login to Play
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <div className="text-4xl mb-4">🎰</div>
                            <h3 className="text-xl font-bold text-white mb-2">Premium Slots</h3>
                            <p className="text-white/70">
                                Hundreds of slot games with progressive jackpots, bonus rounds, and amazing themes.
                            </p>
                        </div>
                        
                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <div className="text-4xl mb-4">🃏</div>
                            <h3 className="text-xl font-bold text-white mb-2">Live Table Games</h3>
                            <p className="text-white/70">
                                Play blackjack, poker, baccarat, and roulette with professional dealers.
                            </p>
                        </div>
                        
                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="text-xl font-bold text-white mb-2">Mobile Optimized</h3>
                            <p className="text-white/70">
                                Seamless gaming experience on any device - phone, tablet, or desktop.
                            </p>
                        </div>
                        
                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <div className="text-4xl mb-4">💰</div>
                            <h3 className="text-xl font-bold text-white mb-2">Instant Payouts</h3>
                            <p className="text-white/70">
                                Quick and secure withdrawals with multiple payment methods available.
                            </p>
                        </div>
                        
                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <div className="text-4xl mb-4">🎁</div>
                            <h3 className="text-xl font-bold text-white mb-2">Daily Bonuses</h3>
                            <p className="text-white/70">
                                Free spins, deposit bonuses, and loyalty rewards for regular players.
                            </p>
                        </div>
                        
                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-bold text-white mb-2">Secure & Fair</h3>
                            <p className="text-white/70">
                                Licensed and regulated with advanced encryption and fair play guarantee.
                            </p>
                        </div>
                    </div>

                    {/* Game Preview */}
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-white mb-8">🎮 Popular Games</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: 'Lucky Sevens', emoji: '🍀', color: 'from-green-400 to-blue-500' },
                                { name: 'Mega Fortune', emoji: '💎', color: 'from-purple-400 to-pink-500' },
                                { name: 'Blackjack', emoji: '🃏', color: 'from-red-400 to-yellow-500' },
                                { name: 'Roulette', emoji: '🎯', color: 'from-indigo-400 to-purple-500' },
                            ].map((game) => (
                                <div
                                    key={game.name}
                                    className={`bg-gradient-to-br ${game.color} rounded-lg p-6 text-center cursor-pointer hover:scale-105 transition-transform`}
                                >
                                    <div className="text-4xl mb-2">{game.emoji}</div>
                                    <p className="text-white font-semibold">{game.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    {!auth?.user && (
                        <div className="text-center bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-lg p-8 border border-yellow-400/30">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                🚀 Ready to Win Big?
                            </h3>
                            <p className="text-white/80 mb-6">
                                Join thousands of players and start your winning journey today!
                                New players get $100 free bonus to start playing.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/register">
                                    <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold">
                                        🎰 Claim Your Bonus
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10">
                                        Already a member? Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </main>

                {/* Footer */}
                <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10 py-8">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-white/60">
                            © 2024 Lucky Casino. Play responsibly. Must be 18+ to play.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}