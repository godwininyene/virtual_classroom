<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Student;
use Illuminate\Http\Request;

class PageController extends Controller
{
    //
    public function dashboard(Request $request){
        if($request->user()->role == 'teacher') {
            return Inertia::render('Dashboard', [

            ]);
        }else{
            return Inertia::render('student/Dashboard', [

            ]);
        }
    }
    public function students(){
        return Inertia::render('Students');
    }

   

    public function addStudent(){
        return Inertia::render('AddStudent');
    }

    public function editStudent(Request $request){
        $student = Student::where('id', $request->id)->first();
        return Inertia::render('EditStudent',[
            'student'=>$student,
        ]);
       
    }


    public function lessons(Request $request){
       if($request->user()->role == 'teacher'){
        return Inertia::render('Lessons');
       }else{
        return Inertia::render('student/Lessons');
       }
    }

    public function activities(Request $request){
       if($request->user()->role == 'teacher'){
        return Inertia::render('Activities');
       }else{
        return Inertia::render('student/Activities');
       }
    }

    public function progress(Request $request){
        if($request->user()->role == 'teacher'){
         return Inertia::render('Progress');
        }else{
         return Inertia::render('student/Progress');
        }
     }

    public function parents(){
        return Inertia::render('Parents');
    }
}
