<?php

namespace Database\Factories;

use App\Models\Game;
use App\Models\GameSession;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GameSession>
 */
class GameSessionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = GameSession::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $betAmount = fake()->randomFloat(2, 1.00, 50.00);
        $isWin = fake()->boolean(40); // 40% win chance
        $payout = $isWin ? $betAmount * fake()->randomFloat(2, 1.5, 3.0) : 0;
        $balanceBefore = fake()->randomFloat(2, 50.00, 500.00);
        $netResult = $payout - $betAmount;
        
        $startedAt = fake()->dateTimeBetween('-30 days', 'now');
        $endedAt = fake()->dateTimeBetween($startedAt, 'now');

        return [
            'user_id' => User::factory(),
            'game_id' => Game::factory(),
            'bet_amount' => $betAmount,
            'payout_amount' => $payout,
            'balance_before' => $balanceBefore,
            'balance_after' => $balanceBefore + $netResult,
            'game_result' => [
                'is_win' => $isWin,
                'multiplier' => $isWin ? $payout / $betAmount : 0,
                'net_result' => $netResult,
                'symbols' => ['🍒', '🍋', '🍊'],
            ],
            'started_at' => $startedAt,
            'ended_at' => $endedAt,
        ];
    }

    /**
     * Indicate that the session was a winning session.
     */
    public function winning(): static
    {
        return $this->state(function (array $attributes) {
            $betAmount = $attributes['bet_amount'];
            $multiplier = fake()->randomFloat(2, 1.5, 5.0);
            $payout = $betAmount * $multiplier;
            $netResult = $payout - $betAmount;
            
            return [
                'payout_amount' => $payout,
                'balance_after' => $attributes['balance_before'] + $netResult,
                'game_result' => [
                    'is_win' => true,
                    'multiplier' => $multiplier,
                    'net_result' => $netResult,
                    'symbols' => ['🍒', '🍒', '🍒'],
                ],
            ];
        });
    }

    /**
     * Indicate that the session was a losing session.
     */
    public function losing(): static
    {
        return $this->state(function (array $attributes) {
            $betAmount = $attributes['bet_amount'];
            
            return [
                'payout_amount' => 0,
                'balance_after' => $attributes['balance_before'] - $betAmount,
                'game_result' => [
                    'is_win' => false,
                    'multiplier' => 0,
                    'net_result' => -$betAmount,
                    'symbols' => ['🍒', '🍋', '🍊'],
                ],
            ];
        });
    }
}