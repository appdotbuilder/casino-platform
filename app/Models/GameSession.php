<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\GameSession
 *
 * @property int $id
 * @property int $user_id
 * @property int $game_id
 * @property string $bet_amount
 * @property string $payout_amount
 * @property string $balance_before
 * @property string $balance_after
 * @property array|null $game_result
 * @property \Illuminate\Support\Carbon $started_at
 * @property \Illuminate\Support\Carbon|null $ended_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Game $game
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession query()
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereGameId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereBetAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession wherePayoutAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereBalanceBefore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereBalanceAfter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereGameResult($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereEndedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereUpdatedAt($value)
 * @method static \Database\Factories\GameSessionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GameSession extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'game_id',
        'bet_amount',
        'payout_amount',
        'balance_before',
        'balance_after',
        'game_result',
        'started_at',
        'ended_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'bet_amount' => 'decimal:2',
        'payout_amount' => 'decimal:2',
        'balance_before' => 'decimal:2',
        'balance_after' => 'decimal:2',
        'game_result' => 'array',
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the game session.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the game that was played in this session.
     */
    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }
}