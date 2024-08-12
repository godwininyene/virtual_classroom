<?php

namespace App\Http\Controllers\Api;
use App\Models\Student;
use App\Utils\ImageUploader;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
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
        $newStudent->password = Hash::make($request->password);
        $newStudent->gender = $request->gender;
        $newStudent->address = $request->address;
        $newStudent->parent_fullname = $request->parent_fullname;
        $newStudent->parent_phone = $request->parent_phone;
        $newStudent->parent_email = $request->parent_email;
        $newStudent->parent_relationship = $request->parent_relationship;
        
        if ($request->hasFile('avatar')) {
            $imageUpload = ImageUploader::UploadImage($request->file('avatar'), 'students/images');
            if ($imageUpload['status']) {
                $newStudent->avatar = $imageUpload['path'] . $imageUpload['name'];
            }
        }

        if($newStudent->save()){
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
}
