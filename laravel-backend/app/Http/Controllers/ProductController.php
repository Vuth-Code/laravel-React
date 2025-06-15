<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // import Storage class
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index(Request  $request)
    {

        $product = Product::query();
        if ($request->has("id")) {
            $product->where("id", "=", $request->input("id"));
        }
        if ($request->has("categories_id")) {
            $product->where("categories_id", "=", $request->input("categories_id"));
        }
        if ($request->has("brands_id")) {
            $product->where("brands_id", "=", $request->input("brands_id"));
        }
        if ($request->has("text_search")) {
            $product->where("product_name", "LIKE", "%" . $request->input("text_search") . "%");
        }
        if ($request->has("status")) {
            $product->where("status", "=", $request->input("status"));
        }
        $product->with(["categories", "brands"])->paginate();


        $category = DB::select('select * from categories');
        $brand = DB::select('select * from brands');


        return [
            "list" => $product->get(),
            "categories" => $category,
            "brands" => $brand
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {


        // form data //file image
        $request->validate([
            'categories_id' => 'required|exists:categories,id',
            'brands_id' => 'required|exists:brands,id',
            'product_name' => 'required|string',
            'description' => 'nullable|string',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'boolean'
        ]);
        $data = $request->all();
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
            // $data['image'] = product/340-82340-829435.png
            // storage/public/product/340-82340-829435.png
        }
        $product = Product::create($data);
        return response()->json([
            "data" => $product,
            "message" => "Save succesfully!"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);
        return response()->json([
            "data" => $product->load(['categories', 'brands'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);
        $request->validate([
            'categories_id' => 'required|exists:categories,id',
            'brands_id' => 'required|exists:brands,id',
            'product_name' => 'required|string',
            'description' => 'nullable|string',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'image' => 'nullable|image|max:2048',
            'status' => 'boolean'
        ]);
        $data = $request->all();
        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        if ($request->remove_image) { // ឆ្នៃបន្ថែម
            Storage::disk("public")->delete($product->image);
            $product->image = null;
        }

        $product->update($data);
        return response()->json([
            "data" => $product,
            "message" => "Update succesfully!"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $product = Product::findOrFail($id);
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $product->delete();

            return response()->json([
                "success" => true,
                "message" => "Product deleted successfully"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Failed to delete product",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get product image by product ID
     */
    public function getImage($id)
    {
        // Find the product
        $product = Product::find($id);
        
        // Check if product exists and has an image
        if (!$product || !$product->image) {
            return response()->json([
                'message' => 'Image not found'
            ], 404);
        }

        // Get the image path (remove 'products/' from the stored path if necessary)
        $imagePath = $product->image;
        
        // Check if file exists
        if (!Storage::disk('public')->exists($imagePath)) {
            return response()->json([
                'message' => 'Image not found'
            ], 404);
        }

        // Return the file
        $file = Storage::disk('public')->get($imagePath);
        $type = Storage::disk('public')->mimeType($imagePath);

        return response($file, 200)->header('Content-Type', $type);
    }
}
