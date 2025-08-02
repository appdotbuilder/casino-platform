<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $games = [
            [
                'name' => 'Lucky Sevens',
                'slug' => 'lucky-sevens',
                'description' => 'Classic slot machine with lucky sevens and fruits. Simple gameplay with big wins!',
                'type' => 'slot',
                'provider' => 'NetEnt',
                'image_url' => 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Lucky+Sevens',
                'min_bet' => 0.10,
                'max_bet' => 100.00,
                'rtp' => 96.50,
                'is_active' => true,
            ],
            [
                'name' => 'Mega Fortune',
                'slug' => 'mega-fortune',
                'description' => 'Progressive jackpot slot with luxury theme. Win the ultimate jackpot!',
                'type' => 'slot',
                'provider' => 'NetEnt',
                'image_url' => 'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Mega+Fortune',
                'min_bet' => 0.25,
                'max_bet' => 200.00,
                'rtp' => 95.80,
                'is_active' => true,
            ],
            [
                'name' => 'Texas Hold\'em',
                'slug' => 'texas-holdem',
                'description' => 'Classic poker game. Play against the house and other players.',
                'type' => 'poker',
                'provider' => 'Evolution',
                'image_url' => 'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Texas+Hold%27em',
                'min_bet' => 1.00,
                'max_bet' => 500.00,
                'rtp' => 97.20,
                'is_active' => true,
            ],
            [
                'name' => 'Classic Blackjack',
                'slug' => 'classic-blackjack',
                'description' => 'Beat the dealer in this classic card game. Get as close to 21 as possible!',
                'type' => 'blackjack',
                'provider' => 'Evolution',
                'image_url' => 'https://via.placeholder.com/300x200/96CEB4/FFFFFF?text=Classic+Blackjack',
                'min_bet' => 0.50,
                'max_bet' => 300.00,
                'rtp' => 99.50,
                'is_active' => true,
            ],
            [
                'name' => 'European Roulette',
                'slug' => 'european-roulette',
                'description' => 'Spin the wheel of fortune! Single zero European roulette with best odds.',
                'type' => 'roulette',
                'provider' => 'Evolution',
                'image_url' => 'https://via.placeholder.com/300x200/FFEAA7/333333?text=European+Roulette',
                'min_bet' => 0.10,
                'max_bet' => 1000.00,
                'rtp' => 97.30,
                'is_active' => true,
            ],
            [
                'name' => 'Baccarat Pro',
                'slug' => 'baccarat-pro',
                'description' => 'Elegant card game for high rollers. Bet on Player, Banker, or Tie.',
                'type' => 'baccarat',
                'provider' => 'Playtech',
                'image_url' => 'https://via.placeholder.com/300x200/DDA0DD/FFFFFF?text=Baccarat+Pro',
                'min_bet' => 1.00,
                'max_bet' => 2000.00,
                'rtp' => 98.90,
                'is_active' => true,
            ],
            [
                'name' => 'Diamond Dreams',
                'slug' => 'diamond-dreams',
                'description' => 'Sparkling slot with diamond symbols and bonus features.',
                'type' => 'slot',
                'provider' => 'Microgaming',
                'image_url' => 'https://via.placeholder.com/300x200/FFB6C1/333333?text=Diamond+Dreams',
                'min_bet' => 0.20,
                'max_bet' => 150.00,
                'rtp' => 96.80,
                'is_active' => true,
            ],
            [
                'name' => 'Fruit Blast',
                'slug' => 'fruit-blast',
                'description' => 'Colorful fruit-themed slot with exciting bonus rounds.',
                'type' => 'slot',
                'provider' => 'Pragmatic Play',
                'image_url' => 'https://via.placeholder.com/300x200/98FB98/333333?text=Fruit+Blast',
                'min_bet' => 0.05,
                'max_bet' => 75.00,
                'rtp' => 95.90,
                'is_active' => true,
            ],
        ];

        foreach ($games as $game) {
            Game::create($game);
        }
    }
}