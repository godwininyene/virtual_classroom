<?php

namespace App\Http\Controllers\Api;

use App\Models\Activity;
use App\Utils\ImageUploader;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\ResponseController;

class ActivityController extends Controller
{
    //
    use ResponseController;

    public function createActivity(Request $request){
      $newActivity = new Activity();
      $newActivity->title = $request->title;
      $newActivity->description = $request->description;
      $newActivity->content = $request->content;
      $newActivity->lesson_id = $request->lesson_id;


        if ($request->hasFile('type')) {
            $imageUpload = ImageUploader::uploadFile($request->file('type'), 'activities');
            if ($imageUpload['status']) {
                $newActivity->type = $imageUpload['path'] . $imageUpload['name'];
            }
        }
        if($newActivity->save()){
            return $this->sendResponse('Activity was created successfully.', [
                'activity' => $newActivity
            ]);
        }else{
            return $this->sendError('Could not save activity.', [
                'activity' => $activity
            ]);
        }

    }

    public function getAllActivities(){
        $activities = Activity::orderBy('id', 'DESC')->get();
        return $this->sendResponse('Students fetched successfully', [
            'activities' => $activities
        ]);
    }


    function deleteActivity(Request $request) 
    {
        $validate = Validator::make($request->all(), [
            'activity_id' => ['required']
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields", $validate->errors(), 422);
        }

        $activity = Activity::where('id', $request->activity_id)->first();
        // $lesson->activities()->delete();
        // $lesson->progress()->delete();
        $delete = $activity->delete();
        if(!$delete){
            return $this->sendError("Could not delete activity due to an uneexpected error.", [], 500);
        }
        $activities = Activity::orderBy('id', 'DESC')->get();
        return $this->sendResponse('Activity was deleted successfully', [
            'activities' => $activities,
        ]);
    }

}
