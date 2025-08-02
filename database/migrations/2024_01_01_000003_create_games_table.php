<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Game name');
            $table->string('slug')->unique()->comment('URL-friendly game identifier');
            $table->text('description')->comment('Game description');
            $table->string('type')->comment('Game type (slot, poker, blackjack, etc.)');
            $table->string('provider')->comment('Game provider/vendor');
            $table->string('image_url')->nullable()->comment('Game thumbnail image');
            $table->decimal('min_bet', 10, 2)->default(0.01)->comment('Minimum bet amount');
            $table->decimal('max_bet', 10, 2)->default(100.00)->comment('Maximum bet amount');
            $table->decimal('rtp', 5, 2)->default(96.00)->comment('Return to Player percentage');
            $table->boolean('is_active')->default(true)->comment('Whether game is active');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('type');
            $table->index('provider');
            $table->index('is_active');
            $table->index(['is_active', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};