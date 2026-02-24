<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $accounts = auth()->user()->accounts()
        ->withSum('transactions as total_balance', 'amount')
        ->get();

        return Inertia::render('Accounts/Index', [
            'accounts' => $accounts
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name ' => 'required|string|max:255',
            'initial_balance' => 'required|numeric',
        ]);

        auth()->user()->accounts()->create($validated);

        return redirect()->back()->with('success', 'Conta criada com sucesso!');
    }

   

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Account $account)
    {
        $this->authorize('update', $account);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]); 

        $account->update($validated);

        return redirect()->back()->with('success', 'Conta atualizada com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account)
    {
        $this->authorize('delete', $account);

        $account->delete();

        return redirect()->back()->with('success', 'Conta deletada com sucesso!');
    }
}
