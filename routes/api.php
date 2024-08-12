<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\StudentController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Studens Routes
Route::post('/students', [StudentController::class,'createNewStudent'])->name('api.students');
Route::get('/students', [StudentController::class,'getAllStudents'])->name('api.students');

//Lessons Routes
Route::post('/lessons', [LessonController::class, 'createNewLesson'])->name('api.lessons');
Route::get('/lessons', [LessonController::class,'getAllLessons'])->name('api.lessons');
Route::delete('/lessons', [LessonController::class,'deleteLesson'])->name('api.lessons');
Route::post('/lessons/update', [LessonController::class,'updateLesson'])->name('api.lessons.update');

