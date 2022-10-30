<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'posts';

    protected $fillable = [
        'title',
        'content',
        'vote',
        'rate',
        'id_cat_post',
        'id_user',
        'id_food_place',
        'created_at',
        'updated_at',
    ];
}
