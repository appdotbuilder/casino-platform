<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Game
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string $description
 * @property string $type
 * @property string $provider
 * @property string|null $image_url
 * @property string $min_bet
 * @property string $max_bet
 * @property string $rtp
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GameSession> $sessions
 * @property-read int|null $sessions_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Game newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Game newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Game query()
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereProvider($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereMinBet($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereMaxBet($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereRtp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Game active()
 * @method static \Illuminate\Database\Eloquent\Builder|Game byType($type)
 * @method static \Database\Factories\GameFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Game extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'type',
        'provider',
        'image_url',
        'min_bet',
        'max_bet',
        'rtp',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'min_bet' => 'decimal:2',
        'max_bet' => 'decimal:2',
        'rtp' => 'decimal:2',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the game sessions for this game.
     */
    public function sessions(): HasMany
    {
        return $this->hasMany(GameSession::class);
    }

    /**
     * Scope a query to only include active games.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to filter games by type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }
}