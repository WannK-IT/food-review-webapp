<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryMedia extends Model
{
    use HasFactory;

    protected $table = 'category_medias';

    protected $fillable = [
        'category_medianame',
        'status',
        'created_at',
        'updated_at',
    ];
}
