<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return [
            "count" => Category::count(),
            "list" => Category::all(),
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string",
            "code" => "required|string|unique:categories",
            "status" => "required|boolean",
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
        ]);
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('categories',  'public');
        }
        $category = Category::create([
            'name' => $request->name,
            'code' => $request->code,
            'status' => $request->status,
            'image' => $imagePath,
        ]);
        return response()->json(["message" => "category created successfully"], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "data" => Category::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            "name" => "required|string",
            "code" => "required|string|unique:categories,code," . $id,
            "status" => "required|boolean",
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
        ]);
        $category = Category::find($id);

        if ($request->hasFile('image')) {
            if($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            // new image update
            $category ->image = $request->file('image')->store('categories',  'public');
        }
        if($request->remove_image){
            if($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $category ->image = null;
        }
        $category->update([
            'name' => $request->name,
            'code' => $request->code,
            'status' => $request->status,
        ]);
        return response()->json(["data" => $category, "message" => "category updated successfully"], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);
        if ($category) {
            if($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $category->delete();
            return response()->json(["message" => "category deleted successfully"], 200);
        }
        else {
            return response()->json([
                "error" => [
                    "delete" => "Data not found to delete!"
                ]
            ]);
        }
    }
}
