<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (User::count() === 0) {
            User::create([
                'name' => 'Test User',
                'email' => 'test@gmail.com',
                'password' => bcrypt('password')
            ]);
        }

        $this->call([
            CategorySeeder::class,
            AccountSeeder::class,
            TransactionSeeder::class,
        ]);
    }
}
