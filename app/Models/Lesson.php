<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'content'];

   
    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function progress()
    {
        return $this->hasMany(Progress::class);
    }
}
