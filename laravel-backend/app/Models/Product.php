<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        "categories_id",
        "brands_id",
        "product_name",
        "description",
        "quantity",
        "price",
        "status",
        "image",
    ];

    public function categories()
    {
        return $this->belongsTo(Category::class, 'categories_id');
    }

    public function brands()
    {
        return $this->belongsTo(Brand::class, 'brands_id');
    }
}
