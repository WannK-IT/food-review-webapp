<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryPost extends Model
{
    use HasFactory;

    protected $table = 'category_posts';

    protected $fillable = [
        'category_name',
        'status',
        'created_at',
        'updated_at',
    ];
}
