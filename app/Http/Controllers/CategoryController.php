<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = auth()->user()->categories()
            ->withCount('transactions')
            ->get();

        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'type' => 'required|in:income,expense',
            'color' => 'nullable|string'
        ]);

        auth()->user()->categories()->create($validated);

        return redirect()->back()->with('success', 'Categoria criada com sucesso!');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $this->authorize('update', $category);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'type' => 'required|in:income,expense',
            'color' => 'nullable|string'
        ]);

        $category->update($validated);
        
        return redirect()->back()->with('success', 'Categoria atualizada com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $this->authorize('delete', $category);

        if($category->transactions()->exists()) {
            return redirect()->back()->with('error', 'Não é possivel excluir categoria com transações!');
        }

        $category->delete();

        return redirect()->back()->with('success', 'Categoria deletada com sucesso!');
    }
}
