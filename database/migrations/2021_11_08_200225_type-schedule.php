<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TypeSchedule extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('typeSchedule', function (Blueprint $table) {
            $table->engine="InnoDB";
            $table->bigIncrements('id');
            
            $table->String('nameType');
            $table->Time('hourRangeType');
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
        //
    }
}
