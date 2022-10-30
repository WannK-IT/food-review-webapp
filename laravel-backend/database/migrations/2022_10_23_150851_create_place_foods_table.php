<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlaceFoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('place_foods', function (Blueprint $table) {
            $table->id();
            $table->string('place_name', 100)->nullable(false);
            $table->text('address')->nullable(false);
            $table->text('avatar')->nullable();
            $table->string('time_opening', 30)->nullable();
            $table->integer('phone')->nullable();
            $table->float('low_price')->nullable();
            $table->float('high_price')->nullable();
            $table->timestamps();
            $table->integer('id_user')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('place_foods');
    }
}
