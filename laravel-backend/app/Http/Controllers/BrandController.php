<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return [
            "count" => Brand::count(),
            "list" => Brand::all(),
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string",
            "code" => "required|string",
            "from_country" => "required|string",
            "description" => "nullable|string",
            "status" => "required|boolean",
        ]);
        $brands = new Brand();
        $brands->name = $request->input("name");
        $brands->code = $request->input("code");
        $brands->from_country = $request->input("from_country");
        $brands->description = $request->input("description");
        $brands->status = $request->input("status");
        $brands->save();

        return response()->json([
            "data" => $brands,
            "message" => "Insert success"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "data" => Brand::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $brands = Brand::find($id);
        if (!$brands) {
            return response()->json([
                "error" => [
                    "update" => "Data not found to update!"
                ]
            ]);
        }
        else{
            $brands->name = $request->input("name");
            $brands->code = $request->input("code");
            $brands->from_country = $request->input("from_country");
            $brands->description = $request->input("description");
            $brands->status = $request->input("status");
            $brands->update();
            return response()->json([
                "data" =>  $brands,
                "message" => "Update success"
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $brands = Brand::find($id);
        if (!$brands) {
            return response()->json([
                "error" => [
                    "delete" => "Data not found to delete!"
                ]
            ]);
        }
        $brands->delete();
        return response()->json([
            "message" => "Delete success"
        ]);
    }
}
