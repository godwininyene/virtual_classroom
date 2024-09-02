<?php

namespace App\Http\Controllers\Api;
use App\Models\User;
use App\Models\Student;
use App\Utils\ImageUploader;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\ResponseController;

class StudentController extends Controller
{
    //
    use ResponseController;

    public function createNewStudent(Request $request){
        $newStudent = new Student();
        $newStudent->first_name = $request->first_name;
        $newStudent->middle_name = $request->middle_name;
        $newStudent->surname = $request->surname;
        $newStudent->reg_number = $request->reg_number;
        $newStudent->dob = $request->dob;
        $newStudent->email = $request->email;
        $newStudent->gender = $request->gender;
        $newStudent->address = $request->address;
        $newStudent->parent_fullname = $request->parent_fullname;
        $newStudent->parent_phone = $request->parent_phone;
        $newStudent->parent_email = $request->parent_email;
        $newStudent->parent_relationship = $request->parent_relationship;
        $newStudent->avatar = null;
        
        $newUser = new User();
        
        if ($request->hasFile('avatar')) {
            $imageUpload = ImageUploader::UploadImage($request->file('avatar'), 'students/images');
            if ($imageUpload['status']) {
                $newStudent->avatar = $imageUpload['path'] . $imageUpload['name'];
            }
        }

        if($newStudent->save()){
            $newUser->student_id = $newStudent->id;
            $newUser->first_name =  $request->first_name;
            $newUser->last_name = $request->surname;
            $newUser->email  = $request->email;
            $newUser->role = 'student';
            $newUser->password =  Hash::make($request->password);
            $newUser->user_avatar =  $newStudent->avatar;
            $newUser->save();
            return $this->sendResponse('Student added successfully.', [
                'student' => $newStudent
            ]);
        }else{
            return $this->sendError('Could not save student.', [
                'student' => $newStudent
            ]);
        }

    }

    public function getAllStudents(){
        $students = Student::orderBy('id', 'DESC')->get();
        return $this->sendResponse('Students fetched successfully', [
            'students' => $students
        ]);
    }

    function deleteStudent(Request $request) 
    {
        $validate = Validator::make($request->all(), [
            'student_id' => ['required']
        ]);

        if ($validate->fails()) {
            return $this->sendError("Missing required fields", $validate->errors(), 422);
        }

        $student = Student::where('id', $request->student_id)->first();
        $student->progress()->delete();
        $delete = $student->delete();
        if(!$delete){
            return $this->sendError("Could not delete student due to an uneexpected error.", [], 500);
        }

        $students = Student::orderBy('id', 'DESC')->get();
        $this->deleteExistingImage($student->avatar);
        return $this->sendResponse('Students was deleted successfully', [
            'students' => $students,
        ]);
    }

    public function EditStudent(Request $request){
        $student = Student::where('id', $request->student_id)->first();
        if(isset($request->first_name)){
            $student->first_name = $request->first_name;
        }
       if(isset($request->middle_name)){
            $student->middle_name = $request->middle_name;
       }
       if(isset($request->surname)){
            $student->surname = $request->surname;
       }
       if(isset($request->reg_number)){
            $student->reg_number = $request->reg_number;
       }
       if(isset($request->dob)){
            $student->dob = $request->dob;
       }
       if(isset($request->email)){
            $student->email = $request->email;
       }
      if(isset($request->password)){
            $student->password = Hash::make($request->password);
      }
       if(isset($request->gender)){
            $student->gender = $request->gender;
       }
       if(isset($request->address)){
            $student->address = $request->address;
       }
       
        if(isset($request->parent_fullname)){
            $student->parent_fullname = $request->parent_fullname;
        }
      
        if(isset($request->parent_phone)){
            $student->parent_phone = $request->parent_phone;
        }
       
        if(isset($request->parent_email)){
            $student->parent_email = $request->parent_email;
        }
      
        if(isset($request->parent_relationship)){
            $student->parent_relationship = $request->parent_relationship;
        }
        
        if ($request->hasFile('avatar')) {
            $this->deleteExistingImage($student->avatar);
            $imageUpload = ImageUploader::UploadImage($request->file('avatar'), 'students/images');
            if ($imageUpload['status']) {
                $student->avatar = $imageUpload['path'] . $imageUpload['name'];
            }
        }

        if($student->update()){
            return $this->sendResponse('Student record updated successfully.', [
                'student' => $student
            ]);
        }else{
            return $this->sendError('Could not update student record.', [
                'student' => $student
            ]);
        }

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
