<?php

namespace App\Http\Controllers\Api;

use App\Models\Lesson;
use App\Utils\ImageUploader;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ResponseController;
use Illuminate\Support\Facades\Validator;

class LessonController extends Controller
{
    //
    use ResponseController;
    public function createNewLesson(Request $request){
        $newLesson = new Lesson();
        $newLesson->title = $request->title;
        $newLesson->description = $request->description;
        
        if ($request->hasFile('content')) {
            $imageUpload = ImageUploader::uploadFile($request->file('content'), 'lessons');
            if ($imageUpload['status']) {
                $newLesson->content = $imageUpload['path'] . $imageUpload['name'];
            }
        }

        if($newLesson->save()){
            return $this->sendResponse('Lesson added successfully.', [
                'lesson' => $newLesson
            ]);
        }else{
            return $this->sendError('Could not save lesson.', [
                'lesson' => $newLesson
            ]);
        }

    }

    public function getAllLessons(Request $request){
        $lessons = Lesson::orderBy('id', 'DESC')->get();
        return $this->sendResponse('Lessons fetched successfully', [
            'lessons' => $lessons
        ]);
    }

    function deleteLesson(Request $request) 
    {
        $validate = Validator::make($request->all(), [
            'lesson_id' => ['required']
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields", $validate->errors(), 422);
        }

        $lesson = Lesson::where('id', $request->lesson_id)->first();
       
       
        $lesson->activities()->delete();
        $lesson->progress()->delete();
       
        $delete = $lesson->delete();

        if(!$delete){
            return $this->sendError("Could not delete lesson due to an uneexpected error.", [], 500);
        }

        $lessons = Lesson::orderBy('id', 'DESC')->get();
        $this->deleteExistingImage($lesson->content);
        return $this->sendResponse('Lesson was deleted successfully', [
            'lessons' => $lessons,
        ]);
    }

    public function updateLesson(Request $request){
       
        $lesson = Lesson::where('id', $request->lesson_id)->first();
     
        $lesson->title = $request->title;
        $lesson->description = $request->description;
        if ($request->hasFile('content')) {
            $this->deleteExistingImage($lesson->content);
            $imageUpload = ImageUploader::uploadFile($request->file('content'), 'lessons/videos');
            if ($imageUpload['status']) {
                $lesson->content = $imageUpload['path'] . $imageUpload['name'];
            }
        }
       
        $updated = $lesson->update();

        if(!$updated){
            return $this->sendError("Could not update lesson due to an uneexpected error.", [], 500);
        }

        $lessons = Lesson::orderBy('id', 'DESC')->get();
       
        return $this->sendResponse('Lesson was updated successfully', [
            'lessons' => $lessons,
        ]);

    }
    public function deleteExistingImage($url){
        $img_path = null;  
        if($url){
            $img_path = explode('storage/', $url)[1];
            $img_path = 'storage/'.$img_path;
            if($img_path){
                unlink($img_path);
            }
        } 
    }
}
