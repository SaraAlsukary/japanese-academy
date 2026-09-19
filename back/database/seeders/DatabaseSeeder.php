<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PlacementQuestionSeeder::class,
        ]);
       User::updateOrCreate(
            ['email' => 'admin@academy.com'],
            [
                'first_name' => 'مدير',
                'last_name' => 'النظام',
                'email' => 'admin@academy.com',
                'password' => Hash::make('Admin@123456'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );
       User::updateOrCreate(
            ['email' => 'teacher@academy.com'],
            [
                'first_name' => 'أستاذ',
                'last_name' => 'اللغة اليابانية',
                'email' => 'teacher@academy.com',
                'password' => Hash::make('Teacher@123456'),
                'role' => 'teacher',
                'japanese_level' => 'N1',
                'email_verified_at' => now(),
            ]
        );
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
