<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Get user profile image and name
     */
    public function getProfileImage($id, $image)
    {
        // Find the user
        $user = User::with('profile')->find($id);
        
        // Check if user exists and has a profile with the requested image
        if (!$user || !$user->profile || $user->profile->image !== "profiles/{$image}") {
            return response()->json([
                'message' => 'Image not found'
            ], 404);
        }

        // Get the image path
        $imagePath = $user->profile->image;
        
        // Check if file exists
        if (!Storage::disk('public')->exists($imagePath)) {
            return response()->json([
                'message' => 'Image not found'
            ], 404);
        }

        // Return the file with user name in headers
        $file = Storage::disk('public')->get($imagePath);
        $type = Storage::disk('public')->mimeType($imagePath);

        return response($file, 200)
            ->header('Content-Type', $type)
            ->header('X-User-Name', $user->name);
    }

    /**
     * Update user profile image
     */
    public function updateProfileImage(Request $request, $id)
    {
        try {
            // Validate the request
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // Find the user
            $user = User::find($id);
            
            if (!$user) {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }

            // Get or create profile
            $profile = $user->profile;
            if (!$profile) {
                $profile = new Profile([
                    'user_id' => $user->id
                ]);
                $profile->save();
            }

            // Delete the old image if exists
            if ($profile->image) {
                Storage::disk('public')->delete($profile->image);
            }

            // Store the new image
            $imagePath = $request->file('image')->store('profiles', 'public');
            
            // Update profile
            $profile->image = $imagePath;
            $profile->save();

            // Check if storage link is created
            if (!file_exists(public_path('storage'))) {
                Log::warning('Storage link not created. Run "php artisan storage:link"');
            }

            return response()->json([
                'message' => 'Profile image updated successfully',
                'data' => [
                    'user_id' => $user->id,
                    'name' => $user->name,
                    'image' => $imagePath
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Profile image upload failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Profile image upload failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 