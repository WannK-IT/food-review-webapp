<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('fullname', 50)->nullable(false);
            $table->string('username', 50)->nullable(false);
            $table->string('password', 50)->nullable(false);
            $table->string('email')->unique();
            $table->text('avatar')->nullable();
            $table->date('birthday')->nullable();
            $table->string('location', 30)->nullable();
            $table->string('gender', 10)->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
