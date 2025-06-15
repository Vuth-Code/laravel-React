<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = [
        'name',
        'code',
        'tel_contact',
        'email',
        'address',
        'web_site_url',
        'status',
    ];
}
