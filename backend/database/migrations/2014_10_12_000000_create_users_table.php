<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
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
            $table-> string('name',45);
            $table-> string('email',45)->unique();
            $table-> string('password',255);
            $table-> string('gender',45);
            $table-> string('interested',45);
            $table-> string('location',45);
            $table-> date ('dob')->nullable();
            $table-> string('bio',255)->nullable();
            $table-> string('profile_pic',255)->nullable();
            $table-> integer ('invisible')->default(0);
            $table->timestamps();
        });

        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users');
            $table->foreignId('favorite_id')->references('id')->on('users');
        });

        Schema::create('blocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users');
            $table->foreignId('block_id')->references('id')->on('users');
        });

        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender')->references('id')->on('users');
            $table->foreignId('reciever')->references('id')->on('users');
            $table-> string('message',255);
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
        Schema::dropIfExists('favorites');
        Schema::dropIfExists('blocks');
        Schema::dropIfExists('chats');
        
    }
};
