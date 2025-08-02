<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user with starting balance
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'balance' => 500.00,
        ]);

        // Create additional users
        User::factory(5)->create();

        // Seed games
        $this->call(GameSeeder::class);
    }
}
