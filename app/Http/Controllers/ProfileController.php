<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        return Inertia::render("Profile/Profile", [
            "title" => "Profile"
        ]);
    }

    public function change()
    {
        return Inertia::render("Profile/ChangePassword", [
            "title" => "Change Password"
        ]);
    }
}
