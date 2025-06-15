<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return [
            "count" => Customer::count(),
            "list" => Customer::all(),
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "firstname" => "required|regex:/^[a-zA-Z]+$/u|max:120|min:2",
            "lastname" => "required|regex:/^[a-zA-Z]+$/u|max:120|min:2",
            "email" => "required|email|unique:customers",
            "tel" => "required|string",
            "dob" => "required|date",
            "address" => "required|string",
            "status" => "required|boolean",
        ]);

        try {
            $customer = Customer::create($validatedData);
            return response()->json(["message" => "Customer created successfully", "data" => $customer], 201);
        } catch (\Exception $e) {
            return response()->json(["message" => "Failed to create customer", "error" => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            "data" => Customer::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $customer = Customer::find($id);
        if ($customer) {
            $request->validate([
                "firstname" => "required|regex:/^[a-zA-Z]+$/u|max:120|min:2",
                "lastname" => "required|regex:/^[a-zA-Z]+$/u|max:120|min:2",
                "email" => "required|email|unique:customers,email," . $id,
                "tel" => "required|string|unique:customers,tel," . $id,
                "dob" => "required|date",
                "address" => "required|string",
                "status" => "required|boolean",
            ]);
            $customer->update($request->all());
            return response()->json([
                "success" => true,
                "message" => "Customer updated successfully",
                "data" => $customer
            ], 200);
        }
        return response()->json([
            "success" => false,
            "message" => "Customer not found"
        ], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $customer = Customer::find($id);
        if ($customer) {
            $customer->delete();
            return response()->json(["message" => "customer deleted successfully"], 200);
        } else {
            return response()->json(["message" => "customer not found"], 404);
        }
    }
}
