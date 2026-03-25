<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CollectionCenterRequest;
use App\Models\CollectionCenter;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class CollectionCenterController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $user = $request->user();
            if (! $user || ! $user->hasPermission('manage-collection-centers')) {
                abort(403);
            }
            return $next($request);
        })->only(['create','store','edit','update','destroy','index']);
    }
    public function index(): Response
    {
        $query = CollectionCenter::with('lab');

        if ($q = request('q')) {
            $query->where('name', 'like', "%{$q}%")->orWhere('address', 'like', "%{$q}%");
        }

        if ($lab = request('lab_id')) {
            $query->where('lab_id', $lab);
        }

        $centers = $query->orderBy('name')->paginate(10)->withQueryString();

        return Inertia::render('admin/collection-centers/index', [
            'centers' => $centers,
            'filters' => request()->only(['q', 'lab_id']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/collection-centers/create');
    }

    public function store(CollectionCenterRequest $request): RedirectResponse
    {
        CollectionCenter::create($request->validated());
        return redirect()->route('admin.collection-centers.index');
    }

    public function edit(CollectionCenter $collectionCenter): Response
    {
        return Inertia::render('admin/collection-centers/edit', ['collectionCenter' => $collectionCenter]);
    }

    public function update(CollectionCenterRequest $request, CollectionCenter $collectionCenter): RedirectResponse
    {
        $collectionCenter->update($request->validated());
        return redirect()->route('admin.collection-centers.index');
    }

    public function destroy(CollectionCenter $collectionCenter): RedirectResponse
    {
        $collectionCenter->delete();
        return redirect()->route('admin.collection-centers.index');
    }
}
