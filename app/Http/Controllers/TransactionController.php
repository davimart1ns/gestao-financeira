<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Account $account)
    {
        $transactions = $account->transactions()
            ->with('category')
            ->orderBy('date', 'desc')
            ->paginate(15);

        return Inertia::render('Transactions/Index', [
            'account' => $account,
            'transactions' => $transactions,
            'categories' => Category::where('user_id', auth()->id())->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Account $account)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:0.01',
            'description' => 'required|string|max:255',
            'type' => 'required|in:income,expense',
            'date' => 'required|date',
        ]);

        $transaction = $account->transactions()->create([
            ...$validated,
            'user_id' => auth()->id(),
        ]);

        $this->updateAccountBalance($account, $transaction);

        return redirect()->back()->with('success', 'Transação registrada!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Account $account, Transaction $transaction)
    {
        $this->authorize('update', $transaction);

        $validated = $request->validate(
            [
                'category_id' => 'required|exists:categories,id',
                'amount' => 'required|numeric|min:0.01',
                'description' => 'required|string|max:255',
                'type' => 'required|in:income,expense',
                'date' => 'required|date',
            ]
        );

        $this->revertAccountBalance($account, $transaction);

        $transaction->update($validated);

        $this->updateAccountBalance($account, $transaction);

        return redirect()->back()->with('success', 'Transação atualizada!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account, Transaction $transaction)
    {
        $this->authorize('delete', $transaction);

        $this->revertAccountBalance($account, $transaction);

        $transaction->delete();

        return redirect()->back()->with('success', 'Transação deletada!');
    }

    public function updateAccountBalance(Account $account, Transaction $transaction)
    {
        if ($transaction->type === 'income') {
            $account->increment('initial_balance', $transaction->amount);
        } else {
            $account->decrement('initial_balance', $transaction->amount);
        }
    }

    public function revertAccountBalance(Account $account, Transaction $transaction) {
        if ($transaction->type === 'income') {
            $account->decrement('initial_balance', $transaction->amount);
        } else {
            $account->increment('initial_balance', $transaction->amount);
        }
    }
}
