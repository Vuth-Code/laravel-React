<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Province;

class ProvinceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return [
            "count" => Province::count(),
            "list" => Province::all(),
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // add validatoin input
        $request->validate([
            "name" => "required|string",
            "code" => "required|string",
            "distand_from_city" => "required|decimal:0",
            "status" => "required|boolean",
        ]);
        $province = new Province();
        $province->name = $request->input("name");
        $province->code = $request->input("code");
        $province->distand_from_city = $request->input("distand_from_city");
        $province->status = $request->input("status");
        $province->save();
        return response()->json(["message" => "province created successfully"], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "data" => Province::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // add validate input
        $request->validate([
            "name" => "required|string",
            "code" => "required|string",
            "distand_from_city" => "required|decimal:0",
            "status" => "required|boolean",
        ]);
        $province = Province::find($id);
        if (!$province) {
            return response()->json([
                "error" => [
                    "update" => "Data not found to update!"
                ]
            ]);
        }
        $province->name = $request->input("name");
        $province->code = $request->input("code");
        $province->distand_from_city = $request->input("distand_from_city");
        $province->status = $request->input("status");
        $province->save();
        return response()->json([
            "message" => "Update success"
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $province = Province::find($id);
        if (!$province) {
            return response()->json([
                "error" => [
                    "delete" => "Data not found to delete!"
                ]
            ]);
        }

        $province->delete();
        return response()->json([
            "message" => "Delete success"
        ]);
    }
}
