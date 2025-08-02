<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GameTest extends TestCase
{
    use RefreshDatabase;

    public function test_games_index_page_can_be_rendered(): void
    {
        $user = User::factory()->create(['balance' => 100.00]);
        Game::factory(5)->create();

        $response = $this->actingAs($user)->get('/games');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('games/index')
            ->has('games', 5)
            ->has('gameTypes')
            ->has('user')
        );
    }

    public function test_game_show_page_can_be_rendered(): void
    {
        $user = User::factory()->create(['balance' => 100.00]);
        $game = Game::factory()->create();

        $response = $this->actingAs($user)->get("/games/{$game->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('games/show')
            ->has('game')
            ->has('user')
        );
    }

    public function test_user_can_play_a_game(): void
    {
        $user = User::factory()->create(['balance' => 100.00]);
        $game = Game::factory()->create([
            'min_bet' => 1.00,
            'max_bet' => 50.00,
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->post('/games/play', [
            'game_id' => $game->id,
            'bet_amount' => 5.00,
        ]);

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('games/show')
            ->has('game')
            ->has('user')
            ->has('gameResult')
        );

        // Check that user's balance changed
        $this->assertNotEquals(100.00, $user->fresh()->balance);
        
        // Check that game session was created
        $this->assertDatabaseHas('game_sessions', [
            'user_id' => $user->id,
            'game_id' => $game->id,
            'bet_amount' => 5.00,
        ]);
    }

    public function test_user_cannot_bet_more_than_balance(): void
    {
        $user = User::factory()->create(['balance' => 10.00]);
        $game = Game::factory()->create([
            'min_bet' => 1.00,
            'max_bet' => 100.00,
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->post('/games/play', [
            'game_id' => $game->id,
            'bet_amount' => 20.00,
        ]);

        $response->assertSessionHas('error', 'Insufficient balance.');
    }

    public function test_user_cannot_bet_below_minimum(): void
    {
        $user = User::factory()->create(['balance' => 100.00]);
        $game = Game::factory()->create([
            'min_bet' => 5.00,
            'max_bet' => 100.00,
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->post('/games/play', [
            'game_id' => $game->id,
            'bet_amount' => 1.00,
        ]);

        $response->assertSessionHas('error', 'Minimum bet is $5.00.');
    }

    public function test_user_cannot_bet_above_maximum(): void
    {
        $user = User::factory()->create(['balance' => 1000.00]);
        $game = Game::factory()->create([
            'min_bet' => 1.00,
            'max_bet' => 50.00,
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->post('/games/play', [
            'game_id' => $game->id,
            'bet_amount' => 100.00,
        ]);

        $response->assertSessionHas('error', 'Maximum bet is $50.00.');
    }

    public function test_user_cannot_play_inactive_game(): void
    {
        $user = User::factory()->create(['balance' => 100.00]);
        $game = Game::factory()->create(['is_active' => false]);

        $response = $this->actingAs($user)->post('/games/play', [
            'game_id' => $game->id,
            'bet_amount' => 5.00,
        ]);

        $response->assertSessionHas('error', 'This game is currently unavailable.');
    }
}