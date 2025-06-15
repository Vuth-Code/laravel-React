<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Supplier;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return [
            "count" => Supplier::count(),
            "list" => Supplier::all(),
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string",
            "code" => "required|string|unique:suppliers",
            "tel_contact" => "required|string|unique:suppliers",
            "email" => "required|string|unique:suppliers",
            "address" => "required|string",
            "web_site_url" => "required|nullable|url",
            "status" => "required|boolean",
        ]);
        $supplier = Supplier::create($request->all());
        return response()->json(["message" => "supplier created successfully"], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "data" => Supplier::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $supplier = Supplier::find($id);
        if (!$supplier) {
            $request->validate([
                "name" => "required|string",
                "code" => "required|string|unique:suppliers,code," . $id,
                "tel_contact" => "required|string|unique:suppliers,tel_contact," . $id,
                "email" => "required|string|unique:suppliers,email," . $id,
                "address" => "required|string",
                "web_site_url" => "required|nullable|url",
                "status" => "required|boolean",
            ]);
            $supplier->update($request->all());
            return response()->json(["data" => $supplier, "message" => "supplier updated successfully"], 200);
        }
        else {
            return response()->json([
                "error" => [
                    "update" => "Data not found to update!"
                ]
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $supplier = Supplier::find($id);
        if ($supplier) {
            $supplier->delete();
            return response()->json(["message" => "supplier deleted successfully"], 200);
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
