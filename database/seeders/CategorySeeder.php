<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        $categories = [
            // Receitas
            ['name' => 'Salário', 'type' => 'income', 'color' => '#22c55e'],
            ['name' => 'Freelance', 'type' => 'income', 'color' => '#3b82f6'],
            ['name' => 'Investimentos', 'type' => 'income', 'color' => '#a855f7'],
            ['name' => 'Presente', 'type' => 'income', 'color' => '#ec4899'],

            // Despesas Fixas
            ['name' => 'Aluguel', 'type' => 'expense', 'color' => '#ef4444'],
            ['name' => 'Condomínio', 'type' => 'expense', 'color' => '#ef4444'],
            ['name' => 'Energia', 'type' => 'expense', 'color' => '#f97316'],
            ['name' => 'Água', 'type' => 'expense', 'color' => '#06b6d4'],
            ['name' => 'Internet', 'type' => 'expense', 'color' => '#6366f1'],

            // Despesas Variáveis
            ['name' => 'Supermercado', 'type' => 'expense', 'color' => '#ef4444'],
            ['name' => 'Restaurante', 'type' => 'expense', 'color' => '#f97316'],
            ['name' => 'Ifood', 'type' => 'expense', 'color' => '#ec4899'],
            ['name' => 'Uber', 'type' => 'expense', 'color' => '#8b5cf6'],
            ['name' => 'Gasolina', 'type' => 'expense', 'color' => '#f97316'],

            // Lazer
            ['name' => 'Cinema', 'type' => 'expense', 'color' => '#ec4899'],
            ['name' => 'Streaming', 'type' => 'expense', 'color' => '#6366f1'],
            ['name' => 'Academia', 'type' => 'expense', 'color' => '#06b6d4'],
            ['name' => 'Viagem', 'type' => 'expense', 'color' => '#a855f7'],

            // Saúde
            ['name' => 'Farmácia', 'type' => 'expense', 'color' => '#ef4444'],
            ['name' => 'Médico', 'type' => 'expense', 'color' => '#06b6d4'],
            ['name' => 'Plano de Saúde', 'type' => 'expense', 'color' => '#3b82f6'],
        ];

        foreach ($categories as $category) {
            Category::create([
                'user_id' => $user->id,
                ...$category
            ]);
        }

        $this->command->info('Categorias criadas com sucesso!');
    }
}
