<?php
namespace App\Models;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Relations\belongsToMany;



class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'gender',
        'interested',
        'location',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }
    
    public function scopefavorites(): belongsToMany
    {
        return $this->belongsToMany(user::class, 'favorites', 'user_id', 'favorite_id');
    }

    public function favoriteBy(): belongsToMany
    {
        return $this->belongsToMany(user::class, 'favorites', 'favorite_id', 'user_id');
    }

    public function chatSend(): belongsToMany
    {
        return $this->belongsToMany(user::class, 'chats', 'sender', 'reciever');
    }

    public function chatReciever(): belongsToMany
    {
        return $this->belongsToMany(user::class, 'chats', 'reciever', 'sender');
    }

    public function scopeblocks(): belongsToMany
    {
        return $this->belongsToMany(user::class, 'blocks', 'user_id', 'block_id');
    }
    
}