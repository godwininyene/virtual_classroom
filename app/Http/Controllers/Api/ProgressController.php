<?php

namespace App\Http\Controllers\Api;

use App\Models\Progress;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseController;
use Illuminate\Http\JsonResponse;

class ProgressController extends Controller
{
   
    // use ResponsesController;
    public function submitProgress(Request $request){
        $progress = Progress::create($request->all());

        $response = [
            'success' => true,
            'message' => 'Progress was submitted successfully',
            'progress'    => $progress,
        ];

        return response()->json($response, 200);
    }


    public function fetchProgress(Request $request){
        $progress;

        if(isset($request->student_id)){
            $progress = Progress::with(['lesson', 'activity'])->where('student_id', $request->student_id)->get();
        }else{
            $progress = Progress::with(['lesson', 'activity', 'student'])->get();
        }

        $response = [
            'success' => true,
            'message' => 'Progress was fetch successfully',
            'progress'    => $progress,
        ];

        return response()->json($response, 200);
    }
}
