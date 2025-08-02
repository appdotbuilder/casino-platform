import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

interface Props {
    games: Game[];
    gameTypes: string[];
    user: User;
    [key: string]: unknown;
}

export default function GamesIndex({ games, gameTypes, user }: Props) {
    const [selectedType, setSelectedType] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredGames = games.filter(game => {
        const matchesType = !selectedType || game.type === selectedType;
        const matchesSearch = !searchTerm || 
            game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            game.provider.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

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
            <Head title="Casino Games" />
            
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            🎰 Casino Games
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Choose from our collection of exciting casino games
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 px-4 py-2 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-300">Your Balance</p>
                        <p className="text-xl font-bold text-green-600 dark:text-green-400">
                            ${parseFloat(user.balance).toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1">
                        <Input
                            type="search"
                            placeholder="Search games..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <Button
                            variant={selectedType === '' ? 'default' : 'outline'}
                            onClick={() => setSelectedType('')}
                        >
                            All Games
                        </Button>
                        {gameTypes.map((type) => (
                            <Button
                                key={type}
                                variant={selectedType === type ? 'default' : 'outline'}
                                onClick={() => setSelectedType(type)}
                                className="capitalize"
                            >
                                {getGameTypeIcon(type)} {type}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Games Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredGames.map((game) => (
                        <div
                            key={game.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            {/* Game Image */}
                            <div className={`h-48 bg-gradient-to-br ${getGameTypeColor(game.type)} flex items-center justify-center`}>
                                {game.image_url ? (
                                    <img
                                        src={game.image_url}
                                        alt={game.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-6xl text-white/80">
                                        {getGameTypeIcon(game.type)}
                                    </div>
                                )}
                            </div>

                            {/* Game Info */}
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {game.name}
                                    </h3>
                                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 capitalize">
                                        {game.type}
                                    </span>
                                </div>
                                
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                                    {game.description}
                                </p>
                                
                                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                                    <span>Min: ${game.min_bet}</span>
                                    <span>Max: ${game.max_bet}</span>
                                    <span>RTP: {game.rtp}%</span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        by {game.provider}
                                    </span>
                                    <Link href={`/games/${game.id}`}>
                                        <Button size="sm" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold">
                                            Play Now
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Games Found */}
                {filteredGames.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎰</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No games found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Try adjusting your search or filter criteria
                        </p>
                        <Button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedType('');
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </AppShell>
    );
}