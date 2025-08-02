import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Game {
    id: number;
    name: string;
    slug: string;
    description: string;
    type: string;
    provider: string;
    image_url: string | null;
    min_bet: string;
    max_bet: string;
    rtp: string;
    is_active: boolean;
}

interface User {
    id: number;
    name: string;
    email: string;
    balance: string;
}

interface GameResult {
    is_win: boolean;
    multiplier: number;
    net_result: number;
    symbols: string[];
}

interface Props {
    game: Game;
    user: User;
    gameResult?: GameResult;
    message?: string;
    [key: string]: unknown;
}

export default function GameShow({ game, user, gameResult, message }: Props) {
    const [betAmount, setBetAmount] = useState(game.min_bet);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        if (parseFloat(betAmount) < parseFloat(game.min_bet)) {
            alert(`Minimum bet is $${game.min_bet}`);
            return;
        }
        
        if (parseFloat(betAmount) > parseFloat(game.max_bet)) {
            alert(`Maximum bet is $${game.max_bet}`);
            return;
        }
        
        if (parseFloat(betAmount) > parseFloat(user.balance)) {
            alert('Insufficient balance');
            return;
        }

        setIsPlaying(true);
        
        router.post('/games/play', {
            game_id: game.id,
            bet_amount: parseFloat(betAmount),
        }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsPlaying(false),
        });
    };

    const getGameTypeIcon = (type: string) => {
        const icons: Record<string, string> = {
            slot: '🎰',
            poker: '♠️',
            blackjack: '🃏',
            roulette: '🎯',
            baccarat: '💎',
        };
        return icons[type] || '🎮';
    };

    const getGameTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            slot: 'from-yellow-400 to-orange-500',
            poker: 'from-green-400 to-blue-500',
            blackjack: 'from-red-400 to-pink-500',
            roulette: 'from-purple-400 to-indigo-500',
            baccarat: 'from-indigo-400 to-purple-500',
        };
        return colors[type] || 'from-gray-400 to-gray-600';
    };

    return (
        <AppShell>
            <Head title={`${game.name} - Casino Game`} />
            
            <div className="container mx-auto px-4 py-6">
                {/* Navigation */}
                <div className="mb-6">
                    <Link href="/games" className="text-blue-600 dark:text-blue-400 hover:underline">
                        ← Back to Games
                    </Link>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Game Display */}
                    <div className="space-y-6">
                        {/* Game Header */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{getGameTypeIcon(game.type)}</span>
                                    <div>
                                        <CardTitle className="text-2xl">{game.name}</CardTitle>
                                        <CardDescription>by {game.provider}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {game.description}
                                </p>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Min Bet</p>
                                        <p className="font-semibold">${game.min_bet}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Max Bet</p>
                                        <p className="font-semibold">${game.max_bet}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">RTP</p>
                                        <p className="font-semibold">{game.rtp}%</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Game Display Area */}
                        <Card>
                            <CardContent className="p-8">
                                <div className={`h-64 bg-gradient-to-br ${getGameTypeColor(game.type)} rounded-lg flex items-center justify-center relative overflow-hidden`}>
                                    {game.type === 'slot' && gameResult?.symbols ? (
                                        // Slot Machine Result Display
                                        <div className="flex gap-4">
                                            {gameResult.symbols.map((symbol, index) => (
                                                <div
                                                    key={index}
                                                    className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center text-3xl animate-bounce"
                                                    style={{ animationDelay: `${index * 0.1}s` }}
                                                >
                                                    {symbol}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        // Default Game Display
                                        <div className="text-center text-white">
                                            <div className="text-8xl mb-4 animate-pulse">
                                                {getGameTypeIcon(game.type)}
                                            </div>
                                            <p className="text-xl font-semibold">
                                                {isPlaying ? 'Playing...' : 'Ready to Play!'}
                                            </p>
                                        </div>
                                    )}
                                    
                                    {/* Spinning overlay when playing */}
                                    {isPlaying && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <div className="animate-spin text-6xl text-white">🎰</div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Game Result Message */}
                                {message && (
                                    <div className={`mt-4 p-4 rounded-lg text-center font-semibold ${
                                        gameResult?.is_win 
                                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                                    }`}>
                                        {message}
                                        {gameResult?.is_win && (
                                            <div className="text-sm mt-1">
                                                Multiplier: {gameResult.multiplier}x
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Game Controls */}
                    <div className="space-y-6">
                        {/* User Balance */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    💰 Your Balance
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                    ${parseFloat(user.balance).toFixed(2)}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Betting Controls */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Place Your Bet</CardTitle>
                                <CardDescription>
                                    Choose your bet amount and start playing
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Bet Amount ($)
                                    </label>
                                    <Input
                                        type="number"
                                        min={game.min_bet}
                                        max={Math.min(parseFloat(game.max_bet), parseFloat(user.balance))}
                                        step="0.01"
                                        value={betAmount}
                                        onChange={(e) => setBetAmount(e.target.value)}
                                        className="text-center text-lg font-semibold"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <span>Min: ${game.min_bet}</span>
                                        <span>Max: ${game.max_bet}</span>
                                    </div>
                                </div>

                                {/* Quick Bet Buttons */}
                                <div className="grid grid-cols-3 gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setBetAmount(game.min_bet)}
                                    >
                                        Min
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setBetAmount((parseFloat(user.balance) / 10).toFixed(2))}
                                    >
                                        10%
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setBetAmount(Math.min(parseFloat(game.max_bet), parseFloat(user.balance)).toFixed(2))}
                                    >
                                        Max
                                    </Button>
                                </div>

                                {/* Play Button */}
                                <Button
                                    onClick={handlePlay}
                                    disabled={isPlaying || parseFloat(betAmount) > parseFloat(user.balance)}
                                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg py-3"
                                >
                                    {isPlaying ? (
                                        <>
                                            <span className="animate-spin mr-2">🎰</span>
                                            Playing...
                                        </>
                                    ) : (
                                        <>
                                            🎮 Play for ${parseFloat(betAmount).toFixed(2)}
                                        </>
                                    )}
                                </Button>

                                {parseFloat(betAmount) > parseFloat(user.balance) && (
                                    <p className="text-red-500 text-sm text-center">
                                        Insufficient balance for this bet
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Game Rules */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">How to Play</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                    {game.type === 'slot' && (
                                        <>
                                            <p>• Choose your bet amount</p>
                                            <p>• Click Play to spin the reels</p>
                                            <p>• Match 3 symbols to win</p>
                                            <p>• Winnings are automatically added to your balance</p>
                                        </>
                                    )}
                                    {game.type === 'poker' && (
                                        <>
                                            <p>• Place your bet</p>
                                            <p>• Get the best poker hand</p>
                                            <p>• Beat the dealer to win</p>
                                        </>
                                    )}
                                    {game.type === 'blackjack' && (
                                        <>
                                            <p>• Get as close to 21 as possible</p>
                                            <p>• Don't go over 21</p>
                                            <p>• Beat the dealer's hand</p>
                                        </>
                                    )}
                                    {game.type === 'roulette' && (
                                        <>
                                            <p>• Choose your bet type</p>
                                            <p>• Spin the wheel</p>
                                            <p>• Win if the ball lands on your number</p>
                                        </>
                                    )}
                                    {game.type === 'baccarat' && (
                                        <>
                                            <p>• Bet on Player, Banker, or Tie</p>
                                            <p>• Closest to 9 wins</p>
                                            <p>• Banker bet has lowest house edge</p>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}