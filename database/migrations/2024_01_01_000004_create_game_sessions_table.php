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
        Schema::create('game_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('game_id')->constrained()->onDelete('cascade');
            $table->decimal('bet_amount', 10, 2)->comment('Amount bet in this session');
            $table->decimal('payout_amount', 10, 2)->default(0)->comment('Amount won in this session');
            $table->decimal('balance_before', 10, 2)->comment('User balance before game');
            $table->decimal('balance_after', 10, 2)->comment('User balance after game');
            $table->json('game_result')->nullable()->comment('Game result data');
            $table->timestamp('started_at')->comment('When the game session started');
            $table->timestamp('ended_at')->nullable()->comment('When the game session ended');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('game_id');
            $table->index('started_at');
            $table->index(['user_id', 'started_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_sessions');
    }
};