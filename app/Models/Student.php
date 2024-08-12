<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $fillable = [
        'first_name', 
        'middle_name',
        'surname',
        'reg_number',
        'dob',
        'email',
        'password',
        'avatar',
        'fullname',
        'phone',
        'parent_email',
        'relationship',
    ];

    public function progress()
    {
        return $this->hasMany(Progress::class);
    }
}
