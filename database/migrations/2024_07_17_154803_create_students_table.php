<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            /* Student Information */
            $table->id();
            $table->string("first_name");
            $table->string("middle_name")->nullable();
            $table->string("surname");
            $table->string("reg_number");
            $table->string("dob");
            $table->string("email");
            $table->string("avatar");
            $table->string("gender");
            $table->string("address");
            /* Parent/Guardian Information */
            $table->string("parent_fullname");
            $table->string("parent_phone");
            $table->string("parent_email");
            $table->enum('parent_relationship', ['Parent', 'Guardian', 'Sibling'])->default('Parent');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
