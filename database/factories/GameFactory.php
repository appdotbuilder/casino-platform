<?php

namespace Database\Factories;

use App\Models\Game;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Game>
 */
class GameFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Game::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gameTypes = ['slot', 'poker', 'blackjack', 'roulette', 'baccarat'];
        $providers = ['NetEnt', 'Microgaming', 'Playtech', 'Evolution', 'Pragmatic Play'];
        
        $name = fake()->words(2, true);
        
        return [
            'name' => ucwords($name),
            'slug' => Str::slug($name),
            'description' => fake()->sentence(10),
            'type' => fake()->randomElement($gameTypes),
            'provider' => fake()->randomElement($providers),
            'image_url' => 'https://via.placeholder.com/300x200?text=' . urlencode(ucwords($name)),
            'min_bet' => fake()->randomFloat(2, 0.01, 1.00),
            'max_bet' => fake()->randomFloat(2, 50.00, 500.00),
            'rtp' => fake()->randomFloat(2, 92.00, 98.00),
            'is_active' => fake()->boolean(90), // 90% chance of being active
        ];
    }

    /**
     * Indicate that the game is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the game is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}