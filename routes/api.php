<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\ProgressController;
use App\Http\Controllers\Api\StatisticController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Studens Routes
Route::post('/students', [StudentController::class,'createNewStudent'])->name('api.students');
Route::get('/students', [StudentController::class,'getAllStudents'])->name('api.students');
Route::delete('/students', [StudentController::class,'deleteStudent'])->name('api.students');
Route::post('/students/update', [StudentController::class,'editStudent'])->name('api.students.update');

//Lessons Routes
Route::post('/lessons', [LessonController::class, 'createNewLesson'])->name('api.lessons');
Route::get('/lessons', [LessonController::class,'getAllLessons'])->name('api.lessons');
Route::delete('/lessons', [LessonController::class,'deleteLesson'])->name('api.lessons');
Route::post('/lessons/update', [LessonController::class,'updateLesson'])->name('api.lessons.update');

//Activity Routes
Route::post('/activities', [ActivityController::class, 'createActivity'])->name('api.activities');
Route::get('/activities', [ActivityController::class, 'getAllActivities'])->name('api.activities');
Route::delete('/activities', [ActivityController::class, 'deleteActivity'])->name('api.activities');

//Progress Routes
Route::post('/progress', [ProgressController::class, 'submitProgress'])->name('api.progress');
Route::get('/progress', [ProgressController::class, 'fetchProgress'])->name('api.progress');

//Statistics Route
Route::get('/statistics', [StatisticController::class, 'statistics'])->name('api.statistics');

