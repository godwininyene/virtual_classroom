<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PageController extends Controller
{
    //
    public function students(){
        return Inertia::render('Students');
    }

   

    public function addStudent(){
        return Inertia::render('AddStudent');
    }

    public function lessons(){
        return Inertia::render('Lessons');
    }

    public function activities(){
        return Inertia::render('Activities');
    }

    public function parents(){
        return Inertia::render('Parents');
    }
}
