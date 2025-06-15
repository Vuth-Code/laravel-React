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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('categories_id'); //FK
            $table->unsignedBigInteger('brands_id'); //FK
            $table->string('product_name');
            $table->text('description')->nullable();
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->boolean('status')->default(1);
            $table->string('image')->nullable();
            $table->timestamps();

            $table->foreign('categories_id')->references('id')->on('categories')->onDelete('cascade'); //delete product if category is deleted
            $table->foreign('brands_id')->references('id')->on('brands')->onDelete('cascade'); //delete product if brand is deleted
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
