<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // ORM ) Object Relational Mapping from db using model and call
    public function index()
    {
        // return "Role List";
        return [
            "list" => Role::all(),
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // body json from client
        $role = new Role();
        $role->name = $request->input("name");
        $role->description = $request->input("description");
        $role->status = $request->input("status");
        $role->save(); // INSERT INTO role (name,description,status) VALUES ()

        return response()->json([
            "data" => $role,
            "message" => "Insert success"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // SELECT * FROM roles WHERE id = $id
        return response()->json([
            "data" => Role::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $role = Role::find($id);
        if (!$role) { //have not role
            return response()->json([
                "error" => [
                    "update" => "Data not found to update!"
                ]
            ]);
        } else {
            $role->name = $request->input("name");
            $role->description = $request->input("description");
            $role->status = $request->input("status");
            $role->update();
            return response()->json([
                "data" =>  $role,
                "message" => "Update success"
            ]);
        }
    }
    public function destroy($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json([
                "error" => [
                    "delete" => "Data not found to delete"
                ]
            ]);
        } else {
            $role->delete();
            return response()->json([
                "message" => "Delete success"
            ]);
        }
    }
}
