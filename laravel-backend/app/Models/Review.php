<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $table = 'reviews';

    protected $fillable = [
        'hygiene',
        'price',
        'taste',
        'space',
        'service',
        'id_post',
        'created_at',
        'updated_at',
    ];
}
