<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        $accounts = [
            ['name' => 'Nubank', 'initial_balance' => 5000],
            ['name' => 'Caixa', 'initial_balance' => 2500],
            ['name' => 'Carteira', 'initial_balance' => 300],
            ['name' => 'PicPay', 'initial_balance' => 150],
        ];

        foreach($accounts as $account) {
            Account::create([
                'user_id' => $user->id,
                ...$account
            ]);
        }

        $this->command->info('Contas criadas com sucesso!');
    }
}
