<?php

namespace App\Http\Controllers\Api;
use App\Models\Lesson;
use App\Models\Student;
use App\Models\Activity;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseController;

class StatisticController extends Controller
{
    //
    use responseController;
    public function statistics(Request $request){
        $recentStudents = Student::latest('created_at')->take(10)->get();
        $students = Student::count();
        $lessons = Lesson::count();
        $activities = Activity::count();
      
        return $this->sendResponse('Recent fetched successfully', [
            'recentStudents' => $recentStudents,
            'total_students' =>$students,
            'total_lessons' =>$lessons,
            'total_activities' => $activities,
        ]);
    }
}
