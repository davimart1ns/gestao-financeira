<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();
        $accounts = $user->accounts;
        $categories = $user->categories;

        $descriptions = [
            'expense' => [
                'Supermercado Extra',
                'Almoço no shopping',
                'Uber para casa',
                'Gasolina posto Ipiranga',
                'Conta de luz',
                'Netflix',
                'Spotify',
                'Academia',
                'Farmácia',
                'Ifood - jantar',
                'Cinema com amigos',
                'Presente para mãe',
                'Manutenção carro',
            ],
            'income' => [
                'Salário',
                'Freelance - Site',
                'Dividendos',
                'Presente',
                'Bônus',
                'Venda de produto',
            ]
        ];

        // ultimos 3 mesees
        for ($i = 0; $i < 90; $i++) {
            $date = Carbon::now()->subDays($i);

            // Cada dia tem algumas transações
            $trasactionsPerDay = rand(1, 4);

            for ($j = 0; $j < $trasactionsPerDay; $j++) {
                $account = $accounts->random();
                $isExpense = rand(1, 100) <= 70;
                $type = $isExpense ? 'expense' : 'income';

                $category = $categories
                    ->where('type', $type)
                    ->random();

                $amount = $type == 'income'
                    ? rand(100, 3000)
                    : rand(10, 500);

                $description = $type == 'income'
                    ? $descriptions['income'][array_rand($descriptions['income'])]
                    : $descriptions['expense'][array_rand($descriptions['expense'])];

                Transaction::create([
                    'user_id' => $user-> id,
                    'account_id' => $account->id,
                    'category_id' => $category->id,
                    'description' => $description . ' - ' . $date->format('d/m'),
                    'amount' => $amount,
                    'type' => $type,
                    'date' => $date, 
                ]);
            }
        }

        $this->command->info('Transações criadas com sucesso!');
    }
}
