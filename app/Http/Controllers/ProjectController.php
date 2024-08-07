<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Task;
use GuzzleHttp\Psr7\Query;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sortField = request('sort');
        $sortDirection = request('order', 'asc');

        $query = Project::query();
        if(request('name')){
            $query = $query->where('name', 'like', '%'.request('name').'%');
        }
        if (request('status')){
            $query = $query->where('status', request('status'));
        }

        $queryparams = request()->query() ?: null;

        $projects = ProjectResource::collection($query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(5));

        return Inertia::render('Projects/index', compact('projects', 'queryparams'));
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
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $sortField = request('sort');
        $sortDirection = request('order', 'asc');

        $query = $project->tasks();
        $queryparams = request()->query() ?: null;
        $tasks = TaskResource::collection($query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(5));

        $myproject = new ProjectResource($project);
        return Inertia::render('Projects/show', compact(['myproject', 'tasks']));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $projectedit = new ProjectResource($project);
        return Inertia::render('Projects/edit', compact('projectedit'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
