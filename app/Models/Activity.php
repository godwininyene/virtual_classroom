<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'type', 'content', 'lesson_id'];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function progress()
    {
        return $this->hasMany(Progress::class);
    }
}
