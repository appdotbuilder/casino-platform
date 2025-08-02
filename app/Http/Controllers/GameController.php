<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\GameSession;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GameController extends Controller
{
    /**
     * Display a listing of the games.
     */
    public function index()
    {
        $games = Game::active()->orderBy('name')->get();
        $gameTypes = Game::active()->distinct()->pluck('type')->sort()->values();
        
        return Inertia::render('games/index', [
            'games' => $games,
            'gameTypes' => $gameTypes,
            'user' => Auth::user(),
        ]);
    }

    /**
     * Display the specified game.
     */
    public function show(Game $game)
    {
        if (!$game->is_active) {
            return redirect()->route('games.index')
                ->with('error', 'This game is currently unavailable.');
        }

        return Inertia::render('games/show', [
            'game' => $game,
            'user' => Auth::user(),
        ]);
    }

    /**
     * Play a game (place a bet).
     */
    public function store(Request $request)
    {
        $request->validate([
            'game_id' => 'required|exists:games,id',
            'bet_amount' => 'required|numeric|min:0.01|max:1000',
        ]);

        $user = Auth::user();
        $game = Game::findOrFail($request->game_id);

        if (!$game->is_active) {
            return back()->with('error', 'This game is currently unavailable.');
        }

        if ($user->balance < $request->bet_amount) {
            return back()->with('error', 'Insufficient balance.');
        }

        if ($request->bet_amount < $game->min_bet) {
            return back()->with('error', "Minimum bet is $" . $game->min_bet . ".");
        }

        if ($request->bet_amount > $game->max_bet) {
            return back()->with('error', "Maximum bet is $" . $game->max_bet . ".");
        }

        return DB::transaction(function () use ($request, $user, $game) {
            // Simulate game result
            $isWin = random_int(1, 100) <= 45; // 45% win chance
            $multiplier = $isWin ? random_int(150, 300) / 100 : 0; // 1.5x to 3x multiplier
            $payout = $isWin ? $request->bet_amount * $multiplier : 0;
            $netResult = $payout - $request->bet_amount;

            // Create game session
            $session = GameSession::create([
                'user_id' => $user->id,
                'game_id' => $game->id,
                'bet_amount' => $request->bet_amount,
                'payout_amount' => $payout,
                'balance_before' => $user->balance,
                'balance_after' => (float)$user->balance + $netResult,
                'game_result' => [
                    'is_win' => $isWin,
                    'multiplier' => $multiplier,
                    'net_result' => $netResult,
                    'symbols' => $this->generateSlotSymbols($isWin),
                ],
                'started_at' => now(),
                'ended_at' => now(),
            ]);

            // Update user balance and last game time
            $user->update([
                'balance' => (float)$user->balance + $netResult,
                'last_game_at' => now(),
            ]);

            return Inertia::render('games/show', [
                'game' => $game,
                'user' => $user->fresh(),
                'gameResult' => $session->game_result,
                'message' => $isWin 
                    ? "Congratulations! You won $" . number_format($payout, 2) . "!" 
                    : "Better luck next time!",
            ]);
        });
    }

    /**
     * Generate random slot symbols for game result.
     *
     * @param  bool  $isWin
     * @return array<string>
     */
    protected function generateSlotSymbols(bool $isWin): array
    {
        $symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '🔔', '7️⃣'];
        
        if ($isWin) {
            // Generate winning combination (3 matching symbols)
            $winSymbol = $symbols[random_int(0, count($symbols) - 1)];
            return [$winSymbol, $winSymbol, $winSymbol];
        } else {
            // Generate losing combination (no 3 matching)
            do {
                $result = [
                    $symbols[random_int(0, count($symbols) - 1)],
                    $symbols[random_int(0, count($symbols) - 1)],
                    $symbols[random_int(0, count($symbols) - 1)],
                ];
            } while ($result[0] === $result[1] && $result[1] === $result[2]);
            
            return $result;
        }
    }
}