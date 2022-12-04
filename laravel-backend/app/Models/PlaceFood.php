<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaceFood extends Model
{
    use HasFactory;

    protected $table = 'place_foods';

    protected $fillable = [
        'place_name',
        'address',
        'city',
        'avatar',
        'time_opening',
        'phone',
        'low_price',
        'high_price',
        'created_at',
        'updated_at',
        'id_user'
    ];
}
